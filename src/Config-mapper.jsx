import { AreaSelector } from '@bmunozg/react-image-area'
import React, {useState} from 'react'

function ConfigMapper() {
    const [uploadMap, setUploadMap] = useState(null);
    const [areas,setAreas] = useState([])
  
    
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
    }

    const copyCoords = async () => {
        let coords =`x: ${areas[0]?.x || 0},
        y: ${areas[0]?.y || 0},
        height: ${areas[0]?.height || 0},
        width: ${areas[0]?.width || 0}`
        await navigator.clipboard.writeText(coords);
      }
      
    return (
      <>
        <div>
            <AreaSelector
                maxAreas={1}
                areas={areas}
                onChange={setAreas}
                wrConfigMappererStyle={{
                  height: '405px', width: '800px',
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
        <input type="file" id="map" name="map" accept="image/svg+xml" onChange={addMap} hidden/>
        <button onClick={()=> document.getElementById('map').click()}>Add SVG File</button>
        <button onClick={copySVG}>Copy svg text</button>
        
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
      </>
  );
  }
  
  export default ConfigMapper;
  