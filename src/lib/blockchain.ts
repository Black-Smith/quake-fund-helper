import { toast } from "@/hooks/use-toast";

// Types for wallet connection
export type WalletProvider = {
  isMetaMask?: boolean;
  isTrust?: boolean;
  request: (args: {method: string; params?: any[]}) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: WalletProvider;
  }
}

// BSC Mainnet configuration
export const BSC_NETWORK = {
  chainId: '0x38',  // 56 in decimal
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};

// BNB donation address
export const DONATION_ADDRESS = "0x319A392465c0BFDDB4f8654768cB5095BeC7D88F";

// Check if wallet is connected
export const isWalletConnected = async (): Promise<boolean> => {
  try {
    if (!window.ethereum) return false;
    
    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    });
    
    return accounts && accounts.length > 0;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return false;
  }
};

// Connect wallet
export const connectWallet = async (): Promise<string | null> => {
  try {
    if (!window.ethereum) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another BSC-compatible wallet.",
        variant: "destructive"
      });
      return null;
    }
    
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    
    // Switch to BSC network if needed
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_NETWORK.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BSC_NETWORK],
          });
        } catch (addError) {
          console.error("Error adding BSC network:", addError);
          toast({
            title: "Network Error",
            description: "Could not add Binance Smart Chain to your wallet.",
            variant: "destructive"
          });
          return null;
        }
      }
    }
    
    if (accounts && accounts.length > 0) {
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
      return accounts[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    toast({
      title: "Connection Error",
      description: "Failed to connect wallet. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};

// Get wallet balance
export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    if (!window.ethereum) return "0";
    
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    
    // Convert from wei to BNB (1 BNB = 10^18 wei)
    const bnbBalance = parseInt(balance, 16) / Math.pow(10, 18);
    return bnbBalance.toFixed(4);
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0";
  }
};

// Send BNB donation
export const sendDonation = async (
  fromAddress: string, 
  amount: number
): Promise<{success: boolean; txHash?: string; error?: string}> => {
  try {
    if (!window.ethereum) {
      return {
        success: false,
        error: "No wallet provider found"
      };
    }
    
    // Convert BNB amount to wei
    const amountInWei = `0x${(amount * Math.pow(10, 18)).toString(16)}`;
    
    // Send transaction
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: fromAddress,
        to: DONATION_ADDRESS,
        value: amountInWei,
        gas: '0x5208', // 21000 gas limit for simple transfers
      }],
    });
    
    return {
      success: true,
      txHash
    };
  } catch (error: any) {
    console.error("Error sending donation:", error);
    return {
      success: false,
      error: error.message || "Failed to send donation"
    };
  }
};

// Get transaction receipt
export const getTransactionReceipt = async (txHash: string): Promise<any> => {
  try {
    if (!window.ethereum) return null;
    
    const receipt = await window.ethereum.request({
      method: 'eth_getTransactionReceipt',
      params: [txHash],
    });
    
    return receipt;
  } catch (error) {
    console.error("Error getting transaction receipt:", error);
    return null;
  }
};

// Format wallet address for display
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
