import { Routes, Route, Navigate } from 'react-router-dom';
import {AddRequestLayout} from '../layouts/AddRequestLayout';
import {DraftsPage} from '../pages/AddTicketPages/DraftsPage';
import {ExpensesPage} from '../pages/AddTicketPages/ExpensesPage';
import {NewExpensePage} from '../pages/AddTicketPages/NewExpensePage';

export const AddRequestRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AddRequestLayout />}>
        <Route path="drafts" element={<DraftsPage />} />
        <Route path="drafts/expenses" element={<ExpensesPage />} />
        <Route path="drafts/expenses/new-expense" element={<NewExpensePage />} />
        {/* Redirigir al inicio del flujo si la ruta es inválida */}
        <Route path="*" element={<Navigate to="/add-request/drafts" />} />
      </Route>
    </Routes>
  );
};

