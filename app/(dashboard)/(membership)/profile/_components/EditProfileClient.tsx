"use client"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema } from '@/actions/forms/schema';
import { useCompleteTask } from '@/hooks/useCompleteQuest';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/actions/user";
import { logout } from "@/actions/auth";
import { toast } from "sonner";
import { Camera, ChevronDown, ChevronUp, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserProfile";

// Static list of locally hosted avatars — no backend call needed
const AVATAR_OPTIONS = Array.from({ length: 32 }, (_, i) => `/avatars/${i + 1}.webp`);

interface EditProfileModalProps {
  onClose?: () => void;
  onBackToDashboard?: () => void;
}

const EditProfileClient = ({ onClose, onBackToDashboard }: EditProfileModalProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
    const profile = useUserStore((state) => state.profile);
    const setProfile = useUserStore((state) => state.setProfile);
    const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string | null>(profile?.avatar_url || null);
    const taskId = searchParams.get('taskId');
    const completeTask = useCompleteTask();

    const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      names: profile?.names || "",
      email: profile?.email || ""
    },
  })

   async function onSubmit(values: z.infer<typeof profileSchema>) {
    if (!selectedAvatarUrl) {
      toast.error("Please select an avatar");
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile({ 
        names: values.names,
        email: values.email,
        avatar_url: selectedAvatarUrl,
      });

      // Update global state immediately
      setProfile({
        ...profile!,
        names: values.names,
        email: values.email,
        avatar_url: selectedAvatarUrl,
      });

      if (taskId) {
        await completeTask.mutateAsync(taskId);
      }

      router.push('/dashboard');
      toast.success('Profile updated successfully');
    } catch {
      form.setError("root", { message: "Failed to update profile. Try again." });
    } finally {
      setIsLoading(false);
    }
  
  }

  const isAvatarDirty = selectedAvatarUrl !== profile?.avatar_url;
  const canSave = form.formState.isDirty || isAvatarDirty;

  return (
    <div className="w-full max-w-md mx-auto p-4 flex items-center justify-center min-h-[50vh]">
      <div className="relative w-full bg-black/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">

        {/* Close */}
        <button
          onClick={onClose || (() => router.push('/dashboard'))}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Avatar Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-white/5 overflow-hidden shadow-2xl bg-[#1a1a1a]">
              {selectedAvatarUrl && (
                <img src={selectedAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              )}
            </div>
            <button
              onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
              className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-full shadow-lg border-2 border-[#0a0a0a] transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
            className="mt-4 text-xs font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300 flex items-center gap-1.5 focus:outline-none"
          >
            Change Avatar
            {isAvatarMenuOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className={cn(
            "w-full grid grid-cols-5 gap-3 mt-4 overflow-hidden transition-all duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] bg-white/5 rounded-xl px-2",
            isAvatarMenuOpen ? "max-h-[300px] py-4 opacity-100 border border-white/10 overflow-y-auto" : "max-h-0 py-0 opacity-0 border-none"
          )}>
            {AVATAR_OPTIONS.map((avatarUrl) => (
              <button
                key={avatarUrl}
                type="button"
                onClick={() => setSelectedAvatarUrl(avatarUrl)}
                className={cn(
                  "aspect-square rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500",
                  selectedAvatarUrl === avatarUrl
                    ? "border-purple-500 ring-2 ring-purple-500/20 scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-6 px-2">
          {/* Username */}
          <div>
            <label className="block w-full text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Username</label>
            <input
              {...form.register("names")}
              placeholder="Enter username"
              className="w-full text-left bg-transparent border-b-2 border-white text-sm font-mono text-white focus:outline-none p-1"
            />
            <p className="text-[10px] text-red-400 mt-1">{form.formState.errors.names?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block w-full text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Email</label>
            <input
              {...form.register("email")}
              placeholder="Enter email"
              className="w-full text-left bg-transparent border-b-2 border-white text-sm font-mono text-white focus:outline-none p-1"
            />
            <p className="text-[10px] text-red-400 mt-1">{form.formState.errors.email?.message}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between mt-10 pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <Button
              variant="ghost"
              disabled={isLoading}
              className="text-muted-foreground hover:text-white hover:bg-white/5"
              onClick={onBackToDashboard || (() => router.push('/dashboard'))}
            >
              Back
            </Button>

            <Button
              variant="ghost"
              disabled={isLoading}
              className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-semibold px-4 py-2 rounded-xl"
              onClick={async () => {
                setIsLoading(true);
                try {
                  await logout();
                  toast.success("Logged out successfully");
                  window.location.href = "/";
                } catch {
                  toast.error("Failed to log out");
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              Log Out
            </Button>
          </div>

          <Button
            disabled={isLoading || !canSave}
            className={cn(
              "w-full sm:w-auto min-w-[140px] shadow-lg transition-all font-semibold",
              canSave
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-900/20"
                : "bg-white/5 text-white/40 cursor-not-allowed"
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileClient