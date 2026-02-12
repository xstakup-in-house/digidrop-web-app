// components/MintButton.tsx
'use client';

import { useEffect, useState } from 'react';
import PassNFT_ABI from '@/contract/abi.json';
import { toast } from 'sonner';
import { useAccount, useBalance, useWriteContract, usePublicClient, useDisconnect, useSwitchChain, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useRouter } from 'next/navigation';
import { PassInfo } from '@/types/response-type';
import { Button } from '@/components/ui/button';



interface Pass {
  pass_id: number;
  name: string;
  bnb_price: number; // e.g., 0.00880098
  usd_price: string;
  point_power: number;
  card: string;
}



const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const TARGET_CHAIN_ID = 97; // BSC Testnet
const GAS_BUFFER = parseEther('0.002');

export default function MintButton({ pass }: { pass: Pass }) {
  const router =useRouter()
  const [localMinting, setLocalMinting] = useState(false);
  const { address, chain, isConnected, isConnecting } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { data: balance, isLoading: balanceLoading } = useBalance({
  address,
  chainId: TARGET_CHAIN_ID, 
  query: {
    enabled: Boolean(address),
  },
});

  
 
  const formattedBalance =balance && !balanceLoading ? Number(formatEther(balance.value)).toFixed(6) : '...';
  const {
    writeContractAsync,
    data: hash,
    isPending: isWriting,
    error: writeError,
  } = useWriteContract();

    const {
    data: txReceipt,
    isLoading: isConfirming,
    isError: isReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

    const { data: onChainPassRaw } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: PassNFT_ABI,
        functionName: 'getPass',
        args: [BigInt(pass.pass_id)],
        query: {
            enabled: isConnected,
        },
        });
      
  const onChainPass = onChainPassRaw as PassInfo | undefined;
  const requiredBNB = onChainPass ? onChainPass.price_wei : parseEther(pass.bnb_price.toFixed(18));

  const hasEnough =
    balance?.value !== undefined &&
    balance.value >= requiredBNB + GAS_BUFFER;

  const { disconnect } = useDisconnect();
  
  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
    router.push("/login")
  };

  const handleMint = async () => {
  if (!address || !hasEnough) return;

  if (chain?.id !== TARGET_CHAIN_ID) {
    await switchChainAsync({ chainId: TARGET_CHAIN_ID });
  }


  try {
    setLocalMinting(true);
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: PassNFT_ABI,
      functionName: 'mint',
      args: [BigInt(pass.pass_id)],
      value: requiredBNB,
    });

    toast.success("Confirm transaction in your wallet");
  } catch {
    setLocalMinting(false);
    toast.error('Transaction cancelled');
  }
};

const resetMintState = () => {
  // This forces UI to unlock
  setLocalMinting(false);
};

useEffect(() => {
  if (!txReceipt) return;

  if (txReceipt.status === 'success') {
    toast.success('Mint successful 🎉');
    router.replace('/mint/confirm');
  }

  if (txReceipt.status === 'reverted') {
    toast.error('You already have a pass');
    resetMintState();
  }
}, [txReceipt, router]);
   

  if (isConnecting && balanceLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg animate-pulse">Loading wallet data...</p>
        </div>
        <button disabled className="w-full py-6 rounded-2xl bg-gray-300 text-gray-500 cursor-not-allowed">
          Loading...
        </button>
      </div>
    );
  }



  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg">Price: <strong>{onChainPass ? formatEther(onChainPass.price_wei)  : pass.bnb_price.toFixed(6)} BNB</strong></p>
        <p className="text-sm text-gray-600">≈ ${pass.usd_price}</p>
        <p className="text-sm mt-2">
            Balance: {formattedBalance} BNB
        </p>
      </div>

      {!address ? (
        <p className="text-red-500 text-center">
          Connect wallet to mint
        </p>) : !hasEnough ? (
        <div className="border border-red-300 rounded-lg p-6 text-center">
          <p className="text-red-700 font-bold text-xl">Insufficient BNB Balance</p>
          <p className="text-sm mt-2">
            Required: {onChainPass ? formatEther(onChainPass.price_wei) : pass.bnb_price.toFixed(6)} BNB
            Balance: {formattedBalance} BNB
          </p>
           <Button
              onClick={handleDisconnect}
              disabled={isConnecting}
              className="px-6 py-3"
            >
              Disconnect Wallet
            </Button>
        </div>
      ) : (
        <button
          onClick={handleMint}
          disabled={localMinting || isWriting || isConfirming}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50"
        >
           {isWriting
              ? 'Waiting for wallet…'
              : isConfirming
              ? 'Minting on-chain…'
              : 'Mint Pass Now'}
        </button>
      )}

    </div>
  );
}