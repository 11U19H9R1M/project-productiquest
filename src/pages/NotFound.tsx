
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home, Search, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  const suggestedRoutes = [
    { name: "Dashboard", path: "/dashboard", description: "View your productivity dashboard" },
    { name: "Time Tracking", path: "/time-tracking", description: "Track your work hours" },
    { name: "Projects", path: "/projects", description: "View your current projects" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="text-7xl sm:text-9xl font-extrabold text-gray-900 dark:text-gray-100 opacity-90">404</div>
                <div className="absolute -top-4 -right-4 bg-red-500 dark:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center animate-pulse shadow-md dark:shadow-red-500/20">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
            </div>
            
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Page not found
            </h1>
            
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              We couldn't find the page you're looking for: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{path}</span>
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={goBack}
                className="inline-flex items-center dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              
              <Link to="/">
                <Button className="inline-flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
              You might be looking for
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {suggestedRoutes.map((route) => (
                <Link 
                  key={route.path} 
                  to={route.path}
                  className="relative block p-6 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {route.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {route.description}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <ArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 backdrop-blur-sm border border-transparent dark:border-purple-800/30">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <HelpCircle className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Need help finding something?
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Our support team is here to help you navigate our platform.
                </p>
                <div className="mt-3">
                  <Link to="/demo">
                    <Button variant="outline" size="sm" className="inline-flex items-center dark:border-gray-700 dark:hover:bg-gray-700/50">
                      <Search className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
