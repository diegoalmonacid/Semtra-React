import { useEffect, useState } from "react";
import { RequestsList } from "../components/RequestList";
import { GenericSelector } from "../../../components/specific/Selector/GenericSelector";
import { fetchExecutives } from "../../../services/api";
import { fetchTicketsInfo, assignTickets } from "../../../services/api";
import { Table } from "../../../components/specific/Tablev2/Table";
import { removeTicket } from "../../../services/api";

export const AssignRequestPage = () => {
    const [ selectedTickets, setSelectedTickets ] = useState([]);
    const [ executives, setExecutives ] = useState([]);
    const [ selectedExecutive, setSelectedExecutive ] = useState(null);
    const [ executiveTickets, setExecutiveTickets ] = useState([]);
    // Initialize the executives for selector
    useEffect(() => {
        const fetchData = async () => {
            try {   
                const requestedData = await fetchExecutives();
                const executives = requestedData.map((executive) => (executive.User))
                setExecutives(executives);
                setSelectedExecutive(executives[0]?.userId);
                //console.log(executives[0]?.userId)
            } catch (error) {
                console.error('Error fetching executives:', error);
            }
        };
        fetchData();
        
    },[])
    // Assign tickets to executive
    useEffect(() => {
        const assignTicketsToExecutive = async () => {
            try {
                await assignTickets(selectedExecutive, selectedTickets);
                setSelectedTickets([]);
            } catch (error) {
                console.error('Error fetching executives:', error);
            }
        }
        if(selectedTickets.length > 0){
            assignTicketsToExecutive();
        }
    },[selectedTickets]);

    const selectorOnChange = (value) => {
        setSelectedExecutive(value);
    }

    // Get the tickets for the selected executive
    useEffect(() => {
        const fetchExecutiveTickets = async () => {
            if (!selectedExecutive) return;
            try {
                const info = await fetchTicketsInfo({executiveId: selectedExecutive, executiveStateId: 1})
                const tickets = info.rows.map((ticket)=>{
                    return {
                        ticketId: ticket.ticketId,
                        partner: ticket.Partner.User.displayName,
                        expensesCount: ticket.expensesCount,
                        executiveId: ticket.executiveId,
                        executiveState: ticket.ExecutiveState.name
                    };
                });
    
                setExecutiveTickets(tickets);
            } catch (error) {
                console.error('Error fetching executives:', error);
            }
        }   
        fetchExecutiveTickets();
    }, [selectedExecutive, selectedTickets])

    const executiveTicketsColumns = [
        { key: 'ticketId', label: 'Ticket ID' },
        { key: 'partner', label: 'Asociado' },
        { key: 'expensesCount', label: 'Cantidad de Gastos' },
        { key: 'executiveState', label: 'Estado' },
        { key: 'actions', label: '', render: (ticket) => {
            return (
                <button 
                    onClick={async () => {
                        await removeTicket([ticket], ticket.executiveId);
                        setExecutiveTickets((prevTickets) => prevTickets.filter((prevTicket) => prevTicket.ticketId !== ticket.ticketId));
                        setSelectedTickets([]);
                    }} 
                    className='rounded border-gray-400 hover:bg-gray-200'
                >
                    Remove
                </button>
                )
        }}
    ]

    return (
        <div className="h-full">
            <h2 className="text-lg font-semibold">Seleccione al Ejecutivo:</h2>
            <div className="mt-4">
                <GenericSelector
                    options = {executives}
                    value = {selectedExecutive}
                    onChange={selectorOnChange}
                    fields = {{ value: 'userId', label: 'displayName' }}
                />
            </div>
            <RequestsList setSelectedTickets={setSelectedTickets} selectedTickets={selectedTickets}/>
            
            <h2 className="text-lg font-semibold mb-4">Tickets sin procesar del executivo seleccionado:</h2>
            <Table columns={executiveTicketsColumns} data={executiveTickets}/>
        </div>
    );
}