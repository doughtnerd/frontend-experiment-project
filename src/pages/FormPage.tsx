import { AbstractFormControlConfig, Form } from '@doughtnerd/qwizard-react'
import { withProviders } from '@doughtnerd/wrangler-di'
import { useEffect, useState } from 'react'
import { API_INJECTION_TOKEN, IIntelageApi } from '../services/api/intelage-api.interface'

export type FormPageProps = {
    deps: [IIntelageApi]
}

function FormPageBase({ deps }: FormPageProps) {
    const [form, setForm] = useState<AbstractFormControlConfig | null>(null)

    useEffect(() => {
        const [api] = deps
        api.getFormConfig().then((config) => {
            setForm(config)
        })
    }, [])

    return (
        <>
            <h1>Form Page</h1>
            {form ? (
                <Form
                    config={form}
                    onSubmit={(e) => {
                        console.log(e.detail)
                    }}
                >
                    <button type="submit">Submit</button>
                </Form>
            ) : (
                'Loading...'
            )}
        </>
    )
}

export const FormPage = withProviders(FormPageBase, [API_INJECTION_TOKEN])
