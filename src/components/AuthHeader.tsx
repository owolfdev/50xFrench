"use client";

import { useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Redirect to home route when user logs in and we're on landing page
      if (
        session?.user &&
        window.location.pathname === "/" &&
        !window.location.search.includes("source=pwa")
      ) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Handle initial redirect for authenticated users
  useEffect(() => {
    if (
      user &&
      window.location.pathname === "/" &&
      !window.location.search.includes("source=pwa")
    ) {
      router.push("/");
    }
  }, [user, router]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header>
      <div className="container mx-auto px-4 pt-4 pb-2 md:py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/app-icon.png"
              alt="Répéter Logo"
              width={28}
              height={28}
              className="rounded-lg md:w-9 md:h-9"
            />
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Répéter
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="text-white/80 hover:text-white text-sm md:text-base transition-colors font-medium"
            >
              Practice
            </Link>
            <Link
              href="/lessons"
              className="text-white/80 hover:text-white text-sm md:text-base transition-colors font-medium"
            >
              Lessons
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop Auth */}
            <div className="hidden md:block">
              {loading ? (
                <div className="w-8 h-8 bg-white/20 rounded animate-pulse" />
              ) : user ? (
                <UserDropdown user={user} />
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push("/auth/login")}
                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
                  >
                    Login
                  </button>
                  <span className="text-white/40">|</span>
                  <button
                    onClick={() => router.push("/auth/sign-up")}
                    className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden mt-4 pb-4">
            <nav className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
              <Link
                href="/"
                className="block text-white/80 hover:text-white text-base transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Practice
              </Link>
              <Link
                href="/lessons"
                className="block text-white/80 hover:text-white text-base transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lessons
              </Link>

              {/* Mobile Auth */}
              {!loading && !user && (
                <div className="pt-3 border-t border-white/20 space-y-2">
                  <button
                    onClick={() => {
                      router.push("/auth/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/80 hover:text-white text-base transition-colors py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      router.push("/auth/sign-up");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/80 hover:text-white text-base transition-colors py-2"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile User Dropdown */}
              {!loading && user && (
                <div className="pt-3 border-t border-white/20">
                  <div className="px-2">
                    <UserDropdown user={user} />
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
