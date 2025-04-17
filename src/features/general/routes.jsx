import { LoginPage } from "./pages/LoginPage";
import { RedirectPage } from "./pages/RedirectPage";

export const generalRoutes = [
    { path: '/', element: <LoginPage /> },
    { path: '/redirect', element: <RedirectPage /> }
]