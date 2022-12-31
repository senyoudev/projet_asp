import "./App.css";
import HomePage from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminOwenr from "./pages/AdminOwner";
import { AuthContextProvider } from "./Context/AuthContext";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Router>
      <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/owner/*" element={<AdminOwenr/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
