import React from "react";

function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/Tubezipp1.png"
            alt="Tubezipp Logo"
            className="h-10 w-10 rounded-lg"
          />

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Tubezipp
            </h2>
            <p className="text-xs text-gray-500">
              AI Learning
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 text-gray-700 md:flex">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">FAQ</a>

          <button className="text-gray-700">
            Login
          </button>

          <button className="rounded-lg bg-black px-5 py-2 text-white">
            Get Started
          </button>
        </div>

        {/* Mobile */}
        <button className="text-2xl md:hidden">
          ☰
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
