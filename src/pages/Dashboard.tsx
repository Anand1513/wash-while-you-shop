
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import QuickRebookWidget from "@/components/QuickRebookWidget";
import { Link } from "react-router-dom";
import { Car, Clock, Star, Camera, Calendar, Award, Users, Share2, Gift } from "lucide-react";

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

  useEffect(() => {
    // Simulate current wash
    setCurrentWash({
      id: '1',
      status: 'detected',
      startTime: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 20 * 60000).toISOString(),
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

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your car washes today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.loyaltyPoints}</div>
              <p className="text-xs text-muted-foreground">+25 from last wash</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <span className="text-sm">₹</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{user.wallet}</div>
              <p className="text-xs text-muted-foreground">Available balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Car className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Car washes completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user.subscription}</div>
              <p className="text-xs text-muted-foreground">Current plan</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Wash Status */}
        {currentWash && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Current Wash - {currentWash.carModel}
                  </CardTitle>
                  <CardDescription>{currentWash.location}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(currentWash.status)} text-white capitalize`}>
                  {currentWash.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Wash Progress</span>
                  <span>{getStatusProgress(currentWash.status)}%</span>
                </div>
                <Progress value={getStatusProgress(currentWash.status)} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Wash Type:</span>
                  <div className="font-medium">{currentWash.washType}</div>
                </div>
                <div>
                  <span className="text-gray-600">Started:</span>
                  <div className="font-medium">{new Date(currentWash.startTime).toLocaleTimeString()}</div>
                </div>
                <div>
                  <span className="text-gray-600">Estimated Completion:</span>
                  <div className="font-medium">{new Date(currentWash.estimatedCompletion).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link to="/track-wash">
                  <Button>
                    <Camera className="mr-2 h-4 w-4" />
                    Watch Live
                  </Button>
                </Link>
                <Button variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Get Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to="/book-wash">
                  <CardHeader>
                    <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle>Book a Wash</CardTitle>
                    <CardDescription>Schedule a car wash manually or check auto-detection status</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to="/rewards">
                  <CardHeader>
                    <Star className="h-8 w-8 text-yellow-600 mb-2" />
                    <CardTitle>Rewards Store</CardTitle>
                    <CardDescription>Redeem your {user.loyaltyPoints} points for amazing rewards</CardDescription>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to="/wallet">
                  <CardHeader>
                    <span className="text-2xl mb-2">💰</span>
                    <CardTitle>Top-up Wallet</CardTitle>
                    <CardDescription>Add money to your wallet and get exclusive cashback offers</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>

            {/* Recent Washes */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Washes</CardTitle>
                <CardDescription>Your car wash history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWashes.map((wash) => (
                    <div key={wash.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(wash.status)}`}></div>
                        <div>
                          <div className="font-medium">{wash.carModel} - {wash.washType}</div>
                          <div className="text-sm text-gray-600">{wash.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
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

            {/* Referral System Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Refer & Earn
                </CardTitle>
                <CardDescription>Invite friends and earn 300 points each!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">300 Points</div>
                    <div className="text-sm text-purple-800">Per successful referral</div>
                  </div>
                </div>
                <Link to="/profile">
                  <Button className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    View Referral Program
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Points Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Next Reward Goal</CardTitle>
                <CardDescription>You're close to your next free wash!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {500 - (user.loyaltyPoints % 500)} points to go
                  </div>
                  <div className="text-sm text-gray-600">Until your next free basic wash</div>
                </div>
                <Progress value={(user.loyaltyPoints % 500) / 500 * 100} />
                <Link to="/rewards">
                  <Button variant="outline" className="w-full">
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
