"use client"

import React, { useEffect, useState, useRef} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from "next/dynamic"

// UI Imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConnectWalletButton } from '@/components/common/WalletConnectButton'
import { toast } from 'sonner'

// Web3 Imports
import { useAccount, useDisconnect, useSignMessage,useChainId } from 'wagmi'
import { bscTestnet } from '@/lib/chain'
import { getNonce, walletLogin } from '@/actions/user'
import { Button } from '@/components/ui/button'

const LoginClient = () => {
  const { address, isConnected } = useAccount()
  const chainId = useChainId();
  const disconnect = useDisconnect()
  const nonceRef = useRef<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || undefined;
  const [loading, setLoading] = useState(false);
  const allowedChainIds =  [bscTestnet.id];
  const targetChainId = allowedChainIds[0];

  // Generate 25 twinkling stars in random coordinates
  const stars = React.useMemo(() => {
    return Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 4}s`,
    }));
  }, []);

  const signMessage = useSignMessage({
  mutation: {
    onSuccess: async (signature) => {
      try {
        if (!nonceRef.current || !address) {
          throw new Error('Missing auth data');
        }

        if (refCode) {
          await walletLogin(address, signature, nonceRef.current, refCode);
        } else {
          await walletLogin(address, signature, nonceRef.current);
        }
         
        toast.success('Logged in successfully');
        router.replace('/post-login');
      } catch (err) {
        console.error(err);
        disconnect.mutate()
        toast.error('Login failed');
      } finally {
          nonceRef.current = null;
          setLoading(false);
      }
    },
    onError: () => {
      nonceRef.current = null;
      toast.error('Signature rejected');
      disconnect.mutate()
      setLoading(false);
    },
  },
});


  
const handleAuthentication = async () => {
  if (loading) return;
  
  if (!isConnected || !address) {
    toast.error('Connect wallet first');
    return;
  }

  if (!allowedChainIds.includes(chainId)) {
    toast.error('Please switch to BSC network');
    return;
  }

  setLoading(true);

  try {
    const { nonce, message } = await getNonce();
    nonceRef.current = nonce;

    // IMPORTANT: slight delay helps MetaMask mobile
    setTimeout(() => {
      signMessage.mutate({ message });
    }, 100);

  } catch (err) {
    setLoading(false);
    toast.error('Failed to prepare signature');
  }
};


  const isCorrectChain = chainId && allowedChainIds.includes(chainId);
  
  
  

  return (
    <div className='relative h-screen w-full font-chakra bg-[url("/assets/Stanton-crusader.jpg")] bg-cover bg-center bg-no-repeat overflow-hidden'>
      {/* Dynamic star deck halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Twinkling Star Particles Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-particle bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="relative flex h-full items-center justify-center p-4 z-10">
        <Card className='w-full max-w-xl border-purple-500/25 bg-gray-950/80 text-gray-200 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-2xl'>
          
          <CardHeader className="border-b border-white/5 py-6">
            <CardTitle className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-center text-2xl font-extrabold uppercase tracking-widest text-transparent animate-gradient">
              REACTOR DECRYPTION TERMINAL
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center pb-8 pt-8 px-6 sm:px-10">
            {/* ConnectWalletButton component */}
            <div className="w-full flex justify-center mb-6">
              <ConnectWalletButton />
            </div>

            {isConnected && address && (
              <div className="w-full flex flex-col items-center gap-4">
                <Button
                  onClick={handleAuthentication}
                  disabled={loading}
                  className="w-full py-4 text-md uppercase font-bold tracking-widest bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {!isCorrectChain ? 'SWITCH TO BSC TESTNET' : 'AUTHORIZE DECRYPTION BEACON'}
                </Button>
                
                {!isCorrectChain && (
                  <p className="text-orange-400 text-xs font-mono text-center">
                    SYSTEM WARN // WRONG COMMS FREQUENCY (Need Chain {targetChainId})
                  </p>
                )}
              </div>
            )}
            
            <p className="mt-6 font-chakra text-center text-xs tracking-widest uppercase text-gray-500">
              ESTABLISH CRYPTOGRAPHIC LINK TO BEGIN JOURNEY
            </p>

            {loading && (
              <div className="mt-8 w-full bg-black/60 rounded-xl p-4 border border-blue-500/20 font-mono text-[10px] space-y-2 text-blue-400 leading-normal animate-pulse">
                <p>{`>>> [COMMS] LINK ACQUIRED AT ${address ? address.slice(0,10) : ''}...`}</p>
                <p>{`>>> [DECRYPTING] REQUESTING NONCE TO VERIFY SIGNATURE...`}</p>
                <p>{`>>> [WAITING] PILOT SIGNATURE RESPONSE PENDING IN WALLET TERMINAL...`}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginClient