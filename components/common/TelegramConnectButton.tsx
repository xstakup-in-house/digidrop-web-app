'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'

function detectTelegram(): boolean {
  if (typeof window === 'undefined') return false
  const tg = (window as any).Telegram?.WebApp
  if (tg) return true
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('telegram') || ua.includes('tgweb')
}

export function TelegramConnectButton() {
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    setIsTelegram(detectTelegram())
  }, [])

  if (!isTelegram) {
    return <ConnectButton showBalance={false} />
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
        if (!mounted) return null

        if (!account) {
          return (
            <button
              onClick={openConnectModal}
              className="w-full rounded-xl bg-brandColor px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.97]"
            >
              Connect Wallet
            </button>
          )
        }

        return (
          <button
            onClick={openAccountModal}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur"
          >
            {account.displayName}
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
