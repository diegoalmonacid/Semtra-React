import { Route, Routes } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { adminRoutes } from "../features/admin/routes";
import { executiveRoutes } from "../features/executive/routes";
import { partnerRoutes } from "../features/partner/routes";
import { generalRoutes } from "../features/general/routes";


export const RoleBasedRoutes = () => {
    const { user, loading } = useUser();
    if (loading) return <p>Cargando...</p>;
    if (!user) return (
      <Routes>
          {generalRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    );
  
    const allRoutes = [
      ...partnerRoutes,
      ...executiveRoutes,
      ...adminRoutes,
    ];
  
    let filteredRoutes = allRoutes.filter(route =>
      route.roles.includes(user.role)
    );
  
    return (
      <Routes>
        {filteredRoutes.map(({ path, element }) => (
          user && <Route key={path} path={`${path}/*`} element={element} />
        ))}
        {generalRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    );
  };
  