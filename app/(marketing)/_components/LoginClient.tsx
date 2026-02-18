"use client"

import React, { useEffect, useState, useRef} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from "next/dynamic"

// UI Imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConnectWalletButton } from '@/components/common/WalletConnectButton'
import { toast } from 'sonner'

// Web3 Imports
import { useAccount, useDisconnect, useSignMessage,useChainId, useConnection } from 'wagmi'
import { bscTestnet } from '@/lib/chain'
import { getNonce, walletLogin } from '@/actions/user'
import { Button } from '@/components/ui/button'

const LoginClient = () => {
  const { address, isConnected} = useConnection()
  const chainId = useChainId();
  const disconnect = useDisconnect()
  const nonceRef = useRef<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || undefined;
  const [loading, setLoading] = useState(false);
  const allowedChainIds =  [bscTestnet.id];
  const targetChainId = allowedChainIds[0];

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
    
    <div className='relative h-screen w-full font-chakra bg-[url("/assets/Stanton-crusader.jpg")] bg-cover bg-center bg-no-repeat'>
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex h-full items-center justify-center p-4">
        <Card className='w-full max-w-2xl border-gray-700 bg-gray-900/80 text-gray-200 backdrop-blur-sm'>
          
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text py-2 text-center text-3xl font-bold uppercase tracking-wider text-transparent">
              Welcome to DigiVerse
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center pb-8 pt-4">
            {/* ConnectWalletButton component */}
            <ConnectWalletButton />
            {isConnected && address && (
              <>
               <Button
                  onClick={handleAuthentication}
                  disabled={loading}
                  className="px-10 py-3 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl"
                  >
                    {!isCorrectChain ? 'Wrong network' : 'Continue'}
                  </Button>
                  {!isCorrectChain && (
                    <p className="mt-2 text-orange-400 text-xs">
                      On {chainId ? `Chain ${chainId}` : 'Unknown'} (Need {targetChainId})
                    </p>
                  )}
              </>
            )}
            
            <p className="mt-4 font-chakra text-center  text-sm tracking-wide text-gray-400">
              Connect your wallet for secure login
            </p>

            {loading && (
               <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 animate-pulse">
                 Logging in...
               </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginClient