export interface TopRankingPage {
  title: string;
  url: string;
}

export interface AggregatedSeoAnalysis {
  overallSummary: string;
  contentSuggestions: string[];
  seoTakeaways: string[];
  topRankingPages: TopRankingPage[];
}

export interface Country {
    name: string;
    code: string;
}