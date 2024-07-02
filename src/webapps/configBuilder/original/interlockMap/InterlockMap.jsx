import React, {useState} from 'react'

import {useTheme, Stack } from "@mui/material";

import NTCButton from "../../../inputs/buttons/NTCButton";
import BaseModalDialog from  '../../../../../src/components/display/modals/BaseModalDialog'
import { AreaSelector } from '@bmunozg/react-image-area'

export default function InterlockMap({data, rhf}){
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [uploadMap, setUploadMap] = useState(null);

    const [currentInterlock, setCurrentInterlock] = useState('');
    const [interlocks, setInterlocks] = useState({});

    const onChangeHandler = (area) => {
        let tempInterlocks = Object.assign({}, interlocks)
        tempInterlocks[currentInterlock] = area
        setInterlocks(tempInterlocks)
    }

    const addMap = async (e) => {
        if (!e.target.files[0]) return
        let file = await toBase64(e.target.files[0])
        setUploadMap(file)
        data.value = file
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const selectInterlock = (e) => {
        setCurrentInterlock(e.target.textContent)
    }

    const buttonColor = (name) => {
        if (currentInterlock === name) return theme.palette.custom.nomadRed
        else if (interlocks[name].length) return theme.palette.custom.sliderGreen
        return theme.palette.custom.contrastButton
    }

    const openModelCheck = () => {
        let selectedSystems = document.getElementsByClassName("MuiChip-label MuiChip-labelMedium css-6od3lo-MuiChip-label")
        if (!selectedSystems.length) return
        let tempInterlocks = {}
        for (let i = 0; i < selectedSystems.length; i++) {
            tempInterlocks[selectedSystems[i].textContent] = []
        }
        setCurrentInterlock(Object.keys(tempInterlocks)[0])
        setInterlocks(tempInterlocks)
        setUploadMap(data.value !== '' ? data.value : null)
        setShowModal(true)
    }

    const submitMap = () => {
        rhf.setValue('Interlock Map', uploadMap)
        rhf.setInterlockData(interlocks)
        setShowModal(false)
    }

    return (
        <div>
            {showModal && <BaseModalDialog
                open={true}
                modalTitle={`Create New interlock map`}
                handleClose={()=> setShowModal(false)}
                maxWidth={'xl'}

                >
                <Stack direction="row" >
                    {uploadMap &&
                        <div>
                            <AreaSelector
                                maxAreas={1}
                                areas={interlocks[currentInterlock]}
                                onChange={onChangeHandler}
                                wrapperStyle={{
                                    border: '2px solid black'
                                }}
                                globalAreaStyle={{
                                    border: '1.5px dashed green',
                                    backgroundColor: 'lightgreen',
                                    opacity: '0.5'
                                }}
                            >
                                <img id={'SVG'} src={uploadMap} alt={'uploaded svg file'} style={{height: '405px', width: '800px', objectFit: 'contain'}}/>

                            </AreaSelector>
                        </div>
                    }
                    <div>
                        <Stack direction="column" sx={{alignItems:"center", position: "relative", padding: '5px', overflow: 'auto'}} spacing={0.5}>
                            {Object.keys(interlocks).map((name)=>
                                <NTCButton
                                    key={name}
                                    onClick={selectInterlock}
                                    text={name}
                                    backgroundColor={()=> buttonColor(name)}
                                />)}
                        </Stack>
                    </div>
                </Stack>
                <input type="file" id="map" name="map" accept="image/svg+xml" onChange={addMap} hidden/>
                <NTCButton
                    onClick={()=> document.getElementById('map').click()}
                    text={'Add SVG File'}
                    backgroundColor='#0079bd'
                />
                <NTCButton
                    sx={{float: 'right'}}
                    onClick={submitMap}
                    text={'Save interlock settings'}
                    backgroundColor='#0079bd'
                />
            </BaseModalDialog>}


            <NTCButton
                onClick={openModelCheck}
                text={data.value ? 'Edit Interlock Map' : 'Add interlock Map'}
                backgroundColor={data.value ? theme.palette.custom.sliderGreen : theme.palette.custom.nomadRed}
            />
        </div>
    )
}