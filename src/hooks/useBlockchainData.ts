
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

// BSCScan API response types
type BscScanTransaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  isError: string;
  input: string;
};

type BscScanResponse = {
  status: string;
  message: string;
  result: BscScanTransaction[];
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

// BSCScan API key
const BSCSCAN_API_KEY = "NR1SPC7ZW29P2G27WQH2J4H28GB16P8MNV";
const BSCSCAN_API_URL = "https://api.bscscan.com/api";

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

  // Convert Wei to BNB
  const weiToBnb = (wei: string): string => {
    const bnbValue = parseInt(wei) / 1e18;
    return bnbValue.toFixed(4);
  };

  // Format timestamp to date
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toISOString().split('T')[0];
  };

  // Get unique donors count
  const getUniqueDonorsCount = (transactions: BscScanTransaction[]): number => {
    const uniqueDonors = new Set();
    transactions.forEach(tx => {
      if (tx.to.toLowerCase() === DONATION_ADDRESS.toLowerCase()) {
        uniqueDonors.add(tx.from.toLowerCase());
      }
    });
    return uniqueDonors.size;
  };

  // Calculate total donations
  const calculateTotalDonations = (transactions: BscScanTransaction[]): string => {
    let total = 0;
    transactions.forEach(tx => {
      if (tx.to.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0") {
        total += parseInt(tx.value);
      }
    });
    return (total / 1e18).toFixed(4);
  };

  // Calculate distributed amount (outgoing transactions from donation address)
  const calculateDistributedAmount = (transactions: BscScanTransaction[]): string => {
    let total = 0;
    transactions.forEach(tx => {
      if (tx.from.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0") {
        total += parseInt(tx.value);
      }
    });
    return (total / 1e18).toFixed(4);
  };

  // Convert transactions to our application format
  const convertToTransactions = (bscTransactions: BscScanTransaction[]): Transaction[] => {
    return bscTransactions
      .filter(tx => tx.to.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0")
      .map(tx => ({
        id: tx.hash,
        date: formatTimestamp(tx.timeStamp),
        amount: `${weiToBnb(tx.value)} BNB`,
        txHash: tx.hash,
        donor: tx.from
      }))
      .slice(0, 5); // Get the 5 most recent donations
  };

  // Convert outgoing transactions to distributions format
  const convertToDistributions = (bscTransactions: BscScanTransaction[]): Distribution[] => {
    return bscTransactions
      .filter(tx => tx.from.toLowerCase() === DONATION_ADDRESS.toLowerCase() && tx.isError === "0")
      .map(tx => ({
        id: tx.hash,
        date: formatTimestamp(tx.timeStamp),
        amount: `${weiToBnb(tx.value)} BNB`,
        txHash: tx.hash,
        purpose: "Relief Funds", // This would ideally be decoded from input data
        recipient: tx.to
      }))
      .slice(0, 5); // Get the 5 most recent distributions
  };

  // Fetch transaction data from BSCScan
  const fetchTransactionData = async () => {
    try {
      // Get incoming transactions (donations) from the start date
      const incomingResponse = await fetch(
        `${BSCSCAN_API_URL}?module=account&action=txlist&address=${DONATION_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=100&starttime=${START_DATE_TIMESTAMP}&endtime=9999999999&sort=desc&apikey=${BSCSCAN_API_KEY}`
      );
      
      if (!incomingResponse.ok) {
        throw new Error(`BSCScan API responded with status: ${incomingResponse.status}`);
      }
      
      const incomingData: BscScanResponse = await incomingResponse.json();

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
          `${BSCSCAN_API_URL}?module=account&action=txlist&address=${DONATION_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=100&starttime=${START_DATE_TIMESTAMP}&endtime=9999999999&sort=desc&apikey=${BSCSCAN_API_KEY}`
        );
        
        if (!outgoingResponse.ok) {
          throw new Error(`BSCScan API responded with status: ${outgoingResponse.status}`);
        }
        
        const outgoingData: BscScanResponse = await outgoingResponse.json();
        
        if (outgoingData.status === "1") {
          // Apply start date filter to ensure we're only processing transactions after March 29, 2025
          const filteredOutgoingTransactions = outgoingData.result.filter(tx => 
            parseInt(tx.timeStamp) >= parseInt(START_DATE_TIMESTAMP)
          );
          
          setDistributedAmount(calculateDistributedAmount(filteredOutgoingTransactions));
          setRecentDistributions(convertToDistributions(filteredOutgoingTransactions));
        } else {
          throw new Error(`BSCScan API error: ${outgoingData.message}`);
        }
      } else {
        throw new Error(`BSCScan API error: ${incomingData.message}`);
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
