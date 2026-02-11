import React from 'react'
import BoardTable from '../../_components/leaderboard/board-table'
import Position from '../../_components/leaderboard/position'

const LeaderBoard = () => {
  return (
    <div className='w-full min-h-screen py-8 bg-[#1F406B]/40'>
        <div className='container max-w-5xl mx-auto pt-10'>
          <span className='text-white box-border border border-white bg-[#1A1D1C] px-8 py-2'>Season 1</span>
           <Position/>
          <div className='w-full mt-8'>
              <BoardTable />
          </div>
        </div>
    </div>
  )
}

export default LeaderBoard