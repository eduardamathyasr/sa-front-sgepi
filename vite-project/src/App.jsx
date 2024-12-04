import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastoEpi from './pages/cadastoEpi';
import CadastroFun from './pages/cadastroFun';
import EditarEpi from './pages/editarEpi';
import EditarFun from './pages/editarFun';
import RegistroRetDev from './pages/registroRetDev';
import Info from './pages/info';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CadastoEpi />} />
        <Route path="/cadastroFun" element={<CadastroFun />} />
        <Route path="/info" element={<Info />} />
        <Route path="/editarEpi/:epiId" element={<EditarEpi />} />
        <Route path="/editarFun/:funcionarioId" element={<EditarFun />} />
        <Route path="/registrarRetDev/:id" element={<RegistroRetDev />} />
      </Routes>
    </Router>
  );
};

export default App;
