"use client"

import { Button } from '@/components/ui/button'
import { TaskResponse } from '@/types/response-type'
import { FaUser } from 'react-icons/fa';
import { IoCaretDown } from "react-icons/io5";
import { FaXTwitter, FaInstagram, FaDiscord, FaLinkedin } from "react-icons/fa6";
import React, { useEffect, useState, useCallback } from 'react'
import { useStartTask } from '@/hooks/useStartQuest';
import { useCompleteTask } from '@/hooks/useCompleteQuest';
import { useRouter } from 'next/navigation';

const VERIFY_DURATION_MS = 2 * 60 * 1000; // 2 minutes

const IconMap = {
  'twitter': FaXTwitter,
  'instagram': FaInstagram,
  'discord': FaDiscord,
  'linkedIn': FaLinkedin,
  'user': FaUser,
  'general': IoCaretDown
}

type ButtonState = 'pending' | 'verifying' | 'claimable' | 'completed' | 'on_site_continue'

function getStorageKey(taskId: number) {
  return `quest_timer_${taskId}`;
}

function getStoredStartTime(taskId: number): number | null {
  try {
    const raw = localStorage.getItem(getStorageKey(taskId));
    if (!raw) return null;
    const parsed = Number(raw);
    return isNaN(parsed) ? null : parsed;
  } catch {
    return null;
  }
}

function storeStartTime(taskId: number, time?: number) {
  try {
    const val = time !== undefined ? time : Date.now();
    localStorage.setItem(getStorageKey(taskId), String(val));
  } catch { /* storage blocked */ }
}

function clearStartTime(taskId: number) {
  try {
    localStorage.removeItem(getStorageKey(taskId));
  } catch { /* storage blocked */ }
}

