
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Star, Award, Car, Clock, Camera, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SubscriptionPlan {
  id: 'silver' | 'gold' | 'platinum';
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  washesPerMonth: number | 'unlimited';
  color: string;
  popular?: boolean;
  recommended?: boolean;
}

const Subscription = () => {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>(user?.subscription || 'none');

  const plans: SubscriptionPlan[] = [
    {
      id: 'silver',
      name: 'Silver',
      price: 299,
      washesPerMonth: 5,
      color: 'bg-gray-500',
      features: [
        '5 car washes per month',
        'Basic wash package',
        'SMS notifications',
        'Loyalty points (1x)',
        'Auto-detection',
        'Customer support'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 599,
      originalPrice: 799,
      washesPerMonth: 12,
      color: 'bg-yellow-500',
      popular: true,
      features: [
        '12 car washes per month',
        'Premium wash package',
        'Live video tracking',
        'Priority service',
        'Loyalty points (2x)',
        'Interior vacuum',
        'Wax application',
        'Email + SMS notifications'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 999,
      originalPrice: 1299,
      washesPerMonth: 'unlimited',
      color: 'bg-purple-500',
      recommended: true,
      features: [
        'Unlimited car washes',
        'Deluxe wash + wax',
        'Interior detailing',
        'VIP parking spots',
        'Loyalty points (3x)',
        'Monthly full detailing',
        'Dashboard polish',
        'Air freshener',
        'Priority support',
        '24/7 service'
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan || !user) return;

    // Simulate payment process
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your subscription."
    });

    setTimeout(() => {
      updateUser({ subscription: planId as any });
      toast({
        title: `Welcome to ${plan.name} Plan! 🎉`,
        description: `You now have access to all ${plan.name} features. Your first wash is on us!`
      });
    }, 2000);
  };

  const handleCancelSubscription = () => {
    if (!user) return;

    toast({
      title: "Subscription Cancelled",
      description: "Your subscription will remain active until the end of your billing cycle.",
      variant: "destructive"
    });

    setTimeout(() => {
      updateUser({ subscription: 'none' });
    }, 1000);
  };

  const currentPlan = plans.find(p => p.id === user?.subscription);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-gray-600 mt-2">Choose the perfect plan for your car washing needs</p>
          {user?.subscription !== 'none' && (
            <div className="mt-4">
              <Badge className={`${currentPlan?.color} text-white`}>
                Current Plan: {currentPlan?.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Current Subscription Status */}
        {user?.subscription !== 'none' && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Your Active Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentPlan?.name}</div>
                  <div className="text-sm text-gray-600">Current Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {currentPlan?.washesPerMonth === 'unlimited' ? '∞' : currentPlan?.washesPerMonth}
                  </div>
                  <div className="text-sm text-gray-600">Washes Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.loyaltyPoints}</div>
                  <div className="text-sm text-gray-600">Loyalty Points</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Next Billing</div>
                  <div className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
                <Button variant="outline">
                  Manage Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${
                user?.subscription === plan.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-lg'
              } transition-shadow`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              {plan.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Recommended
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${plan.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">₹{plan.originalPrice}/month</div>
                  )}
                  <div className="text-3xl font-bold">₹{plan.price}</div>
                  <div className="text-sm text-gray-600">/month</div>
                </div>
                <CardDescription>
                  {plan.washesPerMonth === 'unlimited' ? 'Unlimited' : plan.washesPerMonth} washes per month
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {user?.subscription === plan.id ? (
                  <Button disabled className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {user?.subscription === 'none' ? 'Subscribe' : 'Upgrade'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Car className="h-12 w-12 mx-auto text-blue-600" />
              <CardTitle>Save Money</CardTitle>
              <CardDescription>
                Subscribers save up to 40% compared to individual wash pricing
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 mx-auto text-green-600" />
              <CardTitle>Priority Service</CardTitle>
              <CardDescription>
                Skip the queue and get priority access to wash bays
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Camera className="h-12 w-12 mx-auto text-purple-600" />
              <CardTitle>Premium Features</CardTitle>
              <CardDescription>
                Access to live tracking, notifications, and exclusive services
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Can I change my plan anytime?</h4>
              <p className="text-sm text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-medium">What happens to unused washes?</h4>
              <p className="text-sm text-gray-600">Unused washes roll over to the next month for up to 3 months.</p>
            </div>
            <div>
              <h4 className="font-medium">Can I pause my subscription?</h4>
              <p className="text-sm text-gray-600">Yes, you can pause your subscription for up to 3 months if you're traveling.</p>
            </div>
            <div>
              <h4 className="font-medium">Is there a cancellation fee?</h4>
              <p className="text-sm text-gray-600">No, you can cancel your subscription anytime without any fees.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Subscription;
