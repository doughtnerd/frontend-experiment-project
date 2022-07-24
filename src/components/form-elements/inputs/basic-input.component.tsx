import { DefaultInputProps, WithInputRef } from '@doughtnerd/qwizard-react'
import { ForwardedRef, InputHTMLAttributes } from 'react'
import { FormField, InputError, InputLabel } from './shared.styled'

export type BasicInputProps = WithInputRef<
    InputHTMLAttributes<HTMLInputElement> & { labelText: string } & DefaultInputProps
>

export function BasicInput({ inputRef, defaultValue, errors, labelText, ...inputProps }: BasicInputProps): JSX.Element {
    const errorMessageMap = errors.errors
    const errorsText = Object.values(errorMessageMap)?.[0]?.message

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
