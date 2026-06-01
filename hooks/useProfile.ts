import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserProfile';
import { useEffect } from 'react';

async function fetchProfile() {
  const res = await fetch('/api/profile', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
}

export function useProfile() {
  const setProfile = useUserStore((state) => state.setProfile);
  
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    refetchInterval: 60_000, // Background sync every 60s
  });

  useEffect(() => {
    if (query.data) {
      setProfile(query.data);
    }
  }, [query.data, setProfile]);

  return query;
}
