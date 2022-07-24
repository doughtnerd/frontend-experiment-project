export const HTTP_CLIENT_INJECTION_TOKEN = 'HTTP_CLIENT'

export interface IHttpClient {
    get<T>(url: string): Promise<T>
    post<T>(url: string, data: any): Promise<T>
}
