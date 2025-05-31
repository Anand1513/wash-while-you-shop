
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookWash from "./pages/BookWash";
import TrackWash from "./pages/TrackWash";
import Subscription from "./pages/Subscription";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { RewardsProvider } from "./contexts/RewardsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RewardsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book-wash" element={<BookWash />} />
              <Route path="/track-wash" element={<TrackWash />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RewardsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
