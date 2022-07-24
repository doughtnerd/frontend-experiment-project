import { createStore } from 'redux'
import { ISubmissionStore } from './submission-store.interface'
import { submissionStoreReducer } from './submission-store.reducer'

export class SubmissionStore implements ISubmissionStore {
    private store

    constructor() {
        this.store = createStore(submissionStoreReducer)
    }

    getSubmission(id: string): any {
        return this.store.getState().submissions.find((submission) => submission.id === id)
    }

    getSubmissions(): any[] {
        return this.store.getState().submissions
    }

    addSubmission(submission: any): void {
        this.store.dispatch({ type: 'ADD_SUBMISSION', payload: submission })
    }
}
