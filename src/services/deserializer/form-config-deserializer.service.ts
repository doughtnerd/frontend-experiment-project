import { AbstractFormControlConfig, FormConfig } from '@doughtnerd/qwizard-react'
import { BasicInput } from '../../components/form-elements/inputs/basic-input.component'
import { Select } from '../../components/form-elements/inputs/select.component'
import { TextArea } from '../../components/form-elements/inputs/text-area.component'
import { ColumnGroup } from '../../components/form-elements/layouts/column-group.component'
import { RowGroup } from '../../components/form-elements/layouts/row-group.component'
import { IFormConfigDeserializer } from './form-config-deserializer.interface'

/**
 * This represents a minimal deserializer that is compatible with my library.
 * In the future, the library itself would probably be responsible for this but I haven't built that yet.
 * In fact, I'll probably just use this as a proof of concept an develop it further on my own time.
 */
export class FormConfigDeserializer implements IFormConfigDeserializer {
    /**
     * Convert serialized form config to form config runtime object.
     * @param formConfig JSON serialized form config
     * @returns AbstractFormControlConfig representing the deserialized form config
     */
    public deserialize(formConfig: any): AbstractFormControlConfig {
        const { controlType, renderData, renderComponent, controls } = formConfig

        if (controlType === 'control') {
            const comp = this.getControlRenderComponent(renderComponent)
            return FormConfig.Control('', { renderData, renderComponent: comp }, formConfig.validators)
        }

        if (controlType === 'group') {
            const subcontrols = controls.reduce((acc: any, controlJSON: any) => {
                const [[name, controlData]] = Object.entries(controlJSON)

                // Recursion is probably fine here but V8 doesn't do tail call optimization so a sufficient amount of recursion will blow our stack.
                acc[name as unknown as string] = this.deserialize(controlData)
                return acc
            }, {})
            const comp = this.getGroupRenderComponent(renderComponent)

            return FormConfig.Group(subcontrols, { renderData, renderComponent: comp })
        }

        throw new Error('Unknown control type')
    }

    private getGroupRenderComponent(type: 'rowGroup' | 'columnGroup'): any {
        switch (type) {
            case 'rowGroup':
                return RowGroup
            case 'columnGroup':
                return ColumnGroup
            default:
                throw new Error('Unknown control type')
        }
    }

    private getControlRenderComponent(type: 'input' | 'textarea' | 'select'): (props: any) => JSX.Element {
        switch (type) {
            case 'input':
                return BasicInput
            case 'textarea':
                return TextArea
            case 'select':
                return Select
            default:
                throw new Error('Unknown control type')
        }
    }
}
