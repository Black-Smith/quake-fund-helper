
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, HandCoins } from "lucide-react";

const Impact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-earthquake-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Our Impact</h1>
              <p className="text-xl text-gray-300">
                See how your BNB donations are making a real difference in the lives of earthquake victims.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="text-4xl font-bold mb-2">12,450+</div>
                  <div className="text-gray-500">People Received Medical Aid</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="text-4xl font-bold mb-2">850+</div>
                  <div className="text-gray-500">Families Provided Shelter</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <HandCoins className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="text-4xl font-bold mb-2">24.8 BNB</div>
                  <div className="text-gray-500">Raised So Far</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Progress Towards Our Goals</h2>
              
              <div className="space-y-8 max-w-3xl mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Funding Goal: 100 BNB</span>
                    <span>24.8%</span>
                  </div>
                  <Progress value={24.8} className="h-4 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Medical Supplies: 35 BNB Goal</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-4 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Temporary Shelters: 25 BNB Goal</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-4 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Food & Water: 20 BNB Goal</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-4 bg-gray-100" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Recovery & Rebuilding: 15 BNB Goal</span>
                    <span>5%</span>
                  </div>
                  <Progress value={5} className="h-4 bg-gray-100" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Recent Impact Stories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Emergency Field Hospital</h3>
                    <p className="text-gray-600 mb-4">
                      Thanks to donor support, we've established a fully-equipped field hospital that has treated over 2,000 injured survivors in the first week after the earthquake.
                    </p>
                    <div className="text-sm text-gray-500">
                      Posted May 2, 2023
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Clean Water Initiative</h3>
                    <p className="text-gray-600 mb-4">
                      Our water purification systems are now providing clean drinking water to five communities whose infrastructure was destroyed, serving approximately 10,000 people daily.
                    </p>
                    <div className="text-sm text-gray-500">
                      Posted May 10, 2023
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impact;
