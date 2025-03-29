
import React from 'react';
import { Button } from "@/components/ui/button";
import { HandCoins, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlockchainData } from '@/hooks/useBlockchainData';
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const { totalDonations, donorCount, isLoading } = useBlockchainData();
  
  // Goal is 100 BNB
  const goalAmount = 100;
  // Calculate percentage for visual indication (capped at 100%)
  const percentageRaised = Math.min((parseFloat(totalDonations) / goalAmount) * 100, 100);
  
  return <div className="relative overflow-hidden bg-gradient-to-b from-earthquake-dark to-earthquake-primary text-white">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images5.alphacoders.com/645/645897.jpg')] bg-cover bg-center"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earthquake-accent/20 text-earthquake-accent mb-6 animate-pulse-subtle">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Urgent: Myanmar Earthquake Relief Needed</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Myanmar 7.7 Magnitude Earthquake Relief Fund
          </h1>
          
          <p className="text-xl mb-8 text-white/90">
            Join our efforts to provide immediate aid to those affected by the devastating 7.7 magnitude earthquake in Myanmar. Your BNB donations directly fund rescue operations, medical aid, and essential supplies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/#donate">
              <Button size="lg" className="bg-earthquake-accent hover:bg-earthquake-accent/90 text-white flex items-center gap-2">
                <HandCoins className="h-5 w-5" />
                <span>Donate BNB Now</span>
              </Button>
            </Link>
            
            <Link to="/transparency">
              <Button size="lg" variant="outline" className="border-white text-white bg-slate-900 hover:bg-slate-800">
                Learn About Our Impact
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 bg-black/20 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-24 bg-white/10 mb-1" />
                    <Skeleton className="h-4 w-28 bg-white/10" />
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold">{totalDonations} BNB</div>
                    <div className="text-sm text-white/70">Raised So Far</div>
                  </>
                )}
              </div>
              
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              
              <div className="text-center">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-16 bg-white/10 mb-1" />
                    <Skeleton className="h-4 w-20 bg-white/10" />
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold">{donorCount}</div>
                    <div className="text-sm text-white/70">Donors</div>
                  </>
                )}
              </div>
              
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              
              <div className="text-center sm:text-right">
                <div className="text-3xl font-bold">{goalAmount} BNB</div>
                <div className="text-sm text-white/70">Goal</div>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-earthquake-accent h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentageRaised}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;
