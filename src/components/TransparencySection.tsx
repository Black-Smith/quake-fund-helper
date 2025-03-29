
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HeartHandshake, TrendingUp, Github, ExternalLink, Building, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_ADDRESS } from "@/lib/blockchain";

const TransparencySection = () => {
  const formatAddress = (address: string): string => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Transparent Fund Management</h2>
          <p className="text-gray-600">
            We believe in complete transparency. All donations and disbursements for the Myanmar earthquake relief are recorded on the blockchain and publicly viewable. 
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Emergency Medical Aid</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Shelter & Protection</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Food & Water</span>
                    <span>18%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Infrastructure Repair</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Operational Costs</span>
                    <span>2%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>* 98% of all donations go directly to relief efforts. 2% is used for operational costs including blockchain fees.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-earthquake-primary/10 p-2 rounded-full">
                  <Hospital className="h-5 w-5 text-earthquake-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Myanmar Medical Relief</h4>
                  <p className="text-sm text-gray-500">Funding emergency medical care for over 2,300 injured victims in Mandalay.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-earthquake-primary/10 p-2 rounded-full">
                  <Building className="h-5 w-5 text-earthquake-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Infrastructure Support</h4>
                  <p className="text-sm text-gray-500">Contributing to rebuilding efforts including the damaged Ava Bridge and other critical infrastructure.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-earthquake-primary/10 p-2 rounded-full">
                  <Github className="h-5 w-5 text-earthquake-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Open Source</h4>
                  <p className="text-sm text-gray-500">Our fund management smart contracts are open source and have been audited.</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button className="w-full" onClick={() => window.open(`https://sepolia.etherscan.io/address/${DONATION_ADDRESS}`, '_blank')}>
                  <span>View Blockchain Records</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                <div className="flex items-center justify-between">
                  <span>Contract Address:</span>
                  <a href={`https://sepolia.etherscan.io/address/${DONATION_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-earthquake-primary hover:underline flex items-center gap-1">
                    {formatAddress(DONATION_ADDRESS)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};

export default TransparencySection;
