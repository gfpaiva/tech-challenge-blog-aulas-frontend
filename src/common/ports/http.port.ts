export interface IHttpPort {
  get<T>(url: string, config?: object): Promise<T>;
  post<T, K>(url: string, data: K, config?: object): Promise<T>;
  put<T, K>(url: string, data: K, config?: object): Promise<T>;
  delete<T>(url: string, config?: object): Promise<T>;
}