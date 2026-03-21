export interface Post {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string; // ISO date string or formatted date
  readTimeMin: number;
  authorConfig: {
    name: string;
    role?: string;
    avatarUrl?: string; // Optional if no avatar provided
  };
  thumbnailUrl: string;
}

export interface PostDetail extends Post {
  content: string;
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  publishedAt: string; // formatted pt-BR date
}
