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

    // show the user the interlock stats are they are drawing them
    const [areaLabel, setAreaLabel] = useState("Coordinates go here.");
   
    useEffect(() => {
        console.log('Start up - Interlocks: ', interlocks);
    }, [])

    useEffect(() => {        
        if (currentInterlock) {
            const coords = currentInterlock[0];

            console.log('Current Interlock: ', currentInterlock);
            if (typeof currentInterlock === "string") {
                const interlockData = globalData.interlockList.find((item) => item.meta.id === currentInterlock);
                const label = `x: ${interlockData.config.x}, y: ${interlockData.config.y}, width: ${interlockData.config.width}, height: ${interlockData.config.height}`;
                setAreaLabel(label);
            }
        }        

    }, [currentInterlock])


    const onChangeHandler = (area) => {        
        let tempInterlocks = Object.assign({}, interlocks);
        tempInterlocks[currentInterlock] = area;
        setInterlocks(tempInterlocks);

        // update the area label so users have an idea of the coordinates
        if (area && area[0]) {
            const coords = area[0];
            const label = `x: ${coords.x}, y: ${coords.y}, width: ${coords.width}, height: ${coords.height}`;
            setAreaLabel(label);
        }
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
        else if (interlocks[name].length) return '#ccc' //'#69be28'
        return '#838383';
    }

    // Verifies that there are systems in the dropdown, and if so, allows user to upload 2d model svg and draw interlocks on it
    const openModelCheck = () => {
        // get the systems in the dropdown
        let selectedSystems = document.getElementsByClassName("MuiChip-label MuiChip-labelMedium"); //"MuiChip-label MuiChip-labelMedium css-6od3lo-MuiChip-label"

        // check if any systems are in the dropdown
        if (!selectedSystems.length) {
            console.log('openModelCheck: No systems found in dropdown?');
            alert('Add interlock systems to dropdown first');
            return
        }

        
        // show the interlock map modal
        let tempInterlocks = {}
         
        // when interlocks have been updated multiple times, react-hook-form may already have data we should use
        if (rhf.interlockData && Object.keys(rhf.interlockData).length > 0) {
            console.log('RHF already has interlocks array.  Using that')
            tempInterlocks = rhf.interlockData;
        } 
        else {
            console.log('Setting up a new interlock array');

            for (let i = 0; i < selectedSystems.length; i++) {            
                const interlockName = selectedSystems[i].textContent;
            
                // get the interlock system so we have access to its coords             
                const interlockData = globalData.interlockList.find((item) => item.meta.id === interlockName);            
                    
                // create new object and assign it's coords
                tempInterlocks[selectedSystems[i].textContent] = [
                    { 
                        x: interlockData.config.x,
                        y: interlockData.config.y,
                        width: interlockData.config.width,
                        height: interlockData.config.height,
                        isNew: false,
                        isChanging: false,
                        unit: 'px'
                    }                            
                ]                
            }
        }

        setCurrentInterlock(Object.keys(tempInterlocks)[0])
        setInterlocks(tempInterlocks)
        setUploadMap(data.value !== '' ? data.value : null)

        setShowModal(true);
    }

    
    const submitData = () => {        
        console.log('submit: ', interlocks, rhf.getValues('Interlock Map'));
        
        // This updates the 2D model        
        rhf.setValue('Interlock Map', uploadMap);

        // these are the interlocks
        rhf.setInterlockData(interlocks);

        setShowModal(false);
    }

    
    return (
        <div>            
            <NTCButton
                onClick={openModelCheck}
                text={data.value ? 'Edit Interlock positions' : 'Add 2D Model of Asset'}
                backgroundColor={data.value ? '#69be28' : '#CC2027'}
            />

            {showModal && <BaseModalDialog
                open={true}
                modalTitle={`${currentInterlock} [${areaLabel}]`}
                handleClose={()=> setShowModal(false)}
                maxWidth={'xl'}

                >
                <Stack direction="row" sx={{marginBottom: '0.5em'}}>
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
                    <div style={{border: '1px solid #444', marginBottom: '2px'}}>
                        <Stack direction="column" sx={{alignItems:"center", position: "relative", padding: '5px', overflow: 'auto'}} spacing={0.5}>
                            <div style={{width: '100%', textAlign: 'center', borderBottom: '1px solid #444', marginBottom: '0.5em'}}>
                                <label>Interlocks</label>
                            </div>
                            
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
                    onClick={submitData}
                    text={'Save interlock settings'}
                    backgroundColor='#0079bd'
                />
            </BaseModalDialog>}
        </div>
    )
}