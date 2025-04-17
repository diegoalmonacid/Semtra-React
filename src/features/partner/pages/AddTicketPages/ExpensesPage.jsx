import { useSequencer } from '../../../../components/specific/sequencer/context/SequencerContext';
import { fetchExpenses } from '../../../../services/api';
import { useEffect, useState } from 'react';
import { NextStepButton } from '../../../../components/specific/sequencer/components/NextStepButton';
import { createExpense } from '../../../../services/api'; 
import { deleteExpense } from '../../../../services/api';
import { Table } from '../../../../components/specific/Table';

export const ExpensesPage = () => {
  const { 
    internalState, setDisableNext,
    setInternalState, setDisablePrev
  } = useSequencer();

  const ticketId = internalState.ticketId;



  useEffect(() => {
    setDisableNext(true);
    setDisablePrev(false);
  }, [setInternalState, setDisableNext, setDisablePrev]);

  const [ expenses, setExpenses ] = useState([]);

  const fetchData = async () => {
    const result = await fetchExpenses(ticketId);
    const localExpenses = result?.Expenses;
    setExpenses(localExpenses ?? []);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex flex-col grow'>
      <h2 className="text-xl font-semibold">Gastos Asociados</h2>
      <p>{`Revisa y agrega nuevos gastos para esta solicitud.`}</p>
      <Table columns={tableColumns(internalState, setInternalState, fetchData)} data={expenses} />
      <div className="flex-auto flex justify-end p-4 grow-0">
        <NextStepButton className={"w-64 flex-initial"} onClick={async () => {
              const expense = await createExpense(internalState.ticketId);
              setInternalState({...internalState, expenseId: expense.expenseId });
            }}>
            Crear
          </NextStepButton>
      </div> 
    </div>
  );
};

const tableColumns = (internalState, setInternalState, fetchData) => [
  { key: 'Category', label: 'Categoría', render: (value) => (value?.name??'N/A') },
  { key: 'date', label: 'Fecha', render: (value) => (value?.split('T')[0]??'N/A') },
  { key: 'partnerPayment', label: 'Copago del Socio', render: (value) => (value??'N/A') },
  { key: 'expenseId', label: '' , render: (value) => (
    <div className='justify-around flex'>
        <NextStepButton onClick={() => {
          setInternalState({ ...internalState, expenseId: value });
        }}>
          Editar
        </NextStepButton> 
        <button 
          className='bg-red-500 text-white' 
          onClick={async () => {
            await deleteExpense(value);
            fetchData(); // Llamar a fetchData después de eliminar el ticket
          }}
        >
          Eliminar
        </button>
      </div>
    )
  }
  
]