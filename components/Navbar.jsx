"use client";

import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white mb-8">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-globaly-900">React Learning Project</h2> */}
        <h2 className="text-white">React Learning Project</h2>
        <button 
          onClick={toggleMenu}
          className="bg-transparent border border-white rounded-lg text-white px-2 py-1 cursor-pointer hover:bg-white hover:text-blue-600 transition-colors"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      {isMenuOpen && (
        <ul className="list-none p-0 mt-4">
          <li className="mb-2">Home</li>
          <li className="mb-2">Components</li>
          <li className="mb-2">About</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
