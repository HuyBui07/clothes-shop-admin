import "./App.css";

// Libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Product from "./pages/Product";

// Components
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
