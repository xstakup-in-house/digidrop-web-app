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
    return <Skeleton className="h-20 w-full rounded-md bg-gray-700" />
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-md border bg-[#333333] px-5 py-4">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {typeof Icon === "string" ? (
          <img src={Icon} alt="icon" className="h-8 w-8" />
        ) : (
          <Icon size={28} className="text-white" />
        )}
        <p className="text-sm font-chakra text-white">{text}</p>
      </div>

      {/* CENTER */}
      {midText && (
        <p className="text-sm text-gray-400">
          {midText}
        </p>
      )}

      {/* RIGHT */}
      <p className="text-lg font-semibold text-gray-200">
        {value}
      </p>
    </div>
  )
}

export default InfoCard
