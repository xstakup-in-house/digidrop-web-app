import { UserProfile } from '@/types/response-type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  profile: UserProfile | null;
  referralLink: string;
  setProfile: (profile: UserProfile | null) => void;

}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      referralLink: '',
    
      setProfile: (profile) =>
        set((state) => {
          if (!profile) {
            return { profile: null, referralLink: '' };
          }

          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digidrops.xyz';
          const referralLink = `${baseUrl}/login?ref=${profile.referral_code}`;

          return {
            profile,
            referralLink,
          };
        }),

    
    }),
    {
      name: 'user-storage', 
      skipHydration: false,
       partialize: (s) => ({
        profile: s.profile,
        referralLink: s.referralLink }),
    }
  )
);