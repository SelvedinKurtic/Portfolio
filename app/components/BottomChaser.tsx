'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

// Robby is the bestest cursor chaser in the whole world. Do not bully bobby please! He WILL be mad at you ):



interface Balloon {
  id: number;
  x: number;
  color: string;
  speed: number;
  size: number;
}

export default function BottomChaser() {
  const [mounted, setMounted] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  
  // Robot state machine modes
  const [botMode, setBotMode] = useState<'tracking' | 'wiggling' | 'jumping' | 'tantrum' | 'ouch'>('tracking');
  const [failCount, setFailCount] = useState(0);
  
  // Click tracking and modal configurations
  const [clickCount, setClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apologyText, setApologyText] = useState('');
  
  // Celebration arrays
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const tantrumTimeout = useRef<NodeJS.Timeout | null>(null);
  const ouchTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastJumpTime = useRef(0);
  const balloonIdCounter = useRef(0);

  // Motion canvas tracking values
  const chaserX = useMotionValue(100);
  const chaserY = useMotionValue(0); 
  const chassisTilt = useMotionValue(0);

  // Standard spring configurations for smooth weighted movement
  const springX = useSpring(chaserX, { stiffness: 75, damping: 20 }); 
  const springY = useSpring(chaserY, { stiffness: 220, damping: 15 }); 
  const smoothTilt = useSpring(chassisTilt, { stiffness: 140, damping: 12 });

  // Only load this entire feature if the user is on a desktop screen width
  useEffect(() => {
    const isDesktopMonitor = window.matchMedia('(min-width: 1024px)').matches;
    
    if (isDesktopMonitor) {
      setMounted(true); 
    } else {
      return; 
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      const screenHeight = window.innerHeight;
      const currentTime = Date.now();
      
      const currentBotX = chaserX.get();
      const deltaX = e.clientX - (currentBotX + 32); 
      const deltaY = e.clientY - screenHeight;
      const distanceToMouse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Trigger pre-jump wiggle if mouse gets inside a 150px 2D radius
      if (
        distanceToMouse < 150 && 
        botMode === 'tracking' && 
        !isJumping && 
        !isModalOpen &&
        currentTime - lastJumpTime.current > 4000
      ) {
        setBotMode('wiggling');
        setTimeout(() => {
          setBotMode(current => {
            if (current === 'wiggling') {
              executeDiagonalPounce();
              return 'jumping';
            }
            return current;
          });
        }, 600); 
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (tantrumTimeout.current) clearTimeout(tantrumTimeout.current);
      if (ouchTimeout.current) clearTimeout(ouchTimeout.current);
    };
  }, [isJumping, botMode, isModalOpen]);
  // Balloon simulation interval that handles rising particles
  useEffect(() => {
    if (balloons.length === 0) return;
    const interval = setInterval(() => {
      setBalloons(prev => 
        prev.map(b => ({ ...b, y: b.x + Math.sin(Date.now() * 0.005) * 0.5 }))
      );
    }, 30);
    return () => clearInterval(interval);
  }, [balloons]);

  // Triggers balloon cluster explosion at the robot's current position
  const triggerBalloonCelebration = () => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-emerald-500', 'bg-purple-500', 'bg-pink-500'];
    const currentBotX = chaserX.get();
    const newBalloons = Array.from({ length: 12 }).map(() => {
      balloonIdCounter.current += 1;
      return {
        id: balloonIdCounter.current,
        x: currentBotX + (Math.random() * 40 - 20),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 2 + Math.random() * 3,
        size: 16 + Math.random() * 16
      };
    });
    setBalloons(prev => [...prev, ...newBalloons]);
    setTimeout(() => setBalloons(prev => prev.slice(12)), 4000);
  };

  // Main 60FPS position kinematics tracking loop
  useEffect(() => {
    if (!mounted) return;
    let animationFrameId: number;

    const computeRobotKinematics = () => {
      const currentX = chaserX.get();
      let targetX = mouseX.current - 32;

      if (botMode === 'tantrum') {
        targetX = 16; // Move directly to the far bottom-left corner
      } else if (botMode === 'ouch' || isModalOpen || botMode === 'wiggling') {
        targetX = currentX; // Lock position coordinates when wiggling, hurt, or in a modal
      }

      const dx = targetX - currentX;
      
      // Slower speed values (0.005 standard follow, 0.018 sulking)
      const stepSpeed = (botMode === 'wiggling' || botMode === 'ouch' || isModalOpen) ? 0 : botMode === 'tantrum' ? 0.018 : 0.005; 
      chaserX.set(currentX + dx * stepSpeed);

      // Rotational angle vibration mappings
      if (isModalOpen) {
        chassisTilt.set(0); // Fixes the loop spin-out glitch when a modal stays open
      } else if (botMode === 'wiggling') {
        chassisTilt.set(Math.sin(Date.now() * 0.07) * 14); // Pre-jump cat wiggle vibration
      } else if (botMode === 'ouch') {
        chassisTilt.set(Math.sin(Date.now() * 0.15) * 15); // Fast panic shake on click
      } else if (Math.abs(dx) > 3 && !isJumping && botMode === 'tracking') {
        chassisTilt.set(Math.sin(Date.now() * 0.05) * 3);  // Standard track walking vibration
      } else if (botMode === 'tantrum') {
        chassisTilt.set(Math.sin(Date.now() * 0.1) * 6);
      } else {
        chassisTilt.set(0);
      }

      // Track looking orientation values
      if (targetX < currentX - 1) setIsFacingLeft(true);
      if (targetX > currentX + 1) setIsFacingLeft(false);

      animationFrameId = requestAnimationFrame(computeRobotKinematics);
    };

    animationFrameId = requestAnimationFrame(computeRobotKinematics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted, botMode, isJumping, isModalOpen]);
  // 📐 Hoisted 2D parabolic jump trajectory engine
  function executeDiagonalPounce() {
    setIsJumping(true);
    chassisTilt.set(0);
    lastJumpTime.current = Date.now();

    const startX = chaserX.get();
    const mx = mouseX.current - 32;
    const my = mouseY.current;
    const screenHeight = window.innerHeight;

    const horizontalDelta = mx - startX;
    const verticalDelta = screenHeight - my;

    const boundedHeight = Math.min(Math.max(verticalDelta, 40), 90);
    const boundedWidth = Math.min(Math.max(horizontalDelta, -120), 120);

    let elapsed = 0;
    const totalFrames = 15;

    const runPounceTick = () => {
      elapsed += 1;
      const t = elapsed / totalFrames;

      chaserX.set(startX + boundedWidth * t);
      chaserY.set(-(4 * boundedHeight * t * (1 - t)));

      if (elapsed < totalFrames) {
        requestAnimationFrame(runPounceTick);
      } else {
        chaserY.set(0);
        
        const finalBotX = chaserX.get();
        const currentMouseX = mouseX.current - 32;
        const currentMouseY = mouseY.current;

        const catchDistance = Math.sqrt(
          Math.pow(finalBotX - currentMouseX, 2) + Math.pow((window.innerHeight - 35) - currentMouseY, 2)
        );

        if (catchDistance < 60) {
          triggerBalloonCelebration();
          setFailCount(0); 
          setBotMode('tracking');
          setIsJumping(false);
        } else {
          setIsJumping(false);
          setBotMode(() => {
            setFailCount(prev => {
              const nextCount = prev + 1;
              if (nextCount >= 5) {
                triggerSystemTantrum(20000); // 20s standard miss timeout
                return 0; 
              }
              return nextCount;
            });
            return 'tracking';
          });
        }
      }
    };
    requestAnimationFrame(runPounceTick);
  }

  // Hoisted timeout tracker function
  function triggerSystemTantrum(duration: number) {
    setBotMode('tantrum');
    if (tantrumTimeout.current) clearTimeout(tantrumTimeout.current);
    tantrumTimeout.current = setTimeout(() => {
      setBotMode('tracking'); 
      setClickCount(0); // Reset click tracking metrics on wake up
    }, duration);
  }

  // Hit filtering layout logic
  const handleRobotClick = () => {
    if (botMode === 'tantrum' || isJumping || isModalOpen) return;

    const nextClickCount = clickCount + 1;
    setClickCount(nextClickCount);
    chaserY.set(0); 

    if (nextClickCount === 1 || nextClickCount === 3) {
      // Hits 1 and 3 trigger an immediate ouch freeze and open the modal popup
      setBotMode('ouch');
      setIsModalOpen(true);
    } else if (nextClickCount >= 5) {
      // Hit 5 triggers an immediate ouch state, opens the privileges modal, and locks out the bot for 5 minutes
      setBotMode('ouch');
      setIsModalOpen(true);
      triggerSystemTantrum(300000); 
    } else {
      // Hits 2 and 4 do NOT create popups; they only flash a light ouch stagger state
      setBotMode('ouch');
      if (ouchTimeout.current) clearTimeout(ouchTimeout.current);
      ouchTimeout.current = setTimeout(() => {
        setBotMode('tracking');
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    // 3rd hit prompt check: Text verification required to close
    if (clickCount === 3 && apologyText !== "I'm sorry Robby I wont do it again I promise") return;
    
    setIsModalOpen(false);
    setApologyText('');
    
    // Safety check: if they closed the 5th hit modal, don't return to tracking mode prematurely
    if (clickCount < 5) {
      setBotMode('tracking');
    }
  };

  if (!mounted || (typeof window !== 'undefined' && !window.matchMedia('(min-width: 1024px)').matches)) {
    return null;
  }
  return (
    <>
      {/* Celebration balloons render overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{ x: balloon.x, y: window.innerHeight + 20, opacity: 1, scale: 0.8 }}
              animate={{ 
                y: -100, 
                x: balloon.x + Math.sin(balloon.id) * 35, 
                rotate: Math.random() * 20 - 10,
                opacity: [1, 1, 0.8, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: balloon.speed, ease: "easeOut" }}
              className={`absolute w-8 h-10 ${balloon.color} rounded-full flex flex-col items-center justify-end shadow-md`}
              style={{ width: balloon.size, height: balloon.size * 1.2 }}
            >
              <div className="w-1.5 h-1.5 bg-black/20 transform rotate-45 translate-y-0.5" />
              <div className="w-0.5 h-8 bg-gray-400/40 translate-y-8" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main bottom screen baseline positioning boundary */}
      <div className="fixed bottom-0 left-0 right-0 h-1 z-40 select-none overflow-visible">
        <motion.div
          style={{ 
            x: springX, 
            y: springY,
            rotate: smoothTilt,
            transformOrigin: 'bottom center' 
          }}
          className="absolute bottom-0 w-16 h-20 flex flex-col items-center justify-end overflow-visible filter drop-shadow-md"
        >
          {/* Main robot interactive click shell layer */}
          <motion.div 
            onClick={handleRobotClick}
            animate={{ scaleX: isFacingLeft ? -1 : 1 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="w-16 h-12 relative flex flex-col items-center justify-end overflow-visible pointer-events-auto cursor-pointer transition-transform active:scale-95"
          >
            {/* Matte charcoal chassis casing structure */}
            <div className="w-14 h-9 bg-slate-800 dark:bg-slate-900 border-2 border-slate-950 rounded-lg relative flex items-center justify-center p-1.5 shadow-inner">
              
              {/* Visor display output states */}
              <div className={`w-10 h-5 rounded-md border border-slate-950 flex items-center justify-center relative overflow-hidden transition-colors ${
                botMode === 'tantrum' || botMode === 'ouch' ? 'bg-red-950/90' : botMode === 'wiggling' ? 'bg-amber-950/90' : 'bg-black'
              }`}>
                {botMode === 'tantrum' ? (
                  <div className="flex gap-0.5 items-center justify-center w-full h-full text-red-500 font-bold text-xs animate-pulse">
                    <span>＞</span><span>_</span><span>＜</span>
                  </div>
                ) : botMode === 'ouch' ? (
                  <motion.div animate={{ scaleX: isFacingLeft ? -1 : 1 }} className="text-red-400 font-black text-[9px] animate-ping tracking-tight">OUCH!</motion.div>
                ) : botMode === 'wiggling' ? (
                  <motion.div animate={{ scaleX: isFacingLeft ? -1 : 1 }} className="text-amber-400 font-black text-[9px] animate-pulse tracking-tighter">READY...</motion.div>
                ) : (
                  <div className="flex gap-1.5 justify-center items-center w-full text-emerald-400 font-bold text-[10px]">
                    <span className="animate-bounce">⌖</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⌖</span>
                  </div>
                )}
              </div>
              <div className="absolute left-1 top-1 bottom-1 w-1 bg-gradient-to-b from-amber-500 to-yellow-600 opacity-40 rounded-sm" />
            </div>

            {/* Alternating tread pulse wheel layers */}
            <div className="w-[60px] h-2.5 bg-slate-950 border border-slate-900 rounded-full -mt-0.5 flex justify-between px-1 relative z-10 shadow shadow-slate-950">
              <div className={`w-3 h-1.5 bg-slate-600 rounded-full mt-0.5 ${botMode === 'tracking' || botMode === 'tantrum' ? 'animate-pulse' : ''}`} />
              <div className={`w-3 h-1.5 bg-slate-600 rounded-full mt-0.5 ${botMode === 'tracking' || botMode === 'tantrum' ? 'animate-pulse' : ''}`} />
              <div className={`w-3 h-1.5 bg-slate-600 rounded-full mt-0.5 ${botMode === 'tracking' || botMode === 'tantrum' ? 'animate-pulse' : ''}`} />
            </div>

            {/* Lifting arms */}
            <div 
              className="w-4 h-5 border-r-2 border-t-2 border-slate-950 absolute -right-1.5 bottom-2 origin-bottom transition-transform duration-300"
              style={{ transform: botMode === 'tantrum' ? 'rotate(-60deg) translateY(-2px)' : botMode === 'wiggling' ? 'rotate(15deg)' : botMode === 'ouch' ? 'rotate(45deg) scaleY(1.3)' : isJumping ? 'rotate(-20deg)' : 'none' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Theme matched warning popup panel structure */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 text-center select-none pointer-events-auto"
            >
              {/* Conditional Title and Icon layout routing matrices based on click threshold indexes */}
              {clickCount >= 5 ? (
                <>
                  {/* 🚀 HIT 5 SPECIFICATION PANEL: Privileges Revoked layout */}
                  <div className="text-4xl mb-3 animate-bounce">🚨🛑</div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
                    Privileges Revoked!
                  </h3>
                  <p className="text-xs text-red-500 font-bold mb-4 tracking-tight uppercase">
                    Good Job, you lost Robby privileges
                  </p>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-6">
                    Robby no longer likes you, he's sad you keep hitting him. He will sit in his corner for the next 5 minutes contemplating if he should forgive you.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-950 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-bold rounded-xl shadow transition-transform transform active:scale-95 cursor-pointer pointer-events-auto"
                  >
                    I will go think about what I've done
                  </button>
                </>
              ) : clickCount === 3 ? (
                <>
                  {/* HIT 3 SPECIFICATION PANEL: Text box apology layout verification */}
                  <div className="text-4xl mb-3 animate-bounce">🤖🩹</div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
                    Robby is Hurt!
                  </h3>
                  <p className="text-xs text-red-500 font-bold mb-4 tracking-tight">
                    I said stop it!
                  </p>
                  
                  <div className="text-left mb-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-lg p-2.5">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">TYPE THIS EXACT SENTENCE TO APOLOGIZE:</span>
                    <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 select-all">
                      I'm sorry Robby I wont do it again I promise
                    </p>
                  </div>

                  <input
                    type="text"
                    value={apologyText}
                    onChange={(e) => setApologyText(e.target.value)}
                    placeholder="Type your apology here..."
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 dark:border-slate-600 rounded-xl mb-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors pointer-events-auto"
                  />
                  
                  <button
                    disabled={apologyText !== "I'm sorry Robby I wont do it again I promise"}
                    onClick={handleCloseModal}
                    className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow transition-all active:scale-95 cursor-pointer pointer-events-auto"
                  >
                    Send Apology & Reboot Pins
                  </button>
                </>
              ) : (
                <>
                  {/* HITS 1 AND 4 SPECIFICATION PANEL: Lightweight dismiss warning popups */}
                  <div className="text-4xl mb-3 animate-bounce">🤖💥</div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
                    Ouchie!
                  </h3>
                  <p className="text-xs text-red-500 font-bold mb-4 tracking-tight uppercase">
                    Stop it!
                  </p>
                                      <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-6">
                    Ouch! You hit Robby on the chassis too hard. Please do not disturb Robby, he's really sensitive.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-xl shadow transition-transform transform active:scale-95 cursor-pointer pointer-events-auto"
                  >
                    Apologize
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
