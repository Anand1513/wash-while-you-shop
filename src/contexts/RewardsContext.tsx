
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'wash' | 'product' | 'service' | 'discount';
  image: string;
  available: boolean;
  stock?: number;
}

interface UserReward {
  id: string;
  rewardId: string;
  redeemedAt: string;
  used: boolean;
  expiresAt: string;
  code: string;
}

interface RewardsContextType {
  rewards: Reward[];
  userRewards: UserReward[];
  redeemReward: (rewardId: string) => Promise<boolean>;
  addPoints: (points: number, reason: string) => void;
  getPointsHistory: () => PointsTransaction[];
}

interface PointsTransaction {
  id: string;
  points: number;
  type: 'earned' | 'spent';
  reason: string;
  date: string;
}

const RewardsContext = createContext<RewardsContextType | null>(null);

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>([]);

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Free Basic Wash',
      description: 'Redeem for a complimentary basic car wash',
      points: 500,
      category: 'wash',
      image: '🚗',
      available: true
    },
    {
      id: '2',
      title: 'Premium Car Fragrance',
      description: 'High-quality air freshener for your car',
      points: 200,
      category: 'product',
      image: '🌸',
      available: true,
      stock: 15
    },
    {
      id: '3',
      title: 'Tyre Polish Kit',
      description: 'Professional grade tyre shine and protection',
      points: 300,
      category: 'product',
      image: '✨',
      available: true,
      stock: 8
    },
    {
      id: '4',
      title: '20% Off Next Wash',
      description: 'Get 20% discount on your next premium wash',
      points: 150,
      category: 'discount',
      image: '🎫',
      available: true
    },
    {
      id: '5',
      title: 'Interior Deep Clean',
      description: 'Professional interior cleaning service',
      points: 800,
      category: 'service',
      image: '🧽',
      available: true
    },
    {
      id: '6',
      title: 'Wax Protection Treatment',
      description: 'Premium car wax for long-lasting protection',
      points: 600,
      category: 'service',
      image: '🛡️',
      available: true
    }
  ];

  useEffect(() => {
    // Load user rewards and points history from localStorage
    const savedRewards = localStorage.getItem(`userRewards_${user?.id}`);
    const savedHistory = localStorage.getItem(`pointsHistory_${user?.id}`);
    
    if (savedRewards) {
      setUserRewards(JSON.parse(savedRewards));
    }
    
    if (savedHistory) {
      setPointsHistory(JSON.parse(savedHistory));
    }
  }, [user?.id]);

  const addPoints = (points: number, reason: string) => {
    if (!user) return;

    const transaction: PointsTransaction = {
      id: Date.now().toString(),
      points,
      type: 'earned',
      reason,
      date: new Date().toISOString()
    };

    const newHistory = [transaction, ...pointsHistory];
    setPointsHistory(newHistory);
    localStorage.setItem(`pointsHistory_${user.id}`, JSON.stringify(newHistory));

    updateUser({ loyaltyPoints: user.loyaltyPoints + points });
    
    toast({
      title: `+${points} Points Earned! 🎉`,
      description: reason
    });
  };

  const redeemReward = async (rewardId: string): Promise<boolean> => {
    if (!user) return false;

    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || !reward.available) {
      toast({
        title: "Reward Unavailable",
        description: "This reward is currently not available",
        variant: "destructive"
      });
      return false;
    }

    if (user.loyaltyPoints < reward.points) {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - user.loyaltyPoints} more points to redeem this reward`,
        variant: "destructive"
      });
      return false;
    }

    // Create user reward
    const userReward: UserReward = {
      id: Date.now().toString(),
      rewardId: reward.id,
      redeemedAt: new Date().toISOString(),
      used: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      code: `RW${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    const newUserRewards = [userReward, ...userRewards];
    setUserRewards(newUserRewards);
    localStorage.setItem(`userRewards_${user.id}`, JSON.stringify(newUserRewards));

    // Deduct points
    const transaction: PointsTransaction = {
      id: Date.now().toString(),
      points: reward.points,
      type: 'spent',
      reason: `Redeemed: ${reward.title}`,
      date: new Date().toISOString()
    };

    const newHistory = [transaction, ...pointsHistory];
    setPointsHistory(newHistory);
    localStorage.setItem(`pointsHistory_${user.id}`, JSON.stringify(newHistory));

    updateUser({ loyaltyPoints: user.loyaltyPoints - reward.points });

    toast({
      title: "Reward Redeemed! 🎁",
      description: `${reward.title} has been added to your rewards. Code: ${userReward.code}`
    });

    return true;
  };

  const getPointsHistory = () => pointsHistory;

  return (
    <RewardsContext.Provider value={{
      rewards,
      userRewards,
      redeemReward,
      addPoints,
      getPointsHistory
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
