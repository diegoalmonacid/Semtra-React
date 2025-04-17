export const fetchTicketInfo = async () => {
    try {
        const response = await fetch('/api/tickets/info/totalAmount');
        const data = await response.json();
        return data.map(ticket => ({
            ticketId: ticket.ticketId,
            totalPartnerPayment: ticket.totalPartnerPayment,
            expenseCount: ticket.expenseCount,
            ExecutiveStateName: ticket.ExecutiveState.name,
            AdminStateName: ticket.AdminState.name
        }));
    } catch (error) {
        console.error('Error fetching ticket info:', error);
        return [];
    }
};

export const columns = [
    { key: 'ticketId', label: 'Ticket Id' },
    { key: 'totalPartnerPayment', label: 'Monto de la Solicitud' },
    { key: 'expenseCount', label: 'Cantidad de Gastos' },
    { key: 'ExecutiveStateName', label: 'Estado del Ejecutivo' },
    { key: 'AdminStateName', label: 'Estado del Administrador' },
];

export const fetchDraftTickets = async () => {
    try {
        const response = await fetch('/api/tickets/crud?draft=true');
        const data = await response.json();


        return data.map(ticket => ({
            id: ticket.ticketId,
            updatedAt: formatDate(ticket.updatedAt)
        }));
    } catch (error) {
        console.error('Error fetching ticket info:', error);
        return [];
    }
};

export const deleteTicket = async (ticketId) => {
    try {

        const response = await fetch(`/api/tickets/crud?id=${ticketId}`, {
            method: 'DELETE',
        });
        if (response.status !== 200) {
            throw new Error('Error deleting ticket');
        }
    } catch (error) {
        console.error('Error deleting ticket:', error);
    }
};


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};
