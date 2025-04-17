import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import axios from 'axios'

const PROFILE_URL = 'http://localhost:3000/api/users/profile'


// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(PROFILE_URL, { withCredentials: true });
      if (response.status != 200) throw new Error('Usuario no autenticado');
      const userData = await response.data;
      setUser(userData); // Actualiza el usuario en el contexto
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    fetchUser(); // Se llama al cargar el proveedor (en cada carga de página)
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


