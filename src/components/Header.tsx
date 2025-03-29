
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Earth, HandCoins, Heart, Wallet, ChevronDown, LogOut, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header = () => {
  const { 
    isConnected, 
    shortAddress, 
    balance, 
    connect, 
    disconnect, 
    isConnecting, 
    walletType, 
    isCorrectNetwork,
    switchNetwork,
    networkName
  } = useWallet();

  // Prompt user to switch networks when detected on the wrong one
  useEffect(() => {
    if (isConnected && !isCorrectNetwork) {
      // We don't auto-switch - just show the UI prompt
      console.log("Detected user on wrong network");
    }
  }, [isConnected, isCorrectNetwork]);

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
          <Link to="/transparency" className="text-earthquake-dark hover:text-earthquake-primary transition-colors">
            Transparency
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isConnected && !isCorrectNetwork && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Wrong Network</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Wrong Network Detected</AlertDialogTitle>
                  <AlertDialogDescription>
                    This application requires the Binance Smart Chain network to function properly. 
                    Please switch to BSC to continue using the application.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={switchNetwork}>
                    Switch to {networkName}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-earthquake-primary text-earthquake-primary hover:bg-earthquake-primary hover:text-white">
                  <Wallet className="h-4 w-4" />
                  <span>{shortAddress}</span>
                  <span className="text-sm text-gray-500">{balance} BNB</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
                {walletType && (
                  <DropdownMenuItem className="text-xs text-gray-500 cursor-default">
                    {walletType}
                  </DropdownMenuItem>
                )}
                {!isCorrectNetwork && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:text-red-500 flex items-center gap-2" onClick={switchNetwork}>
                      <AlertTriangle className="h-4 w-4" />
                      <span>Switch to {networkName}</span>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive flex items-center gap-2" onClick={disconnect}>
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <Button 
              className="flex items-center gap-2 bg-earthquake-accent hover:bg-earthquake-accent/90 text-white"
              disabled={isConnected && !isCorrectNetwork}
            >
              <HandCoins className="h-4 w-4" />
              <span>Donate BNB</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {isConnected && !isCorrectNetwork && (
        <Alert variant="destructive" className="rounded-none">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Wrong Network</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Please switch to Binance Smart Chain network for this application to work properly.</span>
            <Button size="sm" variant="outline" onClick={switchNetwork} className="ml-4 whitespace-nowrap">
              Switch Network
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </header>
  );
};

export default Header;
