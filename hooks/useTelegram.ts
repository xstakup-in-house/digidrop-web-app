'use client'

import { useEffect, useState, useCallback } from 'react'

interface TelegramWebApp {
  initData: string
  initDataUnsafe: Record<string, unknown>
  ready: () => void
  expand: () => void
  close: () => void
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  HapticFeedback?: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void
  }
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
}

interface UseTelegramReturn {
  webApp: TelegramWebApp | null
  isReady: boolean
  initData: string | undefined
  initDataUnsafe: Record<string, unknown> | undefined
  userId: number | undefined
  username: string | undefined
  expand: () => void
  close: () => void
  hapticFeedback: () => void
}

export function useTelegram(): UseTelegramReturn {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const check = () => {
      const tg = (window as any).Telegram?.WebApp as TelegramWebApp | undefined
      if (tg) {
        setWebApp(tg)
        tg.ready()
        setIsReady(true)
      } else {
        setWebApp(null)
        setIsReady(false)
      }
    }

    const timer = setTimeout(check, 0)
    return () => clearTimeout(timer)
  }, [])

  const expand = useCallback(() => {
    webApp?.expand?.()
  }, [webApp])

  const close = useCallback(() => {
    webApp?.close?.()
  }, [webApp])

  const hapticFeedback = useCallback(() => {
    webApp?.HapticFeedback?.impactOccurred?.('medium')
  }, [webApp])

  return {
    webApp,
    isReady,
    initData: webApp?.initData as string | undefined,
    initDataUnsafe: webApp?.initDataUnsafe as Record<string, unknown> | undefined,
    userId: (webApp?.initDataUnsafe as any)?.user?.id as number | undefined,
    username: (webApp?.initDataUnsafe as any)?.user?.username as string | undefined,
    expand,
    close,
    hapticFeedback,
  }
}
