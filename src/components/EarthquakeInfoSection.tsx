import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, AlertCircle, Building, Landmark } from "lucide-react";
const EarthquakeInfoSection = () => {
  return <div className="py-16 bg-earthquake-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earthquake-accent/20 text-earthquake-accent mb-6">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">7.7 Magnitude Earthquake</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Myanmar Earthquake: Current Status</h2>
            
            <div className="space-y-4 text-gray-300">
              <p>On March 28, 2025, a devastating 7.7 magnitude earthquake struck central Myanmar near Mandalay, the country's second-largest city, causing widespread destruction across multiple cities and affecting millions of lives.</p>
              <p>
                The earthquake struck at a relatively shallow depth of six miles, causing violent shaking and devastating areas near the Sagaing Fault, which runs north-south through the center of Myanmar.
              </p>
              <p>
                The death toll has already exceeded 1,000 people with nearly 2,400 injured, and these numbers are expected to rise. U.S. Geological Survey models estimate that fatalities could potentially surpass 10,000.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-lg">
                <MapPin className="h-5 w-5 text-earthquake-accent" />
                <div>
                  <div className="text-sm text-gray-300">Epicenter</div>
                  <div className="font-medium">Sagaing, Myanmar</div>
                </div>
              </div>
              
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <div className="text-sm text-gray-300">Depth</div>
                <div className="font-medium">6 miles</div>
              </div>
              
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <div className="text-sm text-gray-300">Affected Population</div>
                <div className="font-medium">~1.5 million+ people</div>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative h-[300px] bg-earthquake-primary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-earthquake-accent rounded-full flex items-center justify-center">
                    <div className="text-2xl font-bold text-white">7.7</div>
                  </div>
                  <div className="absolute w-32 h-32 border-2 border-earthquake-accent/50 rounded-full animate-ping"></div>
                  <div className="absolute w-40 h-40 border border-earthquake-accent/30 rounded-full"></div>
                  <div className="absolute w-52 h-52 border border-earthquake-accent/20 rounded-full"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm opacity-80">Earthquake Magnitude</div>
                  <div className="text-xl font-bold">7.7 on Richter Scale</div>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">1,644+</div>
                    <div className="text-xs text-gray-500">Confirmed Deaths</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-earthquake-primary">3,408+</div>
                    <div className="text-xs text-gray-500">Injured</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-earthquake-primary">Multiple</div>
                    <div className="text-xs text-gray-500">Countries Affected</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default EarthquakeInfoSection;