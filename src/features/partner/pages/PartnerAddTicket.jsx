import { Sequencer } from '../../../components/specific/sequencer/Sequencer';
import {DraftsPage} from '../pages/AddTicketPages/DraftsPage';
import {ExpensesPage} from '../pages/AddTicketPages/ExpensesPage';
import {NewExpensePage} from './AddTicketPages/NewExpense/NewExpensePage';
import { useSequencer } from '../../../components/specific/sequencer/context/SequencerContext';
import { useEffect } from 'react';

export const PartnerAddTickets = () => {
    const steps = [
        {
            path: 'drafts',
            label: 'Borradores',
            element: <DraftsPage />
        },
        {
            path: 'expenses',
            label: 'Gastos',
            element: <ExpensesPage />

        },
        {
            path: 'new-expense',
            label: 'Nuevo Gasto',
            element: <NewExpensePage />
        },
    ]

    return (
        <Sequencer steps={steps}>
            <PartnerInitialPage/>
        </Sequencer>
    );
};

const PartnerInitialPage = () => {
    const { setCurrentStepIndex, setDisableNext,
        setDisablePrev, setNextTitle, setPrevTitle } = useSequencer();
    useEffect(() => {
        setCurrentStepIndex(-1);
        setDisableNext(false);
        setDisablePrev(false);
        setNextTitle('Siguiente');
        setPrevTitle('Anterior');
    }, [setCurrentStepIndex, setDisableNext, setDisablePrev, setNextTitle, setPrevTitle]);
    
    return (
     <fragment>
         <h1 className='text-center w-full text-red-600 text-7xl pt-16'>Recuerde</h1>
         <div className="flex h-min mt-[10%] p-16 bg-red-100 w-[100%] flex-col items-center justify-center border-red-600 border-4">
             <p className='text-3xl text-justify w-[80%]'>Al momento de subir una solicitud declara conocer el reglamento vigente y
                que los gastos médicos mencionados en su solicitud, corresponden a su grupo
                familiar inscritos en el Semtra-2</p>
         </div>
     </fragment>
    )
}
  