export const originalFieldSet = [
    [
        {
            id: 'firstName',
            placeholder: 'First name',
            required: true,
            type: 'text',
        },
        {
            id: 'lastName',
            placeholder: 'Last name',
            required: true,
            type: 'text',
        },
    ],
    {
        id: 'email',
        required: true,
        type: 'text',
    },
    {
        id: 'address1',
        placeholder: 'Address 1',
        type: 'text',
    },
    [
        {
            id: 'city',
            type: 'text',
        },
        {
            id: 'state',
            type: 'text',
        },
        {
            id: 'zip',
            type: 'text',
        },
    ],
    {
        id: 'phone',
        required: true,
        type: 'text',
    },
    {
        id: 'jobTitle',
        options: [
            'Engineer - lead',
            'Engineer - mid level',
            'Engineer - junior',
            'Engineer - front end focused',
            'Engineer - backend focused',
            'Engineer - full stack',
        ],
        placeholder: 'Please select job title',
        type: 'select',
    },
    {
        id: 'reason',
        placeholder: 'Describe why you are a good fit for the job you are applying for.',
        type: 'textarea',
    },
]

/**
 * I cheat a little bit here with the `renderComponent = rowGroup/columnGroup` bit
 * but I used this assignment as a way to experiment with a feature I want to add to the `@doughtnerd/qwizard-react` library (ie. json serialization)
 *
 * Nice thing about the library is it's a fully recursive data-structure. You can add fields, groups, etc and generate a form with whatever arbitrary nesting you want.
 * This is probably pretty close to what my library would actually use.
 *
 * Also, I could use my own validators with this library but for the fields specified in the provided config, native browser validation works just as well.
 */
export const compatibleFieldSet = {
    controlType: 'group',
    renderData: {},
    renderComponent: 'columnGroup',
    controls: [
        {
            name: {
                controlType: 'group',
                renderData: {
                    validateOn: 'input',
                },
                renderComponent: 'rowGroup',
                controls: [
                    {
                        firstName: {
                            controlType: 'control',
                            renderData: {
                                inputProps: {
                                    id: 'firstName',
                                    placeholder: 'First name',
                                    required: true,
                                    type: 'text',
                                    labelText: 'First Name',
                                },
                            },
                            renderComponent: 'input',
                            validators: [],
                        },
                    },
                    {
                        lastName: {
                            controlType: 'control',
                            renderData: {
                                inputProps: {
                                    id: 'lastName',
                                    placeholder: 'Last name',
                                    required: true,
                                    type: 'text',
                                    labelText: 'Last Name',
                                },
                            },
                            renderComponent: 'input',
                            validators: [],
                        },
                    },
                ],
            },
        },
        {
            email: {
                controlType: 'control',
                renderData: {
                    inputProps: {
                        id: 'email',
                        required: true,
                        type: 'email',
                        labelText: 'Email',
                    },
                },
                renderComponent: 'input',
                validators: [],
            },
        },
        {
            address1: {
                controlType: 'control',
                renderData: {
                    inputProps: {
                        id: 'address1',
                        placeholder: 'Address 1',
                        type: 'text',
                        labelText: 'Address 1',
                    },
                },
                renderComponent: 'input',
                validators: [],
            },
        },
        {
            cityStateZip: {
                controlType: 'group',
                renderData: {},
                renderComponent: 'rowGroup',
                controls: [
                    {
                        city: {
                            controlType: 'control',
                            renderData: {
                                inputProps: {
                                    id: 'city',
                                    type: 'text',
                                    labelText: 'City',
                                },
                            },
                            renderComponent: 'input',
                            validators: [],
                        },
                    },
                    {
                        state: {
                            controlType: 'control',
                            renderData: {
                                inputProps: {
                                    id: 'state',
                                    type: 'text',
                                    labelText: 'State',
                                },
                            },
                            renderComponent: 'input',
                            validators: [],
                        },
                    },
                    {
                        zip: {
                            controlType: 'control',
                            renderData: {
                                inputProps: {
                                    id: 'zip',
                                    type: 'text',
                                    labelText: 'Zip',
                                },
                            },
                            renderComponent: 'input',
                            validators: [],
                        },
                    },
                ],
            },
        },
        {
            phone: {
                controlType: 'control',
                renderData: {
                    inputProps: {
                        id: 'phone',
                        required: true,
                        type: 'tel',
                        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
                        labelText: 'Phone',
                    },
                },
                renderComponent: 'input',
                validators: [],
            },
        },
        {
            jobTitle: {
                controlType: 'control',
                renderData: {
                    inputProps: {
                        id: 'jobTitle',
                        placeholder: 'Please select job title',
                        type: 'select',
                        labelText: 'Job Title',
                        defaultValue: '',
                        options: [
                            'Engineer - lead',
                            'Engineer - mid level',
                            'Engineer - junior',
                            'Engineer - front end focused',
                            'Engineer - backend focused',
                            'Engineer - full stack',
                        ],
                    },
                },
                renderComponent: 'select',
                validators: [],
            },
        },
        {
            reason: {
                controlType: 'control',
                renderData: {
                    inputProps: {
                        id: 'reason',
                        placeholder: 'Describe why you are a good fit for the job you are applying for.',
                        type: 'textarea',
                        labelText: 'Reason',
                    },
                },
                renderComponent: 'textarea',
                validators: [],
            },
        },
    ],
}
