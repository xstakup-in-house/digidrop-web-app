import { CircleAlert } from 'lucide-react'
import React from 'react'

const NoteCard = () => {
  return (
    <div className='w-full h-auto flex items-center gap-6 border border-gray-400 p-4'>
        <CircleAlert size={50} color='#000000'/>
        <p className="text-gray-400 text-center max-w-lg px-6 py-2 text-sm font-thin font-chakra">
            NOTE: IT TAKES 1 HOURS DURING PEAK DEMAND TIME FOR THE
            POINTS TO BE MADE AVAILABLE FOR CLAIMING ON CERTAIN
            QUESTS.
        </p>
    </div>
  )
}

export default NoteCard