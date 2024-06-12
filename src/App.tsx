import "./global.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
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
      <div className={location.pathname !== "/login" ? "pt-24" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
