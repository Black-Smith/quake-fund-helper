import React from 'react';
import { Earth, Heart, Github, Twitter } from "lucide-react";
const Footer = () => {
  return <footer className="bg-earthquake-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Earth className="h-6 w-6 text-earthquake-primary" />
              <span className="font-bold text-xl">EarthquakeRelief</span>
            </div>
            <p className="text-sm text-gray-300">
              Dedicated to providing aid and support for victims of the 7.7 magnitude earthquake through transparent BNB donations.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-earthquake-primary transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-earthquake-primary transition-colors">About</a></li>
              <li><a href="/transparency" className="text-gray-300 hover:text-earthquake-primary transition-colors">Transparency</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-earthquake-primary transition-colors">BNB Donation Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-earthquake-primary transition-colors">Fund Distribution</a></li>
              
              <li><a href="#" className="text-gray-300 hover:text-earthquake-primary transition-colors">Blockchain Transparency</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-earthquake-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-earthquake-primary transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-earthquake-primary transition-colors">
                <Heart className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Contact: support@earthquakerelief.org
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EarthquakeRelief. All rights reserved.</p>
          <p className="mt-2">100% of donations go directly to earthquake victims and relief efforts.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;