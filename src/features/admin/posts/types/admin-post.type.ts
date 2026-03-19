export interface AdminPost {
  id: string;
  title: string;
  subject: string;
  date: string;
}

export interface AdminPostResponse {
  data: AdminPost[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}
