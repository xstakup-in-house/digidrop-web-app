'use client';

import { Button } from '@/components/ui/button';
import { DigiPass } from '@/types/response-type';
import { useUserStore } from '@/store/useUserProfile';
import MintButton from './mintButton';
import UpgradeButton from './upgradeButton';

type Props = {
  pass: DigiPass;
};

export default function PassActionButton({ pass }: Props) {
  const { profile } = useUserStore();

  // User has no pass → Mint
  if (!profile?.has_pass) {
    return <MintButton pass={pass} />;
  }

  const currentPower = profile?.current_pass_power;
  const isCurrent = profile?.current_pass_id === pass.id;
  const isUpgrade = pass.point_power > currentPower;
  console.log("isUpgrade:", isUpgrade)
  // Current pass
  if (isCurrent) {
    return (
      <Button disabled size="lg" className="px-20">
        Current Pass
      </Button>
    );
  }

  // Upgrade
  if (isUpgrade) {
    return (
      <UpgradeButton pass={pass}  />
    );
  }

  // Lower pass → disabled
  
  return (
    <Button disabled size="lg" className="px-20 opacity-50">
      Lower Tier Pass
    </Button>
  );
}
