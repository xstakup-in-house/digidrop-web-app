import React from 'react'
import MintPass from '../_components/dashboard/card-pass-select'
import { getDigiPasses } from '@/app/data/digi-pass/pass'
import { DigiPass } from '@/types/response-type'

const BuyPage = async () => {
    const digi_passes = await getDigiPasses();

    return (
        <main className="min-h-screen w-full flex flex-col bg-[url('/assets/galaxy.jpg')] bg-cover bg-center bg-fixed text-gray-100">
            
            {/* Content Wrapper */}
            <div className="container mx-auto flex flex-col items-center flex-grow px-4 py-12 md:py-20">
                
                {/* Header Section */}
                <header className="text-center mb-12 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold font-chakra uppercase tracking-wider mb-4">
                        Choose Your Path
                    </h1>
                    <p className="text-base md:text-xl font-medium font-chakra text-gray-300 tracking-wide">
                        Select your <span className='text-brandColor drop-shadow-sm'>soulbound passport</span> to the Digiverse
                    </p>
                </header>

                {/* Cards Grid: Mobile (1 col) -> Tablet (2 col) -> Desktop (Fit content/3 col) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl place-items-center">
                    {digi_passes?.map((card: DigiPass, idx: number) => (
                        <MintPass data={card} key={idx} />
                    ))}
                </div>

            </div>

            {/* Footer Disclaimer */}
            <footer className="w-full pb-8 px-4">
                <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
                    <p className="text-center text-xs leading-relaxed text-gray-400 sm:text-sm">
                        SB Passports are non-transferable community credentials used to access Digiverse. They hold no external monetary value.
                    </p>
                </div>
            </footer>

        </main>
    )
}

export default BuyPage