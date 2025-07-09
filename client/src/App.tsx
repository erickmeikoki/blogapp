import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Post from "@/pages/post";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/post/:id" component={Post} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Router />
          <footer className="surface border-t border-gray-200 mt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-bold text-primary mb-4">My Blog</h3>
                  <p className="text-secondary leading-relaxed mb-6">
                    Sharing thoughts, insights, and experiences on technology, design, and life. 
                    Join the conversation and let's learn together.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-accent text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-accent text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-accent text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-secondary hover:text-primary transition-colors duration-200">Home</a></li>
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">About</a></li>
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">Archive</a></li>
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-4">Categories</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">Technology</a></li>
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">Design</a></li>
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">Productivity</a></li>
                    <li><a href="#" className="text-secondary hover:text-primary transition-colors duration-200">Career</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                <p className="text-secondary">© 2024 My Blog. All rights reserved. Built with ❤️ and modern web technologies.</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
