import { Route, Routes } from 'react-router-dom';
import { SequencerLayout } from './SequencerLayout';
import { useSequencer } from './context/SequencerContext';

export const SequencerRoutes = ({ children }) => {
    const { steps } = useSequencer();
    if (steps.length === 0) return null;
    return (
        <Routes>
            <Route path="*" element={<SequencerLayout />}>
                <Route index element={children}/>
                {steps.map(step => {
                  return <Route key={step.path} path={step.path} element={step.element} />;})}
            </Route>
        </Routes>
    );
};

  