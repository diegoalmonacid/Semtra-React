import { SidebarItem } from './SidebarItem';

export const SidebarItemList = ({ role, children, items, className, name }) => (
  <div className={`flex flex-col h-screen bg-white shadow-lg ${className}`}>
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-lg font-semibold">Bienvenido {name}</h1>
      <h2 className="text-sm text-gray-600">{role}</h2>
    </div>
    <ul className='flex-1 px-4 py-2 space-y-2'>
      {items.map(item => (
        <SidebarItem
          key={item.path} // Usa el path como identificador único
          label={item.label} // Texto que mostrará el item
          icon={item.icon} // Icono opcional para el item
          path={item.path} // Ruta del item
        />
      ))}
    </ul>
    {children}
  </div>
);

