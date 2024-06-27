import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AutoAvColab from "./pages/AutoAvColab";
import Avaliacao360 from "./pages/Avaliacao360";
import LoginForm from "./pages/Login";
import HomeSocio from "./pages/HomeSocio";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./ProtectedRoute";
import { UnauthorizedPage } from "./pages/ErrorsPage";
import { NotFoundPage } from "./pages/ErrorsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },
      { path: "/autoavaliacao", element: <AutoAvColab /> },
      { path: "/autoavaliacao/avaliacao-360", element: <Avaliacao360 /> },
      { 
        path: "/homeSocio", 
        element: (
          <ProtectedRoute 
            element={<HomeSocio />} 
            role="SOCIO"
          />
        ) 
      },
      { path: "*", element: <NotFoundPage />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
