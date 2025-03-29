
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bitcoin, ExternalLink } from "lucide-react";

const Transparency = () => {
  // Sample donation data
  const donations = [
    { id: 1, date: "2023-05-15", amount: "1.2 BNB", txHash: "0x83f2...b9c1", donor: "Anonymous" },
    { id: 2, date: "2023-05-14", amount: "5.0 BNB", txHash: "0x72a4...34d2", donor: "CryptoPhilanthropist" },
    { id: 3, date: "2023-05-12", amount: "0.5 BNB", txHash: "0x91c3...f7e8", donor: "Anonymous" },
    { id: 4, date: "2023-05-10", amount: "2.1 BNB", txHash: "0x45b8...a3d9", donor: "BNBSupporter" },
    { id: 5, date: "2023-05-08", amount: "3.0 BNB", txHash: "0x67d4...c2e5", donor: "BlockchainCharity" },
  ];

  // Sample distribution data
  const distributions = [
    { id: 1, date: "2023-05-17", amount: "4.2 BNB", txHash: "0xf3a2...7bc1", purpose: "Medical Supplies", recipient: "Field Hospital Alpha" },
    { id: 2, date: "2023-05-15", amount: "3.8 BNB", txHash: "0xe4b3...2cf9", purpose: "Temporary Shelters", recipient: "Relief Coalition" },
    { id: 3, date: "2023-05-12", amount: "2.5 BNB", txHash: "0xd5c4...9af3", purpose: "Food & Water", recipient: "Community Aid Network" },
  ];

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
                    <a href="#" className="text-earthquake-primary hover:underline flex items-center gap-1">
                      0x1234...5678
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">
                    All donations are received through this smart contract, which ensures automatic and transparent tracking of funds.
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
                  <div className="text-3xl font-bold mb-2">24.8 BNB</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From 142 donors</span>
                    <a href="#" className="text-earthquake-primary hover:underline text-sm flex items-center gap-1">
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
                  <div className="text-3xl font-bold mb-2">10.5 BNB</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Across 3 initiatives</span>
                    <a href="#" className="text-earthquake-primary hover:underline text-sm flex items-center gap-1">
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
                            <TableCell className="hidden md:table-cell font-mono text-xs">{donation.txHash}</TableCell>
                            <TableCell>
                              <a href="#" className="text-earthquake-primary hover:underline flex items-center gap-1 justify-end">
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
                            <TableCell className="hidden lg:table-cell font-mono text-xs">{distribution.txHash}</TableCell>
                            <TableCell>
                              <a href="#" className="text-earthquake-primary hover:underline flex items-center gap-1 justify-end">
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
