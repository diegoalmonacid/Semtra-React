import { useNavigate } from 'react-router-dom';

export const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate(); // Para redirigir al usuario después del logout

  const handleLogout = async () => {
    try {
      // Llama a la API de logout (si es necesario)
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });

      // Limpia el estado del usuario en el contexto
      setUser(null);

      // Redirige al usuario a la página de inicio de sesión
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="px-4 py-4 border-t border-gray-200">
        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 space-x-3 text-sm font-medium text-red-600 bg-gray-100 rounded-md hover:bg-red-100">
          Cerrar Sesión
        </button>
    </div>
  );
};

