import { useSequencer } from '../context/SequencerContext.js';


export const PrevStepButton = ({ onClick, children, className }) => {
    const { goToPrevStep, isPrevStepAvailable} = useSequencer();

    const handleClick = async () => {
        if (onClick) await onClick(); // Llama a la funcionalidad adicional
        goToPrevStep(); // Comportamiento por defecto
    };

    return (
        <button
        onClick={handleClick}
        disabled={!isPrevStepAvailable}
        className={`${className} px-4 py-2 rounded-md ${
            isPrevStepAvailable
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        >
        {children || 'Anterior'}
        </button>
    );
};