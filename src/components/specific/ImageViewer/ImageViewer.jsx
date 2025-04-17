
/*
    Este componente recibe dos propiedades:
    - rawData: un array de objetos con la información de las imágenes a mostrar.
    - fields: un objeto que mapea las propiedades de los objetos de rawData con las propiedades que se mostrarán en la interfaz.
    fields debe tener la siguiente estructura:
    {
        key: ' Identificador único de la Imagen ',
        label: 'Nombre de la propiedad',
        image: 'URL de la imagen'
    }

*/ 

import { useState } from "react";

export const ImageViewer = ({rawData, fields, children, setSelected, className}) => {
    const [preview, setPreview] = useState(null);
    if (rawData===undefined) return null;
    const dataArray = rawData.map((raw) => mapObject(raw, fields));

    const handleValueChange = (event) => {
        const selectedData = dataArray.find((data) => data.key === event.target.value);
        console.log(selectedData?.image);
        setPreview(selectedData?.image);
        setSelected(event.target.value);
    }

    return (
        <div className={`${className}`}>
            <div className={`grow-0 flex flex-col items-center`}>
              <select
                id="category"
                name="category"
                onChange={handleValueChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Seleccione...</option>
                {dataArray.map((data) => (<option key={data.key} value={data.key}>{data.label}</option>))}
              </select>
            </div>
            {(
              <div className="border-2 border-grey-600 rounded-md grow w-full h-full flex items-center justify-center bg-center bg-cover">
                <span className=" text-center text-4xl">📑</span>
              </div>
              
            )}
            {children}
        </div>
    )
}

function mapObject(data, mapping) {
    const result = {};
  
    for (const [key, path] of Object.entries(mapping)) {
      result[key] = resolvePath(data, path);
      if (key === 'image') {
        const img = new Image();
        img.src = result[key];
      }
    }
  
    return result;
  }
  
function resolvePath(obj, path) {
if (!path) return undefined;

const keys = path.split('.'); // Divide el string de la ruta
return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}
  