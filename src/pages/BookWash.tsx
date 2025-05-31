
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Car, Calendar, Clock, Camera, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WashPackage {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  popular?: boolean;
}

const BookWash = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('basic');
  const [carDetails, setCarDetails] = useState({
    model: 'Honda City',
    color: 'White',
    license: 'DL 01 XX 1234'
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [isAutoDetected, setIsAutoDetected] = useState(true);

  const washPackages: WashPackage[] = [
    {
      id: 'basic',
      name: 'Basic Wash',
      price: 199,
      duration: 20,
      features: ['Exterior wash', 'Rinse & dry', 'Basic cleaning']
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      price: 399,
      duration: 35,
      features: ['Everything in Basic', 'Wax application', 'Tire cleaning', 'Interior vacuum'],
      popular: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe Wash',
      price: 699,
      duration: 50,
      features: ['Everything in Premium', 'Interior detailing', 'Dashboard polish', 'Air freshener']
    }
  ];

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ];

  const handleBookWash = () => {
    if (!selectedTime && !isAutoDetected) {
      toast({
        title: "Please select a time slot",
        description: "Choose when you'd like your car to be washed.",
        variant: "destructive"
      });
      return;
    }

    const selectedPkg = washPackages.find(pkg => pkg.id === selectedPackage);
    toast({
      title: "Wash Booked Successfully! 🎉",
      description: `Your ${selectedPkg?.name} has been scheduled. You'll receive notifications once the wash begins.`
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Car Wash</h1>
          <p className="text-gray-600 mt-2">Schedule your car wash or enable auto-detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auto Detection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Auto Detection Status
                </CardTitle>
                <CardDescription>
                  Our system automatically detects when your car is parked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-green-800">Auto-detection Active</div>
                      <div className="text-sm text-green-600">Your car will be automatically detected when parked</div>
                    </div>
                  </div>
                  <Button 
                    variant={isAutoDetected ? "destructive" : "default"}
                    onClick={() => setIsAutoDetected(!isAutoDetected)}
                  >
                    {isAutoDetected ? 'Disable' : 'Enable'}
                  </Button>
                </div>
                
                {!isAutoDetected && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ Auto-detection is disabled. You'll need to manually book a time slot below.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Your Car Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="model">Car Model</Label>
                    <Input
                      id="model"
                      value={carDetails.model}
                      onChange={(e) => setCarDetails(prev => ({ ...prev, model: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={carDetails.color}
                      onChange={(e) => setCarDetails(prev => ({ ...prev, color: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="license">License Plate</Label>
                    <Input
                      id="license"
                      value={carDetails.license}
                      onChange={(e) => setCarDetails(prev => ({ ...prev, license: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wash Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Select Wash Package</CardTitle>
                <CardDescription>Choose the type of wash service you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {washPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPackage === pkg.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 -right-2">Most Popular</Badge>
                      )}
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <div className="text-2xl font-bold text-blue-600 my-2">₹{pkg.price}</div>
                        <div className="text-sm text-gray-600 mb-3">
                          <Clock className="inline h-4 w-4 mr-1" />
                          {pkg.duration} minutes
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index}>✓ {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Slot Selection */}
            {!isAutoDetected && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Select Time Slot
                  </CardTitle>
                  <CardDescription>Choose when you'd like your car to be washed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Car:</span>
                    <span className="font-medium">{carDetails.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span className="font-medium">{washPackages.find(p => p.id === selectedPackage)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{washPackages.find(p => p.id === selectedPackage)?.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scheduling:</span>
                    <span className="font-medium">
                      {isAutoDetected ? 'Auto-detect' : selectedTime || 'Not selected'}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{washPackages.find(p => p.id === selectedPackage)?.price}</span>
                  </div>
                </div>

                <Button onClick={handleBookWash} className="w-full" size="lg">
                  {isAutoDetected ? 'Enable Auto Wash' : 'Book Wash'}
                </Button>

                <div className="text-xs text-gray-600 text-center">
                  You'll be charged only when the wash begins
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-medium">Phoenix Mall</div>
                  <div className="text-sm text-gray-600">Level 2, Section B</div>
                  <div className="text-sm text-gray-600">Bay 10-25 Available</div>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600">Service Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookWash;
