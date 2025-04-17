import { useState } from 'react';
import { AddRequestContext } from './AddRequestContext';


export const AddRequestProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Drafts, 1: Expenses, 2: New Expense
  const [requestData, setRequestData] = useState({}); // Datos compartidos del flujo

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <AddRequestContext.Provider
      value={{ currentStep, goToNextStep, goToPreviousStep, requestData, setRequestData }}
    >
      {children}
    </AddRequestContext.Provider>
  );
};


