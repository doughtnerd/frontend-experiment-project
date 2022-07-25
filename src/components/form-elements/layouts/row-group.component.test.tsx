import { render } from '@testing-library/react'
import { RowGroup } from './row-group.component'

describe('RowGroupComponent', () => {
    it('should render without errors', () => {
        const wrapper = render(<RowGroup />)
        expect(wrapper).toMatchSnapshot()
    })
})
