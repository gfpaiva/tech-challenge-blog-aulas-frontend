export interface CreatePostRequest {
  title: string;
  categoryId: number;
  content: string;
}

export interface CreatePostResponse {
  id: string;
  title: string;
  content: string;
  creationDate: string;
  updateDate: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  category: {
    id: number;
    name: string;
  };
}
