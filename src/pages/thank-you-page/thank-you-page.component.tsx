import { withProviders } from '@doughtnerd/wrangler-di'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { useNavigate } from 'react-router-dom'
import {
    ISubmissionStore,
    SUBMISSION_STORE_INJECTION_TOKEN,
} from '../../services/submission-store/submission-store.interface'
import { Column, Datapoint, Row } from './thank-you-page.styled'

export type ThankYouPageProps = {
    deps: [ISubmissionStore, typeof useNavigate]
}

export function ThankYouPageBase({ deps }: any) {
    const [submissionStore, useNavigate] = deps
    const [search] = useSearchParams()
    const navigate = useNavigate()

    const submissionId = search.get('submissionId')

    const [submittedData, setSubmittedData] = useState<any>(null)

    useEffect(() => {
        if (submissionId) {
            const submission = submissionStore.getSubmission(submissionId)
            if (submission) {
                setSubmittedData(submission)
                return
            }
        }
        navigate('/')
    }, [submissionId, navigate, setSubmittedData, submissionStore])

    return (
        <>
            <h1>Thank You</h1>
            {submittedData && <Column>{formatData(Object.entries(submittedData))}</Column>}
        </>
    )
}

function formatData(data: Array<[string, {} | string]>): JSX.Element {
    return formatRecursive(data, 0)
}

function formatRecursive(data: Array<[string, {} | string]>, depth: number = 0): JSX.Element {
    return (
        <>
            {data.map(([key, value]) => {
                if (typeof value === 'string') {
                    return depth == 0 ? (
                        <Row key={key}>
                            <Datapoint>{`${key}: ${value}`}</Datapoint>
                        </Row>
                    ) : (
                        <Datapoint key={key}>{`${key}: ${value}`}</Datapoint>
                    )
                }
                return <Row key={key}>{formatRecursive(Object.entries(value), depth + 1)}</Row>
            })}
        </>
    )
}

export const ThankYouPage = withProviders(ThankYouPageBase, [SUBMISSION_STORE_INJECTION_TOKEN, 'USE_NAVIGATE'])
