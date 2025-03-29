
import React, { createContext, useState, useEffect, useContext } from "react";
import { 
  connectWallet, 
  isWalletConnected, 
  getWalletBalance, 
  formatAddress, 
  getWalletProvider,
  detectWalletType,
  WalletProvider as WalletProviderType 
} from "@/lib/blockchain";
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

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkWallet = async () => {
      const connected = await isWalletConnected();
      if (connected) {
        const provider = getWalletProvider();
        if (provider) {
          const accounts = await provider.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            const bal = await getWalletBalance(accounts[0]);
            setBalance(bal);
            setWalletType(detectWalletType(provider));
          }
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
        const provider = getWalletProvider();
        setWalletType(detectWalletType(provider));
      }
    };
    
    const provider = getWalletProvider();
    if (provider) {
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', () => window.location.reload());
    }
    
    return () => {
      if (provider) {
        provider.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  
  const connect = async () => {
    setIsConnecting(true);
    try {
      const { address: account, walletType: type } = await connectWallet();
      if (account) {
        setAddress(account);
        setIsConnected(true);
        const bal = await getWalletBalance(account);
        setBalance(bal);
        setWalletType(type);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Disconnect method
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
