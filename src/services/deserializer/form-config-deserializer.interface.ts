import { AbstractFormControlConfig } from '@doughtnerd/qwizard-react'

/**
 * Token for DI.
 */
export const DESERIALIZER_INJECTION_TOKEN = 'DESERIALIZER'

/**
 * Service interface for deserializing form configs from JSON to runtime objects.
 */
export interface IFormConfigDeserializer {
    /**
     * Convert serialized form config to form config runtime object.
     * @param formConfig JSON form config data.
     */
    deserialize(formConfig: any): AbstractFormControlConfig
}
