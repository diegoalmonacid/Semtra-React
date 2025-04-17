import { useSequencer } from '../context/SequencerContext.js';


export const NextStepButton = ({ onClick, children, className }) => {
    const { goToNextStep, isNextStepAvailable} = useSequencer();
    
    const handleClick = async () => {
      if (onClick) await onClick(); // Llama a la funcionalidad adicional
      goToNextStep(); // Comportamiento por defecto
    };
  
    return (
      <button
        onClick={handleClick}
        disabled={!isNextStepAvailable}
        className={`${className} px-4 py-2 rounded-md ${
          isNextStepAvailable
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
      >
        {children || 'Siguiente'}
      </button>
    );
  };