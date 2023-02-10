import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
//import createAd from "./pages/CreateAd/createAd";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>
        

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </Router>
  );
}

export default App;
