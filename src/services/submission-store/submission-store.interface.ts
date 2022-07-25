export const SUBMISSION_STORE_INJECTION_TOKEN = 'SUBMISSION_STORE'

/**
 * Service interface for interacting with submission storage.
 */
export interface ISubmissionStore {
    /**
     * Retrieve a submission by its ID.
     * @param id The id of the submission to retrieve.
     */
    getSubmission(id: string): any

    /**
     * Add a submission to the store.
     * @param submission The submission to add
     */
    addSubmission(submission: { id: string } & {}): void
}
