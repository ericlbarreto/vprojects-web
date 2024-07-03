import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import AutoAvColab from './pages/AutoAvColab'
import Avaliacao360 from './pages/Avaliacao360'
import LoginForm from './pages/Login'
import ControleColaborador from './pages/ControleColaborador'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/autoavaliacao", element: <AutoAvColab /> },
    { path: "/autoavaliacao/avaliacao-360", element: <Avaliacao360 /> },
    {path: "/controleColaborador", element: <ControleColaborador />},
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
