
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Bitcoin, Copy, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DonationForm = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState(1);
  const [step, setStep] = useState(1);
  
  const bnbWalletAddress = "0x1234567890abcdef1234567890abcdef12345678";
  
  const handleAmountChange = (value: number[]) => {
    setAmount(value[0]);
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bnbWalletAddress);
    toast({
      title: "Wallet address copied!",
      description: "BNB wallet address has been copied to your clipboard.",
    });
  };
  
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg">
      <div className="flex justify-center mb-6">
        <div className="bg-earthquake-primary/10 p-3 rounded-full">
          <Bitcoin className="h-8 w-8 text-earthquake-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Donate BNB</h2>
      
      {step === 1 ? (
        <form onSubmit={handleDonationSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount (BNB)</Label>
              <div className="text-3xl font-bold text-center my-2">{amount} BNB</div>
              <Slider
                id="amount"
                min={0.1}
                max={10}
                step={0.1}
                value={[amount]}
                onValueChange={handleAmountChange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0.1 BNB</span>
                <span>10 BNB</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Your Name (Optional)</Label>
              <Input id="name" placeholder="Anonymous" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input id="email" type="email" placeholder="For donation receipt" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input id="message" placeholder="Add a message of support" />
            </div>
            
            <Button type="submit" className="w-full bg-earthquake-accent hover:bg-earthquake-accent/90">
              Continue to Payment
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-earthquake-primary/10 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Amount:</span>
              <span className="font-bold">{amount} BNB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Network:</span>
              <span>Binance Smart Chain (BSC)</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Send BNB to this address:</Label>
            <div className="flex">
              <Input 
                value={bnbWalletAddress} 
                readOnly 
                className="rounded-r-none font-mono text-sm"
              />
              <Button 
                variant="outline" 
                className="rounded-l-none border-l-0" 
                onClick={handleCopyAddress}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 text-sm text-yellow-800 flex gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Important</p>
              <p>Only send BNB on the Binance Smart Chain (BSC) network. Sending any other token or using a different network may result in loss of funds.</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setStep(1)}
          >
            Back to donation details
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            After sending, your donation will be verified on the blockchain and added to our transparency report.
          </div>
        </div>
      )}
    </Card>
  );
};

export default DonationForm;
