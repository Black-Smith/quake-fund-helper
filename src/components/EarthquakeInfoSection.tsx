
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, AlertCircle } from "lucide-react";

interface EarthquakeData {
  title: string;
  date: string;
  location: string;
  casualties: string;
  description: string;
  aftershocks: string;
  affectedAreas: string;
  buildingsDamaged: string;
  rescueEfforts: string;
  internationalAid: string;
}

const EarthquakeInfoSection = () => {
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData | null>(null);
  
  useEffect(() => {
    // Check if we have crawled earthquake data
    const storedData = localStorage.getItem('earthquakeData');
    if (storedData) {
      try {
        setEarthquakeData(JSON.parse(storedData));
      } catch (error) {
        console.error('Failed to parse earthquake data:', error);
      }
    }
  }, []);

  // Extract the magnitude from the title if available
  const magnitude = earthquakeData?.title?.match(/\d+\.\d+/)?.[0] || '7.2';
  
  return (
    <div className="py-16 bg-earthquake-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earthquake-accent/20 text-earthquake-accent mb-6">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {earthquakeData?.title || 'Magnitude 7.2 Earthquake'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Disaster Overview</h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                {earthquakeData?.description || 
                  'A devastating 7.2 magnitude earthquake struck, causing widespread destruction across multiple cities and affecting millions of lives.'}
              </p>
              <p>
                {earthquakeData?.rescueEfforts || 
                  'Relief efforts are underway, but the scale of the disaster requires substantial resources for emergency response, medical care, and ongoing support for affected communities.'}
              </p>
              <p>
                {earthquakeData?.internationalAid || 
                  'The international community has pledged support and aid organizations are mobilizing resources to help those affected.'}
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-lg">
                <MapPin className="h-5 w-5 text-earthquake-accent" />
                <div>
                  <div className="text-sm text-gray-300">Epicenter</div>
                  <div className="font-medium">{earthquakeData?.location || 'Northern Coast Region'}</div>
                </div>
              </div>
              
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <div className="text-sm text-gray-300">Date</div>
                <div className="font-medium">{earthquakeData?.date || 'April 7, 2023'}</div>
              </div>
              
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <div className="text-sm text-gray-300">Affected Population</div>
                <div className="font-medium">~2.4 million people</div>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative h-[300px] bg-earthquake-primary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-earthquake-accent rounded-full flex items-center justify-center">
                    <div className="text-2xl font-bold text-white">{magnitude}</div>
                  </div>
                  <div className="absolute w-32 h-32 border-2 border-earthquake-accent/50 rounded-full animate-ping"></div>
                  <div className="absolute w-40 h-40 border border-earthquake-accent/30 rounded-full"></div>
                  <div className="absolute w-52 h-52 border border-earthquake-accent/20 rounded-full"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm opacity-80">Earthquake Magnitude</div>
                  <div className="text-xl font-bold">{magnitude} on Richter Scale</div>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-earthquake-primary">
                      {earthquakeData?.buildingsDamaged?.match(/\d+/)?.[0] || '843'}
                    </div>
                    <div className="text-xs text-gray-500">Buildings Damaged</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-earthquake-primary">
                      {earthquakeData?.aftershocks?.includes('magnitude') ? '178' : '12'}
                    </div>
                    <div className="text-xs text-gray-500">Aftershocks</div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-bold text-earthquake-primary">
                      {earthquakeData?.affectedAreas?.split(',').length || '12'}
                    </div>
                    <div className="text-xs text-gray-500">Areas Affected</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeInfoSection;
