import { ForwardedRef, InputHTMLAttributes } from 'react'
import { WithInputRef, DefaultInputProps } from '@doughtnerd/qwizard-react'
import React from 'react'
import { FormField, InputError, InputLabel } from './shared.styled'

export type TextAreaProps = WithInputRef<
    InputHTMLAttributes<HTMLTextAreaElement> & { labelText: string } & DefaultInputProps
>

export function TextArea({ inputRef, defaultValue, errors, labelText, ...elementProps }: TextAreaProps): JSX.Element {
    const errorMessageMap = errors.errors
    const errorsText = Object.values(errorMessageMap)?.[0]?.message

    return (
        <FormField style={{ display: 'flex', flexDirection: 'column', minHeight: '64px' }}>
            <InputLabel htmlFor={elementProps.id}>{labelText}</InputLabel>
            <textarea
                defaultValue={defaultValue}
                ref={inputRef as ForwardedRef<HTMLTextAreaElement>}
                aria-required={elementProps.required ? 'true' : 'false'}
                aria-invalid={errorsText ? 'true' : 'false'}
                {...elementProps}
            />
            <InputError hidden={errorsText === undefined}>{errorsText} </InputError>
        </FormField>
    )
}
