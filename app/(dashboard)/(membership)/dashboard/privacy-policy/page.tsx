'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function DashboardPrivacyPolicy() {
  const [activeId, setActiveId] = useState<string>('intro');

  useEffect(() => {
    const handleScroll = () => {
      const offsetThreshold = 150;
      
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
          'linear-gradient(179.5deg, rgba(59, 31, 131, 0.2) 0.44%, rgba(0, 74, 173, 0.3) 49.67%, rgba(28, 28, 28, 0.6) 99.57%), url("/assets/bg.png")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto px-6 py-12 lg:px-12">
        {/* BACK TO FLIGHT DECK BUTTON */}
        <div className="mb-10">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-purple-500/30 bg-purple-950/20 text-purple-300 hover:bg-purple-900/40 hover:text-white font-chakra text-sm font-semibold tracking-wider rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              RETURN TO FLIGHT DECK
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* ===== SIDEBAR NAV ===== */}
          <aside className="mb-12 md:mb-0 md:w-1/4">
            <nav className="sticky top-28">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                Contents
              </h3>
              <ul className="space-y-4 border-l-2 border-white/10 pl-6">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(section.id)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                        setActiveId(section.id);
                      }}
                      className={`block text-lg transition-all duration-300 ${
                        activeId === section.id
                          ? 'translate-x-2 font-bold text-purple-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

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
      </div>
    </main>
  );
}
