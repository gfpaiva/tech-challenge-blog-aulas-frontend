export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string; // ISO date string or formatted date
  readTimeMin: number;
  authorConfig: {
    name: string;
    avatarUrl?: string; // Optional if no avatar provided
  };
  thumbnailUrl: string;
}
