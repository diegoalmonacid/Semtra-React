import { ExecutiveHomePage } from "./pages/ExecutiveHomePage"
import { AssignedTicketsPage } from "../executive/pages/AssignedTickets/AssignedTicketsPage";

export const executiveRoutes = [
  { 
    path: '/home', 
    element: <ExecutiveHomePage />, 
    roles: ['executive'] ,
    type: 'sidebar' ,
    icon: '🏚️',
    label: 'Inicio'
  },
  {
    path:'/admin',
    element:<AssignedTicketsPage />,
    roles: ['executive'],
    type: 'sidebar' ,
    icon: '➡️',
    label: 'Solicitudes Asignadas'
  }
];
