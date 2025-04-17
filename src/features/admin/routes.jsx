import { AdminHomePage } from './pages/AdminHomePage'
import { AssignRequestPage } from './pages/AssignRequestsPage';

export const adminRoutes = [
  { 
    path: '/home', 
    element: <AdminHomePage />, 
    roles: ['admin'] ,
    type: 'sidebar' ,
    icon: '🏚️',
    label: 'Inicio'
  },
  {
    path:'/admin',
    element:<AssignRequestPage />,
    roles: ['admin'],
    type: 'sidebar' ,
    icon: '➡️',
    label: 'Asignar Solicitudes'
  }
];