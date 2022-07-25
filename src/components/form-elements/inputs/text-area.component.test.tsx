import { ValidationError } from '@doughtnerd/qwizard-core'
import { render } from '@testing-library/react'
import { TextArea, TextAreaProps } from './text-area.component'

const defaultProps: TextAreaProps = {
    id: 'testInput',
    inputRef: null,
    defaultValue: '',
    errors: {
        errors: {},
        isValid: true,
    },
    labelText: '',
}

describe('TextArea', () => {
    it('should render', () => {
        const component = render(<TextArea {...defaultProps} />)
        expect(component).toMatchSnapshot()
    })

    it('Should display a label', () => {
        const props = { ...defaultProps, labelText: 'Test Label' }
        const { getByText } = render(<TextArea {...props} />)

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
        const { getByText } = render(<TextArea {...props} />)

        getByText('Test Error')
    })

    it('Sets aria required if field is required', () => {
        const props = { ...defaultProps, required: true, labelText: 'Test Label' }
        const { getByLabelText } = render(<TextArea {...props} />)

        const input = getByLabelText('Test Label')
        expect(input).toHaveAttribute('aria-required', 'true')
    })
})
