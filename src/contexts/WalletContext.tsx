
import React, { createContext, useState, useEffect, useContext } from "react";
import { connectWallet, isWalletConnected, getWalletBalance, formatAddress, WalletProvider as WalletProviderType } from "@/lib/blockchain";
import { toast } from "@/hooks/use-toast";

// Update the WalletContextType type to include disconnect method
type WalletContextType = {
  address: string | null;
  shortAddress: string;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  walletType: string | null;
};

// Update the global declaration to use WalletProviderType
declare global {
  interface Window {
    ethereum?: WalletProviderType;
  }
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  shortAddress: "",
  balance: "0",
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
  walletType: null,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletType, setWalletType] = useState<string | null>(null);

  // Detect wallet type
  const detectWalletType = () => {
    if (!window.ethereum) return null;
    
    if (window.ethereum.isMetaMask) {
      return "MetaMask";
    } else if (window.ethereum.isTrust) {
      return "Trust Wallet";
    } else if (window.ethereum.isCoinbaseWallet) {
      return "Coinbase Wallet";
    } else if (window.ethereum.isTokenPocket) {
      return "TokenPocket";
    } else if (window.ethereum.isMathWallet) {
      return "Math Wallet";
    } else if (window.ethereum.isBinanceChainWallet) {
      return "Binance Wallet";
    } else {
      return "Web3 Wallet";
    }
  };

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkWallet = async () => {
      const connected = await isWalletConnected();
      if (connected) {
        const accounts = await window.ethereum?.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          const bal = await getWalletBalance(accounts[0]);
          setBalance(bal);
          setWalletType(detectWalletType());
        }
      }
    };
    
    checkWallet();
    
    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null);
        setIsConnected(false);
        setBalance("0");
        setWalletType(null);
      } else {
        setAddress(accounts[0]);
        setIsConnected(true);
        getWalletBalance(accounts[0]).then(bal => setBalance(bal));
        setWalletType(detectWalletType());
      }
    };
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  
  const connect = async () => {
    setIsConnecting(true);
    try {
      const account = await connectWallet();
      if (account) {
        setAddress(account);
        setIsConnected(true);
        const bal = await getWalletBalance(account);
        setBalance(bal);
        setWalletType(detectWalletType());
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Add disconnect method
  const disconnect = () => {
    try {
      // For most wallets, we can't force disconnect, so we just clear the state
      setAddress(null);
      setIsConnected(false);
      setBalance("0");
      setWalletType(null);
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected from the application."
      });
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      toast({
        title: "Disconnect Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const shortAddress = address ? formatAddress(address) : "";
  
  return (
    <WalletContext.Provider
      value={{
        address,
        shortAddress,
        balance,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        walletType
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
