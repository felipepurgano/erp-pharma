import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vendas from "./pages/Vendas";
import Caixa from "./pages/Caixa";
import Clientes from "./pages/Clientes";
import AnaliseVendas from "./pages/AnaliseVendas";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendas" element={<Vendas />} />
      <Route path="/caixa" element={<Caixa />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/analise-vendas" element={<AnaliseVendas />} />
    </Routes>
  );
}
