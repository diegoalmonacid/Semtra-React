import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';


export const RedirectPage = () => {
    const { fetchUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
    const initializeUser = async () => {
        await fetchUser(); // Sincroniza el estado del usuario
        navigate('/home'); // Redirige al dashboard
    };

    initializeUser();
    }, [fetchUser, navigate]);

    return <p>Cargando...</p>; // Pantalla de carga mientras sincroniza
}
