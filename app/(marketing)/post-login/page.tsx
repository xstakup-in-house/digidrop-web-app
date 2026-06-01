'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserProfile';
import Loading from '@/components/common/LoadingContent';

export default function PostLogin() {
  const router = useRouter();
  const { setProfile } = useUserStore();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const addLog = (message: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, message]);
          resolve();
        }, delay);
      });
    };

    const runDiagnostics = async () => {
      await addLog('>>> [LINK] ESTABLISHING DECRYPTED COMMS TUNNEL...', 400);
      await addLog('>>> [OK] PILOT CRYPTOGRAPHIC KEY IDENTIFIED', 600);
      await addLog('>>> [SCANNING] COMPILING PASS DATA FOR THIS SECTOR...', 600);

      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Not authenticated');
        const profile = await res.json();
        
        await addLog(`>>> [ACTIVE] PASSPORT FOUND: ${profile.has_pass ? 'VALID TIER' : 'NO SOULBOUND ACCESS PASS'}`, 600);
        await addLog('>>> [OK] CORRELATING FLIGHT METRICS & STARDUST BALANCES...', 600);
        await addLog('>>> [REDIRECT] BOOTING FLIGHT COCKPIT CONSOLE...', 800);

        setTimeout(() => {
          setProfile(profile);
          router.replace(profile.has_pass ? '/dashboard' : '/mint-pass');
        }, 800);

      } catch {
        await addLog('>>> [ERROR] DECRYPTION FREQUENCY LOST. REFRACTING SYSTEM...', 1000);
        setTimeout(() => {
          router.replace('/login');
        }, 1200);
      }
    };

    runDiagnostics();
  }, [router, setProfile]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full bg-[#0b0b0b] px-4 font-mono'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg bg-black/60 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col items-center gap-6">
        <Loading />
        
        <div className="w-full text-center space-y-1 mt-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-400 animate-pulse">
            COSMIC AVIONICS SCANNERS
          </h2>
          <p className="text-[10px] text-gray-500 tracking-wider">
            BOOTING pilot INTERFACE CONSOLE
          </p>
        </div>

        {/* Telemetry log output console */}
        <div className="w-full bg-black/80 rounded-xl p-4 border border-purple-500/10 min-h-[140px] text-left flex flex-col gap-1.5 font-mono text-[9px] sm:text-[10px] text-blue-400">
          {logs.map((log, idx) => (
            <p key={idx} className="animate-fade-in">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
