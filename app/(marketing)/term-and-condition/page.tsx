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
      'By minting a Digidrops Passport, connecting a wallet, or accessing the dashboard, you agree to these Terms.',
      'A Digidrops Passport is required before dashboard access is granted. If you do not agree, do not proceed.',
      'Digidrops is a participation platform — not a financial system, investment vehicle, or marketplace.',
    ],
  },
  {
    id: 'rights-laws',
    title: '2. Rights & Laws',
    content: [
      'You confirm that your journey through Digidrops is lawful within your jurisdiction.',
      'Nothing on Digidrops — Passports, Stardust, quests, multipliers, or leaderboard rankings — represents:',
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
      'Digidrops integrates third-party systems including BNB Chain, wallet providers, and infrastructure services.',
      'We do not control these systems and are not responsible for:',
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
      'By using Digidrops, you grant us a limited, non-exclusive right to:',
      '• Verify Pass ownership to enable access',
      '• Record quest activity for continuity and fairness',
      '• Display anonymized participation metrics within community features',
      'Your wallet, assets, and identity remain entirely yours.',
    ],
  },
  {
    id: 'contributor-agreement',
    title: '5. Contributor Agreement',
    content: [
      'By participating in tasks, flights, or validation campaigns (including data labeling, Reinforcement Learning from Human Feedback (RLHF), and consensus validation):',
      '• You warrant that all inputs, annotations, and labels you submit are your original intellectual contributions and contain no malicious, deceptive, or infringing material.',
      '• You grant Digidrops and its affiliates a perpetual, irrevocable, worldwide, royalty-free, fully paid-up sublicensable license to utilize, modify, package, compile, and distribute your submissions for dataset training and AI application building.',
      '• You agree that consensus scoring algorithms will determine validity, and decisions on quest completions or reputational outcomes are final.',
    ],
  },
  {
    id: 'rewards-policy',
    title: '6. Community Rewards Policy',
    content: [
      'Stardust points, multipliers, status badges, and Soulbound Passports (SBTs) are non-monetary participation metrics.',
      '• Stardust points and status indicators have zero cash, monetary, or market value and cannot be redeemed, sold, or exchanged for real-world currency or assets.',
      '• All rewards and allocations are purely discretionary, exist solely to reflect community reputation, and do not constitute any form of investment or equity right.',
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
    <main className='relative min-h-screen w-full scroll-smooth bg-[#0B0B0B] text-white bg-[url("/assets/bg/terms%20bg.webp")] bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden'>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      <div className="container mx-auto flex flex-col px-6 py-20 md:flex-row lg:px-12 relative z-10">
        
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
          <h1 className="mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl font-chakra">
            Terms &amp; Conditions
          </h1>

          <div className="space-y-24">
            {SECTIONS.map((section) => (
              <article 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32 border-b border-white/10 pb-12 last:border-0"
              >
                <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl font-chakra">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => {
                    if (paragraph.startsWith('•')) {
                      return (
                        <div key={idx} className="flex items-start gap-3 text-base leading-relaxed text-gray-300 sm:text-lg pl-4">
                          <span className="text-blue-400 font-bold mt-1.5 text-xs">●</span>
                          <span>{paragraph.replace(/^•\s*/, '')}</span>
                        </div>
                      );
                    }
                    return (
                      <p
                        key={idx}
                        className="text-base leading-relaxed text-gray-300 sm:text-lg"
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}