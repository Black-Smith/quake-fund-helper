import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Copy, AlertCircle, Wallet, Loader2, Check, ExternalLink, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { DONATION_ADDRESS, sendDonation, getTransactionReceipt } from "@/lib/blockchain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

enum DonationStep {
  FORM,
  PAYMENT,
  CONFIRMATION,
}

const DonationForm = () => {
  const {
    toast
  } = useToast();
  const {
    address,
    isConnected,
    connect,
    isConnecting,
    balance,
    isCorrectNetwork,
    switchNetwork,
    networkName
  } = useWallet();
  const [amount, setAmount] = useState(0.1);
  const [step, setStep] = useState<DonationStep>(DonationStep.FORM);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txStatus, setTxStatus] = useState<'pending' | 'confirmed' | 'failed' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isConnected && !isCorrectNetwork && step !== DonationStep.CONFIRMATION) {
      toast({
        title: "Network Change Required",
        description: `Please switch to ${networkName} to make a donation.`,
        variant: "destructive",
      });
    }
  }, [isConnected, isCorrectNetwork, step, toast, networkName]);

  const handleAmountChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '') {
      (e.target as HTMLInputElement).value = '';
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(Math.max(numValue, 0.01), 100);
      setAmount(clampedValue);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(DONATION_ADDRESS);
    toast({
      title: "Wallet address copied!",
      description: "BNB wallet address has been copied to your clipboard."
    });
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isConnected && !isCorrectNetwork) {
      toast({
        title: "Wrong Network",
        description: `Please switch to ${networkName} before proceeding.`,
        variant: "destructive"
      });
      return;
    }
    
    setStep(DonationStep.PAYMENT);
  };

  const handleConnectWallet = async () => {
    await connect();
  };

  const handleSendDonation = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      });
      return;
    }

    if (!isCorrectNetwork) {
      toast({
        title: "Wrong Network",
        description: `Please switch to ${networkName} before making a donation.`,
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(balance) < amount) {
      toast({
        title: "Insufficient balance",
        description: `You need at least ${amount} BNB in your wallet.`,
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    try {
      const result = await sendDonation(address, amount);
      if (result.success && result.txHash) {
        setTxHash(result.txHash);
        setTxStatus('pending');
        setStep(DonationStep.CONFIRMATION);

        console.log({
          amount,
          name: name || "Anonymous",
          email,
          message,
          txHash: result.txHash,
          donorAddress: address
        });
        toast({
          title: "Donation sent!",
          description: "Your transaction has been submitted to the blockchain."
        });
      } else {
        toast({
          title: "Transaction failed",
          description: result.error || "Failed to send donation. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error("Donation error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setStep(DonationStep.FORM);
    setTxHash(null);
    setTxStatus(null);
  };

  const renderDonationForm = () => <form onSubmit={handleDonationSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Donation Amount (BNB)</Label>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="number"
              id="amount-input"
              value={amount}
              onChange={handleNumberInputChange}
              min={0.01}
              max={100}
              step={0.01}
              className="w-full"
              onBlur={(e) => {
                if (e.target.value === '' || isNaN(parseFloat(e.target.value))) {
                  setAmount(0.01);
                }
              }}
            />
            <span className="font-medium">BNB</span>
          </div>
          <div className="text-3xl font-bold text-center my-2">{amount} BNB</div>
          <Slider id="amount" min={0.01} max={100} step={0.01} value={[amount]} onValueChange={handleAmountChange} className="my-6" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0.01 BNB</span>
            <span>100 BNB</span>
          </div>
        </div>
        
        {isConnected && !isCorrectNetwork && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Wrong Network</AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span>Please switch to {networkName} to proceed.</span>
              <Button size="sm" variant="outline" onClick={switchNetwork} className="whitespace-nowrap mt-2 sm:mt-0">
                Switch Network
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-earthquake-accent hover:bg-earthquake-accent/90"
          disabled={isConnected && !isCorrectNetwork}
        >
          Continue to Payment
        </Button>
        
        {isConnected && !isCorrectNetwork && (
          <p className="text-sm text-center text-red-500">
            You must be on {networkName} to proceed
          </p>
        )}
      </div>
    </form>;

  const renderPaymentStep = () => <div className="space-y-6">
      <div className="p-4 bg-earthquake-primary/10 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Amount:</span>
          <span className="font-bold">{amount} BNB</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Network:</span>
          <span className={!isCorrectNetwork ? "text-red-500 font-medium" : ""}>
            {networkName} {!isCorrectNetwork && "(Required)"}
          </span>
        </div>
      </div>

      {isConnected && !isCorrectNetwork && <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Wrong Network</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>Please switch to {networkName} to make a donation.</span>
            <Button size="sm" variant="outline" onClick={switchNetwork} className="whitespace-nowrap mt-2 sm:mt-0">
              Switch Network
            </Button>
          </AlertDescription>
        </Alert>}
      
      {!isConnected ? <div className="space-y-4">
          <div className="text-center">
            <p className="mb-4">Connect your wallet to continue with the donation</p>
            <Button onClick={handleConnectWallet} disabled={isConnecting} className="mx-auto">
              {isConnecting ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </> : <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>}
            </Button>
          </div>
        </div> : <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Check className="h-5 w-5" />
              <span className="font-medium">Wallet Connected</span>
            </div>
            <p className="text-sm text-gray-600">
              Your wallet <span className="font-mono">{address?.substring(0, 10)}...</span> is ready.
            </p>
            <p className="text-sm font-medium mt-2">
              Available balance: {balance} BNB
            </p>
          </div>
          
          <Button className="w-full bg-earthquake-accent hover:bg-earthquake-accent/90" onClick={handleSendDonation} disabled={isProcessing || !isCorrectNetwork || parseFloat(balance) < amount}>
            {isProcessing ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </> : 'Send Donation'}
          </Button>
          
          {!isCorrectNetwork && <p className="text-sm text-red-500 text-center">
              Please switch to {networkName} to make a donation.
            </p>}
          
          {isCorrectNetwork && parseFloat(balance) < amount && <p className="text-sm text-red-500 text-center">
              Insufficient balance. You need at least {amount} BNB.
            </p>}
        </div>}
      
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">Alternative method:</p>
        <Label>Send BNB directly to this address:</Label>
        <div className="flex">
          <Input value={DONATION_ADDRESS} readOnly className="rounded-r-none font-mono text-sm" />
          <Button 
            variant="outline" 
            className="rounded-l-none border-l-0" 
            onClick={handleCopyAddress}
            disabled={isConnected && !isCorrectNetwork}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        {isConnected && !isCorrectNetwork && (
          <p className="text-xs text-red-500">
            You must be on {networkName} to use this address for donations
          </p>
        )}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 text-sm text-yellow-800 flex gap-2">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Important</p>
          <p>Only send BNB on the {networkName} network. Sending any other token or using a different network may result in loss of funds.</p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full" onClick={() => setStep(DonationStep.FORM)}>
        Back to donation details
      </Button>
    </div>;

  const renderConfirmationStep = () => <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-green-100 p-3 rounded-full">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-center">Donation Submitted!</h3>
      
      <div className="p-4 bg-earthquake-primary/10 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Amount:</span>
          <span className="font-bold">{amount} BNB</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Status:</span>
          <span className={`font-medium ${txStatus === 'confirmed' ? 'text-green-600' : txStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
            {txStatus === 'confirmed' ? 'Confirmed' : txStatus === 'failed' ? 'Failed' : 'Pending'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Transaction:</span>
          <a href={`https://bscscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-earthquake-primary hover:underline flex items-center gap-1">
            <span className="font-mono text-sm">{txHash?.substring(0, 10)}...</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>Thank you for your generous support!</p>
        <p>Your donation will help victims of the 7.7 magnitude earthquake.</p>
      </div>
      
      <Button onClick={resetForm} className="w-full">
        Make Another Donation
      </Button>
    </div>;

  return <Card className="w-full max-w-md mx-auto p-6 shadow-lg" id="donate">
      <div className="flex justify-center mb-6">
        <div className="bg-earthquake-primary/10 p-3 rounded-full">
          <img 
            src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Binance-Coin-BNB-icon.png" 
            alt="BNB Icon" 
            className="h-12 w-12"
          />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Donate BNB</h2>
      
      {step === DonationStep.FORM && renderDonationForm()}
      {step === DonationStep.PAYMENT && renderPaymentStep()}
      {step === DonationStep.CONFIRMATION && renderConfirmationStep()}
    </Card>;
};

export default DonationForm;
