import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { User, Car, Star, Award, Bell, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CarData {
  id: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  addedDate: string;
  washCount: number;
  isPrimary: boolean;
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  
  const [carFormData, setCarFormData] = useState({
    make: '',
    model: '',
    color: '',
    licensePlate: ''
  });

  const [cars, setCars] = useState<CarData[]>([
    {
      id: '1',
      make: 'Honda',
      model: 'City',
      color: 'White',
      licensePlate: 'DL 01 XX 1234',
      addedDate: 'Jan 15, 2024',
      washCount: 47,
      isPrimary: true
    }
  ]);

  const handleSave = () => {
    if (!user) return;
    
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  const handleAddCar = () => {
    if (!carFormData.make || !carFormData.model || !carFormData.color || !carFormData.licensePlate) {
      toast({
        title: "Error",
        description: "Please fill in all car details.",
        variant: "destructive"
      });
      return;
    }

    const newCar: CarData = {
      id: Date.now().toString(),
      make: carFormData.make,
      model: carFormData.model,
      color: carFormData.color,
      licensePlate: carFormData.licensePlate,
      addedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      washCount: 0,
      isPrimary: cars.length === 0
    };

    setCars([...cars, newCar]);
    setCarFormData({ make: '', model: '', color: '', licensePlate: '' });
    setIsAddCarOpen(false);
    
    toast({
      title: "Car Added",
      description: `${newCar.make} ${newCar.model} has been added to your profile.`
    });
  };

  const handleSetPrimary = (carId: string) => {
    setCars(cars.map(car => ({
      ...car,
      isPrimary: car.id === carId
    })));
    
    toast({
      title: "Primary Car Updated",
      description: "Primary car has been updated successfully."
    });
  };

  if (!user) {
    return <div>Please log in to access your profile.</div>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        {user.subscription !== 'none' && (
                          <Badge className="capitalize">{user.subscription} Member</Badge>
                        )}
                        <Badge variant="secondary">
                          <Star className="mr-1 h-3 w-3" />
                          {user.loyaltyPoints} Points
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={isEditing ? "destructive" : "outline"}
                    onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <div className="font-medium">{user.phone}</div>
                    </div>
                    <div>
                      <Label>Member Since</Label>
                      <div className="font-medium">January 2024</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Car Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Registered Cars
                </CardTitle>
                <CardDescription>Manage your registered vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cars.map((car) => (
                    <div key={car.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Car className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="font-medium">{car.make} {car.model}</div>
                          <div className="text-sm text-gray-600">{car.color} • {car.licensePlate}</div>
                          <div className="text-sm text-gray-600">Added: {car.addedDate}</div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex gap-2">
                          {car.isPrimary && <Badge variant="secondary">Primary</Badge>}
                          {!car.isPrimary && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSetPrimary(car.id)}
                            >
                              Set Primary
                            </Button>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{car.washCount} washes</div>
                      </div>
                    </div>
                  ))}
                  
                  <Dialog open={isAddCarOpen} onOpenChange={setIsAddCarOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Car className="mr-2 h-4 w-4" />
                        Add Another Car
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Car</DialogTitle>
                        <DialogDescription>
                          Add a new car to your profile for car wash services.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="make">Car Make</Label>
                          <Input
                            id="make"
                            placeholder="e.g., Honda, Toyota, BMW"
                            value={carFormData.make}
                            onChange={(e) => setCarFormData(prev => ({ ...prev, make: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="model">Car Model</Label>
                          <Input
                            id="model"
                            placeholder="e.g., City, Camry, X3"
                            value={carFormData.model}
                            onChange={(e) => setCarFormData(prev => ({ ...prev, model: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            placeholder="e.g., White, Black, Silver"
                            value={carFormData.color}
                            onChange={(e) => setCarFormData(prev => ({ ...prev, color: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="licensePlate">License Plate</Label>
                          <Input
                            id="licensePlate"
                            placeholder="e.g., DL 01 XX 1234"
                            value={carFormData.licensePlate}
                            onChange={(e) => setCarFormData(prev => ({ ...prev, licensePlate: e.target.value }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddCarOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddCar}>
                          Add Car
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Wash Start Notifications</div>
                    <div className="text-sm text-gray-600">Get notified when your wash begins</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Wash Complete Notifications</div>
                    <div className="text-sm text-gray-600">Get notified when your wash is complete</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Promotional Offers</div>
                    <div className="text-sm text-gray-600">Receive offers and discounts</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Monthly Summary</div>
                    <div className="text-sm text-gray-600">Monthly usage and savings report</div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{user.loyaltyPoints}</div>
                  <div className="text-sm text-gray-600">Loyalty Points</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">47</div>
                    <div className="text-xs text-gray-600">Total Washes</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">₹3,247</div>
                    <div className="text-xs text-gray-600">Total Spent</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">₹582</div>
                    <div className="text-xs text-gray-600">Money Saved</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">4.9</div>
                    <div className="text-xs text-gray-600">Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🚗</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">First Wash</div>
                    <div className="text-xs text-gray-600">Completed your first wash</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📅</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Regular Customer</div>
                    <div className="text-xs text-gray-600">10+ washes completed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">⭐</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Loyal Member</div>
                    <div className="text-xs text-gray-600">Subscribed for 6 months</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral */}
            <Card>
              <CardHeader>
                <CardTitle>Refer Friends</CardTitle>
                <CardDescription>Earn ₹100 for each referral</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="font-mono text-lg bg-gray-100 p-3 rounded-lg">
                    JOHN2024
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Your referral code</div>
                </div>
                <Button className="w-full">
                  Share Referral Code
                </Button>
                <div className="text-xs text-gray-600 text-center">
                  You've earned ₹300 from 3 referrals
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
