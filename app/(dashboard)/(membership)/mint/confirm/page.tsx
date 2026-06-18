"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function MintConfirmPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("Waiting for transaction confirmation...");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let redirecting = false;

    const messages = [
      "Waiting for transaction confirmation...",
      "Verifying blockchain block inclusion...",
      "Querying BNB Chain indexer...",
      "Confirming Soulbound Passport status...",
      "Registering your membership ID..."
    ];
    let msgIdx = 0;

    const redirect = () => {
      if (redirecting) return;
      redirecting = true;
      clearInterval(interval);
      sessionStorage.removeItem('pendingTxHash');
      sessionStorage.removeItem('pendingPassId');
      sessionStorage.removeItem('pendingIsUpgrade');
      setStatusMessage("Passport confirmed! Redirecting to dashboard...");
      setTimeout(() => router.replace("/dashboard"), 1500);
    };

    const checkProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        if (response.ok && data.has_pass) {
          redirect();
        } else {
          msgIdx = (msgIdx + 1) % messages.length;
          setStatusMessage(messages[msgIdx]);
        }
      } catch (error) {
        console.error("[MintConfirm] Error polling profile:", error);
      }
    };

    // Layer 3: If Layer 1 failed (e.g. user closed wallet mid-flow), retry verifyPayment
    // with the txHash stored in sessionStorage before we start the poll loop.
    const pendingTxHash = sessionStorage.getItem('pendingTxHash');
    const pendingPassId = sessionStorage.getItem('pendingPassId');
    const pendingIsUpgrade = sessionStorage.getItem('pendingIsUpgrade') === 'true';

    const bootstrap = async () => {
      if (pendingTxHash && pendingPassId) {
        setStatusMessage("Submitting transaction to backend...");
        try {
          const res = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              txHash: pendingTxHash,
              newPassId: parseInt(pendingPassId, 10),
              isUpgrade: pendingIsUpgrade,
            }),
          });
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Verification failed');
          }
        } catch (err) {
          console.warn("[Layer3] verifyPayment retry failed, polling will still catch it:", err);
        }
      }

      // Always start polling regardless of whether verifyPayment succeeded
      await checkProfile();
      interval = setInterval(checkProfile, 5000); // Poll every 5s instead of 10s
    };

    bootstrap();

    return () => clearInterval(interval);
  }, [router]);


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-[url('/assets/bg/dashboard%20bg.webp')] bg-cover bg-center bg-no-repeat px-4 font-chakra text-white selection:bg-brandColor/30 relative">
      {/* Background Noise Texture for cinematic feel */}
      <div className="fixed inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Obsidian black card */}
      <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-center gap-4 text-center">
        {/* Rotating asset icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
        >
          <Image
            src="/assets_icon/2.webp"
            alt="Loading State"
            width={112}
            height={112}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>

        <div className="space-y-1 mt-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400 animate-pulse">
            Processing Mint
          </h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Synchronizing with BNB Chain
          </p>
        </div>

        {/* Dynamic status message */}
        <div className="h-5 flex items-center justify-center mt-1 border-t border-white/5 pt-3 w-full">
          <p className="text-xs text-blue-400 font-medium tracking-wide transition-all">
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

