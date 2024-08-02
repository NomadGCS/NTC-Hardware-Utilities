import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";

import Label from "../misc/ConfigLabel.jsx"
import {useTheme} from "@mui/material";


export default function DisplayFormatSelector({selectedIndex, update, options}) {
    const {displayFormats} = options;
    const theme = useTheme();
    const nomadRed = theme.palette.custom.nomadRed;

    return (
        <Box>
            {/*  DISPLAY FORMAT SELECTOR  */}
            <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Box role="heading" aria-level="2">
                    {/*<Label> FORMAT </Label>*/}
                </Box>
                <Stack direction='row' sx={{marginBottom: '4px'}}>
                    <label style={{fontSize: '0.8em', margin: '5px'}}> Display Formats: </label>
                    {displayFormats.map((item, index) => (
                        <Box sx={{cursor: 'pointer',
                                  border: '1px solid white',
                                  fontSize: '0.85em',
                                  // borderColor: `${index === selectedIndex ? nomadRed : 'white'}`,
                                  borderRadius: '4px',
                                  backgroundColor: `${index === selectedIndex ? nomadRed : 'white'}`,
                                  color: `${index === selectedIndex ? 'white' : 'default'}`,
                                  padding: '4px 12px',
                                  transition: 'background-color 0.8s',
                                  "&:hover": { border: `1px solid ${nomadRed}`} }}
                             onClick={() => {update(index)}}
                             key={crypto.randomUUID()}
                             title={item.value}
                        >
                            {/*{item.label}*/}
                            {index+1}
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Box>
    )
}