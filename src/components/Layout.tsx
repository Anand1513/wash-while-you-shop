import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Car, User, Star, Calendar, Camera, DollarSign } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <div>{children}</div>;
  }

  const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: Car },
    { path: "/book-wash", label: "Book Wash", icon: Calendar },
    { path: "/track-wash", label: "Track Wash", icon: Camera },
    { path: "/subscription", label: "Subscription", icon: Star },
    { path: "/wallet", label: "Wallet", icon: DollarSign },
    { path: "/profile", label: "Profile", icon: User },
  ];

  if (user.isAdmin) {
    navigationItems.push({ path: "/admin", label: "Admin Panel", icon: User });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">AutoWash</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user.name}
              </div>
              {user.subscription !== 'none' && (
                <Badge className="capitalize">{user.subscription}</Badge>
              )}
              <div className="flex items-center space-x-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{user.loyaltyPoints}</span>
              </div>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64">
            <Card className="p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
