import React from "react";

const Footer = ({ onNavigateHome }) => {
  const handleNavigation = (event, sectionId) => {
    if (!onNavigateHome) return;
    event.preventDefault();
    onNavigateHome(sectionId);
  };

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tubezip
          </h2>

          <p className="text-gray-500 mt-2">
            Learn faster with AI-powered YouTube summaries.
          </p>
        </div>

        <div className="flex gap-8 text-gray-600">
          <a href="#features" onClick={(event) => handleNavigation(event, 'features')}>Features</a>
          <a href="#how-it-works" onClick={(event) => handleNavigation(event, 'how-it-works')}>How it Works</a>
          <a href="#">GitHub</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
