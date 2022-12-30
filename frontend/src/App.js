<<<<<<< Updated upstream
import './App.css';

function App() {
  return (
    <div className="App">
     
    </div>
=======
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
>>>>>>> Stashed changes
  );
}

export default App;
