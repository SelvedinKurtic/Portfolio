"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function LabAutomationPage() {
  const logEntries = [
    {
      date: "Research Baseline",
      title: "Polymer Composite Materials from Agricultural Waste",
      badge: "Objective & Scope",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      image: "/PistResearch/UnCleanPistachios.png",
      paragraphs: [
        "Co-Authored by Selvedin Kurtic & Dr. Luis Cabrales within the Department of Mechatronics Engineering, California State University, Monterey Bay.",
        "Core Project Objective: Evaluate the distinct mechanical performance impacts of localized pistachio shell particle sizes and filler mass concentrations when compounded into low-density polyethylene (LDPE) matrices.",
        "By replacing conventional, non-renewable mineral options like calcium carbonate with pre-consumer agricultural byproducts, this research addresses sustainability. Processing raw rejects yields an immediate 30.06% material mass reduction upon complete cleaning and drying cycles."
      ]
    },
    {
      date: "Fabrication Phase",
      title: "Bio-Powder Synthesis & Extrusion Compounding",
      badge: "Procedure",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      image: "/PistResearch/ActuallyCleanPist.png",
      paragraphs: [
        "Raw pistachio hulls were thoroughly washed, dried in a laboratory oven, mechanically ground, and filtered through sifter pans to isolate 60, 120, and 230 Mesh sizing tiers.",
        "Measured weight percentages of the bio-powder were compounded with 50g of raw LDPE pellets using a specialized Laboratory Mixing Extruder. The resulting composite filament streams were pelletized into uniform material feeds before being loaded into an injection molding machine to stamp out standardized tensile dog-bone test specimens."
      ]
    }
  ];
  const remainingEntries = [
    {
      date: "Statistical Controls",
      title: "Data Verification & Stress Scale Benchmarks",
      badge: "Methodology",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      image: "/PistResearch/figure3.jpeg",
      paragraphs: [
        "To ensure high statistical precision and isolate random outliers, a sample size of N = 40 specimens was validated per individual composite mixture variation.",
        "Over 600 independent mechanical stress trials were conducted on the Instron Universal Testing Machine. Central tendency metrics were charted dynamically, mapping average peak forces and continuous elongation curves rather than relying on isolated material data points."
      ]
    },
    {
      date: "Failure Analysis",
      title: "Performance Drops & Sizing Metrics",
      badge: "Results & Testing",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      image: "/projects/PistResearch/figure4.jpeg",
      paragraphs: [
        "Tensile testing revealed that adding pistachio shell powder increases overall rigidity and stiffness but reduces maximum elongation properties. Finer particle sizes preserved material strength best: the average force drop-off under load was limited to 8.11% for 63 µm particles, compared to 9.77% for 125 µm and 13.39% for larger 250 µm particles.",
        "Optimal Performance 'Sweet Spots': The 125 µm and 63 µm grain sizes achieved maximum performance at a 10% load concentration. At this threshold, the 125 µm composition maximized structural elongation at break while experiencing only a minor 1.64% drop in maximum force and a 2.75% change in total force load."
      ]
    },
    {
      date: "Synthesis & Future R&D",
      title: "Research Conclusions & Upcoming Material Phases",
      badge: "Future Outlook",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      image: "/projects/PistResearch/poster.jpeg",
      paragraphs: [
        "Conclusion: While adding bio-fillers slightly reduces maximum material force bounds compared to pure controls, fine-grain sieved shell powders offer a viable, sustainable eco-filler that decreases reliance on raw plastics.",
        "Upcoming Research Phases: I am actively expanding this study to evaluate alternative agricultural byproducts and matrix compounds. Future trial loops will transition from pure tensile stress tests toward rigorous compression testing methodologies to isolate deformation thresholds under load.",
        "Acknowledgements: Special thanks to Dr. Luis Cabrales for creating this research project and providing academic guidance. Additional technical thanks to Javier Coyt for specialized support inside the mechatronics engineering laboratory."
      ]
    }
  ];

  const milestones = [
    { date: "Phase 01", title: "N=40 Controls", desc: "Setting strict baseline trial arrays to track precise stress tendencies across 600+ test runs." },
    { date: "Phase 02", title: "Sifter Meshing", desc: "Isolating raw shell powders into tight 63 µm, 125 µm, and 250 µm grain batches." },
    { date: "Phase 03", title: "Instron Testing", desc: "Using a 68TM-30 universal testing machine to record structural break boundaries." },
    { date: "Phase 04", title: "Future Expansion", desc: "Testing novel organic composites against complex physical compression load criteria." }
  ];

  // Combine both arrays seamlessly exactly like the FasTrak setup
  const allEntries = [...logEntries, ...remainingEntries];
  return (
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
              Pistachio Shell Polymer Composites
            </h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 font-medium">
              Evaluating low-density polyethylene (LDPE) matrix structural changes using agricultural byproduct powder fillers.
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
  );
}
