import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminOwenr from "./pages/AdminOwner";
import { AuthContextProvider } from "./Context/AuthContext";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarsListing from "./pages/CarsListing"
function App() {
  return (
    <Router>
      <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/owner/*" element={<AdminOwenr/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cars" element={<CarsListing/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
