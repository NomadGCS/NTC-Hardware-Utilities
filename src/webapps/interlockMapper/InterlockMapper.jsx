import { AreaSelector } from '@bmunozg/react-image-area'
import React, {useEffect, useState} from 'react'
import './index.css';

export default function InterlockMapper() {
    const [uploadMap, setUploadMap] = useState(null);
    const [areas,setAreas] = useState([])

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);    

    useEffect(() => {
      if (showConfirmation) {
        setTimeout(()=>{
          setShowConfirmation(false);
        }, 750)
      }
    }, [showConfirmation]);

    useEffect(() => {
      setHasDrawn(areas.length > 0)      
    }, [areas]);
  
    
    const addMap = async (e) => {
      if (!e.target.files[0]) return
      let file = await toBase64(e.target.files[0])
      setUploadMap(file)
    }
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  
    const copySVG = async () => {
      await navigator.clipboard.writeText(uploadMap);
      setShowConfirmation(true);
    }

    const copyCoords = async () => {
        let coords =`x: ${areas[0]?.x || 0},
        y: ${areas[0]?.y || 0},
        height: ${areas[0]?.height || 0},
        width: ${areas[0]?.width || 0}`
        await navigator.clipboard.writeText(coords);
        setShowConfirmation(true);
    }

    const renderInstructions = () => {
      return (
        <p style={{fontSize: '0.8em'}}>
          <ol>
            <li style={{textDecoration: uploadMap ? 'line-through' : 'unset'}}>Click 'Add SVG File'</li>
            <li style={{textDecoration: hasDrawn ? 'line-through' : 'unset'}}>With your mouse, draw a rectangle where you want the interlock to be. </li>
            <li style={{textDecoration: showConfirmation ? 'line-through' : 'unset'}}>Click 'Copy SVG Text'</li>
            <li>Paste into your asset-config</li>
          </ol>
        </p>
      );      
    }
      
    return (
      <div>
        <h1>Interlock Mapper</h1>
        {renderInstructions()}

        <div style={{border: '1px solid #ccc', padding: '2em'}}>
          <div style={{height: '405px', width: '800px', objectFit: 'contain'}}>
              <AreaSelector
                  maxAreas={1}
                  areas={areas}
                  onChange={setAreas}
                  wrConfigMappererStyle={{
                    border: '2px solid black'
                  }}
                  globalAreaStyle={{
                    border: '1.5px dashed green',
                    backgroundColor: 'lightgreen',
                    opacity: '0.5'
                  }}
                  >
                  {uploadMap ? 
                    <img id={'SVG'} src={uploadMap} alt={'uploaded svg file'} style={{height: '405px', width: '800px', objectFit: 'contain'}}/>
                    :
                    <p>Asset SVG goes here</p>
                  }
    
              </AreaSelector>
          </div>
          <input type="file" id="map" name="map" accept="image/svg+xml" onChange={addMap} hidden/>
          
          {uploadMap ? 
            <>
              <fieldset style={{display: 'flex', justifyContent: 'space-between'}}>
                <legend>2d Asset Rendering</legend>
                <button onClick={()=> document.getElementById('map').click()}>Load New SVG File</button>
                <button onClick={copySVG}>Copy base64 of Asset SVG</button>
              </fieldset>
              <br></br>

              <fieldset>
                <legend>Interlock Coordinates</legend>      
                <p>
                  x: {areas[0]?.x || 0}
                  <br/>
                  y: {areas[0]?.y || 0}
                  <br/>
                  height: {areas[0]?.height || 0}
                  <br/>
                  width: {areas[0]?.width || 0}
                </p>
                <button onClick={copyCoords}>Copy coordinates</button>
              </fieldset>
            </>
            :
            <>
              <button onClick={()=> document.getElementById('map').click()}>Add SVG File</button>
            </>
          }

          {showConfirmation && 
            <div className="confirmation">Copied!</div>
          }

        </div>
      </div>
  );
  }
  
    