import { Outlet } from 'react-router-dom';
import { useSequencer } from './context/SequencerContext';
import { NextStepButton } from './components/NextStepButton';
import { PrevStepButton } from './components/PrevStepButton';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const SequencerLayout = () => {
  const { steps, 
    title,
    disableNext, disablePrev, nextTitle, prevTitle, setCurrentStepIndex } = useSequencer();
    const currentPath = useLocation().pathname;
    const lastRoute = currentPath.substring(currentPath.lastIndexOf('/')+1);
    const currentPathIndex = steps.findIndex(step => step.path === lastRoute);
    useEffect(() => {
      setCurrentStepIndex(currentPathIndex);
    }, [currentPathIndex]);
  return (
    <div className="w-full h-full flex flex-col gap-4  border-red-600">
        {currentPathIndex!=-1 && <div className="grow-0 flex-initial border-b-2 border-grey-600">
          <h1 className="text-2xl font-semibold">{ title }</h1>
          <div className="flex space-x-4 mb-4 box-border grow-0">
            {steps.map((step, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-md ${
                  index === currentPathIndex
                    ? 'bg-gray-200 text-gray-600'
                    : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>}
        <div className='flex-1 grow border-black flex w-full'>
            <Outlet/>
        </div>
        <div className='flex flex-initial flex-cols grow-0 items-end place-content-between box-border border-black '>
            {!disablePrev && <PrevStepButton className="bg-blue-600 text-white hover:bg-blue-700">{prevTitle}</PrevStepButton>}
            {!disableNext && <NextStepButton className="bg-blue-600 text-white hover:bg-blue-700">{nextTitle}</NextStepButton>}
        </div>
    </div>
  );
};

