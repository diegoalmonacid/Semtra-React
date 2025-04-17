import { SidebarItemList } from './SidebarItemList'; // Componente SidebarItemList
import { generalRoutes } from '../../../features/general/routes';
import { adminRoutes } from '../../../features/admin/routes';
import { executiveRoutes } from '../../../features/executive/routes';
import { partnerRoutes } from '../../../features/partner/routes';
import { LogoutButton } from '../Logout/LogoutButton';

export const SidebarContainer = ({ user, setUser, className }) => {
  if (!user) return null;
  
  const allRoutes = [
    ...partnerRoutes,
    ...executiveRoutes,
    ...adminRoutes,
  ];

  

  let filteredRoutes = allRoutes.filter(route =>
    route.roles.includes(user.role)
  );
  const userRoutes = [...filteredRoutes, ...generalRoutes];

  if(!userRoutes) return null; // Si no hay rutas, no renderiza nada
  // Filtra las rutas con `type: "sidebar"`
  const sidebarRoutes = userRoutes.filter(route => route.type === 'sidebar');

  return (
    <SidebarItemList items={sidebarRoutes} role={user.role} name={user.name} className={className}>
      <LogoutButton setUser={setUser} /> 
    </SidebarItemList>
);
};
