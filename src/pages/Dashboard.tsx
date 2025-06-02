
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import QuickRebookWidget from "@/components/QuickRebookWidget";
import { Link } from "react-router-dom";
import { Car, Clock, Star, Camera, Calendar, Award, Users, Share2, Gift, Zap, TrendingUp, Target } from "lucide-react";

interface CarWash {
  id: string;
  status: 'parked' | 'detected' | 'washing' | 'completed';
  startTime: string;
  estimatedCompletion: string;
  carModel: string;
  location: string;
  washType: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [currentWash, setCurrentWash] = useState<CarWash | null>(null);
  const [recentWashes, setRecentWashes] = useState<CarWash[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    // Simulate current wash
    setCurrentWash({
      id: '1',
      status: 'washing',
      startTime: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 15 * 60000).toISOString(),
      carModel: 'Honda City',
      location: 'Phoenix Mall - Level 2',
      washType: 'Premium Wash'
    });

    // Simulate recent washes
    setRecentWashes([
      {
        id: '2',
        status: 'completed',
        startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedCompletion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 25 * 60000).toISOString(),
        carModel: 'Honda City',
        location: 'Phoenix Mall - Level 2',
        washType: 'Basic Wash'
      },
      {
        id: '3',
        status: 'completed',
        startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedCompletion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 60000).toISOString(),
        carModel: 'Honda City',
        location: 'Select City Walk - Level 3',
        washType: 'Premium Wash'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'parked': return 'bg-blue-500';
      case 'detected': return 'bg-yellow-500';
      case 'washing': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'parked': return 25;
      case 'detected': return 50;
      case 'washing': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'parked': return 'from-blue-400 to-blue-500';
      case 'detected': return 'from-yellow-400 to-yellow-500';
      case 'washing': return 'from-green-400 to-green-500';
      case 'completed': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-up">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg mb-6">Here's what's happening with your car washes today.</p>
            
            {/* Quick Actions Row */}
            <div className="flex flex-wrap gap-3">
              <Link to="/book-wash">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Quick Book
                </Button>
              </Link>
              <Link to="/track-wash">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                  <Camera className="mr-2 h-4 w-4" />
                  Live View
                </Button>
              </Link>
              <Link to="/rewards">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                  <Star className="mr-2 h-4 w-4" />
                  Rewards
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-8 right-12 w-12 h-12 bg-yellow-400/30 rounded-full animate-pulse"></div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-modern relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text">
                {user.loyaltyPoints}
              </div>
              <p className="text-xs text-green-600 font-medium">+25 from last wash</p>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>

          <Card className="card-modern relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">₹</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-transparent bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
                ₹{user.wallet}
              </div>
              <p className="text-xs text-muted-foreground">Available balance</p>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>

          <Card className="card-modern relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Car className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text">
                8
              </div>
              <p className="text-xs text-muted-foreground">Car washes completed</p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>

          <Card className="card-modern relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-black text-transparent bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text capitalize">
                {user.subscription}
              </div>
              <p className="text-xs text-muted-foreground">Current plan</p>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>
        </div>

        {/* Current Wash Status */}
        {currentWash && (
          <Card className="card-modern border-l-4 border-l-green-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-transparent"></div>
            <CardHeader className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">Current Wash - {currentWash.carModel}</div>
                      <div className="text-sm text-gray-600">{currentWash.location}</div>
                    </div>
                  </CardTitle>
                </div>
                <Badge className={`bg-gradient-to-r ${getStatusGradient(currentWash.status)} text-white capitalize px-4 py-2 shadow-lg`}>
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  {currentWash.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-medium">Wash Progress</span>
                  <span className="font-bold text-green-600">{getStatusProgress(currentWash.status)}%</span>
                </div>
                <div className="relative">
                  <Progress value={getStatusProgress(currentWash.status)} className="h-3 progress-glow" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Wash Type</div>
                  <div className="font-bold text-gray-900">{currentWash.washType}</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Started</div>
                  <div className="font-bold text-gray-900">{new Date(currentWash.startTime).toLocaleTimeString()}</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-xl">
                  <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Est. Completion</div>
                  <div className="font-bold text-gray-900">{new Date(currentWash.estimatedCompletion).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/track-wash">
                  <Button className="btn-primary">
                    <Camera className="mr-2 h-4 w-4" />
                    Watch Live
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 hover:bg-gray-50">
                  <Clock className="mr-2 h-4 w-4" />
                  Get Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Recent Washes */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-modern group hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden">
                <Link to="/book-wash" className="block h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">Book a Wash</CardTitle>
                    <CardDescription className="text-sm">Schedule a car wash manually or check auto-detection status</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="card-modern group hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden">
                <Link to="/rewards" className="block h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-yellow-600 transition-colors">Rewards Store</CardTitle>
                    <CardDescription className="text-sm">Redeem your {user.loyaltyPoints} points for amazing rewards</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="card-modern group hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden">
                <Link to="/wallet" className="block h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white text-2xl font-bold">₹</span>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-green-600 transition-colors">Top-up Wallet</CardTitle>
                    <CardDescription className="text-sm">Add money to your wallet and get exclusive cashback offers</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>

            {/* Recent Washes */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  Recent Washes
                </CardTitle>
                <CardDescription>Your car wash history and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWashes.map((wash) => (
                    <div key={wash.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(wash.status)} shadow-lg group-hover:scale-110 transition-transform duration-300`}></div>
                        <div>
                          <div className="font-bold text-gray-900">{wash.carModel} - {wash.washType}</div>
                          <div className="text-sm text-gray-600">{wash.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {new Date(wash.startTime).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">{wash.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Quick Rebook Widget */}
            <QuickRebookWidget />

            {/* Enhanced Referral System */}
            <Card className="card-modern relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-50"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  Refer & Earn
                </CardTitle>
                <CardDescription>Invite friends and earn 300 points each!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-xl text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-black mb-1">300 Points</div>
                    <div className="text-purple-100 text-sm font-medium">Per successful referral</div>
                  </div>
                </div>
                <Link to="/profile">
                  <Button className="w-full btn-primary">
                    <Share2 className="mr-2 h-4 w-4" />
                    View Referral Program
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enhanced Points Progress */}
            <Card className="card-modern relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-50"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  Next Reward Goal
                </CardTitle>
                <CardDescription>You're close to your next free wash!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="text-center">
                  <div className="text-2xl font-black text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text mb-2">
                    {500 - (user.loyaltyPoints % 500)} points to go
                  </div>
                  <div className="text-sm text-gray-600">Until your next free basic wash</div>
                </div>
                <div className="relative">
                  <Progress value={(user.loyaltyPoints % 500) / 500 * 100} className="h-4 progress-glow" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full"></div>
                </div>
                <Link to="/rewards">
                  <Button variant="outline" className="w-full border-2 hover:bg-yellow-50">
                    <Gift className="mr-2 h-4 w-4" />
                    View All Rewards
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
