'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { DigiPass } from '@/types/response-type';
import { useUserStore } from '@/store/useUserProfile';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

type CardPassProp = {
    data: DigiPass
}


const MintPass = ({ data }: CardPassProp) => {
    const { profile } = useUserStore();
    const currentPassPower = profile?.current_pass_power ?? 0;
    const currentPassId = profile?.current_pass_id;
    const isCurrent = currentPassId === data.id;
    const isLocked = profile?.has_pass && data.point_power <= currentPassPower;
    console.log("currentPass:", currentPassId)
    console.log("isLocked:", isLocked)
    const router = useRouter()
    const handleClick = () => {
        if (isLocked || isCurrent) return;
        router.push(`/mint-pass/${data.id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className={cn(
                // Mobile-First Layout & Font
                "relative flex flex-col items-center font-chakra transition-all duration-500",
                "w-full max-w-[280px] sm:max-w-[320px] mx-auto", 
                "p-5 sm:p-8", 
                
                // Glassmorphism Aesthetic
                "bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[28px] sm:rounded-[32px]",
                
                // States & Animations
                isLocked && "cursor-not-allowed opacity-40 grayscale",
                !isLocked && !isCurrent && "cursor-pointer hover:border-white/30 hover:bg-white/[0.02] hover:-translate-y-2 active:scale-95",
                isCurrent && "border-white/40 bg-white/[0.05] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            )}
        >
            {/* Header: Name */}
            <h3 className="text-[11px] font-bold text-base sm:text-lg tracking-widest text-white uppercase mb-6 sm:mb-8 text-center">
                {data.name}
            </h3>

            {/* Card Visual: Slanted/Floating Container */}
            <div className="relative w-full aspect-[2/3] mb-6 sm:mb-8 group">
                <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
                    <Image 
                        src={data.card} 
                        alt={data.name} 
                        fill
                        className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        priority
                    />
                </div>
                
                {/* Status Indicator Icon */}
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 rounded-full">
                    <CheckCircle2 
                        className={cn(
                            "w-7 h-7 sm:w-9 sm:h-9 transition-all duration-300",
                            isCurrent ? "text-white scale-110" : "text-white/65"
                        )} 
                        strokeWidth={1.2}
                    />
                </div>
            </div>

            {/* Footer: Stardust & Price */}
            <div className="flex flex-col items-center gap-1 w-full">
                <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg tracking-widest">
                    <span className="text-white">x{data.point_power}</span>
                    <span className="uppercase">STARDUST</span>
                </div>
                
                <div className="text-zinc-500 text-xs sm:text-sm font-medium tracking-widest">
                    ~${data.usd_price} BNB
                </div>
            </div>

            {/* Subtle Active Glow */}
            {isCurrent && (
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
            )}
        </div>
    )
}

export default MintPass