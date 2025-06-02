
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Car, User, Star, Calendar, Camera, DollarSign, Award, Settings, LogOut } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <div>{children}</div>;
  }

  const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: Car, color: "text-blue-500" },
    { path: "/book-wash", label: "Book Wash", icon: Calendar, color: "text-green-500" },
    { path: "/track-wash", label: "Track Wash", icon: Camera, color: "text-purple-500" },
    { path: "/subscription", label: "Subscription", icon: Star, color: "text-yellow-500" },
    { path: "/wallet", label: "Wallet", icon: DollarSign, color: "text-emerald-500" },
    { path: "/rewards", label: "Rewards", icon: Award, color: "text-orange-500" },
    { path: "/profile", label: "Profile", icon: User, color: "text-gray-500" },
  ];

  if (user.isAdmin) {
    navigationItems.push({ path: "/admin", label: "Admin Panel", icon: Settings, color: "text-red-500" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Maire Wash
                </span>
                <div className="text-xs text-gray-500 -mt-1">While U Shop</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-sm text-gray-600">
                Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
              </div>
              
              {user.subscription !== 'none' && (
                <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white capitalize px-3 py-1 shadow-lg">
                  {user.subscription}
                </Badge>
              )}
              
              <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-xl border border-yellow-200">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold text-yellow-700">{user.loyaltyPoints}</span>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={logout}
                className="hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Modern Sidebar */}
          <aside className="w-64 animate-slide-in-left">
            <Card className="card-modern p-6 sticky top-24">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
                          : "text-gray-700 hover:bg-gray-50 hover:scale-105"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isActive 
                          ? "bg-white/20" 
                          : "bg-gray-100 group-hover:bg-gray-200"
                      }`}>
                        <Icon className={`h-4 w-4 ${isActive ? "text-white" : item.color}`} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      
                      {isActive && (
                        <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 animate-fade-in-delayed">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
