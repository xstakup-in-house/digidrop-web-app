import React from "react"
import { LucideIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface InfoProp {
  data: {
    icon: string | LucideIcon
    text?: string
    score?: number
    midText?: string
    value?: number | string
  }
  isLoading: boolean
}

const InfoCard = ({ data, isLoading }: InfoProp) => {
  const { icon: Icon, text, midText, value } = data

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-2xl bg-white/10" />
  }

  return (
    <div className="flex w-full items-center justify-between gap-2 sm:gap-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md px-3 sm:px-5 py-3 sm:py-4 hover:border-white/20 transition-all duration-300">
      
      {/* LEFT */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {typeof Icon === "string" ? (
          <img src={Icon} alt="icon" className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" />
        ) : (
          <Icon className="text-white h-5 w-5 sm:h-7 sm:w-7 shrink-0" />
        )}
        <p className="text-xs sm:text-sm text-white">{text}</p>
      </div>

      {/* CENTER */}
      {midText && (
        <p className="text-xs sm:text-sm text-gray-400">
          {midText}
        </p>
      )}

      {/* RIGHT */}
      <p className="text-sm sm:text-lg font-semibold text-gray-200 font-chakra">
        {value}
      </p>
    </div>
  )
}

export default InfoCard
