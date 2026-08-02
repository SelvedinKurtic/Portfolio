"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';

export default function FastrakPage() {


  const logEntries = [
    {
      date: "August 20, 2025",
      title: "The Redesign",
      badge: "CAD Design",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      image: "/fastrak/visor-render.png",
      paragraphs: [
        "I wanted to keep my design simple to create while also remaining accessible. I added a curve to the bottom (shown as top) so it would be easy to put the FasTrak into the holder while the little nub on the right side would prevent the FasTrak from sliding out.",
        "I also added side barriers that would keep the FasTrak in place preventing it from sliding out of the sides. This barrier is a perfect fit for the FasTrak Flex as it follows the radius of the device.",
        "Along with these changes, I redesigned the clip portion of the holder (bottom), instead of having the clip rely on pure stiffness from the first design, the new design relies on flexibility. This helps the holder stay on the visor without sliding off easily.",
        "This design is super easy to use especially with the addition of the triangular indent and circular indent on the left side that provide a designated spot for flexibility."
      ]
    },
    {
      date: "August 27, 2025",
      title: "Current Progress & Thermal Limits",
      badge: "Testing",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      image: "/fastrak/fastrak-on-visor.jpg",
      paragraphs: [
        "As of August 25, 2025; the FasTrak holder works as intended, it slides onto the visor in my vehicle and is easy to use. I am able to remove it when needed and easily place it back.",
        "Unfortunately PLA is not great in warmer temperatures, so after about 1 day with 75 degree temperatures (close to 90 degrees in the vehicle) the plastic started to warp and deform due to the heat and pressure it has to withstand.",
        "I am in the process of using a different material; HT-PLA-GF Filament by Polymaker. While this filament does require a new nozzle for my 3D Printer, it provides the reliability of being able to withstand higher temperatures and pressures due to the added glass fiber."
      ]
    },
    {
      date: "August 31, 2025",
      title: "HT-PLA-GF Filament Integration",
      badge: "Material Science",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      image: "/fastrak/FastTrak_Flex_Holder_Red.png",
      paragraphs: [
        "After receiving Black HT-PLA-GF produced by Polymaker as-well as a new Hardened Steel Nozzle for my printer; I started the process of printing out parts with the new material.",
        "Initially I experienced a few difficulties with using the new material as it was a new experience. I’ve only ever worked with generic PLA from Sunlu, Bambu Labs, and a few other companies.",
        "Compared to generic PLA, the HT-PLA-GF required a higher hot end temperature to effectively melt the plastic. This was an increase from around 190-200 degrees celsius to around 230 degrees at a minimum."
      ]
    },
    {
      date: "Thermal Processing",
      title: "The Annealing Process",
      badge: "Theory",
      badgeColor: "bg-slate-50 text-slate-700 border-slate-200",
      image: "/fastrak/Annealed-HTPLAGF2.webp",
      paragraphs: [
        "First, what exactly does it mean to Anneal PLA and why should it be done? Annealing is a heat treatment process that increases the strength in a material and heat-resistance by inducing crystallization.",
        "You can think of it like a hair-dryer or iron; you need to heat up your hair which is currently frizzy and unmanageable. After you heat up your hair you can style it to your desired style and let it cool off. Your hair will typically remain the same throughout the day no matter how many times you mess with it.",
        "Annealing should be done when your print is expected to withstand higher temperatures and stresses that standard non-annealed PLA can withstand."
      ]
    }
  ];
  const remainingEntries = [
    {
      date: "Method Evaluation",
      title: "Open-Air vs. Fine-Salt Annealing",
      badge: "Experimentation",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
      image: "/fastrak/Annealed-HTPLAGF.jpg",
      paragraphs: [
        "I chose two different annealing processes for this project: Open Air Annealing and Fine-Salt Annealing. Open Air Annealing consists of simply adding parts into an oven at 100 degrees celsius for 30 minutes. The main issues with this are that the parts are prone to warping and drooping if handled and placed incorrectly.",
        "Fine-Salt Annealing uses a process similar to casting; the printed parts are to be placed into fine salt and fully surrounded. Then the parts and salt are set in an oven at 100 degrees celsius for 30-90 minutes depending on the amount of salt used and size of part.",
        "I found that the results of both processes were quite similar, the only issue was the open-air annealed parts did warp and have inconsistencies."
      ]
    },
    {
      date: "Stress Testing",
      title: "50% Infill Water Annealing",
      badge: "Failure Analysis",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      image: "/fastrak/Snapped_HTPLAGF.webp",
      paragraphs: [
        "Initially the 50% Infill piece felt stronger compared to the Salt/Open-Air Annealing. Upon applying stress it was less prone to snapping. Unfortunately it still suffered separation between the walls and infill.",
        "This is not good because this specific area needs to be able to withstand a high amount of constant stress and if it fails it could cause serious issues such as plastic falling off while driving and the whole bottom portion of the holder dropping down.",
        "Another issue is the bend-zone I created, it would snap when trying to connect all parts together. I do not believe this would be an issue during average use as its not an intended movement that would ever be done. Since I don't believe this would be an important issue, I will not prioritize resolving it at this time."
      ]
    },
    {
      date: "Stress Testing",
      title: "90% Infill Water Annealing",
      badge: "Success Cycle",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: "/fastrak/Snapped2_HTPLAGF.webp",
      paragraphs: [
        "The 90% Infill piece was significantly heavier and sturdier. Active bending was harder and took more effort than the 50% infill.",
        "As stress was applied, the part did not snap like the 50% infill did, it was able to withstand more stress without failure. This is the strongest iteration thus far and I believe it may be the infill I will use in the future. I will test lower amount of infill ranging from 55% to 85% to find the piece with the most strength."
      ]
    },
    {
      date: "Design Pivot",
      title: "New Updated Design",
      badge: "Consultation",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      image: "/fastrak/Updated_Design.png",
      paragraphs: [
        "As I went through the process of testing the previous design, I met with my professor Luis Cabrales and got advice that I should try using something like metal for the part that connects to the visor.",
        "This was recommended because metal has more memory and is not affected by temperature as much as plastic is. I thought this was a good idea I updated my design to be more efficient and contain a singular visor mounting area."
      ]
    }
  ];

  const milestones = [
    { date: "August 4, 2025", title: "Design Steps", desc: "This phase involved brainstorming and sketching initial concepts, focusing on functionality and aesthetics to create a solid foundation for the project." },
    { date: "August 5, 2025", title: "Prototype Development", desc: "In this stage, I build a prototype using Polylactic Acid on a Bambu Labs A1 Mini, testing various design elements to ensure they fit a FasTrak Flex while remaining easy to insert and remove." },
    { date: "Pending", title: "Final Adjustments", desc: "After testing the prototype, I made necessary adjustments based on usage and feedback, refining the design for optimal performance and user experience." },
    { date: "Pending", title: "Project Completion", desc: "To Be Completed" }
  ];

  // Combine both arrays seamlessly
  const allEntries = [...logEntries, ...remainingEntries];
return (
  <Layout>
  <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
    
    {/* Explicitly mounting the site header at the absolute top of this page */}
    <Navbar /> 

    {/* Added pt-32 (Padding-Top) to create empty breathing space for your fixed menu */}
    <main className="flex-grow pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-6 md:p-12 shadow-sm">
        
        {/* Navigation Link */}
        <Link href="/" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors inline-flex items-center mb-8">
          ← Back to Portfolio
        </Link>

        {/* Page Main Header */}
        <header className="mb-16 border-b border-slate-100 dark:border-gray-700 pb-6">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            FasTrak Visor Holder
          </h1>
          <p className="text-lg text-slate-500 dark:text-gray-400 font-medium">
            Explore how I designed and created the first ever FasTrak holder that clips onto your visor.
          </p>
        </header>

        {/* Structured Grid Content */}
        <div className="space-y-16">
          {allEntries.map((entry, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-slate-100 dark:border-gray-700 pb-12 last:border-0">
              
              {/* Text Layout Block */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {entry.date}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase tracking-wider ${entry.badgeColor}`}>
                    {entry.badge}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {entry.title}
                </h2>

                <div className="text-slate-600 dark:text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                  {entry.paragraphs.map((p, pIndex) => (
                    <p key={pIndex}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Image Layout Block */}
              <div className="lg:col-span-5 w-full flex justify-center">
                <div className="relative border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full max-w-sm aspect-square flex items-center justify-center p-2">
                  <img 
                    src={entry.image} 
                    alt={entry.title} 
                    className="object-contain w-full h-full rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://w3.org' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='9' cy='9' r='2'%3E%3C/circle%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'%3E%3C/path%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Phase Breakdown Footer Block */}
        <footer className="mt-16 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
          <h3 className="text-sm font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-6">Design Process Phases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, mIndex) => (
              <div key={mIndex} className="space-y-2">
                <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 rounded px-2 py-0.5 inline-block">
                  {m.date}
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-gray-200">{m.title}</h4>
                <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </footer>

      </div>
    </main>

    {/* Mounting the universal site footer at the absolute bottom of this page */}
    <Footer />
  </div>
  </Layout>
);
}
