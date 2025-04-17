import { Table } from '../../../../components/specific/Table';
import { fetchDraftTickets, deleteTicket } from '../../services/ticketDecoder';
import { useSequencer } from '../../../../components/specific/sequencer/context/SequencerContext';
import { useEffect, useState } from 'react';
import { NextStepButton } from '../../../../components/specific/sequencer/components/NextStepButton';
import { createTicket, sendTicket } from '../../../../services/api';

export const DraftsPage = () => {
  const { setDisableNext, setNextTitle, setPrevTitle,
    setInternalState, setDisablePrev
  } = useSequencer();
  useEffect(() => {
    setInternalState({});
    setDisableNext(true);
    setDisablePrev(false);
    setNextTitle('Crear');
    setPrevTitle('Anterior');
  }, [setInternalState, setDisableNext, setNextTitle, setPrevTitle]);
  return (
    <div className="flex flex-col gap-2 grow">
      <h2 className="text-xl font-semibold">Borradores</h2>
      <p>Selecciona un borrador existente o crea uno nuevo.</p>
      <DraftTable setInternalState={setInternalState}/>
      <div className="flex-auto flex justify-end p-4 grow-0">
        <NextStepButton className={"w-64 flex-initial grow-0"} onClick={async () => {
            const ticket = await createTicket();
            setInternalState({ ticketId: ticket.ticketId });
          }}>
            Crear
          </NextStepButton>
      </div> 
    </div>
  );
};

const draftColumns = (fetchData, setInternalState) => [
  { key: 'updatedAt', label: 'Última Modificación' },
  { key: 'id', label: '', render: (value) => {
    return (
      <div className='justify-around flex'>
        <NextStepButton onClick={() => {
          setInternalState({ ticketId: value });
        }}>
          Editar
        </NextStepButton> 
        <button 
          className='bg-red-500 text-white' 
          onClick={async () => {
            await deleteTicket(value);
            fetchData(); // Llamar a fetchData después de eliminar el ticket
          }}
        >
          Eliminar
        </button>
        <button 
          className='bg-blue-500 text-white' 
          onClick={async () => {
            try{
              await sendTicket(value);
              fetchData(); // Llamar a fetchData después de enviar el ticket
            }catch(error){
              alert(error);
              console.error(error);
            }
          }}
        >
          Enviar
        </button>
      </div>
    );
  }}
];



const DraftTable = ({ setInternalState }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await fetchDraftTickets();
    setData(result);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return <Table data={ data } columns={draftColumns(fetchData, setInternalState)} />;
};
