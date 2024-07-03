import React, {useState, useEffect, useRef} from 'react'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ConfigViewButtonGroup({updateHOC}) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const theButtons = ["Asset-Config", "Schema", "Hardware"]
    const [buttons, setButtons] = useState(theButtons)

    function ViewButton({text, index}) {
        const selectedStyle = { opacity: 1.0}
        const defaultStyle = { opacity: 0.5 }
        const currentStyle = (index === selectedIndex) ? selectedStyle : defaultStyle;

        return (
            <button style={currentStyle} onClick={() => {handleClick(index)}}>{text}</button>
        )
    }

    const handleClick = (index) => {
        console.log('jb handleClick: ', index)
        setSelectedIndex(index);
        updateHOC(index);
    }


    return (
        <Stack direction="row">
            { buttons && buttons.map((item, index) => (
                <ViewButton key={crypto.randomUUID()} text={item} index={index} />
            ))}
        </Stack>
    )
}
