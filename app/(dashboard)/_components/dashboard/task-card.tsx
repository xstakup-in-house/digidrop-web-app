"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TaskResponse } from '@/types/response-type'
import { FaUser } from 'react-icons/fa';
import { IoCaretDown } from "react-icons/io5";
import { FaXTwitter,  FaInstagram, FaDiscord, FaLinkedin } from "react-icons/fa6";
import React from 'react'
import { useStartTask } from '@/hooks/useStartQuest';
import { useCompleteTask } from '@/hooks/useCompleteQuest';
import { useRouter } from 'next/navigation';

const IconMap={
    'twitter': FaXTwitter,
    'instagram': FaInstagram,
    'discord': FaDiscord,
    'linkedIn': FaLinkedin,
    'user': FaUser,
    'general': IoCaretDown
}
const Task = ({data}:{data:TaskResponse}) => {
    const router = useRouter();
    const startTask = useStartTask();
    const completeTask = useCompleteTask();


    const handleStart = async () => {
    const res = await startTask.mutateAsync(`${data.id}`);

    if (res.redirect_url) {
      if (data.task_type === 'off_site') {
        window.open(res.redirect_url, '_blank');
      } else {
        router.push(`${res.redirect_url}?taskId=${data.id}`);
      }
    }
  };
    const Icon = IconMap[data.icon as keyof typeof IconMap] || IconMap['general'];
  return (
    <tr className="group border-b border-dotted border-gray-200/20 hover:cursor-pointer last:border-none transition-all duration-300 hover:bg-white/[0.03] hover:border-purple-500/40">
        <td className={cn("px-4 py-3 flex items-center gap-2 text-gray-200 transition-colors duration-300 group-hover:text-purple-300")}>
            <p className="">{data.id}</p>
        <Icon size={40} className={cn("w-5 h-5 text-gray-200 transition-colors duration-300 group-hover:text-purple-300")} />
        </td>
        <td className={cn("px-4 py-3 text-lg text-gray-200 hover:text-brandColor transition-colors duration-300 group-hover:text-white")}>{data.title}</td>
        <td className="p-4 text-gray-800">
            <div className={cn('w-10 h-6 py-1 text-center text-md shadow-sm rounded-sm font-medium box-border bg-white transition-transform duration-300 group-hover:scale-110')}>{data.points}</div> 
        </td>
        <td>
            {data.user_status === 'pending' && (
              <Button onClick={handleStart} className="transition-transform duration-300 group-hover:scale-105 active:scale-95 bg-purple-600 hover:bg-purple-700 text-white font-chakra font-bold">Start</Button>
            )}
             {data.user_status === 'started' && data.task_type == 'on_site' && (
              <Button onClick={()=> router.push(`${data.external_link}?taskId=${data.id}`)} className="transition-transform duration-300 group-hover:scale-105 active:scale-95 bg-cyan-600 hover:bg-cyan-700 text-white font-chakra font-bold">Continue</Button>
            )}

            {data.user_status === 'started' && data.task_type == 'off_site' && (
                <Button
                    variant="secondary"
                    onClick={() => completeTask.mutate(`${data.id}`)}
                    className="transition-transform duration-300 group-hover:scale-105 active:scale-95 bg-yellow-600 hover:bg-yellow-700 text-white font-chakra font-bold"
                >
                    Confirm
                </Button>
                )}
        </td>
    </tr> 
  )
}

export default Task