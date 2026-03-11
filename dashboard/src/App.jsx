import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewNote from "./pages/viewnote";
import Fav from "./pages/fav";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/note/:id" element={<ViewNote/>}/>
        <Route path="/favourites" element={<Fav/>}/>
      </Routes>
    </Router>
  );
}

export default App;