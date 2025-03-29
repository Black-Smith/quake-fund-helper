
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins, Users, Flag, Heart } from "lucide-react";

const ImpactSection = () => {
  return (
    <div className="py-16 bg-earthquake-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Donation's Impact</h2>
          <p className="text-gray-600">
            Every BNB donation directly contributes to earthquake relief efforts. We focus on immediate needs and long-term recovery for affected communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle>Emergency Medical Aid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Providing emergency medical supplies, supporting field hospitals, and funding medical teams in affected areas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>Shelter & Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Building temporary shelters, distributing tents, and providing essential items for displaced families.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <HandCoins className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Food & Water</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Distributing clean water, food supplies, and nutrition packages to prevent hunger and disease in affected areas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Flag className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>Recovery & Rebuilding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Supporting long-term recovery efforts, rebuilding infrastructure, and helping communities return to normalcy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;
