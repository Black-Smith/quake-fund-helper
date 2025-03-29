
import { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader } from "lucide-react";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any;
}

interface CrawlFormProps {
  onCrawlComplete: (data: any) => void;
}

const CrawlForm = ({ onCrawlComplete }: CrawlFormProps) => {
  const [apiKey, setApiKey] = useState('');
  const [url, setUrl] = useState('https://www.nytimes.com/live/2025/03/29/world/earthquake-myanmar-thailand');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [apiKeySet, setApiKeySet] = useState(!!FirecrawlService.getApiKey());

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    try {
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        setApiKeySet(true);
        toast.success('API key saved successfully');
        setApiKey('');
      } else {
        toast.error('Invalid API key');
      }
    } catch (error) {
      toast.error('Failed to verify API key');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      const apiKey = FirecrawlService.getApiKey();
      if (!apiKey) {
        toast.error('Please set your API key first');
        setIsLoading(false);
        return;
      }

      const simulatedProgress = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(simulatedProgress);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      const result = await FirecrawlService.crawlWebsite(url);
      
      clearInterval(simulatedProgress);
      setProgress(100);

      if (result.success) {
        toast.success('Website crawled successfully');
        setCrawlResult(result.data);
        onCrawlComplete(result.data.data);
      } else {
        toast.error(result.error || 'Failed to crawl website');
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast.error('Failed to crawl website');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 backdrop-blur-sm bg-white/95 dark:bg-black/30 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
      {!apiKeySet ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-earthquake-primary">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-semibold">API Key Required</h3>
          </div>
          <p className="text-sm text-gray-600">
            To use web crawling functionality, please enter your API key below.
            This is stored locally and not sent to our servers.
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
              className="flex-1"
            />
            <Button onClick={handleSaveApiKey}>Save</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Website URL
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              placeholder="https://example.com"
              required
            />
          </div>
          
          {isLoading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Crawling in progress...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-earthquake-primary hover:bg-earthquake-primary/90 text-white transition-all duration-200"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Crawling...
              </span>
            ) : (
              "Start Crawl"
            )}
          </Button>
        </form>
      )}

      {crawlResult && (
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Crawl Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Status: {crawlResult.status}</p>
            <p>Completed Pages: {crawlResult.completed}</p>
            <p>Total Pages: {crawlResult.total}</p>
            <p>Credits Used: {crawlResult.creditsUsed}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CrawlForm;
