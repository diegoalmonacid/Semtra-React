import React from "react";
import { FaTh, FaMoneyCheckAlt, FaPlus, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-gray-800 font-semibold">Diego Almonacid</h3>
            <p className="text-gray-500 text-sm">Asociado</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <FaTh className="text-gray-500" />
              <span>Resumen</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <FaMoneyCheckAlt className="text-gray-500" />
              <span>Mis Reembolsos</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <FaPlus className="text-gray-500" />
              <span>Añadir Solicitud</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <FaUserFriends className="text-gray-500" />
              <span>Informaciones</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <FaCog className="text-gray-500" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-800 hover:bg-gray-100 p-2 rounded"
            >
              <FaSignOutAlt className="text-gray-500" />
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
