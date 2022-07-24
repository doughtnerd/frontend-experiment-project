export type SubmissionStoreState = {
    submissions: any[]
}

export const defaultSubmissionStoreState: SubmissionStoreState = {
    submissions: [
        {
            name: {
                firstName: 'Chris',
                lastName: 'Carlson',
            },
            email: 'doughtnerd@gmail.com',
            address1: '123 Fake Street',
            cityStateZip: {
                city: 'Sandy',
                state: 'UT',
                zip: '84092',
            },
            phone: '123-456-7890',
            jobTitle: 'Engineer - mid level',
            reason: 'Because',
        },
    ],
}

export type AddSubmissionAction = {
    type: 'ADD_SUBMISSION'
    payload: any
}

export type SubmissionStoreAction = AddSubmissionAction

export function submissionStoreReducer(
    state: SubmissionStoreState = defaultSubmissionStoreState,
    action: SubmissionStoreAction
): SubmissionStoreState {
    switch (action.type) {
        case 'ADD_SUBMISSION':
            return {
                submissions: [...state.submissions, action.payload],
            }
        default:
            return state
    }
}
