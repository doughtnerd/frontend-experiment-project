import { DefaultInputProps, WithInputRef } from '@doughtnerd/qwizard-react'
import { ForwardedRef, InputHTMLAttributes } from 'react'
import { FormField, InputError, InputLabel } from './shared.styled'

export type BasicInputProps = WithInputRef<
    InputHTMLAttributes<HTMLInputElement> & { labelText: string } & DefaultInputProps
>

/**
 * Renders a basic input with a label and error message (if using custom validators).
 * Input ref is needed for use with the `@doughtnerd/qwizard-react` library.
 *
 * @param param0
 * @returns
 */
export function BasicInput({ inputRef, defaultValue, errors, labelText, ...inputProps }: BasicInputProps): JSX.Element {
    const errorMessageMap = errors.errors

    /* c8 ignore next */
    const errorsText = Object.values(errorMessageMap)?.[0]?.message
    // Skipped because this is one of the TS issues with the library and is something I need to fix, likely by providing a different interface for accessing errors.

    return (
        <FormField>
            <InputLabel htmlFor={inputProps.id}>{labelText}</InputLabel>
            <input
                defaultValue={defaultValue}
                ref={inputRef as ForwardedRef<HTMLInputElement>}
                aria-required={inputProps.required ? 'true' : 'false'}
                aria-invalid={errorsText ? 'true' : 'false'}
                {...inputProps}
            />
            <InputError hidden={errorsText === undefined}>{errorsText} </InputError>
        </FormField>
    )
}
