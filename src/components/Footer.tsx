
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-finance-600 to-finance-800 bg-clip-text text-transparent">
                FinCalc
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              Empowering individuals to make smarter financial decisions with intuitive calculation tools.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-finance-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-finance-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/features" className="text-sm text-gray-500 hover:text-finance-600">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-500 hover:text-finance-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-finance-600">
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-finance-600">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-finance-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-finance-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-500 hover:text-finance-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-500 hover:text-finance-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-finance-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-finance-600">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-gray-500 hover:text-finance-600">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="py-8 border-t border-gray-200 md:flex md:items-center md:justify-between">
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FinCalc, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-finance-600">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-finance-600">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-500 hover:text-finance-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
