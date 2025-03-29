
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, ExternalLink, RefreshCw, ArrowUpDown, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_ADDRESS } from "@/lib/blockchain";
import TransactionTable from '@/components/TransactionTable';
import { useBlockchainData } from '@/hooks/useBlockchainData';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useWallet } from '@/contexts/WalletContext';

const Transparency = () => {
  const {
    address
  } = useWallet();
  const {
    totalDonations,
    donorCount,
    distributedAmount,
    recentDonations,
    recentDistributions,
    isLoading,
    refreshData
  } = useBlockchainData();

  // Format the transaction hash for display
  const formatTxHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-earthquake-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Transparency & Accountability</h1>
              <p className="text-xl text-gray-300">
                Full visibility into all donations and disbursements, powered by blockchain technology.
              </p>
              {address && <Badge variant="outline" className="mt-4 px-4 py-2 border-earthquake-primary bg-slate-50">
                  Connected Wallet: {formatTxHash(address)}
                </Badge>}
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={refreshData} disabled={isLoading}>
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
                    <a href={`https://sepolia.etherscan.io/address/${DONATION_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-earthquake-primary hover:underline flex items-center gap-1">
                      {formatTxHash(DONATION_ADDRESS)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    All donations are received through this address on the Sepolia Testnet, ensuring automatic and transparent tracking of funds.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-green-500" />
                    Total Donations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? <Skeleton className="h-9 w-24 mb-2" /> : <div className="text-3xl font-bold mb-2">{totalDonations} ETH</div>}
                  <div className="flex items-center justify-between">
                    {isLoading ? <Skeleton className="h-4 w-28" /> : <span className="text-sm text-gray-500">From {donorCount} donors</span>}
                    <a href={`https://sepolia.etherscan.io/address/${DONATION_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-earthquake-primary hover:underline text-sm flex items-center gap-1">
                      View all
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="h-5 w-5 text-earthquake-primary" />
                    Distributed Funds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? <Skeleton className="h-9 w-24 mb-2" /> : <div className="text-3xl font-bold mb-2">{distributedAmount} ETH</div>}
                  <div className="flex items-center justify-between">
                    {isLoading ? <Skeleton className="h-4 w-36" /> : <span className="text-sm text-gray-500">Across {recentDistributions.length} initiatives</span>}
                    <a href={`https://sepolia.etherscan.io/address/${DONATION_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-earthquake-primary hover:underline text-sm flex items-center gap-1">
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
                    {isLoading ? <div className="p-6 space-y-3">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                      </div> : <TransactionTable transactions={recentDonations} type="donation" />}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Fund Distributions</h2>
                <Card>
                  <CardContent className="p-0 overflow-hidden">
                    {isLoading ? <div className="p-6 space-y-3">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                      </div> : <TransactionTable transactions={recentDistributions} type="distribution" />}
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-earthquake-light p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Transparency</h2>
                <p className="text-gray-600 mb-4">
                  We believe that full transparency is essential for effective disaster relief. Our use of blockchain technology enables us to provide verifiable records of all donations and disbursements.
                </p>
                <p className="text-gray-600">
                  All transactions are permanently recorded on the Sepolia Testnet blockchain and can be independently verified by anyone. This ensures that donors can see exactly how their contributions are being used to help earthquake victims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Transparency;
