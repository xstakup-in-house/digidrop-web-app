"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// UI Imports
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ConnectWalletButton } from '@/components/common/WalletConnectButton'
import { toast } from 'sonner'

// Web3 Imports
import { useAccount, useDisconnect, useSignMessage, useChainId } from 'wagmi'
import { bscTestnet } from '@/lib/chain'
import { getNonce, walletLogin } from '@/actions/user'
import { Button } from '@/components/ui/button'

const LoginClient = () => {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { disconnect } = useDisconnect()
  const nonceRef = useRef<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref') || undefined
  const [loading, setLoading] = useState(false)
  const allowedChainIds = [bscTestnet.id]
  const targetChainId = allowedChainIds[0]

  // Generate 25 twinkling stars
  const stars = React.useMemo(() => {
    return Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 4}s`,
    }))
  }, [])

  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: async (signature) => {
        try {
          if (!nonceRef.current || !address) {
            throw new Error('Missing auth data')
          }
          if (refCode) {
            await walletLogin(address, signature, nonceRef.current, refCode)
          } else {
            await walletLogin(address, signature, nonceRef.current)
          }
          toast.success('Logged in successfully')
          router.replace('/post-login')
        } catch (err) {
          console.error('Login failed')
          disconnect()
          toast.error('Login failed')
        } finally {
          nonceRef.current = null
          setLoading(false)
        }
      },
      onError: () => {
        nonceRef.current = null
        toast.error('Signature rejected')
        disconnect()
        setLoading(false)
      },
    },
  })

  const handleAuthentication = async () => {
    if (loading) return
    if (!isConnected || !address) {
      toast.error('Connect your wallet first')
      return
    }
    if (!allowedChainIds.includes(chainId)) {
      toast.error('Please switch to BSC Testnet')
      return
    }
    setLoading(true)
    try {
      const { nonce, message } = await getNonce()
      nonceRef.current = nonce
      setTimeout(() => {
        signMessage({ message })
      }, 100)
    } catch (err) {
      setLoading(false)
      toast.error('Something went wrong. Try again.')
    }
  }

  const isCorrectChain = chainId && allowedChainIds.includes(chainId)

  return (
    <div className='relative h-screen w-full font-chakra bg-[url("/assets/bg/login%20bg.webp")] bg-cover bg-center bg-no-repeat overflow-hidden'>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/50" />

      {/* Star particles */}
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
        <Card className='w-full max-w-md border-purple-500/25 bg-black/50 text-gray-200 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-2xl'>

          <CardHeader className="border-b border-white/5 py-6 text-center">
            <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-2xl font-extrabold uppercase tracking-widest text-transparent animate-gradient font-chakra">
              Welcome to Digiverse
            </h1>
            <p className="mt-2 text-sm text-gray-400 font-chakra">Connect your wallet for secure login</p>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center pb-8 pt-6 px-6 sm:px-8 gap-5">

            {/* Wallet Connect */}
            <div className="w-full flex justify-center">
              <ConnectWalletButton />
            </div>

            {/* Sign in button — shown after wallet connected */}
            <AnimatePresence>
              {isConnected && address && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <Button
                    onClick={handleAuthentication}
                    disabled={loading}
                    className="w-fit px-8 py-3 text-sm uppercase font-bold tracking-widest bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner />
                        Verifying...
                      </span>
                    ) : !isCorrectChain ? (
                      'Switch to BSC Testnet'
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  {!isCorrectChain && (
                    <p className="text-orange-400 text-xs text-center">
                      Wrong network. Please switch to BSC Testnet (Chain ID: {targetChainId})
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading state */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="w-full rounded-xl border border-purple-500/20 bg-purple-950/30 p-4 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    {/* Rotating ring animation */}
                    <div className="relative h-10 w-10">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-purple-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="absolute inset-1 rounded-full border-2 border-transparent border-b-cyan-400"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    <p className="text-sm text-gray-300">
                      Check your wallet and approve the signature request
                    </p>
                    <p className="text-xs text-gray-500">
                      This does not cost any gas. It just verifies you own the wallet.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom hint */}
            {!isConnected && (
              <p className="text-center text-xs text-gray-500">
                Use Metamask or Trust Wallet · BNB Chain
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Small inline spinner for button
const LoadingSpinner = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </motion.svg>
)

export default LoginClient