
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { DollarSign, Car, Star, Award, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  minAmount: number;
  validUntil: string;
  code: string;
}

const Wallet = () => {
  const { user, updateUser } = useAuth();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<string>('');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: 399,
      description: 'Premium Car Wash - Honda City',
      date: new Date().toISOString(),
      status: 'completed'
    },
    {
      id: '2',
      type: 'credit',
      amount: 500,
      description: 'Wallet Top-up',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 50,
      description: 'Cashback - Premium Wash',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed'
    },
    {
      id: '4',
      type: 'debit',
      amount: 199,
      description: 'Basic Car Wash - Honda City',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed'
    }
  ];

  const offers: Offer[] = [
    {
      id: '1',
      title: 'First Time Bonus',
      description: 'Get 20% extra on your first wallet top-up',
      discount: 20,
      minAmount: 500,
      validUntil: '2024-12-31',
      code: 'FIRST20'
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: '15% extra on top-ups above ₹1000',
      discount: 15,
      minAmount: 1000,
      validUntil: '2024-12-15',
      code: 'WEEKEND15'
    },
    {
      id: '3',
      title: 'Loyalty Bonus',
      description: '10% extra for Gold & Platinum members',
      discount: 10,
      minAmount: 300,
      validUntil: '2024-12-25',
      code: 'LOYAL10'
    }
  ];

  const handleTopUp = () => {
    const amount = parseInt(topUpAmount);
    if (!amount || amount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum top-up amount is ₹100",
        variant: "destructive"
      });
      return;
    }

    if (!user) return;

    let finalAmount = amount;
    const selectedOfferData = offers.find(o => o.id === selectedOffer);
    
    if (selectedOfferData && amount >= selectedOfferData.minAmount) {
      const bonus = Math.floor(amount * (selectedOfferData.discount / 100));
      finalAmount = amount + bonus;
    }

    // Simulate payment processing
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your payment."
    });

    setTimeout(() => {
      updateUser({ wallet: user.wallet + finalAmount });
      setTopUpAmount('');
      setSelectedOffer('');
      
      toast({
        title: "Wallet Top-up Successful! 💰",
        description: `₹${finalAmount} has been added to your wallet${selectedOfferData ? ` (includes ₹${finalAmount - amount} bonus)` : ''}`
      });
    }, 2000);
  };

  const topUpAmounts = [100, 300, 500, 1000, 2000, 5000];

  if (!user) {
    return <div>Please log in to access your wallet.</div>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your wallet balance and transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Balance */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">₹{user.wallet.toLocaleString()}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-75">This Month Spent</div>
                    <div className="font-semibold">₹1,247</div>
                  </div>
                  <div>
                    <div className="opacity-75">Cashback Earned</div>
                    <div className="font-semibold">₹127</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                  <span className="text-green-600">💰</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₹4,580</div>
                  <p className="text-xs text-muted-foreground">vs individual pricing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cashback Rate</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12%</div>
                  <p className="text-xs text-muted-foreground">average this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                  <Car className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{transactions.length}</div>
                  <p className="text-xs text-muted-foreground">this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <span className="text-green-600">+</span>
                          ) : (
                            <span className="text-red-600">-</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString()} • 
                            <Badge variant="secondary" className="ml-1">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Clock className="mr-2 h-4 w-4" />
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top-up Form */}
            <Card>
              <CardHeader>
                <CardTitle>Top-up Wallet</CardTitle>
                <CardDescription>Add money to your wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    min="100"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {topUpAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopUpAmount(amount.toString())}
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                <Button onClick={handleTopUp} className="w-full" disabled={!topUpAmount}>
                  Add Money
                </Button>

                <div className="text-xs text-gray-600 text-center">
                  💳 UPI, Cards, Net Banking accepted
                </div>
              </CardContent>
            </Card>

            {/* Active Offers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Active Offers
                </CardTitle>
                <CardDescription>Get extra money on top-ups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedOffer === offer.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOffer(selectedOffer === offer.id ? '' : offer.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">{offer.title}</div>
                      <Badge variant="secondary">{offer.discount}%</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{offer.description}</div>
                    <div className="flex justify-between text-xs">
                      <span>Min: ₹{offer.minAmount}</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">{offer.code}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cashback Info */}
            <Card>
              <CardHeader>
                <CardTitle>Earn More Cashback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Premium Wash:</span>
                  <span className="font-medium">5% cashback</span>
                </div>
                <div className="flex justify-between">
                  <span>Deluxe Wash:</span>
                  <span className="font-medium">8% cashback</span>
                </div>
                <div className="flex justify-between">
                  <span>Subscription:</span>
                  <span className="font-medium">10% cashback</span>
                </div>
                <div className="flex justify-between">
                  <span>Referral Bonus:</span>
                  <span className="font-medium">₹100</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
