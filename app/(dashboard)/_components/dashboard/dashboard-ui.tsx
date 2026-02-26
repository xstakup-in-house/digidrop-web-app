"use client"

import React from "react"
import { ArrowUpIcon, User } from "lucide-react"
import { useRouter } from "next/navigation"

import PointBox from "../point-box"
import InfoCard from "../info-card"
import DailySpinCard from "../daily-spin-card"
import TaskQuest from "../quest-card"

import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/useUserProfile"
import { useProfileStats } from "@/hooks/useGetProfileStats"

const comingData = {
  icon: "/assets_icon/25.png",
  text: "Digiverse wallet",
  value: "Coming Soon",
}

const DashboardUi = () => {
  const router = useRouter()
  const profile = useUserStore((state) => state.profile)
  const { data: api_data, isLoading } = useProfileStats()
  
  console.log("profile stats:",api_data)
  console.log("profile:", profile)
  const positionData = {
    icon: ArrowUpIcon,
    text: "Position",
    value: api_data?.rank,
  }
 
  const passData = {
    icon: "/assets/iconLogo.png",
    midText: "POWER ON YOUR SB PASS",
    value: `${profile?.current_pass_power}x`,
  }

  const referralData = {
    icon: User,
    text: "Referrals",
    value: api_data?.referral_count,
  }

  return (
    <main className="min-h-screen bg-[url('/assets/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="mx-auto max-w-7xl px-4 py-10">
        

        {/* HEADER */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-chakra text-white">
            Welcome <span className="text-brandColor">{profile?.names ? profile?.names : "username" }</span>
          </h2>
          <PointBox point={api_data?.point} isLoading={isLoading} />
        </div>

        {/* INFO CARDS */}
        <section className="mx-auto mt-10 max-w-2xl space-y-4">
          <InfoCard data={positionData} isLoading={isLoading} />
          <Divider />
          <InfoCard data={passData} isLoading={isLoading} />

          <Button
            onClick={() => router.push("/mint-pass")}
            className="w-full bg-[#333333] border border-gray-200 font-chakra"
          >
            UPDATE YOUR PASS
          </Button>

          <Divider />
          <DailySpinCard targetDate="2025-06-01T12:00:00Z" />
          <InfoCard data={referralData} isLoading={isLoading} />

          <Button onClick={()=> router.push("/referrals")} className="w-full bg-[#333333] border border-gray-400">
            REFERRAL LINK
          </Button>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
            <p className="text-sm text-gray-300 max-w-md">
              Continuously engage with @DIGIDROP official tweets to earn a higher
              share of Points
            </p>
            <Button size="lg" variant="outline">
              Open X
            </Button>
          </div>
        </section>

        {/* QUESTS */}
        <section className="mt-14">
          <TaskQuest />
        </section>
      </div>
    </main>
  )
}

const Divider = () => (
  <div className="h-px w-full bg-gray-400/30" />
)

export default DashboardUi
