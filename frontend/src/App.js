import "./App.css";
import HomePage from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
