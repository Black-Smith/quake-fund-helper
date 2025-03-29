
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bitcoin, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_ADDRESS } from "@/lib/blockchain";

// Define the transaction type
type Transaction = {
  id: number;
  date: string;
  amount: string;
  txHash: string;
  donor: string;
};

// Define the distribution type
type Distribution = {
  id: number;
  date: string;
  amount: string;
  txHash: string;
  purpose: string;
  recipient: string;
};

const Transparency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalDonations, setTotalDonations] = useState("24.8");
  const [donorCount, setDonorCount] = useState(142);
  const [distributedAmount, setDistributedAmount] = useState("10.5");
  
  // Sample donation data - in a real app, this would be fetched from an API or blockchain explorer
  const [donations, setDonations] = useState<Transaction[]>([
    { id: 1, date: "2023-05-15", amount: "1.2 BNB", txHash: "0x83f2e5b3a4c7d9e1f0g6h2i5j3k1l7m9n8o4p6q3r7s5t2u9v8w1x4y6z7a9b1c3d2", donor: "Anonymous" },
    { id: 2, date: "2023-05-14", amount: "5.0 BNB", txHash: "0x72a4b6c8d9e1f3g5h7i9j1k3l5m7n9o1p3q5r7s9t1u3v5w7x9y1z3a5b7c9d1e3f5", donor: "CryptoPhilanthropist" },
    { id: 3, date: "2023-05-12", amount: "0.5 BNB", txHash: "0x91c3e5g7i9k1m3o5q7s9u1w3y5a7c9e1g3i5k7m9o1q3s5u7w9y1a3c5e7g9i1k3m5", donor: "Anonymous" },
    { id: 4, date: "2023-05-10", amount: "2.1 BNB", txHash: "0x45b8d7f6h5j4l3n2p1r0t9v8x7z6b5d4f3h2j1l0n9p8r7t6v5x4z3b2d1f0h9j8", donor: "BNBSupporter" },
    { id: 5, date: "2023-05-08", amount: "3.0 BNB", txHash: "0x67d4f1h8j5l2n9p6r3t0v7x4z1b8d5f2h9j6l3n0p7r4t1v8x5z2b9d6f3h0j7l4", donor: "BlockchainCharity" },
  ]);

  // Sample distribution data
  const [distributions, setDistributions] = useState<Distribution[]>([
    { id: 1, date: "2023-05-17", amount: "4.2 BNB", txHash: "0xf3a2c4e6g8i1k3m5o7q9s1u3w5y7a9c1e3g5i7k9m1o3q5s7u9w1y3a5c7e9g1i3", purpose: "Medical Supplies", recipient: "Field Hospital Alpha" },
    { id: 2, date: "2023-05-15", amount: "3.8 BNB", txHash: "0xe4b3d2a1c9b8a7f6e5d4c3b2a1f9e8d7c6b5a4f3e2d1c9b8a7f6e5d4c3b2a1f9", purpose: "Temporary Shelters", recipient: "Relief Coalition" },
    { id: 3, date: "2023-05-12", amount: "2.5 BNB", txHash: "0xd5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1", purpose: "Food & Water", recipient: "Community Aid Network" },
  ]);

  const refreshData = () => {
    setIsLoading(true);
    
    // In a real app, this would fetch data from the blockchain
    setTimeout(() => {
      // This is a simulation - in a real app you would:
      // 1. Fetch transactions from a blockchain explorer API for the donation address
      // 2. Format the transactions into the correct format
      // 3. Update the state with the fetched data
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Format the transaction hash for display
  const formatTxHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-earthquake-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Transparency & Accountability</h1>
              <p className="text-xl text-gray-300">
                Full visibility into all donations and disbursements, powered by blockchain technology.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-earthquake-primary" />
                    Donation Contract
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Contract Address:</span>
                    <a 
                      href={`https://bscscan.com/address/${DONATION_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-earthquake-primary hover:underline flex items-center gap-1"
                    >
                      {formatTxHash(DONATION_ADDRESS)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    All donations are received through this address on the Binance Smart Chain, ensuring automatic and transparent tracking of funds.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-earthquake-primary" />
                    Total Donations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{totalDonations} BNB</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From {donorCount} donors</span>
                    <a 
                      href={`https://bscscan.com/address/${DONATION_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-earthquake-primary hover:underline text-sm flex items-center gap-1"
                    >
                      View all
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-earthquake-primary" />
                    Distributed Funds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{distributedAmount} BNB</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Across {distributions.length} initiatives</span>
                    <a 
                      href={`https://bscscan.com/address/${DONATION_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-earthquake-primary hover:underline text-sm flex items-center gap-1"
                    >
                      View all
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Donations</h2>
                <Card>
                  <CardContent className="p-0 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead className="hidden md:table-cell">Transaction Hash</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell>{donation.date}</TableCell>
                            <TableCell className="font-medium">{donation.amount}</TableCell>
                            <TableCell>{donation.donor}</TableCell>
                            <TableCell className="hidden md:table-cell font-mono text-xs">
                              {formatTxHash(donation.txHash)}
                            </TableCell>
                            <TableCell>
                              <a 
                                href={`https://bscscan.com/tx/${donation.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-earthquake-primary hover:underline flex items-center gap-1 justify-end"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Fund Distributions</h2>
                <Card>
                  <CardContent className="p-0 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Purpose</TableHead>
                          <TableHead className="hidden md:table-cell">Recipient</TableHead>
                          <TableHead className="hidden lg:table-cell">Transaction Hash</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distributions.map((distribution) => (
                          <TableRow key={distribution.id}>
                            <TableCell>{distribution.date}</TableCell>
                            <TableCell className="font-medium">{distribution.amount}</TableCell>
                            <TableCell>{distribution.purpose}</TableCell>
                            <TableCell className="hidden md:table-cell">{distribution.recipient}</TableCell>
                            <TableCell className="hidden lg:table-cell font-mono text-xs">
                              {formatTxHash(distribution.txHash)}
                            </TableCell>
                            <TableCell>
                              <a 
                                href={`https://bscscan.com/tx/${distribution.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-earthquake-primary hover:underline flex items-center gap-1 justify-end"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-earthquake-light p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Transparency</h2>
                <p className="text-gray-600 mb-4">
                  We believe that full transparency is essential for effective disaster relief. Our use of blockchain technology enables us to provide verifiable records of all donations and disbursements.
                </p>
                <p className="text-gray-600">
                  All transactions are permanently recorded on the Binance Smart Chain blockchain and can be independently verified by anyone. This ensures that donors can see exactly how their contributions are being used to help earthquake victims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Transparency;
