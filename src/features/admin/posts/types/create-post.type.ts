export interface CreatePostRequest {
  title: string;
  categoryId: number;
  content: string;
}

export interface CreatePostResponse {
  id: string;
  title: string;
  content: string;
  categoryId: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
