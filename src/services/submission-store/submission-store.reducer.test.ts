import {
    AddSubmissionAction,
    defaultSubmissionStoreState,
    SubmissionStoreAction,
    submissionStoreReducer,
} from './submission-store.reducer'

describe('SubmissionStoreReducer', () => {
    it('should return the initial state', () => {
        expect(submissionStoreReducer(undefined, { type: 'random' } as unknown as SubmissionStoreAction)).toEqual(
            defaultSubmissionStoreState
        )
    })

    it('Should add a new submission', () => {
        const submission = {
            id: '1',
            title: 'Test',
            description: 'Test',
        }

        const action: AddSubmissionAction = {
            type: 'ADD_SUBMISSION',
            payload: submission,
        }

        const state = submissionStoreReducer(undefined, action)
        expect(state.submissions).toEqual([...defaultSubmissionStoreState.submissions, submission])
    })
})
