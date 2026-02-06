"use client"
import { useProfileStats            } from '@/hooks/useGetProfileStats';
import React from 'react'



const Position = () => {
    const { data, isLoading } = useProfileStats();
    if(isLoading){
       return  <p>Loading stats ...</p>
    }
  return (
    <div className="flex items-center py-4 mt-10 text-white justify-between">
        <h2 className='text-4xl font-bold font-chakra'>LEADERBOARD</h2>
        <span className='text-3xl font-s  emibold font-chakra'>YOUR POSITION : {data.point}/{data.highest_point}</span>
    </div>
  )
}

export default Position 
