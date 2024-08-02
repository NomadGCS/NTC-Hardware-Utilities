import React, {useEffect, useState} from "react";
import {Box, MenuItem, Select, Stack} from "@mui/material";
import {NumberInput} from "@mui/base/Unstable_NumberInput/NumberInput";
import NameInput from "../inputs/NameInput.jsx";


export default function TranslationDropdown({name, defaultValue, textValue, options, updates, helpText = ""}) {
    const [value, setValue] = useState();
    const [hasParameters, setHasParameters] = useState(false);
    const [paramValue, setParamValue] = useState("1");
    const [paramKey, setParamKey] = useState("");

    useEffect(() => {
        if (textValue) {
            let parsed = JSON.parse(textValue);
            let key = Object.keys(parsed)[0];

            //console.log('jb parsed: ', parsed, key);

            setParamKey(key);
            setParamValue(parsed[key].value);
            setHasParameters(true);
            //setParamValue(textValue);
        }

        setValue(defaultValue);
    }, []);

    const handleChange = (e) => {
        let newValue = e.target.value;
        setValue(newValue);

        // let params = undefined;
        // const displayValue = options.find((item) => item.path === newValue)?.value;
        // //console.log('jb displayValue: ', displayValue)
        // if (displayValue && displayValue.includes("{{")) {
        //     const text = displayValue.substring(displayValue.indexOf('{{') + 1, displayValue.lastIndexOf('}}'));
        //     const key = text.replace("{", "").replace("}", "");
        //     setParamKey(key);
        //     let obj = {}
        //     obj[key] = {"value": 1};
        //     params = JSON.stringify(obj);
        //
        //     //params = JSON.stringify({ "id": {"value": 1} });
        // }
        // else {
        //     params = "";
        // }

        updateHOC(name, newValue, paramValue);

        //updates(name, newValue, params);
    }

    const handleTextChange = (e) => {
        let newParamValue = e.target.value;
        setParamValue(newParamValue);

        updateHOC(name, value, newParamValue);
    }


    const updateHOC = (name, newValue, newParamValue) => {
        //console.log("jb updateHOC: ", name, newValue, newParamValue)

        let params = undefined;
        const displayValue = options.find((item) => item.path === newValue)?.value;
        if (displayValue && displayValue.includes("{{")) {
            const text = displayValue.substring(displayValue.indexOf('{{') + 1, displayValue.lastIndexOf('}}'));
            const key = text.replace("{", "").replace("}", "");
            setParamKey(key);
            let obj = {}
            obj[key] = {"value": `${newParamValue}`};
            params = JSON.stringify(obj);
        }
        else {
            params = "";
        }

        updates(name, newValue, params);
    }

    console.log('jb Translation Dropdown: ', name, defaultValue, hasParameters, textValue)

    return (
        <Stack direction='row'>
            <Stack direction='column' sx={{margin: '10px'}}>
                <Select
                    value={defaultValue}
                    onChange={handleChange}
                >
                    {options.map((item, index) => (
                        <MenuItem value={item.path} key={crypto.randomUUID()}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
                <Box sx={{textAlign:'center', opacity: '0.5', marginTop: '4px'}}>
                    <label style={{cursor:'pointer'}} title={helpText}>
                        {name}
                    </label>
                </Box>
            </Stack>

            {hasParameters &&
                <Stack direction='column' sx={{margin: '10px'}}>
                    <input type='text'
                           style={{ width: '4em', height: '4em', textAlign: 'center' }}
                           onChange={handleTextChange}
                           value={paramValue}
                    >
                    </input>
                    <Box sx={{textAlign:'center', opacity: '0.5', marginTop: '4px'}}>
                        <label style={{cursor:'pointer'}} title={helpText}>
                            {paramKey}
                        </label>
                    </Box>
                </Stack>
            }
        </Stack>
    )
}