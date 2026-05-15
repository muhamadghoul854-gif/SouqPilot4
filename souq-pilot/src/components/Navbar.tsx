"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-sky-300 transition-all duration-200">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-l from-sky-600 to-sky-400 bg-clip-text text-transparent">
              Souq Pilot
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/#products"
              className="text-slate-600 hover:text-sky-600 font-medium transition-colors"
            >
              المنتجات
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold px-4 py-2 rounded-xl transition-all duration-200 border border-sky-200"
            >
              <span>⚙️</span>
              <span>لوحة التحكم</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-sky-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-sky-100 space-y-2 animate-fade-in">
            <Link href="/" className="block px-4 py-2 text-slate-600 hover:text-sky-600 font-medium" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link href="/#products" className="block px-4 py-2 text-slate-600 hover:text-sky-600 font-medium" onClick={() => setMenuOpen(false)}>المنتجات</Link>
            <Link href="/admin" className="block px-4 py-2 text-sky-700 font-semibold" onClick={() => setMenuOpen(false)}>⚙️ لوحة التحكم</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
