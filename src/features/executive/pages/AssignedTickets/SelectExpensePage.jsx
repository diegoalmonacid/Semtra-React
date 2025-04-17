import { useSequencer } from '../../../../components/specific/sequencer/context/SequencerContext';
import { fetchExpenses } from '../../../../services/api';
import { useEffect, useState } from 'react';
import { NextStepButton } from '../../../../components/specific/sequencer/components/NextStepButton';
import { Table } from '../../../../components/specific/Tablev2/Table'
 
export const SelectExpensePage = () => {
    const { 
      internalState, setDisableNext,
      setInternalState, setDisablePrev,
      goToPrevStep
    } = useSequencer();
  
      
    const ticketId = internalState.ticketId;
    
    useEffect(() => {
      setDisableNext(true);
      setDisablePrev(false);
    }, [setInternalState, setDisableNext, setDisablePrev]);
    
    const [ expenses, setExpenses ] = useState([]);
    
    const fetchData = async () => {
      if(ticketId==null) return;
      const result = await fetchExpenses(ticketId);
      const localExpenses = result?.Expenses;
      console.log(localExpenses)
      if(localExpenses!=null){ 
        setExpenses(localExpenses);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
    
    if (!ticketId){ goToPrevStep(); return null;}

    

    const tableColumns = [
        { key: 'Category', label: 'Categoría', render: (expense) => (expense?.Category?.name??'N/A') },
        { key: 'date', label: 'Fecha', render: ({date}) => (date?.split('T')[0]??'N/A') },
        { key: 'partnerPayment', label: 'Copago del Socio', render: ({partnerPayment}) => (partnerPayment??'N/A') },
        { key: 'executiveState', label: 'Estado', render: ({ExecutiveState}) => (ExecutiveState?.name??'N/A') },
        { key: '', label: '', render: (expense) => {
            return (
                <NextStepButton onClick={() => {
                    setInternalState({...internalState, expense });
                }} />
            )
        }}
    ];

    return (
        <div className='flex flex-col grow w-full'>
          <h2 className="text-xl font-semibold">Gastos Asociados</h2>
          <p>{`Revisa y agrega nuevos gastos para esta solicitud ID ${ticketId}.`}</p>
          <Table className='w-full' columns={tableColumns} data={expenses} />
        </div>
    );
};
  
  