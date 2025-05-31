
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  isAdmin: boolean;
  loyaltyPoints: number;
  subscription: 'none' | 'silver' | 'gold' | 'platinum';
  wallet: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo users
      const demoUsers: User[] = [
        {
          id: '1',
          email: 'admin@autowash.com',
          name: 'Admin User',
          phone: '+91 9876543210',
          isAdmin: true,
          loyaltyPoints: 0,
          subscription: 'none',
          wallet: 1000
        },
        {
          id: '2',
          email: 'john@example.com',
          name: 'John Doe',
          phone: '+91 9876543211',
          isAdmin: false,
          loyaltyPoints: 250,
          subscription: 'gold',
          wallet: 500
        }
      ];

      const foundUser = demoUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try admin@autowash.com / password or john@example.com / password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        phone,
        isAdmin: false,
        loyaltyPoints: 100, // Welcome bonus
        subscription: 'none',
        wallet: 0
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: `Welcome ${name}! You've earned 100 loyalty points as a welcome bonus.`
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
