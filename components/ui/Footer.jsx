"use client";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} My Next.js App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;