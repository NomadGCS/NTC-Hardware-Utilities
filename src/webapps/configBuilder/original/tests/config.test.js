/**
 * To Run Tests:   From terminal, jest config.test
 */

import updateField from "../util/configBuilderUtils"


import ConfigBuilderForm from '../ConfigBuilderForm'

function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});


// THIS DOESN"T WORK YET
test('Form is called', () => {
    let data = {
        "id": "Awning Module",
        "meta": {
            "id": "Awning Module"
        },
        "type": "awning",
        "name": {
            "value": "modules.awning.name"
        },
        "systemIds": []
    }

    let formData = {
        "Display Name": "Awning Module",
        "type": "awning"
    }

    let field = {
        "label": "Display Name",
        "path": "meta.id",
        "additionalPaths": [
            "id"
        ],
        "type": "input",
        "value": "Awning Module"
    }

    updateField(data, formData, field)

    expect( () => {} ).toBe(3);
})