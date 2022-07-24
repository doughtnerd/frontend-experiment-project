import { withProviders } from '@doughtnerd/wrangler-di'
import styled from 'styled-components'
import { SUBMISSION_STORE_INJECTION_TOKEN } from '../services/submission-store/submission-store.interface'

export function ThankYouPageBase({ deps }: any) {
    const [submissionStore] = deps
    return (
        <>
            <h1>Thank You</h1>
            {submissionStore.getSubmissions().map((data: any) => {
                return <Column>{formatData(Object.entries(data))}</Column>
            })}
        </>
    )
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 4px 0;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const Datapoint = styled.div`
    display: flex;
    padding: 0 8px;
`

function formatData(data: Array<[string, {} | string]>): JSX.Element {
    return formatRecursive(data, 0)
}

function formatRecursive(data: Array<[string, {} | string]>, depth: number = 0): JSX.Element {
    return (
        <>
            {data.map(([key, value]) => {
                if (typeof value === 'string') {
                    return depth == 0 ? (
                        <Row>
                            <Datapoint>{`${key}: ${value}`}</Datapoint>
                        </Row>
                    ) : (
                        <Datapoint>{`${key}: ${value}`}</Datapoint>
                    )
                }
                return <Row>{formatRecursive(Object.entries(value), depth + 1)}</Row>
            })}
        </>
    )
}

export const ThankYouPage = withProviders(ThankYouPageBase, [SUBMISSION_STORE_INJECTION_TOKEN])
