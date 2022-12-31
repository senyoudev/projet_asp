import "./App.css";
import HomePage from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminOwenr from "./pages/AdminOwner";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/owner/*" element={<AdminOwenr/>}/>
      </Routes>
    </Router>
  );
}

export default App;
