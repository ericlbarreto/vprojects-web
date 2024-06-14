import "./global.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/header";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header />}
      <div className={location.pathname !== "/login" ? "pt-24 bg-azulBackground" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
