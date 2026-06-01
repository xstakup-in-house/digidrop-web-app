'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type PolicySection = {
  id: string;
  title: string;
  content: string[];
};

const SECTIONS: PolicySection[] = [
  {
    id: 'intro',
    title: '1. Introduction',
    content: [
      'In the silent vastness of Digiverse, trust is the gravity that holds everything together.',
      'Your journey is protected by design quietly, deliberately, and with restraint.',
    ],
  },
  {
    id: 'collection',
    title: '2. Data Collection',
    content: [
      'We navigate primarily by public wallet address nothing more.',
      'Digidrops does not collect personal names, physical addresses, or financial identifiers unless you voluntarily transmit them for clearly defined optional activities.',
    ],
  },
  {
    id: 'usage',
    title: '3. Usage',
    content: [
      'Your wallet address is used only to:',
      '• Verify ownership of a Digidrops Pass before dashboard access',
      '• Track Stardust as non-monetary participation markers',
      '• Confirm Pass Rank (Void / Starlight / Solar)',
      '• Record quest progression across the constellation',
    ],
  },
  {
    id: 'protection',
    title: '4. Protection',
    content: [
      'Your path is shielded by blockchain transparency and internal access protocols.',
      'Digidrops does not sell, rent, or trade user data—ever.',
    ],
  },
  {
    id: 'command',
    title: '5. Your Command',
    content: [
      'You may disconnect at any time and drift freely.',
      'For questions, course corrections, or concerns, contact Mission Control through official Digidrops channels.',
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState<string>('intro');

  useEffect(() => {
    const handleScroll = () => {
      const offsetThreshold = 150; // Adjust for sticky header height
      
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return { 
          id: s.id, 
          offset: el ? el.getBoundingClientRect().top : 0 
        };
      });

      const current = offsets.findLast((s) => s.offset <= offsetThreshold);
      if (current) setActiveId(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main
      className="min-h-screen w-full scroll-smooth bg-[#0B0B0B] font-chakra text-white"
      style={{
        backgroundImage:
          'linear-gradient(179.5deg, rgba(59, 31, 131, 0.3) 0.44%, rgba(0, 74, 173, 0.5) 49.67%, rgba(28, 28, 28, 0.75) 99.57%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto flex flex-col px-6 py-20 md:flex-row lg:px-12">
        
        {/* ===== SIDEBAR NAV ===== */}
        

        {/* ===== MAIN CONTENT ===== */}
        <div className="md:w-3/4 md:pl-20">
          <div className="mb-16">
            <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-xl font-medium text-gray-300">
              Guardians of Your Cosmic Privacy
            </p>
          </div>

          <div className="space-y-24">
            {SECTIONS.map((section) => (
              <article 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32 border-b border-white/10 pb-12 last:border-0"
              >
                <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-gray-300 sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}