export const SUBMISSION_STORE_INJECTION_TOKEN = 'SUBMISSION_STORE'

export interface ISubmissionStore {
    getSubmission(id: string): any
    getSubmissions(): any[]
    addSubmission(submission: any): void
}
