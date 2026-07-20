import React from "react";

function Navbar({ onNavigateHome }) {
  const handleNavigation = (event, sectionId) => {
    if (!onNavigateHome) return;
    event.preventDefault();
    onNavigateHome(sectionId);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onClick={(event) => handleNavigation(event)}
        >
          <img
            src="/Tubezip1.png"
            alt="Tubezip Logo"
            className="h-10 w-10 rounded-lg"
          />

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Tubezip
            </h2>
            <p className="text-xs text-gray-500">
              AI Learning
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 text-gray-700 md:flex">
          <a href="#features" onClick={(event) => handleNavigation(event, 'features')}>Features</a>
          <a href="#how-it-works" onClick={(event) => handleNavigation(event, 'how-it-works')}>How It Works</a>

          <button
            type="button"
            onClick={(event) => handleNavigation(event)}
            className="rounded-lg bg-black px-5 py-2 text-white"
          >
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
