// components/UpgradeButton.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import PassNFT_ABI from '@/contract/abi.json';
import { PassInfo } from '@/types/response-type';
import { useRouter } from 'next/navigation';
import { ConnectWalletButton } from '@/components/common/WalletConnectButton';

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
  const { data: balance } = useBalance({
    address,
    chainId: 97,
    query: {
      enabled: Boolean(address),
    },
  });
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
  const { data: newPass } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: PassNFT_ABI,
        functionName: 'getPass',
        args: [BigInt(pass.pass_id)],
        query: {
              enabled: mounted && isConnected,
          },
        });
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
      toast.success('Pass upgraded successfully 🎉');

      sessionStorage.setItem('pendingTxHash', hash);
      sessionStorage.setItem('pendingPassId', String(pass.pass_id));
      sessionStorage.setItem('pendingIsUpgrade', 'true');

      // Fire-and-forget backend sync
      fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          txHash: hash,
          newPassId: pass.pass_id,
          isUpgrade: true,
        }),
      }).catch((err) =>
        console.warn('[Upgrade] verifyPayment failed, confirm page will retry:', err)
      );

      router.replace('/mint/confirm');
    }
  }, [isConfirmed, hash, router, pass.pass_id]);



  if (!isConnected) return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
      <p className="text-sm text-gray-400 text-center font-chakra">
        Connect your wallet to upgrade your pass
      </p>
      <ConnectWalletButton />
    </div>
  );
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
          className="w-auto mx-auto block max-w-max px-8 py-2.5 text-sm font-semibold rounded-xl btn-landing-gradient active:scale-95 transition-all"
        >
          {isWriting ? 'Approve upgrade...' : isConfirming ? 'Upgrading...' : 'Upgrade Now'}
        </button>
      )}
    </div>
  );
}