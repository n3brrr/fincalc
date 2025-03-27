
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Random entertaining messages for 404 errors
  const messages = [
    "Oops! This page took a wrong turn at Albuquerque.",
    "Houston, we have a problem. This page doesn't exist.",
    "Looks like this page is playing hide and seek... and winning!",
    "This page has gone on vacation without leaving a forwarding address.",
    "404: Page not found. It probably ran away to join the circus.",
    "You've reached the edge of our digital universe!",
    "Well, this is awkward... we can't find that page.",
  ];

  // Select a random message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-finance-600 p-6 text-white text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-2 animate-pulse-subtle" />
          <h1 className="text-5xl font-bold">404</h1>
        </div>
        
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{randomMessage}</h2>
          
          <p className="text-gray-600 mb-6">
            The page at <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> was not found.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline" 
              className="mr-2 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate("/")} 
              className="bg-finance-600 hover:bg-finance-700 transition-all"
            >
              Take Me Home
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Lost? Try checking our <span className="text-finance-600 hover:underline cursor-pointer" onClick={() => navigate("/")}>homepage</span> or <span className="text-finance-600 hover:underline cursor-pointer" onClick={() => navigate("/contact")}>contact us</span> for help.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
