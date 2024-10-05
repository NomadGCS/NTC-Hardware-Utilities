import React, {useState, useEffect} from 'react'

import {useTheme, Stack } from "@mui/material";

import NTCButton from "../base/NTCButton.jsx";
import BaseModalDialog from  '../base/modals/BaseModalDialog.jsx'
import { AreaSelector } from '@bmunozg/react-image-area'

export default function InterlockMap({data, rhf, globalData}){
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [uploadMap, setUploadMap] = useState(null);

    const [currentInterlock, setCurrentInterlock] = useState('');
    const [interlocks, setInterlocks] = useState({});

    useEffect(() => {
        console.log('Current interlock changed: ', currentInterlock);
        console.log('data: ', globalData);

        // TODO:  Need a way to query the interlock x,y,width,height values here so we can display the 
        // existing interlock positions if any. 

    }, [currentInterlock])

    const onChangeHandler = (area) => {
        console.log('New Interlock Data: ', area);

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
        if (currentInterlock === name) return '#CC2027'
        else if (interlocks[name].length) return '#69be28'
        return '#838383';
    }

    const openModelCheck = () => {
        console.log('openModelCheck: ');
        //let selectedSystems = document.getElementsByClassName("MuiChip-label MuiChip-labelMedium css-6od3lo-MuiChip-label")
        let selectedSystems = document.getElementsByClassName("MuiChip-label MuiChip-labelMedium");        
        if (!selectedSystems.length) {
            console.log('openModelCheck: No systems found in dropdown?');
            return
        }

        let tempInterlocks = {}
        for (let i = 0; i < selectedSystems.length; i++) {
            tempInterlocks[selectedSystems[i].textContent] = []
        }
        setCurrentInterlock(Object.keys(tempInterlocks)[0])
        setInterlocks(tempInterlocks)
        setUploadMap(data.value !== '' ? data.value : null)
        setShowModal(true);
    }
    
    const submitMap = () => {
        console.log('submit: ', interlocks);
        rhf.setValue('Interlock Map', uploadMap)
        rhf.setInterlockData(interlocks)
        setShowModal(false)
    }

    console.log('showModal: ', showModal);
    return (
        <div>
             <NTCButton
                onClick={openModelCheck}
                text={data.value ? 'Edit Interlock Map' : 'Add interlock Map'}
                backgroundColor={data.value ? '#69be28' : '#CC2027'}
            />

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


            {/* <NTCButton
                onClick={openModelCheck}
                text={data.value ? 'Edit Interlock Map' : 'Add interlock Map'}
                backgroundColor={data.value ? '#69be28' : '#CC2027'}
            /> */}
        </div>
    )
}