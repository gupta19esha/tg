'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        // Prevent caching of the auth check
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Add event listener for custom auth events
    window.addEventListener('authStateChanged', checkAuth);

    return () => {
      window.removeEventListener('authStateChanged', checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      
      if (response.ok) {
        setUser(null);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('authStateChanged'));
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-accent-dark shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-primary font-bold text-xl">
              Tic Tac Toe AI
            </Link>
            <div className="animate-pulse bg-accent h-8 w-20 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-accent-dark shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-primary font-bold text-xl">
            Tic Tac Toe AI
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-primary">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary">
                  Login
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 