import { createStore } from 'redux'
import { ISubmissionStore } from './submission-store.interface'
import { submissionStoreReducer } from './submission-store.reducer'

export class SubmissionStore implements ISubmissionStore {
    private store

    constructor() {
        // Yeah yeah, I know this is deprecated. Full blown redux toolkit is overkill though.
        this.store = createStore(submissionStoreReducer)
    }

    getSubmission(id: string): any {
        return this.store.getState().submissions.find((submission) => submission.id === id)
    }

    addSubmission(submission: { id: string } & {}): void {
        this.store.dispatch({ type: 'ADD_SUBMISSION', payload: submission })
    }
}
