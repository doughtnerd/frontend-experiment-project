import { render } from '@testing-library/react'
import App from './App'

test('renders the app', () => {
    const result = render(<App />)
    expect(result).toMatchSnapshot()
})
