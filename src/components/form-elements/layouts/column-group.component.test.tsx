import { render } from '@testing-library/react'
import { ColumnGroup } from './column-group.component'

describe('ColumnGroupComponent', () => {
    it('should render without errors', () => {
        const wrapper = render(<ColumnGroup />)
        expect(wrapper).toMatchSnapshot()
    })
})
