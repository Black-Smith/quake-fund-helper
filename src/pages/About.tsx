import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Users, Flag, Building, Map } from "lucide-react";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-earthquake-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Our Mission</h1>
              <p className="text-xl text-gray-300">
                We are dedicated to providing immediate relief and long-term support to those affected by the devastating 7.7 magnitude earthquake in Myanmar.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Myanmar Earthquake: What We Know</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">The 7.7-magnitude earthquake struck central Myanmar on March 28, 2025, sending shock waves across other parts of Southeast Asia and China and leaving a trail of death and destruction.</p>
                  <p className="text-gray-600">
                    The earthquake's epicenter was near Mandalay, Myanmar's second-largest city, striking at roughly 12:50 p.m. local time. The shallow depth of the quake (only 6 miles) caused violent shaking across the region.
                  </p>
                  <p className="text-gray-600">
                    Central Myanmar, which lies on the eastern end of the Alpide Belt (one of the world's most active seismic zones), is prone to powerful earthquakes. The quake devastated areas near the Sagaing Fault, which runs north-south through the center of Myanmar.
                  </p>
                  <p className="text-gray-600">
                    In Mandalay, the historic Ava Bridge, originally built by the British in the 1930s, has partially collapsed. The earthquake also caused damage in Bangkok, where a high-rise building under construction collapsed, killing at least nine people and leaving dozens missing.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-earthquake-primary/10 p-3 rounded-full">
                        <HeartHandshake className="h-6 w-6 text-earthquake-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-gray-600">
                          To create a world where disaster response is immediate, transparent, and community-driven through the power of blockchain technology.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-earthquake-primary/10 p-3 rounded-full">
                        <Map className="h-6 w-6 text-earthquake-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Affected Areas</h3>
                        <p className="text-gray-600">
                          While Myanmar has been most severely impacted, the earthquake's effects were felt across Southeast Asia and parts of China. In Bangkok, a building collapse has caused multiple casualties.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-earthquake-primary/10 p-3 rounded-full">
                        <Building className="h-6 w-6 text-earthquake-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Infrastructure Damage</h3>
                        <p className="text-gray-600">
                          Historic structures like the Ava Bridge have partially collapsed. Critical infrastructure including hospitals, roads, and communication networks have been severely impacted, hampering rescue efforts.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-earthquake-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Principles</h2>
              <p className="text-gray-600">
                These core values guide every aspect of our operations and decision-making process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  Every donation and disbursement is recorded on the blockchain, creating an immutable record that anyone can verify.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
                <p className="text-gray-600">
                  By using BNB and blockchain technology, we minimize transaction costs and administrative overhead, maximizing the impact of donations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Accountability</h3>
                <p className="text-gray-600">
                  We maintain rigorous standards for fund allocation and provide regular updates on how donations are being used in relief efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default About;