import { Link } from 'react-router-dom';

export const SidebarItem = ({ label, icon, path }) => (
  <li className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100">
    <Link to={path} className="w-full h-full">
      {icon && <span className="text-lg">{icon}</span>} {/* Renderiza el icono si existe */}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  </li>
);
