import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">
                My Blog
              </h1>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/">
                <a className="text-secondary hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </Link>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                About
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                Archive
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden text-secondary hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="space-y-2">
              <Link href="/">
                <a className="block text-secondary hover:text-primary transition-colors duration-200 py-2">
                  Home
                </a>
              </Link>
              <a href="#" className="block text-secondary hover:text-primary transition-colors duration-200 py-2">
                About
              </a>
              <a href="#" className="block text-secondary hover:text-primary transition-colors duration-200 py-2">
                Archive
              </a>
              <a href="#" className="block text-secondary hover:text-primary transition-colors duration-200 py-2">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
