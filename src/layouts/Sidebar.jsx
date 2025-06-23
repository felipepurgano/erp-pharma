import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  FiChevronDown,
  FiChevronRight,
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
  FiHome,
} from "react-icons/fi";

const layout = [
  {
    title: "Movimento",
    icon: <FiShoppingCart />,
    items: [
      { name: "Vendas", path: "/vendas", icon: <FiShoppingCart /> },
      { name: "Caixa", path: "/caixa", icon: <FiDollarSign /> },
      { name: "Compras", path: "/compras", icon: <FiBox /> },
      { name: "Faltas e encomendas", path: "/faltas", icon: <FiTruck /> },
      { name: "Orçamento", path: "/orcamento", icon: <FiFileText /> },
      { name: "Financeiro", path: "/financeiro", icon: <FiBarChart2 /> },
    ],
  },
  {
    title: "Cadastros",
    icon: <FiUsers />,
    items: [
      { name: "Clientes", path: "/clientes", icon: <FiUsers /> },
      { name: "Colaboradores", path: "/colaboradores", icon: <FiUser /> },
      { name: "Produtos", path: "/produtos", icon: <FiBox /> },
      { name: "Fornecedores", path: "/fornecedores", icon: <FiDatabase /> },
      { name: "Convênios", path: "/convenios", icon: <FiFile /> },
    ],
  },
  {
    title: "Relatórios",
    icon: <FiBarChart2 />,
    items: [
      { name: "Análise de vendas", path: "/analise-vendas", icon: <FiBarChart2 /> },
      { name: "Análise de produtos", path: "/analise-produtos", icon: <FiBox /> },
      { name: "Entregas", path: "/entregas", icon: <FiTruck /> },
      { name: "Análise de clientes", path: "/analise-clientes", icon: <FiUsers /> },
      { name: "Fechamento mensal", path: "/fechamento", icon: <FiCalendar /> },
      { name: "Comissão de vendedores", path: "/comissao", icon: <FiPercent /> },
      { name: "Promoções", path: "/promocoes", icon: <FiFilePlus /> },
      { name: "Resumo de contas", path: "/resumo-contas", icon: <FiFileText /> },
      { name: "Log de auditoria", path: "/log", icon: <FiLogOut /> },
    ],
  },
];

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <FiHome style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Pharma
          </Link>
        </h1>
        <nav>
          {layout.map((section) => (
            <div key={section.title} className={styles.section}>
              <div
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.title)}
              >
                <span className={styles.sectionIcon}>{section.icon}</span>
                <span className={styles.sectionTitle}>{section.title}</span>
                {openSections[section.title] ? (
                  <FiChevronDown />
                ) : (
                  <FiChevronRight />
                )}
              </div>
              <ul
                className={`${styles.menu} ${
                  openSections[section.title] ? styles.dropdownOpen : ""
                }`}
              >
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className={`${styles.menuItem} ${
                      location.pathname === item.path ? styles.activeItem : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}