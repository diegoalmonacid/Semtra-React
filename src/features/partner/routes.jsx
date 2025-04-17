import { PartnerHomePage } from "./pages/PartnerHomePage";
import { PartnerTickets } from "./pages/PartnerTickets";
import { PartnerAddTickets } from "./pages/PartnerAddTicket";

export const partnerRoutes = [
    { 
        path: '/home', 
        element: <PartnerHomePage />, 
        roles: ['partner'],
        type: 'sidebar' ,
        icon: '🏚️',
        label: 'Home'
    },
    { 
        path: '/tickets', 
        element: <PartnerTickets />, 
        roles: ['partner'],
        type: 'sidebar' ,
        icon: '🎫',
        label: 'Mis Reembolsos'
    },
    { 
        path: '/add-request', 
        element: <PartnerAddTickets />, 
        roles: ['partner'],
        type: 'sidebar' ,
        icon: '➕',
        label: 'Añadir Solicitud'
    }
];

