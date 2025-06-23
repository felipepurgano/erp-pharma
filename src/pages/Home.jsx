// src/pages/Home.jsx
import React from "react";
import styles from "../styles/App.module.css";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiClipboard,
  FiFileText,
  FiDollarSign,
  FiUsers,
  FiUser,
  FiBox,
  FiDatabase,
  FiFile,
  FiTruck,
  FiBarChart2,
  FiPercent,
  FiCalendar,
  FiFilePlus,
  FiLogOut,
} from "react-icons/fi";

const layout = [
  {
    title: "Movimento",
    color: "#00c2a5",
    items: [
      { name: "Vendas", icon: <FiShoppingCart size={36} /> },
      { name: "SNGPC", icon: <FiClipboard size={36} /> },
      { name: "Área fiscal", icon: <FiFileText size={36} /> },
      { name: "Consulta de preços", icon: <FiDollarSign size={36} /> },
      { name: "Caixa", icon: <FiDollarSign size={36} /> },
      { name: "Compras", icon: <FiBox size={36} /> },
      { name: "Faltas e encomendas", icon: <FiTruck size={36} /> },
      { name: "Orçamento", icon: <FiFileText size={36} /> },
      { name: "Financeiro", icon: <FiBarChart2 size={36} /> },
    ],
  },
  {
    title: "Cadastros",
    color: "#007bff",
    items: [
      { name: "Clientes", icon: <FiUsers size={36} /> },
      { name: "Colaboradores", icon: <FiUser size={36} /> },
      { name: "Produtos", icon: <FiBox size={36} /> },
      { name: "Fornecedores", icon: <FiDatabase size={36} /> },
      { name: "Convênios", icon: <FiFile size={36} /> },
    ],
  },
  {
    title: "Relatórios",
    color: "#ffae00",
    items: [
      { name: "Análise de vendas", icon: <FiBarChart2 size={36} /> },
      { name: "Análise de produtos", icon: <FiBox size={36} /> },
      { name: "Entregas", icon: <FiTruck size={36} /> },
      { name: "Análise de clientes", icon: <FiUsers size={36} /> },
      { name: "Fechamento mensal", icon: <FiCalendar size={36} /> },
      { name: "Comissão de vendedores", icon: <FiPercent size={36} /> },
      { name: "Promoções", icon: <FiFilePlus size={36} /> },
      { name: "Resumo de contas", icon: <FiFileText size={36} /> },
      { name: "Log de auditoria", icon: <FiLogOut size={36} /> },
    ],
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Pharma</h1>

      <div className={styles.columns}>
        {layout.map((section, index) => (
          <div key={index} className={styles.column}>
            <h2
              className={styles.sectionTitle}
              style={{ borderColor: section.color }}
            >
              {section.title}
            </h2>
            <div className={styles.cardGrid}>
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.card}
                  style={{ backgroundColor: section.color }}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    switch (item.name) {
                      case "Vendas":
                        navigate("/vendas");
                        break;
                      case "Caixa":
                        navigate("/caixa");
                        break;
                      case "Clientes":
                        navigate("/clientes");
                        break;
                      case "Análise de vendas":
                        navigate("/analise-vendas");
                        break;
                      default:
                        alert(`Clicou em ${item.name}`);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") alert(`Clicou em ${item.name}`);
                  }}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <span className={styles.cardLabel}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
