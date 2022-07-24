import { IHttpClient } from './http-client.interface'

export class HttpClient implements IHttpClient {
    get<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                resolve({} as unknown as T)
            }, 1000)
        })
    }

    post<T>(url: string, data: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                resolve({} as unknown as T)
            }, 1000)
        })
    }
}
