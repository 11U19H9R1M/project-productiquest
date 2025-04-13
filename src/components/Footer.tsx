
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <span className="text-xl font-bold gradient-text">ProductiQuest</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered remote work platform for teams of all sizes. 
              Enhance productivity, gain insights, and secure your work data.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Product
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link to="/features" className="text-sm text-gray-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/integrations" className="text-sm text-gray-400 hover:text-white">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-sm text-gray-400 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/enterprise" className="text-sm text-gray-400 hover:text-white">
                      Enterprise
                    </Link>
                  </li>
                  <li>
                    <Link to="/security" className="text-sm text-gray-400 hover:text-white">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link to="/blog" className="text-sm text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/docs" className="text-sm text-gray-400 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/api" className="text-sm text-gray-400 hover:text-white">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link to="/help" className="text-sm text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-sm text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-sm text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/partners" className="text-sm text-gray-400 hover:text-white">
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/security-policy" className="text-sm text-gray-400 hover:text-white">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link to="/compliance" className="text-sm text-gray-400 hover:text-white">
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ProductiQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
