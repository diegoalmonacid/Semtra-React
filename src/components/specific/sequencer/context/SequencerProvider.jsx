import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SequencerContext } from './SequencerContext';


export const SequencerProvider = ({ children, steps }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [internalState, setInternalState] = useState({});
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const [onClickPrev, setOnClickPrev] = useState(() => {});
  const [onClickNext, setOnClickNext] = useState(() => {});
  const [nextTitle, setNextTitle] = useState('Siguiente');
  const [prevTitle, setPrevTitle] = useState('Anterior');
  const navigate = useNavigate();

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
      navigate(steps[index].path);
    }
    if(index === -1){
      setCurrentStepIndex(index);
      navigate('');
    }
  };

  const goToNextStep = () => goToStep(currentStepIndex + 1);
  const goToPrevStep = () => goToStep(currentStepIndex - 1);

  return (
    <SequencerContext.Provider
      value={{
        steps,
        currentStepIndex,
        setCurrentStepIndex,
        goToNextStep,
        goToPrevStep,
        internalState,
        setInternalState,
        isNextStepAvailable: currentStepIndex < steps.length - 1,
        isPrevStepAvailable: currentStepIndex > -1,
        disableNext,
        setDisableNext,
        disablePrev,
        setDisablePrev,
        setOnClickPrev,
        setOnClickNext,
        onClickNext,
        onClickPrev,
        nextTitle,
        prevTitle,
        setNextTitle,
        setPrevTitle
      }}
    >
      {children}
    </SequencerContext.Provider>
  );
};

