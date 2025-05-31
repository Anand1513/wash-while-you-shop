
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useRewards } from "@/contexts/RewardsContext";
import { Car, Clock, MapPin, Zap, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface LastWash {
  id: string;
  carModel: string;
  washType: string;
  location: string;
  date: string;
  price: number;
  duration: number;
}

const QuickRebookWidget = () => {
  const { user } = useAuth();
  const { addPoints } = useRewards();
  const [isRebooking, setIsRebooking] = useState(false);

  const lastWash: LastWash = {
    id: '1',
    carModel: 'Honda City',
    washType: 'Premium Wash',
    location: 'Phoenix Mall - Level 2',
    date: '2024-01-15',
    price: 399,
    duration: 25
  };

  const quickBookOptions = [
    {
      id: 'same',
      title: 'Same as Last Time',
      description: 'Premium Wash at Phoenix Mall',
      price: 399,
      duration: 25,
      popular: true
    },
    {
      id: 'upgrade',
      title: 'Upgrade to Deluxe',
      description: 'Deluxe Wash with interior cleaning',
      price: 599,
      duration: 35,
      badge: 'Recommended'
    },
    {
      id: 'basic',
      title: 'Quick Basic Wash',
      description: 'Fast exterior wash only',
      price: 199,
      duration: 15,
      badge: 'Fastest'
    }
  ];

  const handleQuickBook = async (optionId: string) => {
    if (!user) return;

    setIsRebooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      const option = quickBookOptions.find(o => o.id === optionId);
      if (option) {
        // Deduct from wallet or handle payment
        if (user.wallet >= option.price) {
          // Add loyalty points (5% of price)
          const pointsEarned = Math.floor(option.price * 0.05);
          addPoints(pointsEarned, `${option.title} booking`);
          
          toast({
            title: "Booking Confirmed! 🚗",
            description: `${option.title} booked successfully. You'll be notified when to arrive.`
          });
        } else {
          toast({
            title: "Insufficient Wallet Balance",
            description: "Please top up your wallet to complete the booking.",
            variant: "destructive"
          });
        }
      }
      setIsRebooking(false);
    }, 2000);
  };

  const getTimeSinceLastWash = () => {
    const lastWashDate = new Date(lastWash.date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastWashDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const shouldRecommendWash = () => {
    return getTimeSinceLastWash() >= 7; // Recommend after 7 days
  };

  return (
    <Card className={`${shouldRecommendWash() ? 'border-orange-200 bg-orange-50' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Quick Rebook
            </CardTitle>
            <CardDescription>
              {shouldRecommendWash() 
                ? `It's been ${getTimeSinceLastWash()} days since your last wash. Time for another one?`
                : "Book the same wash with one tap"
              }
            </CardDescription>
          </div>
          {shouldRecommendWash() && (
            <Badge variant="destructive" className="animate-pulse">
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Last Wash Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Car className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-sm">Last Wash Details</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span>Car:</span>
              <span className="font-medium">{lastWash.carModel}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Service:</span>
              <span className="font-medium">{lastWash.washType}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">{lastWash.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="font-medium">{new Date(lastWash.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Book Options */}
        <div className="space-y-3">
          {quickBookOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{option.title}</span>
                  {option.popular && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Popular
                    </Badge>
                  )}
                  {option.badge && (
                    <Badge variant="outline" className="text-xs">
                      {option.badge}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-600 mb-1">{option.description}</div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>₹{option.price}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {option.duration} min
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleQuickBook(option.id)}
                disabled={isRebooking}
                className="ml-3"
              >
                {isRebooking ? 'Booking...' : 'Book'}
              </Button>
            </div>
          ))}
        </div>

        {/* Manual Booking Link */}
        <div className="pt-2 border-t">
          <Link to="/book-wash">
            <Button variant="outline" className="w-full text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              Custom Booking Options
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickRebookWidget;
