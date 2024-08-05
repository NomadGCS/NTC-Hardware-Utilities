import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, {Fragment} from "react";

import TranslationDropdown from "./TranslationDropdown.jsx"

export default function TranslationControls({type, options, displayFormat, values, textValues = [], updates}) {
    const {moduleNames, locations, descriptions} = options;

   //console.log('jb TranslationControls: ', type, displayFormat, values, textValues)

    if (!displayFormat) {
        return (<div>None</div>);
    }

    const {value} = displayFormat;
    const parts = value.split(" ");

    const factory = (name) => {
        if (name === "-") {
            return (
                <div style={{paddingBottom: '0.75em', fontSize: '2.5em', color: '#999'}}>
                    {name}
                </div>
            )
        }
        else {
            let dropDownOptions = moduleNames;
            let helpText = "From translations file:  Module Names";

            if (name.includes('location')) {
                helpText = "From translations file:  Location, Misc, Common";
                dropDownOptions = locations;
            }
            if (name.includes('description')) {
                helpText = "From translations file:  Module Variants, Misc";
                dropDownOptions = descriptions;
            }

            let strippedName = name.replace("{{", "").replace("}}", "");

            // HACK -- default value type is a "name"
            if (name === "") strippedName = type;
            let existingValue = values.find(i => i.key === strippedName)?.value ?? "";
            let existingTextValue = textValues.find(i => i.key === strippedName)?.value ?? "";

            return <TranslationDropdown name={strippedName} options={dropDownOptions} defaultValue={existingValue} updates={updates} helpText={helpText} textValue={existingTextValue}/>
        }
    }

    return (
        <Box>
            <Stack direction={'row'} alignItems={'center'}>
                {parts.map((item) => (
                    <Box key={crypto.randomUUID()}>
                        {factory(item)}
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}