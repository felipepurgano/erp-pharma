import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vendas from "./pages/Vendas";
import Caixa from "./pages/Caixa";
import Clientes from "./pages/Clientes";
import AnaliseVendas from "./pages/AnaliseVendas";
import Colaboradores from "./pages/Colaboradores";
import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Convenios from "./pages/Convenios";
import Compras from "./pages/Compras";
import FaltasEncomendas from "./pages/FaltasEncomendas";
import Orcamentos from "./pages/Orcamentos";
import Financeiro from "./pages/Financeiro";
import SNGPC from "./pages/SNGPC";
import SPED from "./pages/Sped";
import AreaFiscal from "./pages/AreaFiscal";
import ConsultaPrecos from "./pages/ConsultaPrecos";
import AnaliseProdutos from "./pages/AnaliseProdutos";
import Entregas from "./pages/Entregas";
import AnaliseClientes from "./pages/AnaliseClientes";
import FechamentoMensal from "./pages/FechamentoMensal";
import ComissaoVendedores from "./pages/ComissaoVendedores";
import Promocoes from "./pages/Promocoes";
import ResumoContas from "./pages/ResumoContas";
import LogAuditoria from "./pages/LogAuditoria";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendas" element={<Vendas />} />
      <Route path="/caixa" element={<Caixa />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/colaboradores" element={<Colaboradores />} />
      <Route path="/fornecedores" element={<Fornecedores />} />
      <Route path="/convenios" element={<Convenios />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/faltas-encomendas" element={<FaltasEncomendas />} />
      <Route path="/orcamentos" element={<Orcamentos />} />
      <Route path="/financeiro" element={<Financeiro />} />
      <Route path="/analise-vendas" element={<AnaliseVendas />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/sngpc" element={<SNGPC />} />
      <Route path="/sped" element={<SPED />} />
      <Route path="/area-fiscal" element={<AreaFiscal />} />
      <Route path="/consulta-precos" element={<ConsultaPrecos />} />
      <Route path="/analise-produtos" element={<AnaliseProdutos />} />
      <Route path="/entregas" element={<Entregas />} />
      <Route path="/analise-clientes" element={<AnaliseClientes />} />
      <Route path="/fechamento-mensal" element={<FechamentoMensal />} />
      <Route path="/comissao-vendedores" element={<ComissaoVendedores />} />
      <Route path="/promocoes" element={<Promocoes />} />
      <Route path="/resumo-contas" element={<ResumoContas />} />
      <Route path="/log-auditoria" element={<LogAuditoria />} />
    </Routes>
  );
}
