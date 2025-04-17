import { Route, Routes } from "react-router-dom";
import { generalRoutes } from "../features/general/routes";

export const GeneralRoutes = () => (
  <Routes>
    {generalRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);
  