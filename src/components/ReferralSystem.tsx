
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useRewards } from "@/contexts/RewardsContext";
import { Share2, Copy, Users, Trophy, Crown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReferralData {
  code: string;
  totalReferrals: number;
  monthlyReferrals: number;
  totalEarned: number;
  recentReferrals: Array<{
    name: string;
    date: string;
    points: number;
  }>;
}

const ReferralSystem = () => {
  const { user } = useAuth();
  const { addPoints } = useRewards();
  const [referralData] = useState<ReferralData>({
    code: `${user?.name?.replace(/\s+/g, '').toUpperCase() || 'USER'}${user?.id?.slice(-3) || '123'}`,
    totalReferrals: 12,
    monthlyReferrals: 3,
    totalEarned: 3600,
    recentReferrals: [
      { name: "Rahul S.", date: "2 days ago", points: 300 },
      { name: "Priya M.", date: "1 week ago", points: 300 },
      { name: "Amit K.", date: "2 weeks ago", points: 300 }
    ]
  });

  const leaderboard = [
    { rank: 1, name: "Ankit P.", referrals: 45, points: 13500 },
    { rank: 2, name: "Sneha R.", referrals: 38, points: 11400 },
    { rank: 3, name: "Vikram S.", referrals: 32, points: 9600 },
    { rank: 4, name: user?.name || "You", referrals: referralData.totalReferrals, points: referralData.totalEarned },
    { rank: 5, name: "Pooja T.", referrals: 8, points: 2400 }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.code);
    toast({
      title: "Referral Code Copied! 📋",
      description: "Share this code with your friends"
    });
  };

  const shareReferral = () => {
    const shareText = `Join AutoWash with my referral code ${referralData.code} and get bonus points! 🚗✨`;
    if (navigator.share) {
      navigator.share({
        title: "Join AutoWash",
        text: shareText,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Share Text Copied!",
        description: "Paste this in your social media or messaging apps"
      });
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-lg font-bold">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralData.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">+{referralData.monthlyReferrals} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralData.totalEarned}</div>
            <p className="text-xs text-muted-foreground">300 pts per referral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Crown className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#4</div>
            <p className="text-xs text-muted-foreground">Top 10% referrers</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>
            Share this code with friends and earn 300 points for each successful referral!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="referral-code">Referral Code</Label>
              <Input
                id="referral-code"
                value={referralData.code}
                readOnly
                className="font-mono text-lg font-bold text-center bg-gray-50"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={copyReferralCode} variant="outline" className="flex-1">
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
            <Button onClick={shareReferral} className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Share your code with friends</li>
              <li>• They sign up and complete their first wash</li>
              <li>• You both get 300 loyalty points!</li>
              <li>• No limit on referrals - keep earning!</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Leaderboard 🏆</CardTitle>
          <CardDescription>Top referrers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === (user?.name || "You") ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.name === (user?.name || "You") && (
                        <Badge variant="secondary">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.referrals} referrals • {user.points} points
                    </div>
                  </div>
                </div>
                {user.rank <= 3 && (
                  <Badge variant="outline" className="border-yellow-200 text-yellow-700">
                    Top {user.rank}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
          <CardDescription>Your latest successful referrals</CardDescription>
        </CardHeader>
        <CardContent>
          {referralData.recentReferrals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No referrals yet. Start sharing your code!
            </div>
          ) : (
            <div className="space-y-3">
              {referralData.recentReferrals.map((referral, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{referral.name}</div>
                    <div className="text-sm text-gray-600">{referral.date}</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    +{referral.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSystem;
