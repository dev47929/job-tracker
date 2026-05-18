import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center w-full sticky top-0 z-50">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-extrabold text-white tracking-tight hover:opacity-90 transition">
            Job<span className="text-indigo-400">Stack</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="flex items-center gap-6 text-sm font-semibold text-slate-350">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li className="hidden md:block">
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </li>
            <li className="relative group">
              <button className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl transition cursor-pointer flex items-center gap-1">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                <li>
                  <Link to="/auth/login" className="block px-4 py-2 hover:bg-slate-700 hover:text-white rounded-lg transition text-left">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/signup" className="block px-4 py-2 hover:bg-slate-700 hover:text-white rounded-lg transition text-left">
                    Signup
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
