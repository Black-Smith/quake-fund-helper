
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { HandCoins, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface EarthquakeData {
  title: string;
  magnitude?: string;
}

const Hero = () => {
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData | null>(null);
  
  useEffect(() => {
    // Check if we have crawled earthquake data
    const storedData = localStorage.getItem('earthquakeData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setEarthquakeData({
          title: data.title,
          magnitude: data.title.match(/\d+\.\d+/)?.[0] || '7.2'
        });
      } catch (error) {
        console.error('Failed to parse earthquake data:', error);
      }
    }
  }, []);

  // Extract magnitude from title or use default
  const magnitude = earthquakeData?.magnitude || '7.7';
  const title = earthquakeData?.title || `${magnitude} Magnitude Earthquake Relief Fund`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-earthquake-dark to-earthquake-primary text-white">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517490232338-06b0c01688e1')] bg-cover bg-center"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earthquake-accent/20 text-earthquake-accent mb-6 animate-pulse-subtle">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Urgent: Earthquake Relief Needed</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          
          <p className="text-xl mb-8 text-white/90">
            Join our efforts to provide immediate aid to those affected by the devastating {magnitude} magnitude earthquake. Your BNB donations directly fund rescue operations, medical aid, and essential supplies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/#donate">
              <Button size="lg" className="bg-earthquake-accent hover:bg-earthquake-accent/90 text-white flex items-center gap-2">
                <HandCoins className="h-5 w-5" />
                <span>Donate BNB Now</span>
              </Button>
            </Link>
            
            <Link to="/transparency">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn About Our Impact
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 bg-black/20 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold">24.8 BNB</div>
                <div className="text-sm text-white/70">Raised So Far</div>
              </div>
              
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              
              <div className="text-center">
                <div className="text-3xl font-bold">142</div>
                <div className="text-sm text-white/70">Donors</div>
              </div>
              
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              
              <div className="text-center sm:text-right">
                <div className="text-3xl font-bold">100 BNB</div>
                <div className="text-sm text-white/70">Goal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
