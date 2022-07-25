import { ISubmissionStore } from '../../services/submission-store/submission-store.interface'
import { ThankYouPageBase, ThankYouPageProps } from './thank-you-page.component'
import { render, waitFor } from '@testing-library/react'

class TestSubmissionStore implements ISubmissionStore {
    getSubmission(id: string) {
        throw new Error('Method not implemented.')
    }
    addSubmission(submission: { id: string }): void {
        throw new Error('Method not implemented.')
    }
}

const testUseNavigate = jest.fn()
const testUseSearchParams = jest.fn()

const defaultProps: ThankYouPageProps = {
    deps: [new TestSubmissionStore(), testUseNavigate, testUseSearchParams],
}

describe('ThankYouPage', () => {
    // let defaultProps: ThankYouPageProps

    // beforeEach(() => {
    //     defaultProps = {
    //         deps: [new TestSubmissionStore(), testUseNavigate, testUseSearchParams],
    //     }
    // })

    it('Displays submitted data', () => {
        const submittedData = { id: '123', name: { first: 'John', last: 'Doe' } }

        const spy = jest.spyOn(defaultProps.deps[0], 'getSubmission').mockReturnValueOnce(submittedData)
        testUseSearchParams.mockReturnValue([{ get: () => '123' }])

        const { getByText } = render(<ThankYouPageBase {...defaultProps} />)

        expect(spy).toHaveBeenCalledWith('123')

        getByText('first: John')
        getByText('last: Doe')
    })

    it('Redirects to home page if no submission id is provided', async () => {
        testUseSearchParams.mockReturnValue([{ get: () => null }])

        const navigateMock = jest.fn()
        testUseNavigate.mockReturnValue(navigateMock)

        render(<ThankYouPageBase {...defaultProps} />)

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/')
        })
    })
})
