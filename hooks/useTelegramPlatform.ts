'use client'

export function useTelegramPlatform(): {
  isTelegram: boolean
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
} {
  if (typeof window === 'undefined') {
    return { isTelegram: false, isExpanded: false, viewportHeight: 0, viewportStableHeight: 0 }
  }

  const tg = (window as any).Telegram?.WebApp
  const isTelegram = !!tg

  return {
    isTelegram,
    isExpanded: tg?.isExpanded ?? false,
    viewportHeight: tg?.viewportHeight ?? 0,
    viewportStableHeight: tg?.viewportStableHeight ?? 0,
  }
}
