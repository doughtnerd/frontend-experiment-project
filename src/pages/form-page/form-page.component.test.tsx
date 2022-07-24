import { AbstractFormControlConfig, FormConfig } from '@doughtnerd/qwizard-react'
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { BasicInput } from '../../components/form-elements/inputs/basic-input.component'
import { IIntelageApi } from '../../services/api/intelage-api.interface'
import { ISubmissionStore } from '../../services/submission-store/submission-store.interface'
import { FormPageBase, FormPageProps } from './form-page.component'

class TestIntelageApi implements IIntelageApi {
    submitFormData(data: { id: string } & {}): Promise<any> {
        throw new Error('Method not implemented.')
    }

    getFormConfig(): Promise<AbstractFormControlConfig> {
        throw new Error('Method not implemented.')
    }
}

class TestSubmissionStore implements ISubmissionStore {
    getSubmission(id: string) {
        throw new Error('Method not implemented.')
    }
    getSubmissions(): any[] {
        throw new Error('Method not implemented.')
    }
    addSubmission(submission: any): void {}
}

const mockNavigateFunc = jest.fn()
const testUseNavigate = jest.fn().mockReturnValue(mockNavigateFunc)

describe('FormPage', () => {
    it('Displays the form once it loads from the server', async () => {
        const formData = FormConfig.Group(
            {
                name: FormConfig.Control('', {
                    renderComponent: BasicInput,
                    renderData: { inputProps: { labelText: 'Hello' } },
                }),
            },
            { renderData: {} }
        )

        const apiInstance = new TestIntelageApi()
        const submissionStore = new TestSubmissionStore()
        jest.spyOn(apiInstance, 'getFormConfig').mockResolvedValue(formData)

        let result: RenderResult = render(
            <FormPageBase deps={[apiInstance, testUseNavigate, submissionStore]} onSubmitRedirectTo="" />
        )

        await result.findByText('Hello')
    })

    it('Doesnt display the form if loading fails', () => {
        const apiInstance = new TestIntelageApi()
        const submissionStore = new TestSubmissionStore()
        jest.spyOn(apiInstance, 'getFormConfig').mockRejectedValue(new Error('Error'))

        let result: RenderResult = render(
            <FormPageBase deps={[apiInstance, testUseNavigate, submissionStore]} onSubmitRedirectTo="" />
        )

        expect(result.queryByText('Hello')).toBeNull()
    })

    it('Submits the form', async () => {
        // Mock form we're going to submit.
        const formData = FormConfig.Group(
            {
                firstName: FormConfig.Control('', {
                    renderComponent: BasicInput,
                    renderData: { inputProps: { id: 'firstName', labelText: 'First name' } },
                }),
            },
            { renderData: {} }
        )

        // Setup the api we'll submit to and listen to the functions.
        const apiInstance = new TestIntelageApi()
        const submissionStore = new TestSubmissionStore()
        jest.spyOn(apiInstance, 'getFormConfig').mockResolvedValue(formData)
        const spy = jest.spyOn(apiInstance, 'submitFormData').mockResolvedValue(true)

        // Render the form.
        let result: RenderResult = render(
            <FormPageBase deps={[apiInstance, testUseNavigate, submissionStore]} onSubmitRedirectTo="" />
        )

        const formEl: HTMLInputElement = (await result.findByLabelText('First name')) as HTMLInputElement

        // Fill out the form.
        fireEvent.input(formEl, { target: { value: 'Test' } })
        expect(formEl.value).toBe('Test')

        // Submit the form.
        fireEvent.click(result.getByText('Submit'))
        await waitFor(() => expect(spy).toHaveBeenCalledWith({ id: expect.any(String), firstName: 'Test' }))

        // The page should navigate after the form is submitted.
        expect(mockNavigateFunc).toHaveBeenCalledWith('')
    })
})
