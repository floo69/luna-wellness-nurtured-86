
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if user is logged in
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('lunaLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
  
  const handleLogin = () => {
    navigate('/auth');
  };
  
  const handleSignUp = () => {
    navigate('/auth');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('lunaLoggedIn');
    setIsLoggedIn(false);
    // Refresh the page to reset all states
    window.location.reload();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-luna-purple to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold gradient-text">Luna</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              className="text-gray-700 hover:text-luna-purple transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
            >
              Home
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-luna-purple transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-luna-purple transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-luna-purple transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('testimonials');
              }}
            >
              Testimonials
            </a>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-luna-purple hover:bg-transparent flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-luna-purple hover:bg-transparent"
                  onClick={handleLogin}
                >
                  Log In
                </Button>
                <Button 
                  className="cta-button cta-button-primary"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-full bg-white shadow-md py-4 px-4 mt-0.5 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a 
                href="#" 
                className="text-gray-700 hover:text-luna-purple transition-colors duration-200 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
              >
                Home
              </a>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-luna-purple transition-colors duration-200 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
              >
                Features
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-luna-purple transition-colors duration-200 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }}
              >
                How It Works
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-luna-purple transition-colors duration-200 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('testimonials');
                }}
              >
                Testimonials
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                {isLoggedIn ? (
                  <Button 
                    variant="ghost" 
                    className="justify-center flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="justify-center"
                      onClick={handleLogin}
                    >
                      Log In
                    </Button>
                    <Button 
                      className="cta-button cta-button-primary justify-center"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
