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

  const withHeader = location.pathname !== "/login" && location.pathname !== "/unauthorized" && location.pathname !== "*";

  return (
    <div className="App">
      {withHeader && <Header />}
      <div className={withHeader ? "pt-24" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
