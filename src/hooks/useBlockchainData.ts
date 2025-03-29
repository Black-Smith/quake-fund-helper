
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { DONATION_ADDRESS } from '@/lib/blockchain';
import { toast } from "@/hooks/use-toast";

// Define types for the blockchain data
type Transaction = {
  id: string;
  date: string;
  amount: string;
  txHash: string;
  donor: string;
};

type Distribution = {
  id: string;
  date: string;
  amount: string;
  txHash: string;
  purpose: string;
  recipient: string;
};

// Etherscan API response types
type EtherscanTransaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  isError: string;
  input: string;
};

type EtherscanResponse = {
  status: string;
  message: string;
  result: EtherscanTransaction[];
};

type BlockchainStats = {
  totalDonations: string;
  donorCount: number;
  distributedAmount: string;
  recentDonations: Transaction[];
  recentDistributions: Distribution[];
  isLoading: boolean;
  refreshData: () => void;
};

// Etherscan API key and URL for Sepolia
const ETHERSCAN_API_KEY = "YourEtherscanAPIKey"; // Replace with your Etherscan API key
const ETHERSCAN_API_URL = "https://api-sepolia.etherscan.io/api";

// Start date timestamp - March 29, 2025
const START_DATE_TIMESTAMP = Math.floor(new Date('2025-03-29T00:00:00Z').getTime() / 1000).toString();

export const useBlockchainData = (): BlockchainStats => {
  const { address } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [totalDonations, setTotalDonations] = useState('0');
  const [donorCount, setDonorCount] = useState(0);
  const [distributedAmount, setDistributedAmount] = useState('0');
  const [recentDonations, setRecentDonations] = useState<Transaction[]>([]);
  const [recentDistributions, setRecentDistributions] = useState<Distribution[]>([]);

  // Convert Wei to ETH
  const weiToEth = (wei: string): string => {
    const ethValue = parseInt(wei) / 1e18;
    return ethValue.toFixed(4);
  };

  // Format timestamp to date
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toISOString().split('T')[0];
  };

  // Get unique donors count
  const getUniqueDonorsCount = (transactions: EtherscanTransaction[]): number => {
    const uniqueDonors = new Set();
    transactions.forEach(tx => {
      if (tx.to.toLowerCase() === DONATION_ADDRESS.toLowerCase()) {
        uniqueDonors.add(tx.from.toLowerCase());
      }
    });
    return uniqueDonors.size;
  };

  // Calculate total donations
  const calculateTotalDonations = (transactions: EtherscanTransaction[]): string => {
    let total = 0;
    transactions.forEach(tx => {
      if (tx.to.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0") {
        total += parseInt(tx.value);
      }
    });
    return (total / 1e18).toFixed(4);
  };

  // Calculate distributed amount (outgoing transactions from donation address)
  const calculateDistributedAmount = (transactions: EtherscanTransaction[]): string => {
    let total = 0;
    transactions.forEach(tx => {
      if (tx.from.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0") {
        total += parseInt(tx.value);
      }
    });
    return (total / 1e18).toFixed(4);
  };

  // Convert transactions to our application format
  const convertToTransactions = (ethTransactions: EtherscanTransaction[]): Transaction[] => {
    return ethTransactions
      .filter(tx => tx.to.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0")
      .map(tx => ({
        id: tx.hash,
        date: formatTimestamp(tx.timeStamp),
        amount: `${weiToEth(tx.value)} ETH`,
        txHash: tx.hash,
        donor: tx.from
      }))
      .slice(0, 5); // Get the 5 most recent donations
  };

  // Convert outgoing transactions to distributions format
  const convertToDistributions = (ethTransactions: EtherscanTransaction[]): Distribution[] => {
    return ethTransactions
      .filter(tx => tx.from.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0")
      .map(tx => ({
        id: tx.hash,
        date: formatTimestamp(tx.timeStamp),
        amount: `${weiToEth(tx.value)} ETH`,
        txHash: tx.hash,
        purpose: "Relief Funds", // This would ideally be decoded from input data
        recipient: tx.to
      }))
      .slice(0, 5); // Get the 5 most recent distributions
  };

  // Fetch transaction data from Etherscan
  const fetchTransactionData = async () => {
    try {
      // Get incoming transactions (donations) from the start date
      const incomingResponse = await fetch(
        `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${DONATION_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${ETHERSCAN_API_KEY}`
      );
      
      if (!incomingResponse.ok) {
        throw new Error(`Etherscan API responded with status: ${incomingResponse.status}`);
      }
      
      const incomingData: EtherscanResponse = await incomingResponse.json();

      if (incomingData.status === "1") {
        const transactions = incomingData.result;
        
        // Apply start date filter to ensure we're only processing transactions after March 29, 2025
        const filteredTransactions = transactions.filter(tx => 
          parseInt(tx.timeStamp) >= parseInt(START_DATE_TIMESTAMP)
        );
        
        setTotalDonations(calculateTotalDonations(filteredTransactions));
        setDonorCount(getUniqueDonorsCount(filteredTransactions));
        setRecentDonations(convertToTransactions(filteredTransactions));
        
        // Get outgoing transactions (distributions) from the start date
        const outgoingResponse = await fetch(
          `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${DONATION_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${ETHERSCAN_API_KEY}`
        );
        
        if (!outgoingResponse.ok) {
          throw new Error(`Etherscan API responded with status: ${outgoingResponse.status}`);
        }
        
        const outgoingData: EtherscanResponse = await outgoingResponse.json();
        
        if (outgoingData.status === "1") {
          // Apply start date filter to ensure we're only processing transactions after March 29, 2025
          const filteredOutgoingTransactions = outgoingData.result.filter(tx => 
            parseInt(tx.timeStamp) >= parseInt(START_DATE_TIMESTAMP)
          );
          
          setDistributedAmount(calculateDistributedAmount(filteredOutgoingTransactions));
          setRecentDistributions(convertToDistributions(filteredOutgoingTransactions));
        } else {
          throw new Error(`Etherscan API error: ${outgoingData.message}`);
        }
      } else {
        throw new Error(`Etherscan API error: ${incomingData.message}`);
      }
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
      
      // Show error toast with more detailed information
      toast({
        title: "Blockchain Data Error",
        description: `Could not fetch real-time blockchain data: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        variant: "destructive"
      });
      
      // Initialize with empty data instead of placeholders
      setTotalDonations('0');
      setDonorCount(0);
      setDistributedAmount('0');
      setRecentDonations([]);
      setRecentDistributions([]);
    }
  };

  const fetchBlockchainData = async () => {
    setIsLoading(true);
    
    try {
      await fetchTransactionData();
    } catch (error) {
      console.error("Error in fetchBlockchainData:", error);
      // All error handling is done in fetchTransactionData
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchBlockchainData();
  }, [address]);

  return {
    totalDonations,
    donorCount,
    distributedAmount,
    recentDonations,
    recentDistributions,
    isLoading,
    refreshData: fetchBlockchainData
  };
};
