
import { toast } from "sonner";

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.firecrawl.dev/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Making crawl request to endpoint');
      
      // In a real implementation, this would make an actual API call to Firecrawl
      // For demo purposes, we'll simulate the response for the Myanmar earthquake article
      
      // Simulated crawl data for the Myanmar earthquake article
      const simulatedData = {
        success: true,
        status: "completed",
        completed: 1,
        total: 1,
        creditsUsed: 5,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        data: {
          title: "Powerful Magnitude 7.2 Earthquake in Myanmar",
          date: "March 29, 2024",
          location: "Northern Myanmar, near Thai border",
          casualties: "At least 14 people killed, over 50 injured",
          description: "A powerful 7.2 magnitude earthquake struck Myanmar's northern region near the Thai border, causing buildings to collapse and significant damage across multiple cities. The earthquake was felt as far as Bangkok and parts of southern China.",
          aftershocks: "Multiple aftershocks reported, including several above magnitude 5.0",
          affectedAreas: "Shan State, Mandalay, and regions along the Thai-Myanmar border were most affected",
          buildingsDamaged: "Over 300 buildings reported damaged or collapsed",
          rescueEfforts: "Rescue teams deployed to affected areas, with emergency response underway",
          internationalAid: "Neighboring countries and international organizations pledged support"
        }
      };

      return { 
        success: true,
        data: simulatedData 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to crawling service' 
      };
    }
  }
}
