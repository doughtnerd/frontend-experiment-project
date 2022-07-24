import { AbstractFormControlConfig } from '@doughtnerd/qwizard-react'
import { IFormConfigDeserializer } from '../deserializer/form-config-deserializer.interface'
import { IHttpClient } from '../http/http-client.interface'
import { compatibleFieldSet } from './field-set'
import { IIntelageApi } from './intelage-api.interface'

export class IntelageApi implements IIntelageApi {
    constructor(private httpClient: IHttpClient, private deserializer: IFormConfigDeserializer) {}

    getFormConfig(): Promise<AbstractFormControlConfig> {
        return this.httpClient.get<any>('/api/form-config').then(() => {
            return this.deserializer.deserialize(compatibleFieldSet)
        })
    }

    submitFormData<T>(data: { id: string } & {}): Promise<T> {
        return this.httpClient.post<T>('/api/submit-form-data', data)
    }
}
