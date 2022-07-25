import { ForwardedRef, InputHTMLAttributes } from 'react'
import { WithInputRef, DefaultInputProps } from '@doughtnerd/qwizard-react'
import React from 'react'
import { FormField, InputError, InputLabel } from './shared.styled'

export type SelectProps = WithInputRef<
    InputHTMLAttributes<HTMLSelectElement> & { labelText: string; options: string[] } & DefaultInputProps
>

export function Select({
    inputRef,
    defaultValue,
    errors,
    labelText,
    options,
    ...inputProps
}: SelectProps): JSX.Element {
    const errorMessageMap = errors.errors

    /* c8 ignore next */
    const errorsText = Object.values(errorMessageMap)?.[0]?.message
    // Skipped because this is one of the TS issues with the library and is something I need to fix, likely by providing a different interface for accessing errors.

    return (
        <FormField>
            <InputLabel htmlFor={inputProps.id}>{labelText}</InputLabel>
            <select
                defaultValue={defaultValue}
                ref={inputRef as ForwardedRef<HTMLSelectElement>}
                aria-required={inputProps.required ? 'true' : 'false'}
                aria-invalid={errorsText ? 'true' : 'false'}
                {...inputProps}
            >
                <>
                    {inputProps.placeholder && (
                        <option value="" disabled>
                            {inputProps.placeholder}
                        </option>
                    )}
                    {options.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </>
            </select>
            <InputError hidden={errorsText === undefined}>{errorsText} </InputError>
        </FormField>
    )
}
