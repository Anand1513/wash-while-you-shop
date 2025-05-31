
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Users, DollarSign, Calendar, Clock, Award, Camera, Bell } from "lucide-react";

interface WashBooking {
  id: string;
  customerName: string;
  carModel: string;
  washType: string;
  status: 'pending' | 'in-progress' | 'completed';
  location: string;
  amount: number;
  startTime: string;
  estimatedCompletion: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  totalWashes: number;
  totalSpent: number;
  subscription: string;
  joinDate: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<WashBooking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Simulate data loading
    setBookings([
      {
        id: '1',
        customerName: 'John Doe',
        carModel: 'Honda City',
        washType: 'Premium Wash',
        status: 'in-progress',
        location: 'Phoenix Mall - Bay 15',
        amount: 399,
        startTime: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 25 * 60000).toISOString()
      },
      {
        id: '2',
        customerName: 'Sarah Smith',
        carModel: 'Toyota Camry',
        washType: 'Basic Wash',
        status: 'pending',
        location: 'Select City Walk - Bay 8',
        amount: 199,
        startTime: new Date(Date.now() + 10 * 60000).toISOString(),
        estimatedCompletion: new Date(Date.now() + 30 * 60000).toISOString()
      },
      {
        id: '3',
        customerName: 'Mike Johnson',
        carModel: 'BMW 3 Series',
        washType: 'Deluxe Wash',
        status: 'completed',
        location: 'Phoenix Mall - Bay 12',
        amount: 699,
        startTime: new Date(Date.now() - 60 * 60000).toISOString(),
        estimatedCompletion: new Date(Date.now() - 10 * 60000).toISOString()
      }
    ]);

    setCustomers([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        totalWashes: 47,
        totalSpent: 18650,
        subscription: 'gold',
        joinDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        totalWashes: 23,
        totalSpent: 8970,
        subscription: 'silver',
        joinDate: '2024-02-20'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        totalWashes: 65,
        totalSpent: 32500,
        subscription: 'platinum',
        joinDate: '2023-11-10'
      }
    ]);
  }, []);

  if (!user?.isAdmin) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">You don't have permission to access the admin dashboard.</p>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const activeWashes = bookings.filter(b => b.status === 'in-progress').length;
  const completedToday = bookings.filter(b => b.status === 'completed').length;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage operations, bookings, and customers</p>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Car },
              { id: 'bookings', label: 'Active Bookings', icon: Calendar },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Washes</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeWashes}</div>
                  <p className="text-xs text-muted-foreground">Currently in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <Car className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedToday}</div>
                  <p className="text-xs text-muted-foreground">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customers.length}</div>
                  <p className="text-xs text-muted-foreground">+3 new this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest wash bookings and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`}></div>
                          <div>
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-gray-600">{booking.carModel} - {booking.washType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{booking.amount}</div>
                          <Badge variant="secondary" className="capitalize">{booking.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>Highest spending customers this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 3).map((customer, index) => (
                      <div key={customer.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-600">{customer.totalWashes} washes</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{customer.totalSpent.toLocaleString()}</div>
                          <Badge className="capitalize">{customer.subscription}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Active Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Bookings</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Monitor All
                </Button>
                <Button>
                  <Bell className="mr-2 h-4 w-4" />
                  Send Alerts
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-sm text-gray-600">{booking.carModel}</div>
                      </div>
                      <div>
                        <div className="font-medium">{booking.washType}</div>
                        <div className="text-sm text-gray-600">₹{booking.amount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Location</div>
                        <div className="font-medium">{booking.location}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Start Time</div>
                        <div className="font-medium">{new Date(booking.startTime).toLocaleTimeString()}</div>
                      </div>
                      <div>
                        <Badge className={`${getStatusColor(booking.status)} text-white capitalize`}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Customer Management</h2>
              <div className="flex gap-2">
                <Input placeholder="Search customers..." className="w-64" />
                <Button>Export Data</Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Customer</th>
                        <th className="text-left py-2">Subscription</th>
                        <th className="text-left py-2">Total Washes</th>
                        <th className="text-left py-2">Total Spent</th>
                        <th className="text-left py-2">Join Date</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b">
                          <td className="py-3">
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-gray-600">{customer.email}</div>
                            </div>
                          </td>
                          <td className="py-3">
                            <Badge className="capitalize">{customer.subscription}</Badge>
                          </td>
                          <td className="py-3">{customer.totalWashes}</td>
                          <td className="py-3">₹{customer.totalSpent.toLocaleString()}</td>
                          <td className="py-3">{new Date(customer.joinDate).toLocaleDateString()}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">₹2,45,780</div>
                  <p className="text-sm text-gray-600">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Wash Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">₹387</div>
                  <p className="text-sm text-gray-600">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">87%</div>
                  <p className="text-sm text-gray-600">+2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Premium Wash</div>
                  <p className="text-sm text-gray-600">45% of all bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">2 PM - 4 PM</div>
                  <p className="text-sm text-gray-600">Busiest time slots</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">23%</div>
                  <p className="text-sm text-gray-600">Free users to paid</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
