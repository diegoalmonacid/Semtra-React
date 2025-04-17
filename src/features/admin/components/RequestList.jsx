import { useEffect, useState } from 'react';
import { fetchTicketsInfo } from '../../../services/api';
import { Table } from '../../../components/specific/Tablev2/Table'

export const RequestsList = ({setSelectedTickets, selectedTickets}) => {

    const [tickets, setTickets] = useState([]);
    
    const [count, setCount] = useState(0);

    const handleSend = () => {
        const selectedTickets = tickets.filter((ticket) => ticket.checked);
        setSelectedTickets(selectedTickets);
    };

    const handleSelect = (ticket) => {
        setTickets((prevTickets) =>
          prevTickets.map((prevTicket) =>
            prevTicket.ticketId === ticket.ticketId ? { ...prevTicket, checked: !ticket.checked } : prevTicket
          )
        );
    }
    const checkbox = checkboxBuilder(handleSelect)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const info = await fetchTicketsInfo({executiveId: 'isNull'});
            setCount(info.count);
            const tickets = info.rows.map((ticket)=>{
                return {
                    ticketId: ticket.ticketId,
                    executiveId: ticket.executiveId,
                    partner: ticket.Partner.User.displayName,
                    expensesCount: ticket.expensesCount,
                    checked: false
                };
            });
            setTickets(tickets);
          } catch (error) {
            console.error('Error fetching tickets:', error);
          }
        };
        fetchData();
      }, [selectedTickets]);



    return (
        <div className='mt-10'>
            <Table columns={ticketColumns(checkbox)} data={tickets} />
            <button 
                onClick={handleSend} 
                className='rounded border-gray-400 m-4 hover:bg-gray-200'
            >
                Asignar Tickets Seleccionados
            </button>
        </div>
    );
} 

const checkboxBuilder = (handleSelect) =>{
    
    const checkbox = (ticket) =>{
        const handleChange = () => {
            handleSelect(ticket)
        }
        return (
            <input
                className="size-5 rounded border-gray-300"
                type="checkbox"
                checked={ticket.checked}
                onChange={handleChange}
            />
        )
    }
    return checkbox
}

const ticketColumns = (checkbox) => [
    { key: '', label: '', render: checkbox },
    { key: 'ticketId', label: 'Ticket Id' },
    { key: 'partner', label: 'Asociado' },
    { key: 'expensesCount', label: 'Cantidad de Gastos' }
]