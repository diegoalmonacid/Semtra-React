import { useEffect, useState } from "react"
import { fetchTicketsInfo } from "../../../services/api"
import { Table } from "../../../components/specific/Tablev2/Table";
import { NextStepButton } from "../../../components/specific/sequencer/components/NextStepButton";
import { useSequencer } from "../../../components/specific/sequencer/context/SequencerContext";

export const AssignedTicketsTable = ({filter={executiveStateId: 1}, title = "Solicitudes sin procesar"}) => {
    const [ noProcessTicket, setNoProcessTicket ] = useState([]);
    const { setInternalState } = useSequencer();

    const fetchExecutiveTickets = async (filter) => {
        try {
            const info = await fetchTicketsInfo(filter)
            const tickets = info.rows.map((ticket)=>{
                return {
                    ticketId: ticket.ticketId,
                    partnerId: ticket.partnerId,
                    partner: ticket.Partner.User.displayName,
                    expensesCount: ticket.expensesCount,
                    executiveId: ticket.executiveId,
                    executiveState: ticket.ExecutiveState.name
                };
            });

            setNoProcessTicket(tickets);
        } catch (error) {
            console.error('Error fetching executives:', error);
        }
    }   
    useEffect(() => {
        fetchExecutiveTickets(filter);
    }, []);

    const assignedTicketsColumns = [
        { key: 'ticketId', label: 'Ticket ID' },
        { key: 'partner', label: 'Asociado' },
        { key: 'expensesCount', label: 'Cantidad de Gastos' },
        { key: 'executiveState', label: 'Estado' },
        { key: '', label: '', render: (ticket) => { 
            return (
                <NextStepButton onClick={() => {
                    setInternalState({ ticketId: ticket.ticketId, ticket });
                }} > Revisar Solicitud </NextStepButton>
            )
        }}
    ]

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">
                {title}</h2>
            <Table columns={assignedTicketsColumns} data={noProcessTicket} className={"grow"}/>
        </div>
    );
}
