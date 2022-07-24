import { ValidationError } from '@doughtnerd/qwizard-core'
import { fireEvent, render } from '@testing-library/react'
import { Select, SelectProps } from './select.component'

const defaultProps: SelectProps = {
    inputRef: null,
    defaultValue: '',
    errors: {
        errors: {},
        isValid: true,
    },
    options: [],
    labelText: '',
}

describe('Select', () => {
    it('should render', () => {
        const component = render(<Select {...defaultProps} />)
        expect(component).toMatchSnapshot()
    })

    it('Should display a label', () => {
        const props = { ...defaultProps, labelText: 'Test Label' }
        const { getByText } = render(<Select {...props} />)

        getByText('Test Label')
    })

    it('Should display an error message when the field is invalid', () => {
        const props = {
            ...defaultProps,
            errors: {
                errors: {
                    testError: new ValidationError('Test Error'),
                },
                isValid: false,
            },
        }
        const { getByText } = render(<Select {...props} />)

        getByText('Test Error')
    })

    it('Should display a placeholder when the field is empty', () => {
        const props = { ...defaultProps, placeholder: 'Test Placeholder' }
        const { getByText } = render(<Select {...props} />)

        getByText('Test Placeholder')
    })

    it('Should display options', () => {
        const props = { ...defaultProps, options: ['hello', 'test'] }
        const { getByTestId, getByText } = render(<Select {...props} data-testid="test-select" />)

        fireEvent.click(getByTestId('test-select'))

        getByText('hello')
        getByText('test')
    })
})
