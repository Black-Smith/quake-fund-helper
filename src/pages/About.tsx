
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Users, Flag } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-earthquake-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Our Mission</h1>
              <p className="text-xl text-gray-300">
                We are dedicated to providing immediate relief and long-term support to those affected by the devastating 7.7 magnitude earthquake.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    In the wake of the devastating 7.7 magnitude earthquake, our team of crypto enthusiasts, humanitarian aid workers, and blockchain developers came together with a shared vision: to harness the power of cryptocurrency for disaster relief.
                  </p>
                  <p className="text-gray-600">
                    We recognized that traditional donation systems often face delays, high transaction fees, and lack of transparency. Blockchain technology offered a solution to these challenges, enabling immediate, verifiable, and efficient fund distribution.
                  </p>
                  <p className="text-gray-600">
                    Our platform was built to bridge the gap between cryptocurrency holders who want to help and the urgent needs of earthquake victims on the ground. By accepting BNB donations, we ensure that aid reaches affected communities quickly and transparently.
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
                        <Users className="h-6 w-6 text-earthquake-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                        <p className="text-gray-600">
                          A dedicated group of blockchain developers, disaster relief experts, and community organizers working together to maximize the impact of every donation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-earthquake-primary/10 p-3 rounded-full">
                        <Flag className="h-6 w-6 text-earthquake-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Our Partners</h3>
                        <p className="text-gray-600">
                          We collaborate with local NGOs, medical teams, and community leaders to ensure that resources are directed where they're needed most.
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
    </div>
  );
};

export default About;
