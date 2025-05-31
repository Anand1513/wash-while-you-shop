
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useRewards } from "@/contexts/RewardsContext";
import { Star, Gift, Clock, CheckCircle, Award, Trophy, Zap } from "lucide-react";

const Rewards = () => {
  const { user } = useAuth();
  const { rewards, userRewards, redeemReward, getPointsHistory } = useRewards();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReward, setSelectedReward] = useState<string>('');

  if (!user) {
    return <div>Please log in to access rewards.</div>;
  }

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const pointsHistory = getPointsHistory();

  const categories = [
    { id: 'all', label: 'All Rewards', icon: Gift },
    { id: 'wash', label: 'Free Washes', icon: Star },
    { id: 'product', label: 'Products', icon: Award },
    { id: 'service', label: 'Services', icon: Zap },
    { id: 'discount', label: 'Discounts', icon: Trophy }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wash': return 'bg-blue-500';
      case 'product': return 'bg-green-500';
      case 'service': return 'bg-purple-500';
      case 'discount': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRedeemReward = async (rewardId: string) => {
    await redeemReward(rewardId);
    setSelectedReward('');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Store 🎁</h1>
          <p className="text-gray-600 mt-2">Redeem your loyalty points for amazing rewards</p>
        </div>

        {/* Points Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-6 w-6" />
                Your Loyalty Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">{user.loyaltyPoints}</div>
              <div className="text-sm opacity-90">
                Keep washing to earn more points!
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points This Month</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+247</div>
              <p className="text-xs text-muted-foreground">From 8 car washes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards Redeemed</CardTitle>
              <Gift className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userRewards.length}</div>
              <p className="text-xs text-muted-foreground">Total lifetime</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="store">Rewards Store</TabsTrigger>
            <TabsTrigger value="my-rewards">My Rewards</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
          </TabsList>

          <TabsContent value="store" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </Button>
                );
              })}
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => (
                <Card key={reward.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="text-4xl mb-2">{reward.image}</div>
                      <Badge className={`${getCategoryColor(reward.category)} text-white capitalize`}>
                        {reward.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-lg">{reward.points} points</span>
                      </div>
                      {reward.stock && (
                        <Badge variant="secondary">{reward.stock} left</Badge>
                      )}
                    </div>

                    {user.loyaltyPoints >= reward.points ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => setSelectedReward(reward.id)}>
                            Redeem Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Redemption</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to redeem "{reward.title}" for {reward.points} points?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-4 mt-4">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => setSelectedReward('')}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="flex-1"
                              onClick={() => handleRedeemReward(reward.id)}
                            >
                              Confirm Redeem
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="space-y-2">
                        <Button disabled className="w-full">
                          Need {reward.points - user.loyaltyPoints} more points
                        </Button>
                        <Progress 
                          value={(user.loyaltyPoints / reward.points) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-rewards" className="space-y-4">
            {userRewards.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No rewards yet</h3>
                  <p className="text-gray-600">Start redeeming rewards from the store!</p>
                </CardContent>
              </Card>
            ) : (
              userRewards.map((userReward) => {
                const reward = rewards.find(r => r.id === userReward.rewardId);
                if (!reward) return null;

                return (
                  <Card key={userReward.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{reward.image}</div>
                        <div>
                          <h3 className="font-medium">{reward.title}</h3>
                          <p className="text-sm text-gray-600">Code: {userReward.code}</p>
                          <p className="text-xs text-gray-500">
                            Expires: {new Date(userReward.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {userReward.used ? (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Used
                          </Badge>
                        ) : (
                          <Badge variant="default" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Available
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pointsHistory.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No points history</h3>
                  <p className="text-gray-600">Your points transactions will appear here</p>
                </CardContent>
              </Card>
            ) : (
              pointsHistory.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'earned' ? (
                          <span className="text-green-600">+</span>
                        ) : (
                          <span className="text-red-600">-</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.reason}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.points} pts
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Rewards;
