import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Opening from "./pages/Opening";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Ticket from "./pages/Ticket";
import Divisions from "./pages/Divisions";
import Games from "./pages/Games";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/divisions" element={<Divisions />} />
        <Route path="/games" element={<Games />} />
      </Route>
      <Route
        path="*"
        element={
          <div>
            <h1>404 - Halaman Tidak Ditemukan</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
