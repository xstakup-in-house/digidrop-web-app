import { useQuery } from '@tanstack/react-query';

async function fetchTasks() {
  const res = await fetch('/api/tasks', {
    cache: 'no-store',
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });
}