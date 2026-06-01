"use client"

import { Skeleton } from "@/components/ui/skeleton"

const PointBox = ({
  point,
  isLoading,
}: {
  point: number
  isLoading: boolean
}) => {
  if (isLoading) return <Skeleton className="h-20 w-40" />

  return (
    <div className="flex w-40 flex-col items-center rounded-md border border-purple-800 bg-[#1c1c1c] px-6 py-4 text-white shadow-md animate-pulse-glow">
      <p className="text-sm uppercase tracking-wide">Claim Point</p>
      <p className="text-2xl font-semibold">{point}</p>
    </div>
  )
}

export default PointBox
