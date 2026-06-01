import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'viem/chains';
import { bscTestnet } from './chain';


export const wagmiConfig = getDefaultConfig({
  appName: 'Digidrops',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  chains:  [bscTestnet],
  ssr: false,
});
