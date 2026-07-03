import React from 'react'
import MintPass from '../_components/dashboard/card-pass-select'
import { getDigiPasses } from '@/app/data/digi-pass/pass'
import { DigiPass } from '@/types/response-type'

const BuyPage = async () => {
    const digi_passes = await getDigiPasses();

    return (
        <main className="relative min-h-screen w-full flex flex-col bg-[url('/assets/bg/mint%20pass%20bg.webp')] bg-cover bg-center bg-fixed text-gray-100 justify-between overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            
            {/* Content Wrapper */}
            <div className="container mx-auto flex flex-col items-center justify-center flex-grow px-4 py-8 sm:py-12 lg:py-10 xl:py-14 relative z-10">
                
                {/* Header Section */}
                <header className="text-center mb-6 sm:mb-8 lg:mb-4 xl:mb-6 max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold font-chakra uppercase tracking-wider mb-2 lg:mb-1">
                        Choose Your Path
                    </h1>
                    <p className="text-xs sm:text-sm lg:text-xs xl:text-sm font-medium font-chakra text-gray-300 tracking-wide mb-3">
                        Your Pass is your contributor identity inside the Digiverse.
                    </p>
                    <p className="text-xs sm:text-sm font-medium font-chakra text-gray-400 tracking-wide leading-relaxed mb-4">
                        Mint a Pass to access the Digidrops dashboard, complete quests, earn Stardust, join the leaderboard, and begin building your reputation as a verified contributor.
                    </p>
                    <div className="flex justify-center">
                        <a 
                            href="/testnet" 
                            className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider underline underline-offset-4"
                        >
                            Need testnet gas? Get Faucet
                        </a>
                    </div>
                </header>

                {/* Cards Grid: Mobile (1 col) -> Tablet (2 col) -> Desktop (Fit content/3 col) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-4 xl:gap-6 w-full max-w-5xl place-items-center">
                    {digi_passes?.map((card: DigiPass, idx: number) => (
                        <MintPass data={card} key={idx} />
                    ))}
                </div>

            </div>

            {/* Footer Disclaimer */}
            <footer className="w-full pb-6 lg:pb-4 px-4 mt-auto relative z-10">
                <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
                    <p className="text-center text-[10px] leading-relaxed text-gray-400 sm:text-xs">
                        SB Passports are non-transferable community credentials used to access Digiverse. They hold no external monetary value.
                    </p>
                </div>
            </footer>

        </main>
    )
}

export default BuyPage