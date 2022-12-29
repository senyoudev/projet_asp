import "./App.css";
import Accueil from "./pages/Accueil";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Accueil />} />
      </Routes>
    </Router>
  );
}

export default App;
