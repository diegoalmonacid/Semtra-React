// Importa las dependencias necesarias
import { BrowserRouter } from 'react-router-dom';
import { RoleBasedRoutes } from './routes/RoleBasedRoutes'; 
import { UserProvider } from './context/UserProvider';
import { GeneralLayout } from './layouts/pages/GeneralLayout';

// Componente App
function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <GeneralLayout>
            <RoleBasedRoutes />
          </GeneralLayout>
        </BrowserRouter>
    </UserProvider>
  );
}


export default App;
