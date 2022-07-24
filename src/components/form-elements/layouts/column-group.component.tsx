import styled from 'styled-components'

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`

export function ColumnGroup({ children }: any) {
    return <FlexColumn>{children}</FlexColumn>
}
