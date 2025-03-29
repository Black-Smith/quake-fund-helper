
import React from 'react';
import { Button } from "@/components/ui/button";
import { Earth, HandCoins, Heart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";

const Header = () => {
  const { isConnected, shortAddress, balance, connect, isConnecting } = useWallet();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Earth className="h-6 w-6 text-earthquake-primary" />
          <span className="font-bold text-xl text-earthquake-dark">EarthquakeRelief</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-earthquake-dark hover:text-earthquake-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-earthquake-dark hover:text-earthquake-primary transition-colors">
            About
          </Link>
          <Link to="/impact" className="text-earthquake-dark hover:text-earthquake-primary transition-colors">
            Impact
          </Link>
          <Link to="/transparency" className="text-earthquake-dark hover:text-earthquake-primary transition-colors">
            Transparency
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="hidden md:flex items-center gap-2 border rounded-md border-earthquake-primary text-earthquake-primary px-3 py-1.5">
              <Wallet className="h-4 w-4" />
              <span>{shortAddress}</span>
              <span className="text-sm text-gray-500">{balance} BNB</span>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 border-earthquake-primary text-earthquake-primary hover:bg-earthquake-primary hover:text-white"
              onClick={connect}
              disabled={isConnecting}
            >
              <Wallet className="h-4 w-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </Button>
          )}
          <Link to="/transparency">
            <Button variant="outline" className="hidden md:flex items-center gap-2 border-earthquake-primary text-earthquake-primary hover:bg-earthquake-primary hover:text-white">
              <Heart className="h-4 w-4" />
              <span>Track Funds</span>
            </Button>
          </Link>
          <Link to="/#donate">
            <Button className="flex items-center gap-2 bg-earthquake-accent hover:bg-earthquake-accent/90 text-white">
              <HandCoins className="h-4 w-4" />
              <span>Donate BNB</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
