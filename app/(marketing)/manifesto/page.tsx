'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type ManifestoSection = {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  bulletPoints?: string[];
};

const SECTIONS: ManifestoSection[] = [
  {
    id: 'core-concept',
    title: '1. Executive Summary',
    subtitle: 'The Human Layer of BNB Chain',
    content: [
      'Digidrops is the sybil-resistant "Human Layer" of the BNB Chain—a gamified infrastructure platform built to resolve two of the most critical challenges facing the decentralized ecosystem in sequence:',
      '• The dominance of bot-driven, artificial growth in Web3 marketing.',
      '• The critical shortage of high-fidelity, human-verified dataset labeling in decentralized artificial intelligence.',
      'By establishing a cryptographic proof-of-humanity network through soulbound credentials, Digidrops builds an active, bot-free workforce capable of scaling protocols and training the next generation of AI models.'
    ]
  },
  {
    id: 'phase-1',
    title: '2. Phase 1: Web3 Growth Engine',
    subtitle: 'Sybil-Resistant Protocol Acceleration',
    content: [
      'The current stage focuses on driving volume, protocol adoption, and network validation in our active testnet phase through a gamified SocialFi interface.',
      'Explorers secure their identity by minting Soulbound Passports (Black, White, and Gold SBTs), forming a cryptographic firewall against botnets and sybil attacks. Pilots complete verified social and on-chain flight missions for Web3 protocols to accumulate Stardust—a non-transferable prestige metric that constructs their global on-chain reputation.',
      'This growth engine builds a massive, 100% verified human community while remaining 100% SEC-safe: there are zero speculative token mechanics or liquid payouts during this foundational stage.'
    ],
    bulletPoints: [
      'Soulbound Passports: Cryptographically tied identity markers preventing multi-account farming.',
      'Stardust Reputation: Non-transferable prestige points establishing pilot credibility.',
      'Protocol Missions: Real on-chain and social actions validated by smart contracts.'
    ]
  },
  {
    id: 'phase-2',
    title: '3. Phase 2: The AI Data Layer',
    subtitle: 'Decentralized Human Feedback Loop',
    content: [
      'Upon achieving critical mass, the verified human workforce transitions from basic marketing actions to complex decentralized AI intelligence operations.',
      'The platform scales into a decentralized gig economy. Users perform Reinforcement Learning from Human Feedback (RLHF), precise prompt engineering, and on-chain dataset labeling for decentralized AI builders and machine learning frameworks.',
      'This bridges the gap between raw web data and clean datasets, training resilient neural networks through real human intelligence.'
    ],
    bulletPoints: [
      'RLHF Tasks: Reinforcement Learning from Human Feedback directly inside the flight deck.',
      'Prompt Engineering: Human validation of generative models to reduce hallucinations.',
      'On-Chain Labeling: Trustless data classification backed by blockchain provenance.'
    ]
  },
  {
    id: 'economics',
    title: '4. B2B Economics & Yields',
    subtitle: 'Sustainable Enterprise Value Loop',
    content: [
      'The long-term sustainability of the Digidrops constellation is powered by an active enterprise B2B value flow:',
      'Web3 AI protocols and enterprise clients pay a 15–25% B2B platform fee in native assets to access our highly verified, bot-free workforce and high-fidelity human datasets.',
      'These incoming enterprise fees are funneled directly back to the verified community of human pilots as real, liquid yield (USDC/BNB) in exchange for their intellectual output.',
      'This establishes a self-sustaining economic orbit where utility, labor, and rewards flow in harmony without reliance on speculative emission pools.'
    ]
  }
];

export default function Manifesto() {
  const [activeId, setActiveId] = useState<string>('core-concept');

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
          'linear-gradient(179.5deg, rgba(59, 31, 131, 0.25) 0.44%, rgba(0, 74, 173, 0.4) 49.67%, rgba(28, 28, 28, 0.7) 99.57%), url("/assets/bg.png")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <div className="container mx-auto flex flex-col px-6 py-24 md:flex-row lg:px-12 relative z-10">
        
        {/* ===== SIDEBAR NAV ===== */}
        <aside className="mb-12 md:mb-0 md:w-1/4">
          <nav className="sticky top-28">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-zinc-500 font-mono">
              Constellation Map
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
                    className={`block text-md transition-all duration-300 ${
                      activeId === section.id
                        ? 'translate-x-2 font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                        : 'text-zinc-400 hover:text-white'
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
          <header className="mb-20">
            <div className="inline-block rounded-full bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 mb-4 backdrop-blur-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                Technical Specification
              </span>
            </div>
            <h1 className="mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl tracking-tight leading-none uppercase">
              Digidrops Manifesto
            </h1>
            <p className="text-xl font-medium text-zinc-400">
              The Cryptographic Human Layer of BNB Chain & AI Data Infrastructure
            </p>
          </header>

          <div className="space-y-24">
            {SECTIONS.map((section) => (
              <article 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32 border-b border-white/5 pb-16 last:border-0"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="text-sm font-mono text-purple-400 mt-1 uppercase tracking-widest font-semibold">
                    {section.subtitle}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-zinc-300 sm:text-lg font-normal"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bulletPoints && (
                  <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 font-mono">
                      Key Telemetry Parameters
                    </h4>
                    <ul className="space-y-3">
                      {section.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                          <span className="text-blue-400 mt-1 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}