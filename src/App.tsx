import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./contexts/ContentContext";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileBuilder from "./pages/ProfileBuilder";
import Media from "./pages/Media";
import Preview from "./pages/Preview";
import Posts from "./pages/Posts";
import Stories from "./pages/Stories";
import Reels from "./pages/Reels";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Discounts from "./pages/Discounts";
import Payments from "./pages/Payments";
import Following from "./pages/Following";
import Followers from "./pages/Followers";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Sales from "./pages/Sales";
import Growth from "./pages/Growth";
import Discover from "./pages/Discover";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ContentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-builder" element={<ProfileBuilder />} />
            <Route path="/media" element={<Media />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/following" element={<Following />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/growth" element={<Growth />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ContentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
