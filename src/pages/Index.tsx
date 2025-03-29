
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import DonationForm from '@/components/DonationForm';
import TransparencySection from '@/components/TransparencySection';
import EarthquakeInfoSection from '@/components/EarthquakeInfoSection';

const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="donate" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Donate BNB to Support Myanmar Earthquake Victims</h2>
                <p className="text-gray-600 mb-4">
                  Your cryptocurrency donations make an immediate impact. By using BNB (Binance Coin), we ensure that funds are transferred quickly, securely, and with minimal fees.
                </p>
                <p className="text-gray-600 mb-4">Every transaction is recorded on the blockchain, providing complete transparency in how funds are collected and distributed to aid those affected by the March 28 earthquake.</p>
                <div className="bg-earthquake-primary/10 p-4 rounded-lg border border-earthquake-primary/20">
                  <h3 className="font-semibold mb-2 text-earthquake-primary">Why BNB?</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Fast transactions with low fees</li>
                    <li>Secure and transparent blockchain records</li>
                    <li>Widely accessible through major exchanges</li>
                    <li>Efficient cross-border transfer of value</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <DonationForm />
              </div>
            </div>
          </div>
        </section>
        
        <EarthquakeInfoSection />
        <TransparencySection />
      </main>
      
      <Footer />
    </div>;
};
export default Index;
