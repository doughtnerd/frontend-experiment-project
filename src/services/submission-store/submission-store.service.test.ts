import { SubmissionStore } from './submission-store.service'

describe('SubmissionStoreService', () => {
    it('Should allow adding and retrieving a submission', () => {
        const submissionStoreService = new SubmissionStore()
        const submission = { id: '1' }
        submissionStoreService.addSubmission(submission)
        expect(submissionStoreService.getSubmission('1')).toEqual(submission)
    })
})
