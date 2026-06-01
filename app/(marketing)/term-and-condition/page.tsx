'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type TermSection = {
  id: string;
  title: string;
  content: string[];
};

const SECTIONS: TermSection[] = [
  {
    id: 'agreements',
    title: '1. Agreements',
    content: [
      'By minting a Digidrops pass, connecting a wallet, or entering the Digidrops dashboard, you accept this Voyager`s Accord.',
      'A Digidrops pass minted as a soulbound access credential is required before dashboard access is granted. If these terms do not align with your path, do not proceed beyond the mint gate.',
      'Digidrops is a socialFi platform, not a financial system, investment vehicle, or marketplace.',
    ],
  },
  {
    id: 'rights-laws',
    title: '2. Rights & Laws',
    content: [
      'You confirm that your journey through Digidrops is lawful within your jurisdiction.',
      'Nothing within this universe—Passes, Stardust, quests, multipliers, or rankings—represents:',
      '• An investment',
      '• A security',
      '• A financial product',
      '• A promise or expectation of profit',
      'All mechanics exist for experience, access, and participation only.',
    ],
  },
  {
    id: 'third-party',
    title: '3. Third-Party Applications',
    content: [
      'Digidrops travels alongside third-party systems such as blockchain networks (including BNB Smart Chain), wallet providers, and infrastructure services.',
      'We do not command these systems and accept no responsibility for:',
      '• Wallet security or private key management',
      '• Network delays, congestion, or outages',
      '• Gas fees or failed transactions',
      'Engage with third-party tools at your own discretion.',
    ],
  },
  {
    id: 'rights-grant',
    title: '4. Rights You Grant to Us',
    content: [
      'By entering the constellation, you grant Digidrops a limited, non-exclusive right to:',
      '• Verify Pass ownership to enable access',
      '• Record quest activity for continuity and fairness',
      '• Display anonymized participation metrics within community features',
      'Your wallet, assets, and identity remain entirely yours.',
    ],
  },
];

export default function TermsPage() {
  const [activeId, setActiveId] = useState<string>('agreements');

  useEffect(() => {
    const handleScroll = () => {
      const offsetThreshold = 150; // Adjust for sticky header height
      
      // Calculate distance from top for all sections
      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return { 
          id: s.id, 
          offset: el ? el.getBoundingClientRect().top : 0 
        };
      });

      // Find the last section that has crossed the threshold
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
        backgroundAttachment: 'fixed', // Keeps gradient static while scrolling
      }}
    >
      <div className="container mx-auto flex flex-col px-6 py-20 md:flex-row lg:px-12">
        
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
                        ? 'translate-x-2 font-bold text-blue-400'
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
          <h1 className="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Terms & Conditions
          </h1>

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