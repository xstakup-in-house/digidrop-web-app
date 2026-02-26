// app/post-login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/app/data/profile/profile';
import { useUserStore } from '@/store/useUserProfile';
import Loading from '@/components/common/LoadingContent';

export default function PostLogin() {
  const router = useRouter();
  const { setProfile } = useUserStore();

  useEffect(() => {
    getProfile()
      .then(profile => {
        setProfile(profile);
        router.replace(profile.has_pass ? '/dashboard' : '/mint-pass');
      })
      .catch(() => {
        router.replace('/login');
      });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
        <Loading />
        <p className="text-center text-lg font-bold text-white mt-10">Preparing your account...</p>
    </div>
  );
}
