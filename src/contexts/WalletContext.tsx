
import React, { createContext, useState, useEffect, useContext } from "react";
import { connectWallet, isWalletConnected, getWalletBalance, formatAddress } from "@/lib/blockchain";

// Update the WalletProvider type to include event methods
type WalletContextType = {
  address: string | null;
  shortAddress: string;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
};

// Extend the WalletProvider type to include event methods
type EthereumProvider = {
  isMetaMask?: boolean;
  isTrust?: boolean;
  request: (args: {method: string; params?: any[]}) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
};

// Update the global declaration
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  shortAddress: "",
  balance: "0",
  isConnected: false,
  isConnecting: false,
  connect: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

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
      } else {
        setAddress(accounts[0]);
        setIsConnected(true);
        getWalletBalance(accounts[0]).then(bal => setBalance(bal));
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
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
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
        connect
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
