import { AbstractFormControlConfig, Form } from '@doughtnerd/qwizard-react'
import { withProviders } from '@doughtnerd/wrangler-di'
import { useState, useEffect } from 'react'
import type { useNavigate } from 'react-router-dom'
import { API_INJECTION_TOKEN, IIntelageApi } from '../../services/api/intelage-api.interface'
import { USE_NAVIGATE_INJECTION_TOKEN } from '../../services/routing-injection-tokens.constants'
import {
    ISubmissionStore,
    SUBMISSION_STORE_INJECTION_TOKEN,
} from '../../services/submission-store/submission-store.interface'

export type FormPageProps = {
    deps: [IIntelageApi, typeof useNavigate, ISubmissionStore]
    onSubmitRedirectTo: string
}

/**
 * Core component for the form page. To use the component without dependency injection,
 * use this component instead of `FormPage`.
 */
export function FormPageBase({ deps, onSubmitRedirectTo }: FormPageProps) {
    const [apiService, navigateHook, submissionStore] = deps
    const form = useFormLoader(apiService)
    const navigate = navigateHook()

    const handleFormSubmit = (e: CustomEvent) => {
        const [api] = deps
        const data = e.detail.formValue
        const submissionId = Date.now().toString()

        const dataWithId = { id: submissionId, ...data }

        api.submitFormData(dataWithId)
            .then(() => {
                submissionStore.addSubmission(dataWithId)
                navigate(onSubmitRedirectTo + `?submissionId=${submissionId}`)
            })
            .catch(() => {
                console.error('Weird... You shouldnt be able to fail to submit the form...')
            })
    }

    return (
        <>
            <h1>Form Page</h1>
            {form ? (
                <Form config={form} onSubmit={handleFormSubmit}>
                    <button type="submit">Submit</button>
                </Form>
            ) : (
                'Loading...'
            )}
        </>
    )
}

/**
 * Helper hook for loading the form config from the API. Only to be consumed by this component
 * @param api The API service to use
 * @returns The form configuration runtime object from the server
 */
function useFormLoader(api: IIntelageApi) {
    const [form, setForm] = useState<AbstractFormControlConfig | null>(null)
    useEffect(() => {
        api.getFormConfig()
            .then((config: AbstractFormControlConfig) => {
                setForm(config)
            })
            .catch(() => {
                setForm(null)
            })
    }, [api, setForm])

    return form
}

/**
 * Wrapper component for the form page. This component will inject services into the component
 */
export const FormPage = withProviders(FormPageBase, [
    API_INJECTION_TOKEN,
    USE_NAVIGATE_INJECTION_TOKEN,
    SUBMISSION_STORE_INJECTION_TOKEN,
])
