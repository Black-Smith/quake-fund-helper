
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CrawlForm from '@/components/CrawlForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

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

const Admin = () => {
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCrawlComplete = (data: EarthquakeData) => {
    setEarthquakeData(data);
  };

  const handleUpdateContent = () => {
    if (!earthquakeData) {
      toast.error('No data to update with');
      return;
    }

    setIsUpdating(true);
    
    // In a real application, this would update content across the app
    // For now, we'll simulate the update with a delay
    setTimeout(() => {
      // Store the earthquake data in localStorage so other components can access it
      localStorage.setItem('earthquakeData', JSON.stringify(earthquakeData));
      
      toast.success('Application content updated successfully');
      setIsUpdating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-earthquake-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
              <p className="text-xl text-gray-300">
                Update application content with the latest earthquake information.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Web Crawler</h2>
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      Demo Mode Notice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      This is a simulation of web crawling functionality. In a full implementation, 
                      you would need to use a service like Firecrawl with a valid API key to crawl websites.
                      For this demo, we'll simulate crawling the New York Times article about the Myanmar earthquake.
                    </p>
                  </CardContent>
                </Card>
                <CrawlForm onCrawlComplete={handleCrawlComplete} />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Crawled Earthquake Data</h2>
                {earthquakeData ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{earthquakeData.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{earthquakeData.date}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{earthquakeData.location}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Casualties</p>
                              <p className="font-medium">{earthquakeData.casualties}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Affected Areas</p>
                              <p className="font-medium">{earthquakeData.affectedAreas}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-sm">{earthquakeData.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm text-gray-500">Aftershocks</p>
                              <p className="text-sm">{earthquakeData.aftershocks}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Buildings Damaged</p>
                              <p className="text-sm">{earthquakeData.buildingsDamaged}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Rescue Efforts</p>
                            <p className="text-sm">{earthquakeData.rescueEfforts}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">International Aid</p>
                            <p className="text-sm">{earthquakeData.internationalAid}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Button 
                      className="w-full"
                      disabled={isUpdating}
                      onClick={handleUpdateContent}
                    >
                      {isUpdating ? 'Updating Content...' : 'Update Application Content'}
                    </Button>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500">No earthquake data crawled yet</p>
                        <p className="text-sm text-gray-400">Use the web crawler to fetch data</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
