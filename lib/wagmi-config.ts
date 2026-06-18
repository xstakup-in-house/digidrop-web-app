import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bscTestnet } from './chain';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
if (!projectId && typeof window !== 'undefined') {
  console.warn("WARNING: NEXT_PUBLIC_WC_PROJECT_ID is not configured in environment variables.");
}

export const wagmiConfig = getDefaultConfig({
  appName: 'Digidrops',
  projectId,
  chains:  [bscTestnet],
  ssr: false,
});
