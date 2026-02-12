// components/UpgradeButton.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import PassNFT_ABI from '@/contract/abi.json';
import { PassInfo } from '@/types/response-type';
import { useRouter } from 'next/navigation';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

interface Pass {
  pass_id: number;
  name: string;
  bnb_price: number; // e.g., 0.00880098
  usd_price: string;
  point_power: number;
  card: string;
}

export default function UpgradeButton({ pass }: { pass: Pass }) {
  const router =useRouter()
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [mounted, setMounted] = useState(false);
  const formattedBalance = useMemo(() => {
    if (!balance) return '0';
    return Number(formatEther(balance.value)).toFixed(6);
  }, [balance]);
  const { writeContract, data: hash, isPending: isWriting } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  useEffect(() => {
      setMounted(true);
    }, []);

  const [deltaWei, setDeltaWei] = useState<bigint | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  
  const { data: userPass } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PassNFT_ABI,
    functionName: 'getUserPass',
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

const userPassTuple = userPass as [bigint, bigint] | undefined;
console.log("user address:", address)
console.log("user current pass from contract in tuple:", userPassTuple)
  // userPassData is [bigint, bigint] or undefined
const currentPassId = userPassTuple ? Number(userPassTuple[0]) : 0;


  // Current pass price
  const { data: currentPassRaw } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PassNFT_ABI,
    functionName: 'getPass',
    args: currentPassId > 0 ? [BigInt(currentPassId)] : undefined,
    query: { enabled: currentPassId > 0 },
  });
  console.log("user current pass:",currentPassRaw)
  const { data: newPass } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: PassNFT_ABI,
        functionName: 'getPass',
        args: [BigInt(pass.pass_id)],
        query: {
              enabled: mounted && isConnected,
          },
        });
console.log("selected pass:", newPass)
 const currentPass = currentPassRaw as PassInfo | undefined;
 const upgradePass = newPass as PassInfo | undefined;
  useEffect(() => {
    if (currentPass && upgradePass &&  upgradePass.price_wei > currentPass.price_wei ) {
      const delta = upgradePass.price_wei - currentPass.price_wei;
      setDeltaWei(delta + parseEther('0.0001')); // + small buffer
      setLoadingPrice(false);
    } else if (currentPass && upgradePass) {
      setDeltaWei(parseEther('0')); // Should not happen (higher tier check in UI)
      setLoadingPrice(false);
    }
  }, [currentPass, upgradePass]);

  
  const hasEnough = balance && deltaWei && balance.value >= deltaWei;

  const handleUpgrade = () => {
    if (!address || !deltaWei || !hasEnough) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PassNFT_ABI,
      functionName: 'upgrade',
      args: [BigInt(pass.pass_id)],
      value: deltaWei,
    });
  };

  // Verification after success
  useEffect(() => {
    if (isConfirmed && hash) {
      toast.success('Pass upgraded successful 🎉');
      router.replace('/dashboard');
    }
  }, [isConfirmed, hash]);



  if (!isConnected) return <p>Connect wallet</p>;
  if (loadingPrice) return <p>Loading upgrade price...</p>;

  if (deltaWei === null || deltaWei <= 0) {
    return <p className="text-red-500">Invalid upgrade path</p>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center rounded-xl p-6">
        <p className="text-lg">Upgrade Cost (Delta)</p>
        <p className="text-3xl font-bold">
          {parseFloat(formatEther(deltaWei)).toFixed(6)} BNB
        </p>
        <p className="text-xl text-gray-600 mt-2">
          From your current pass to {pass.name}
        </p>
      </div>

      {!hasEnough ? (
        <div className="bg-red-50 border border-red-300 rounded-lg p-6 text-center">
          <p className="text-red-700 font-bold text-xl">Insufficient BNB</p>
          <p className="text-sm mt-2">
            Required: {parseFloat(formatEther(deltaWei)).toFixed(6)} BNB<br />
            Balance: {formattedBalance} BNB
          </p>
        </div>
      ) : (
        <button
          onClick={handleUpgrade}
          disabled={isWriting || isConfirming}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 rounded-2xl text-2xl"
        >
          {isWriting ? 'Approve upgrade...' : isConfirming ? 'Upgrading...' : 'Upgrade Now'}
        </button>
      )}
    </div>
  );
}