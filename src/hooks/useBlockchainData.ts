
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { DONATION_ADDRESS } from '@/lib/blockchain';

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

type BlockchainStats = {
  totalDonations: string;
  donorCount: number;
  distributedAmount: string;
  recentDonations: Transaction[];
  recentDistributions: Distribution[];
  isLoading: boolean;
  refreshData: () => void;
};

export const useBlockchainData = (): BlockchainStats => {
  const { address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [totalDonations, setTotalDonations] = useState('24.8');
  const [donorCount, setDonorCount] = useState(142);
  const [distributedAmount, setDistributedAmount] = useState('10.5');
  const [recentDonations, setRecentDonations] = useState<Transaction[]>([
    { id: '1', date: '2023-05-15', amount: '1.2 BNB', txHash: '0x83f2e5b3a4c7d9e1f0g6h2i5j3k1l7m9n8o4p6q3r7s5t2u9v8w1x4y6z7a9b1c3d2', donor: 'Anonymous' },
    { id: '2', date: '2023-05-14', amount: '5.0 BNB', txHash: '0x72a4b6c8d9e1f3g5h7i9j1k3l5m7n9o1p3q5r7s9t1u3v5w7x9y1z3a5b7c9d1e3f5', donor: 'CryptoPhilanthropist' },
    { id: '3', date: '2023-05-12', amount: '0.5 BNB', txHash: '0x91c3e5g7i9k1m3o5q7s9u1w3y5a7c9e1g3i5k7m9o1q3s5u7w9y1a3c5e7g9i1k3m5', donor: 'Anonymous' },
    { id: '4', date: '2023-05-10', amount: '2.1 BNB', txHash: '0x45b8d7f6h5j4l3n2p1r0t9v8x7z6b5d4f3h2j1l0n9p8r7t6v5x4z3b2d1f0h9j8', donor: 'BNBSupporter' },
    { id: '5', date: '2023-05-08', amount: '3.0 BNB', txHash: '0x67d4f1h8j5l2n9p6r3t0v7x4z1b8d5f2h9j6l3n0p7r4t1v8x5z2b9d6f3h0j7l4', donor: 'BlockchainCharity' },
  ]);
  
  const [recentDistributions, setRecentDistributions] = useState<Distribution[]>([
    { id: '1', date: '2023-05-17', amount: '4.2 BNB', txHash: '0xf3a2c4e6g8i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m1o3q5s7u9w1y3a5c7e9g1i3', purpose: 'Medical Supplies', recipient: 'Field Hospital Alpha' },
    { id: '2', date: '2023-05-15', amount: '3.8 BNB', txHash: '0xe4b3d2a1c9b8a7f6e5d4c3b2a1f9e8d7c6b5a4f3e2d1c9b8a7f6e5d4c3b2a1f9', purpose: 'Temporary Shelters', recipient: 'Relief Coalition' },
    { id: '3', date: '2023-05-12', amount: '2.5 BNB', txHash: '0xd5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1', purpose: 'Food & Water', recipient: 'Community Aid Network' },
  ]);

  const fetchBlockchainData = async () => {
    if (!window.ethereum) return;
    
    setIsLoading(true);
    
    try {
      // For a real app, you would:
      // 1. Query BSCScan API or a blockchain indexer to get transaction history for the donation address
      // 2. Process the transactions to calculate totals and extract donation information
      
      // This is placeholder logic that would be replaced with actual API calls
      setTimeout(() => {
        // In a real implementation, we'd update these values from the blockchain data
        if (Math.random() > 0.5) {
          // Simulate random new transaction when refreshing
          const newDonation = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            amount: (Math.random() * 2).toFixed(2) + ' BNB',
            txHash: '0x' + Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2),
            donor: Math.random() > 0.7 ? 'Anonymous' : 'New Donor ' + Math.floor(Math.random() * 100)
          };
          
          setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
          
          const newTotal = (parseFloat(totalDonations) + parseFloat(newDonation.amount)).toFixed(1);
          setTotalDonations(newTotal);
          setDonorCount(donorCount + 1);
        }
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
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
