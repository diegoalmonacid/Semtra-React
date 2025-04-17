import { useEffect, useState } from "react";

export const RequestForm = ({ fields, setFormData, uploadedDocs, formData, handleSubmit, requestedDocs }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validar si todos los campos están completos
    const isValid = fields.every(field => formData[field.key]);
    setIsFormValid(isValid);
  }, [formData, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="p-6 pb-4 w-[50%] border rounded-md shadow-md flex-initial flex-initial flex flex-col h-[75%] border-black ">
      <h1 className="text-xl font-semibold grow-0 mb-8">
        Solicitud: <span className="text-gray-700">Incompleta</span>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap grow">
        <div className="flex flex-row flex-wrap box-border w-full border-red-600 grow-0 gap-2 content-center">
          {
            fields.map((field) => (
              <div className="h-min flex flex-col flex-initial grow border-black " key={field.key}>
                <label
                  htmlFor={field.key}
                  className="text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.key}
                  name={field.key}
                  value={field.key==='date' ? formData[field.key]?.split('T')[0] : formData[field.key]}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-0 flex-initial grow"
                  required
                />
              </div>
            ))
          }
        </div>

        
        {/* Requisitos */}
        <div className="mb-2 h-min border-black grow flex flex-col justify-end">
          <p className="text-sm text-gray-700">
            Para esta solicitud usted debe subir
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {requestedDocs.map((doc, index) => ( <li key={index}> {doc.name} {uploadedDocs.includes(doc.docTypeId) && (<span>✔️</span>) }</li> ))}
          </ul>
        </div>

        {/* Botón de Enviar */}
        <div className="flex grow items-end">
          <button
            type="submit"
            onClick={(isFormValid ? handleSubmit : null)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-min border-black "
          >
            Guardar gasto
          </button>
        </div>
      </form>
    </div>
  );
};

