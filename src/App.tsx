
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Demo from "./pages/Demo";
import Solutions from "./pages/Solutions";
import Dashboard from "./pages/Dashboard";
import TimeTracking from "./pages/TimeTracking";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Trial from "./pages/Trial";
import Login from "./pages/Login";
import { useAuth } from "./hooks/use-auth";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  
  if (isLoggedIn === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }
  
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <UserProvider>
            <Toaster />
            <Sonner position="bottom-right" closeButton={true} />
            <BrowserRouter>
              <Routes>
                {/* Landing page redirects to login if not authenticated, dashboard if authenticated */}
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
                
                {/* Public routes */}
                <Route path="/features" element={<Index />} />
                <Route path="/integrations" element={<Index />} />
                <Route path="/pricing" element={<Index />} />
                <Route path="/security" element={<Index />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/:category" element={<Solutions />} />
                <Route path="/enterprise/*" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/trial" element={<Trial />} />
                
                {/* Auth routes */}
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/reset-password" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/time-tracking" element={<ProtectedRoute><TimeTracking /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/settings/:tab" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
