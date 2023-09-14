import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Reset from "./components/Reset/Reset";
import ResetPass from "./pages/ResetPass";
import Modulos from "./pages/Modulos/Modulos";
import Navbar from "./components/Navbar/Navbar"
import PacientesForm from "./pages/Pacientes/Pacientes";
import Expedientes from "./pages/Vistas/Vistas"
import SectionsDashBoard from "./pages/DashBoard/DashBoard"
import SectionsPage from "./pages/Sections/Sections";
import Dummy from "./pages/Dummy/Dummy";

function App() {
  return (
    <Router>
        <div style={{display:'flex', flexDirection:'row'}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Modulos />} />
            <Route path="/inicio" element={<Modulos />} />
            <Route path="/reset" element={<Reset />} /> {/*iba el reset modifique para poder visual el navbar*/}
            <Route path="/forgot" element={<Reset />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path="/modulos" element={<Modulos />} /> {/*iba el reset modifique para poder visual el navbar*/}
            <Route path="/expedientes" element={<Expedientes />} /> {/*iba el reset modifique para poder visual el navbar*/}
            <Route path="/sections" element={<SectionsDashBoard />} /> {/*iba el reset modifique para poder visual el navbar*/}
            <Route path="/pacientes" element={<PacientesForm />} /> {/*iba el reset modifique para poder visual el navbar*/}
            <Route path="/sections/:courseId" element={<SectionsPage />} />{" "}
            <Route path="/dummy" element={<Dummy />} />{" "}
          </Routes>
        </div>
    </Router>
  );
}

export default App;
