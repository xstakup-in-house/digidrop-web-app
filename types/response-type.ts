
export interface AvatarOption {
  id: number;
  image_url: string;
}

export interface UserProfile {
  id: number
  names: string;
  email: string;
  avatar: AvatarOption;
  current_pass_id: string;
  current_pass_power: number
  wallet_addr: string;
  referral_code: string;
  has_pass: boolean; 
}

export interface UserStat{
   point: number,
   rank: number
   highest_score: number
   total_user: number
}

export interface PassInfo {
  passId: bigint;
  pass_type: string;
  price_wei: bigint;
  points: bigint;
  exists: boolean;
}

export interface DigiPass {
  pass_id: number;
  id: string;
  name: string;
  usd_price: string;
  pass_type: string;
  point_power: number;
  card: string;
  bnb_price: number;
}

export interface TaskResponse {
  id: number
  icon: string,
  title: string, 
  points: number,
  external_link: string
  task_type?: 'on_site' | 'off_site',
  is_active: boolean
  user_status: 'pending' | 'started' | 'completed';
}