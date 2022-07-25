import styled from 'styled-components'

const FlexRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;

    & > * {
        flex-grow: 1;
    }
`

export function RowGroup({ children }: any) {
    return <FlexRow>{children}</FlexRow>
}
