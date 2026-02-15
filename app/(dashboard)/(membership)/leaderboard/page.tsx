'use client'

import React from 'react'
import BoardTable from '../../_components/leaderboard/board-table'
import Position from '../../_components/leaderboard/position'
import {motion} from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}


const LeaderBoard = () => {
  return (
    <div className="w-full min-h-screen py-8  bg-[url('/assets/leaderborad.jpg')] bg-cover bg-center bg-no-repeat bg-black/20">
        <div className='container max-w-5xl mx-auto pt-10'>
        <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex w-fit mb-4 mx-auto rounded-full bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm justify-center items-center"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-blue-400 sm:text-base">
                      Season 1
                    </span>
                  </motion.div>
           <Position/>
          <div className='w-full mt-8'>
              <BoardTable />
          </div>
        </div>
    </div>
  )
}

export default LeaderBoard