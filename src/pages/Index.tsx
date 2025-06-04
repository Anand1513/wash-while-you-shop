import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Car, Clock, Star, Users, Award, Camera, CheckCircle, ArrowRight, Sparkles, Zap, Shield, Leaf, Building2, PlayCircle, TrendingUp, Heart } from "lucide-react";

const Index = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users, color: "from-blue-500 to-blue-600" },
    { number: "200K+", label: "Cars Washed", icon: Car, color: "from-green-500 to-green-600" },
    { number: "25", label: "Mall Locations", icon: Building2, color: "from-purple-500 to-purple-600" },
    { number: "98%", label: "Satisfaction", icon: Star, color: "from-yellow-500 to-yellow-600" }
  ];

  const features = [
    {
      icon: Zap,
      title: "AI Auto-Detection",
      description: "Your car is automatically detected when parked. No manual booking required!",
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      icon: Camera,
      title: "Live Wash Tracking",
      description: "Watch your car wash progress in real-time with our live camera feed.",
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200"
    },
    {
      icon: Star,
      title: "Loyalty Rewards",
      description: "Earn points with every wash and unlock exclusive discounts and offers.",
      color: "text-yellow-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200"
    },
    {
      icon: Shield,
      title: "Premium Protection",
      description: "Advanced ceramic coating and paint protection for lasting shine.",
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "100% biodegradable products and water recycling technology.",
      color: "text-emerald-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      icon: Clock,
      title: "Express Service",
      description: "Premium washes completed in under 20 minutes while you shop.",
      color: "text-orange-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200"
    }
  ];

  const plans = [
    {
      name: "Silver",
      price: "₹299",
      period: "/month",
      description: "Perfect for occasional shoppers",
      features: ["5 car washes per month", "Basic wash package", "SMS notifications", "Loyalty points"],
      badge: "",
      popular: false,
      gradient: "from-gray-400 to-gray-500",
      bgGradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Gold",
      price: "₹599",
      period: "/month",
      description: "Great for regular mall visitors",
      features: ["12 car washes per month", "Premium wash package", "Live video tracking", "Priority service", "2x loyalty points"],
      badge: "Most Popular",
      popular: true,
      gradient: "from-yellow-400 to-yellow-500",
      bgGradient: "from-yellow-50 to-yellow-100"
    },
    {
      name: "Platinum",
      price: "₹999",
      period: "/month",
      description: "Ultimate car care experience",
      features: ["Unlimited car washes", "Deluxe wash + wax", "Interior cleaning", "VIP parking spots", "3x loyalty points", "Monthly detailing"],
      badge: "Premium",
      popular: false,
      gradient: "from-purple-400 to-purple-500",
      bgGradient: "from-purple-50 to-purple-100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [stats.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 20,
            top: mousePosition.y / 20,
          }}
        />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Car className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Maire Wash
                </span>
                <div className="text-sm text-gray-600 font-medium -mt-1">While U Shop</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-semibold">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-up">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 shadow-lg">
                <Sparkles className="w-5 h-5 text-blue-500 mr-3 animate-pulse" />
                <span className="text-blue-700 font-bold text-base">AI-Powered Car Washing Revolution</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                  Smart Car Washing
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent animate-pulse">
                    While You Shop
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Experience the future of car care! Park your car, enjoy shopping, and return to a 
                  <span className="font-bold text-blue-600"> sparkling clean vehicle</span>. 
                  Our AI-powered system works like magic.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-xl px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group">
                    Start Free Trial
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-500 text-xl px-10 py-6 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 group">
                  <PlayCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </div>

              {/* Enhanced Dynamic Stats Row with Hover Transitions */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer group transform hover:scale-110 hover:shadow-2xl hover:-translate-y-2 ${
                        currentStat === index 
                          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 scale-110 shadow-xl' 
                          : 'bg-white/80 border-gray-200 hover:border-blue-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100'
                      }`}
                    >
                      <div className="text-center space-y-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-3xl font-black bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          {stat.number}
                        </div>
                        <div className="text-sm font-semibold text-gray-600 group-hover:text-blue-700 transition-colors duration-300">{stat.label}</div>
                      </div>
                      {currentStat === index && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl animate-pulse"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative animate-fade-up">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Professional car wash service with sparkling clean vehicles" 
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating Success Badge */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-xl animate-bounce">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  
                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-gray-900">98%</div>
                        <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Maire Wash?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of car washing with our innovative technology, premium services, and unmatched convenience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`group cursor-pointer border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-105 scroll-reveal ${feature.bgColor} overflow-hidden relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 ${feature.borderColor}`}>
                    <feature.icon className={`h-10 w-10 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">Choose Your Perfect Plan</h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Flexible subscription plans designed for every lifestyle and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden transition-all duration-500 hover:scale-105 scroll-reveal border-2 ${
                plan.popular 
                  ? 'ring-4 ring-blue-500 shadow-2xl border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100' 
                  : `shadow-lg hover:shadow-xl bg-gradient-to-br ${plan.bgGradient} border-gray-200`
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 text-base font-bold shadow-lg">
                      ⭐ {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center relative z-10 pt-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-black mb-4">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2 text-xl">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-600 text-lg">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 relative z-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-lg">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full text-lg py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
                  }`}>
                    {plan.popular ? '🚀 Get Started Now' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Our Amazing Journey</h2>
            <p className="text-xl text-blue-100">Numbers that speak for themselves</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="scroll-reveal group cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <Icon className="h-16 w-16 mx-auto mb-6 text-blue-200 group-hover:text-white transition-colors duration-300" />
                    <div className="text-6xl font-black mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-blue-200 font-bold text-lg group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Car className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    Maire Wash
                  </span>
                  <div className="text-sm text-gray-400 font-medium">While U Shop</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                Revolutionary AI-powered car washing experience in premium shopping malls across India. 
                Making car care effortless and enjoyable.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors duration-300">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors duration-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-black mb-6 text-2xl text-blue-300">Services</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">🤖 AI Auto Detection</li>
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">✨ Premium Detailing</li>
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">🏠 Interior Cleaning</li>
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">🛡️ Ceramic Coating</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-black mb-6 text-2xl text-blue-300">Company</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">Contact</li>
                <li className="hover:text-white transition-colors cursor-pointer text-lg font-medium hover:translate-x-2 transition-transform duration-300">Privacy Policy</li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-black mb-6 text-2xl text-blue-300">Contact</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="text-lg font-medium">📧 support@mairewash.com</li>
                <li className="text-lg font-medium">📞 +91 9876543210</li>
                <li className="text-lg font-medium">📍 Mumbai, India</li>
                <li className="text-lg font-medium">🕒 24/7 Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-16 pt-12 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2024 Maire Wash. All rights reserved. | 
              <span className="text-blue-400 font-medium"> Designed with ❤️ for the future of car care.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
