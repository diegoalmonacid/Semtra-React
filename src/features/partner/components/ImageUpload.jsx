import  { useState } from 'react';
import { uploadImage } from '../../../services/api';
import { useSequencer } from '../../../components/specific/sequencer/context/SequencerContext';



export const ImageUpload = ({ docRequested, uploadedDocsFilesURL, setUploadStatus, fetchData}) => {
  const { internalState } = useSequencer();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  docRequested.forEach((doc) =>{
    if(uploadedDocsFilesURL[doc.docTypeId]){
      preloadImages(uploadedDocsFilesURL[doc.docTypeId]);
    }
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    event.target.value = null;
  };

  const handleDocChange = (event) => {
    setUploadStatus("");
    setSelectedDoc(event.target.value);
    const uploadedDocFile = uploadedDocsFilesURL[event.target.value];
    setPreview(uploadedDocFile);
  }

  const handleUpload = async (event) => {
    try {
      event.preventDefault();
      const status = await uploadImage(selectedFile, internalState.expenseId, selectedDoc);
      setSelectedFile("");
      setUploadStatus(status);
    } catch (error) {
      
      setUploadStatus(error.message);
    } finally{
      fetchData();
    }
};

  return (
    <div className="w-[50%] mx-auto p-6 bg-white border rounded-md shadow-md h-[75%] flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-800  grow-0">Subir Imagen</h2>
      <div className="grow-0 flex gap-4 items-center mb-4 mt-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium mr-2"
          >
            Documento
          </label>
          <select
            id="category"
            name="category"
            onChange={handleDocChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Seleccione...</option>
            {docRequested.map((doc) => (<option key={doc.docTypeId} value={doc.docTypeId}>{doc.name}</option>))}
          </select>
        </div>
      <form onSubmit={handleUpload} className='grow flex flex-col justify-end'>
        {/* Vista previa */}
        <div className="grow ">
          {(
            <div className="border-2 border-grey-600 rounded-md mb-4 grow w-full h-64 bg-center bg-cover" style={preview ? {backgroundImage: `url(${preview})`} : {}}>

            </div>
          )}
        </div>

        {/* Input para subir la imagen */}
        <div className="mb-4 grow-0">
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccionar imagen:
          </label>
          <input
            type="file"
            id="image-upload"
            accept="*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Escoger archivo
          </label>
        </div>

        {/* Botón para enviar */}
        <button
          type="submit"
          className="grow-0 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Subir Imagen
        </button>
      </form>
    </div>
  );
};

const preloadImages = (url) => {
  const img = new Image();
  img.src = url; // Esto fuerza la descarga de la imagen

};