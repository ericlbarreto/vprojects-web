import "./global.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
}

export default App;