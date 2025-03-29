
import React, { createContext, useState, useEffect, useContext } from "react";
import { 
  connectWallet, 
  isWalletConnected, 
  getWalletBalance, 
  formatAddress, 
  WalletProvider as WalletProviderType,
  isBscNetwork,
  switchToBscNetwork,
  BSC_NETWORK
} from "@/lib/blockchain";
import { toast } from "@/hooks/use-toast";

// Update the WalletContextType type to include network status
type WalletContextType = {
  address: string | null;
  shortAddress: string;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  walletType: string | null;
  isCorrectNetwork: boolean;
  switchNetwork: () => Promise<void>;
  networkName: string;
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
  isCorrectNetwork: false,
  switchNetwork: async () => {},
  networkName: BSC_NETWORK.chainName,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

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

  // Check network status
  const checkNetworkStatus = async () => {
    const onCorrectNetwork = await isBscNetwork();
    setIsCorrectNetwork(onCorrectNetwork);
  };

  // Switch to BSC network
  const switchNetwork = async () => {
    await switchToBscNetwork();
    await checkNetworkStatus();
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
          await checkNetworkStatus();
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
    
    // Listen for network changes
    const handleChainChanged = () => {
      checkNetworkStatus();
      // Reload the page on chain change as recommended by MetaMask
      window.location.reload();
    };
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
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
        await checkNetworkStatus();
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
        walletType,
        isCorrectNetwork,
        switchNetwork,
        networkName: BSC_NETWORK.chainName
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
