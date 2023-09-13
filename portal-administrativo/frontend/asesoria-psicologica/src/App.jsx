import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Reset from "./components/Reset/Reset";
import ResetPass from "./pages/ResetPass";
import Modulos from "./pages/Modulos/Modulos";
import Navbar from "./components/Navbar/Navbar";
import PacientesForm from "./pages/Pacientes/Pacientes";
import Expedientes from "./pages/Vistas/Vistas";
import SectionsDashBoard from "./pages/DashBoard/DashBoard";
import SectionsPage from "./pages/Sections/Sections";
import AnunciosPage from "./pages/AnunciosCrear/AnunciosCrear";


function App() {
  return (
    <Router>
        <div style={{display:'flex', flexDirection:'row'}}>  
          <Navbar />
          <Routes>
                      {/*AQUI INICIAN LAS RUTAS DEL NAVBAR*/}
            <Route path="/" element={<SectionsDashBoard />} />
            <Route path="/inicio" element={<Modulos />} />
            <Route path="/dashboard" element={<SectionsDashBoard />} />
            <Route path="/anuncios" /> 
            <Route path="/clases" element={<SectionsDashBoard />} /> 
            <Route path="/calendar"/>
            <Route path="/cuentas" element={<PacientesForm />} /> 
            <Route path="/historial" /> 
                          {/*AQUI FINALIZAN LAS RUTAS DEL NAVBAR*/}
            <Route path="/reset" element={<Reset />} /> 
            <Route path="/forgot" element={<Reset />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path="/modulos" element={<Modulos />} /> 
            <Route path="/expedientes" element={<Expedientes />} /> 
            <Route path="/sections" element={<SectionsDashBoard />} /> 
            <Route path="/sections/:courseId" element={<SectionsPage />} />{" "}
          
          </Routes>
        </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<AnunciosPage />} />
          <Route path="/inicio" element={<Modulos />} />
          <Route path="/reset" element={<Reset />} />{" "}
          <Route path="/forgot" element={<Reset />} />
          <Route path="/reset-pass" element={<ResetPass />} />
          <Route path="/modulos" element={<Modulos />} />{" "}
          <Route path="/expedientes" element={<Expedientes />} />{" "}
          <Route path="/sections" element={<SectionsDashBoard />} />{" "}
          <Route path="/sections/:courseId" element={<SectionsPage />} />{" "}
           {/*iba el reset modifique para poder visual el navbar*/}
           <Route path="/anuncios" element={<AnunciosPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
