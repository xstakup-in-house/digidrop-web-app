"use client"

import React, { useEffect, useState } from "react"
import TimeBox from "./time-box-card"

type Prop = {
  targetDate: string | Date
}

const DailySpinCard = ({ targetDate }: Prop) => {
  const calculateTimeLeft = () => {
    const diff = +new Date(targetDate) - +new Date()
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft()),
      1000
    )
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex w-full flex-col sm:flex-row items-center sm:items-center justify-between gap-4 rounded-md bg-[#333333] px-5 py-4">
      <div className="w-full flex items-center gap-3">
        <img src="/assets/star.png" alt="" className="h-8 w-8" />
        <div className="w-full text-center sm:text-left">
          <p className="font-chakra text-gray-300">
            DAILY SPIN <span className="ml-2 text-xs">(Coming Soon)</span>
          </p>
          <p className="text-sm text-brandColor">
            Spin daily and earn more points
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <TimeBox label="D" value={timeLeft.days} />
        <TimeBox label="H" value={timeLeft.hours} />
        <TimeBox label="M" value={timeLeft.minutes} />
        <TimeBox label="S" value={timeLeft.seconds} />
      </div>
    </div>
  )
}

export default DailySpinCard
