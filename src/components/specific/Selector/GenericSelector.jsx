import { useEffect } from "react";

export const GenericSelector = ({ 
    options = [], // Array de opciones [{ value: '1', label: 'Option 1' }]
    value, // Valor seleccionado
    onChange, // Callback para manejar el cambio de selección
    placeholder = 'Select an option', // Texto placeholder
    fields = { value: 'value', label: 'label' } // Campos de las opciones
  }) => {
    return (
      <select 
       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option[fields.value]} value={option[fields.value]}>
            {option[fields.label]}
          </option>
        ))}
      </select>
    );
  };
  
  
  