const Task = ({ data }: { data: TaskResponse }) => {
  const router = useRouter();
  const startTask = useStartTask();
  const completeTask = useCompleteTask();

  const [buttonState, setButtonState] = useState<ButtonState>('pending');
  const [secondsLeft, setSecondsLeft] = useState<number>(VERIFY_DURATION_MS / 1000);

  /**
   * Derive button state from server status + localStorage timer.
   * Called on mount and whenever data changes (e.g. after query invalidation).
   */
  const syncButtonState = useCallback(() => {
    if (data.user_status === 'completed') {
      setButtonState('completed');
      return;
    }

    if (data.user_status === 'started') {
      if (data.task_type === 'on_site') {
        setButtonState('on_site_continue');
        return;
      }

      // off_site — determine the authoritative start time.
      // Prefer server-provided started_at (strongest anti-cheat);
      // fall back to localStorage if the server doesn't return it.
      let startedAtMs: number | null = null;

      if (data.started_at) {
        const serverTs = new Date(data.started_at).getTime();
        if (!isNaN(serverTs)) {
          startedAtMs = serverTs;
          // Keep localStorage in sync with server timestamp
          storeStartTime(data.id, serverTs);
        }
      }

      if (startedAtMs === null) {
        startedAtMs = getStoredStartTime(data.id);
      }

      if (startedAtMs === null) {
        // No record at all — show verifying without countdown
        setButtonState('verifying');
        setSecondsLeft(0);
        return;
      }

      const elapsed = Date.now() - startedAtMs;
      const remaining = VERIFY_DURATION_MS - elapsed;

      if (remaining <= 0) {
        setButtonState('claimable');
        setSecondsLeft(0);
      } else {
        setButtonState('verifying');
        setSecondsLeft(Math.ceil(remaining / 1000));
      }
      return;
    }

    // pending
    setButtonState('pending');
  }, [data.user_status, data.task_type, data.id, data.started_at]);

  // Sync on mount and whenever the task data updates
  useEffect(() => {
    syncButtonState();
  }, [syncButtonState]);

  // Countdown ticker — runs only while verifying with a known timer
  useEffect(() => {
    if (buttonState !== 'verifying') return;

    const storedAt = getStoredStartTime(data.id);
    // If there's no stored time we can't tick down meaningfully
    if (storedAt === null) return;

    const tick = () => {
      const elapsed = Date.now() - storedAt;
      const remaining = VERIFY_DURATION_MS - elapsed;
      if (remaining <= 0) {
        setButtonState('claimable');
        setSecondsLeft(0);
        clearInterval(interval);
      } else {
        setSecondsLeft(Math.ceil(remaining / 1000));
      }
    };

    const interval = setInterval(tick, 1000);
    tick(); // immediate first tick
    return () => clearInterval(interval);
  }, [buttonState, data.id]);

  const handleStart = async () => {
    let newWindow: Window | null = null;
    if (data.task_type === 'off_site') {
      newWindow = window.open('about:blank', '_blank', 'noopener,noreferrer');
    }

    try {
      const res = await startTask.mutateAsync(`${data.id}`);

      if (res.redirect_url) {
        if (data.task_type === 'off_site') {
          if (newWindow) {
            newWindow.location.href = res.redirect_url;
          }
          // Record start time in localStorage (anti-cheat: persists across refresh)
          storeStartTime(data.id);
          setButtonState('verifying');
          setSecondsLeft(VERIFY_DURATION_MS / 1000);
        } else {
          if (newWindow) newWindow.close();
          // on_site task — navigate within the app
          router.push(`${res.redirect_url}?taskId=${data.id}`);
        }
      } else {
        if (newWindow) newWindow.close();
      }
    } catch {
      if (newWindow) newWindow.close();
      // Error handled by mutation; button stays in pending state
    }
  };

  const handleClaim = async () => {
    try {
      await completeTask.mutateAsync(`${data.id}`);
      clearStartTime(data.id);
      setButtonState('completed');
    } catch {
      // Error handled by mutation
    }
  };

  const Icon = IconMap[data.icon as keyof typeof IconMap] || IconMap['general'];

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group grid grid-cols-12 gap-2 sm:gap-3 items-center px-3 sm:px-4 py-3.5 hover:bg-white/[0.02] border-b border-white/5 transition-all font-chakra">
      {/* ID & Icon */}
      <div className="col-span-2 sm:col-span-1 flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
        <span>#{data.id}</span>
        <Icon size={14} className="text-gray-300 group-hover:text-[#CB6CE6] transition-colors shrink-0" />
      </div>

      {/* Title */}
      <div className="col-span-7 sm:col-span-6 md:col-span-7 pr-1">
        <p className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-tight">
          {data.title}
        </p>
      </div>

      {/* Points */}
      <div className="col-span-3 sm:col-span-2 flex justify-center">
        <span className="px-2 py-0.5 rounded bg-white text-black font-extrabold text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap shadow-sm group-hover:scale-105 transition-transform">
          +{data.points} pts
        </span>
      </div>

      {/* Action Button */}
      <div className="col-span-12 sm:col-span-3 md:col-span-2 flex justify-end mt-2 sm:mt-0 overflow-hidden">

        {/* PENDING → Start */}
        {buttonState === 'pending' && (
          <Button
            onClick={handleStart}
            disabled={startTask.isPending}
            className="w-full sm:w-full max-w-[128px] h-7 sm:h-8 px-2 text-[10px] sm:text-xs uppercase bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-transform active:scale-95 disabled:opacity-60 flex items-center justify-center overflow-hidden"
          >
            <span className="truncate">{startTask.isPending ? '...' : 'Start'}</span>
          </Button>
        )}

        {/* VERIFYING → grey, disabled */}
        {buttonState === 'verifying' && (
          <Button
            disabled
            className="w-full sm:w-full max-w-[128px] h-7 sm:h-8 px-2 text-[10px] sm:text-xs uppercase bg-neutral-800 text-neutral-400 font-bold rounded-lg cursor-not-allowed border border-neutral-700/50 flex items-center justify-center gap-1.5 overflow-hidden"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 animate-pulse shrink-0" />
            <span className="truncate">Verifying</span>
          </Button>
        )}

        {/* CLAIMABLE → green Claim Stardust */}
        {buttonState === 'claimable' && (
          <Button
            onClick={handleClaim}
            disabled={completeTask.isPending}
            className="w-full sm:w-full max-w-[128px] h-7 sm:h-8 px-2 text-[10px] sm:text-xs uppercase bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all active:scale-95 shadow-[0_0_10px_rgba(52,211,153,0.4)] hover:shadow-[0_0_16px_rgba(52,211,153,0.6)] disabled:opacity-60 flex items-center justify-center overflow-hidden"
          >
            <span className="truncate">{completeTask.isPending ? '…' : 'Claim Stardust'}</span>
          </Button>
        )}

        {/* ON-SITE CONTINUE */}
        {buttonState === 'on_site_continue' && (
          <Button
            onClick={() => router.push(`${data.external_link}?taskId=${data.id}`)}
            className="w-full sm:w-full max-w-[128px] h-7 sm:h-8 px-2 text-[10px] sm:text-xs uppercase bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-transform active:scale-95 flex items-center justify-center overflow-hidden"
          >
            <span className="truncate">Continue</span>
          </Button>
        )}

        {/* COMPLETED */}
        {buttonState === 'completed' && (
          <div className="w-full sm:w-full max-w-[128px] flex justify-center sm:justify-end items-center">
            <span className="text-[10px] sm:text-xs text-emerald-400 font-bold uppercase tracking-wide px-2 truncate">
              ✓ Done
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Task