import { Outlet } from 'react-router-dom';
import { useAddRequest } from '../context/AddRequestContext.js';

export const AddRequestLayout = () => {
  const { currentStep, goToPreviousStep } = useAddRequest();

  const steps = ['Borradores', 'Gastos', 'Nuevo Gasto'];

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        {steps.map((step, index) => ( 
          <span
            key={index}
            className={`px-2 py-1 text-sm font-medium ${
              currentStep === index ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};