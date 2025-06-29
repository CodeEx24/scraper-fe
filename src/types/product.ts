export interface ApiProduct {
  title: string;
  popularityScore: number;
  popularityChange: number;
  ctr: number;
  cvr: number;
  cpa: number;
  totalCost: number;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  impressions: number;
  viewRate6s: number;
  category: string;
  titleGroup: string;
  link: string;
  trendSummary: string;
  opportunityScore: number;
}

export interface ApiDataRes {
  message: string;
  products: ApiProduct[];
}

export interface ApiResponse {
  context: unknown[];
  dataRes: ApiDataRes;
}
