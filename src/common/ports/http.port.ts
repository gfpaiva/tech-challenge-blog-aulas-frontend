export interface HttpRequestConfig extends Omit<RequestInit, 'body'> {
  baseURL?: string;
  timeout?: number;
  params?: Record<string, string | number | boolean>;
  pathParams?: Record<string, string | number>;
  parseJson?: boolean;
  debounce?: number;
  throttle?: number;
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public data: any,
    message?: string
  ) {
    super(message || `HTTP Error ${status}`);
    this.name = 'HttpError';
  }
}

export interface IHttpPort {
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T, K = unknown>(url: string, data?: K, config?: HttpRequestConfig): Promise<T>;
  put<T, K = unknown>(url: string, data?: K, config?: HttpRequestConfig): Promise<T>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;
}