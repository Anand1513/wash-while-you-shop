import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Car, Clock, Star, Users, Award, Camera, CheckCircle, ArrowRight, Sparkles, Zap, Shield, Leaf, Building2 } from "lucide-react";

const Index = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "200K+", label: "Cars Washed", icon: Car },
    { number: "25", label: "Mall Locations", icon: Building2 },
    { number: "98%", label: "Satisfaction", icon: Star }
  ];

  const features = [
    {
      icon: Zap,
      title: "AI Auto-Detection",
      description: "Your car is automatically detected when parked. No manual booking required!",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Camera,
      title: "Live Wash Tracking",
      description: "Watch your car wash progress in real-time with our live camera feed.",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Star,
      title: "Loyalty Rewards",
      description: "Earn points with every wash and unlock exclusive discounts and offers.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Shield,
      title: "Premium Protection",
      description: "Advanced ceramic coating and paint protection for lasting shine.",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "100% biodegradable products and water recycling technology.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Clock,
      title: "Express Service",
      description: "Premium washes completed in under 20 minutes while you shop.",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
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
      gradient: "from-gray-400 to-gray-500"
    },
    {
      name: "Gold",
      price: "₹599",
      period: "/month",
      description: "Great for regular mall visitors",
      features: ["12 car washes per month", "Premium wash package", "Live video tracking", "Priority service", "2x loyalty points"],
      badge: "Most Popular",
      popular: true,
      gradient: "from-yellow-400 to-yellow-500"
    },
    {
      name: "Platinum",
      price: "₹999",
      period: "/month",
      description: "Ultimate car care experience",
      features: ["Unlimited car washes", "Deluxe wash + wax", "Interior cleaning", "VIP parking spots", "3x loyalty points", "Monthly detailing"],
      badge: "Premium",
      popular: false,
      gradient: "from-purple-400 to-purple-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Maire Wash
                </span>
                <div className="text-xs text-gray-500 -mt-1">While U Shop</div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-green-600/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-6">
                <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-blue-700 font-medium text-sm">AI-Powered Car Washing</span>
              </div>
              
              <h1 className="hero-title font-black text-gray-900 mb-6">
                Smart Car Washing
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  While You Shop
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Park your car, enjoy shopping, and return to a sparkling clean vehicle. 
                Our AI-powered system detects your car and provides premium washing services during your mall visit.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register">
                  <Button size="lg" className="btn-primary text-lg px-8 py-4">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-all duration-300">
                    <Camera className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Dynamic Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center p-4 rounded-xl transition-all duration-500 ${
                        currentStat === index ? 'bg-blue-50 scale-105' : 'bg-white/50'
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                      <div className="text-2xl font-bold stats-highlight">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-3xl animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Modern car wash technology" 
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl animate-float"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-bounce">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold shadow-lg">
                    98% Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">Maire Wash?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of car washing with our innovative technology and premium services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`card-modern scroll-reveal hover:shadow-2xl group cursor-pointer`} style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible subscription plans designed for every type of car owner
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden transition-all duration-500 hover:scale-105 scroll-reveal ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-2xl' : 'shadow-lg hover:shadow-xl'
              }`} style={{animationDelay: `${index * 0.1}s`}}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 text-sm font-semibold">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center relative">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full mt-6 ${plan.popular ? 'btn-primary' : 'btn-accent'} text-lg py-3`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="scroll-reveal" style={{animationDelay: `${index * 0.1}s`}}>
                  <Icon className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                  <div className="text-5xl font-black mb-2">{stat.number}</div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Maire Wash</span>
                  <div className="text-xs text-gray-400">While U Shop</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionary AI-powered car washing experience in premium shopping malls across India.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">AI Auto Detection</li>
                <li className="hover:text-white transition-colors cursor-pointer">Premium Detailing</li>
                <li className="hover:text-white transition-colors cursor-pointer">Interior Cleaning</li>
                <li className="hover:text-white transition-colors cursor-pointer">Ceramic Coating</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li>📧 support@mairewash.com</li>
                <li>📞 +91 9876543210</li>
                <li>📍 Mumbai, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Maire Wash. All rights reserved. | Designed with ❤️ for the future of car care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
