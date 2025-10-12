import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./contexts/ContentContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileBuilder from "./pages/ProfileBuilder";
import ProfileBuilderChooser from "./pages/ProfileBuilderChooser";
import Pages from "./pages/Pages";
import TemplateGallery from "./pages/TemplateGallery";
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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/pages" element={<ProtectedRoute><Pages /></ProtectedRoute>} />
            <Route path="/profile-builder/new" element={<ProtectedRoute><ProfileBuilderChooser /></ProtectedRoute>} />
            <Route path="/profile-builder" element={<ProtectedRoute><ProfileBuilder /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><TemplateGallery /></ProtectedRoute>} />
            <Route path="/media" element={<ProtectedRoute><Media /></ProtectedRoute>} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/preview/:slug" element={<Preview />} />
            <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
            <Route path="/stories" element={<ProtectedRoute><Stories /></ProtectedRoute>} />
            <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/discounts" element={<ProtectedRoute><Discounts /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/following" element={<ProtectedRoute><Following /></ProtectedRoute>} />
            <Route path="/followers" element={<ProtectedRoute><Followers /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
            <Route path="/growth" element={<ProtectedRoute><Growth /></ProtectedRoute>} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
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
