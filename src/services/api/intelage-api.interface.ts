import { AbstractFormControlConfig } from '@doughtnerd/qwizard-react'

/**
 * Token for DI.
 */
export const API_INJECTION_TOKEN = 'API'

/**
 * Service interface for interacting with the Intelage API.
 */
export interface IIntelageApi {
    /**
     * Retrieves the form config for the app from our API.
     */
    getFormConfig(): Promise<AbstractFormControlConfig>

    /**
     * Submits form data to our API.
     * @param data JSON data from the form to submit.
     */
    submitFormData(data: any): Promise<any>
}
