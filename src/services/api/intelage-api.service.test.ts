import { FormConfigDeserializer } from '../deserializer/form-config-deserializer.service'
import { IHttpClient } from '../http/http-client.interface'
import { IntelageApi } from './intelage-api.service'

class TestHTTPClient implements IHttpClient {
    get<T>(url: string): Promise<T> {
        throw new Error('Method not implemented.')
    }

    post<T>(url: string, data: any): Promise<T> {
        throw new Error('Method not implemented.')
    }
}

// In a real app, I'd expand these tests a bit more but for this app, it's fine IMO.
describe('IntelageAPIService', () => {
    it('Can retrieve form configuration', async () => {
        const httpClient = new TestHTTPClient()
        const intelageApi = new IntelageApi(httpClient, new FormConfigDeserializer())

        const spy = jest.spyOn(httpClient, 'get').mockResolvedValue(Promise.resolve({}))

        const formConfig = await intelageApi.getFormConfig()

        expect(spy).toHaveBeenCalledWith('/api/form-config')

        expect(formConfig).toBeDefined()
    })

    it('Can submit form data', async () => {
        const httpClient = new TestHTTPClient()
        const intelageApi = new IntelageApi(httpClient, new FormConfigDeserializer())

        const spy = jest.spyOn(httpClient, 'post').mockResolvedValue(Promise.resolve({}))

        await intelageApi.submitFormData({})
        expect(spy).toHaveBeenCalledWith('/api/submit-form-data', {})
    })
})
