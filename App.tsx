import React, { useState } from 'react';
import type { AggregatedSeoAnalysis } from './types';
import { fetchSeoAnalysis } from './services/geminiService';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ResultsDisplay } from './components/ResultsDisplay';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [results, setResults] = useState<AggregatedSeoAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (keywords: string, country: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const seoResult = await fetchSeoAnalysis(keywords, country);
      setResults(seoResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {results && <ResultsDisplay results={results} />}
            {!isLoading && !error && !results && <WelcomeScreen />}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-slate-500">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
};

export default App;