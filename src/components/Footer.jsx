import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            © 2024 Your Company. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="/privacy" className="text-white hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white hover:underline">
              Terms of Service
            </a>
            {/* Add more links as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
