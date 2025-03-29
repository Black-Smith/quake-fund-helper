
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

// BSCScan API key - using a free tier API key (limited to 5 calls/sec)
// For a production app, this should come from an environment variable
const BSCSCAN_API_KEY = "YourBscScanApiKey"; // Replace with actual API key for production
const BSCSCAN_API_URL = "https://api.bscscan.com/api";

export const useBlockchainData = (): BlockchainStats => {
  const { address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
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
        purpose: "Relief Funds", // This would require additional data or decoding the input data
        recipient: tx.to
      }))
      .slice(0, 5); // Get the 5 most recent distributions
  };

  // Fetch transaction data from BSCScan
  const fetchTransactionData = async () => {
    try {
      // Get incoming transactions (donations)
      const incomingResponse = await fetch(
        `${BSCSCAN_API_URL}?module=account&action=txlist&address=${DONATION_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${BSCSCAN_API_KEY}`
      );
      const incomingData: BscScanResponse = await incomingResponse.json();

      if (incomingData.status === "1") {
        const transactions = incomingData.result;
        setTotalDonations(calculateTotalDonations(transactions));
        setDonorCount(getUniqueDonorsCount(transactions));
        setRecentDonations(convertToTransactions(transactions));
        
        // Get outgoing transactions (distributions)
        const outgoingResponse = await fetch(
          `${BSCSCAN_API_URL}?module=account&action=txlist&address=${DONATION_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${BSCSCAN_API_KEY}`
        );
        const outgoingData: BscScanResponse = await outgoingResponse.json();
        
        if (outgoingData.status === "1") {
          setDistributedAmount(calculateDistributedAmount(outgoingData.result));
          setRecentDistributions(convertToDistributions(outgoingData.result));
        }
      } else {
        console.error("Error fetching transaction data:", incomingData.message);
        toast({
          title: "Error",
          description: "Could not fetch blockchain data. Using placeholder data instead.",
          variant: "destructive"
        });
        // Use placeholder data if API fails
        usePlaceholderData();
      }
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
      toast({
        title: "Error",
        description: "Could not fetch blockchain data. Using placeholder data instead.",
        variant: "destructive"
      });
      // Use placeholder data if API fails
      usePlaceholderData();
    }
  };

  // Fallback to placeholder data
  const usePlaceholderData = () => {
    setTotalDonations('24.8');
    setDonorCount(142);
    setDistributedAmount('10.5');
    setRecentDonations([
      { id: '1', date: '2023-05-15', amount: '1.2 BNB', txHash: '0x83f2e5b3a4c7d9e1f0g6h2i5j3k1l7m9n8o4p6q3r7s5t2u9v8w1x4y6z7a9b1c3d2', donor: 'Anonymous' },
      { id: '2', date: '2023-05-14', amount: '5.0 BNB', txHash: '0x72a4b6c8d9e1f3g5h7i9j1k3l5m7n9o1p3q5r7s9t1u3v5w7x9y1z3a5b7c9d1e3f5', donor: 'CryptoPhilanthropist' },
      { id: '3', date: '2023-05-12', amount: '0.5 BNB', txHash: '0x91c3e5g7i9k1m3o5q7s9u1w3y5a7c9e1g3i5k7m9o1q3s5u7w9y1a3c5e7g9i1k3m5', donor: 'Anonymous' },
      { id: '4', date: '2023-05-10', amount: '2.1 BNB', txHash: '0x45b8d7f6h5j4l3n2p1r0t9v8x7z6b5d4f3h2j1l0n9p8r7t6v5x4z3b2d1f0h9j8', donor: 'BNBSupporter' },
      { id: '5', date: '2023-05-08', amount: '3.0 BNB', txHash: '0x67d4f1h8j5l2n9p6r3t0v7x4z1b8d5f2h9j6l3n0p7r4t1v8x5z2b9d6f3h0j7l4', donor: 'BlockchainCharity' },
    ]);
    setRecentDistributions([
      { id: '1', date: '2023-05-17', amount: '4.2 BNB', txHash: '0xf3a2c4e6g8i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m1o3q5s7u9w1y3a5c7e9g1i3', purpose: 'Medical Supplies', recipient: 'Field Hospital Alpha' },
      { id: '2', date: '2023-05-15', amount: '3.8 BNB', txHash: '0xe4b3d2a1c9b8a7f6e5d4c3b2a1f9e8d7c6b5a4f3e2d1c9b8a7f6e5d4c3b2a1f9', purpose: 'Temporary Shelters', recipient: 'Relief Coalition' },
      { id: '3', date: '2023-05-12', amount: '2.5 BNB', txHash: '0xd5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1', purpose: 'Food & Water', recipient: 'Community Aid Network' },
    ]);
  };

  const fetchBlockchainData = async () => {
    setIsLoading(true);
    
    try {
      // Use real API call instead of setTimeout
      await fetchTransactionData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
      usePlaceholderData();
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
