import React, { useState, useEffect } from "react"; // Importar useEffect
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "@/styles/layouts/Sidebar.module.css";
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
  FiPackage,
  FiChevronLeft,
} from "react-icons/fi";

const sidebarLayout = [
  {
    title: "Movimento",
    icon: <FiShoppingCart />,
    items: [
      { name: "Vendas", path: "/vendas", icon: <FiShoppingCart /> },
      { name: "SNGPC", path: "/sngpc", icon: <FiClipboard /> },
      { name: "SPED", path: "/sped", icon: <FiClipboard /> },
      { name: "Área fiscal", path: "/area-fiscal", icon: <FiFileText /> },
      { name: "Consulta de preços", path: "/consulta-precos", icon: <FiDollarSign /> },
      { name: "Caixa", path: "/caixa", icon: <FiDollarSign /> },
      { name: "Compras", path: "/compras", icon: <FiBox /> },
      { name: "Faltas e encomendas", path: "/faltas-encomendas", icon: <FiPackage /> },
      { name: "Orçamentos", path: "/orcamentos", icon: <FiFileText /> },
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
      { name: "Fechamento mensal", path: "/fechamento-mensal", icon: <FiCalendar /> },
      { name: "Comissão de vendedores", path: "/comissao-vendedores", icon: <FiPercent /> },
      { name: "Promoções", path: "/promocoes", icon: <FiFilePlus /> },
      { name: "Resumo de contas", path: "/resumo-contas", icon: <FiFileText /> },
      { name: "Log de auditoria", path: "/log-auditoria", icon: <FiLogOut /> },
    ],
  },
];

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Função para determinar quais seções devem estar abertas inicialmente
  // ou quando a rota muda, mantendo a seção ativa aberta
  const getInitialOpenSections = (currentPath) => {
    const initialOpen = {};
    sidebarLayout.forEach(section => {
      const isActiveSection = section.items.some(item => item.path === currentPath);
      if (isActiveSection) {
        initialOpen[section.title] = true;
      }
    });
    return initialOpen;
  };

  // Estado que gerencia quais seções estão abertas, inicializando com a seção ativa
  const [openSections, setOpenSections] = useState(() => getInitialOpenSections(location.pathname));

  // Efeito para atualizar as seções abertas quando a rota muda
  useEffect(() => {
    setOpenSections(getInitialOpenSections(location.pathname));
  }, [location.pathname]); // Dependência em location.pathname

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Ao colapsar, não feche as seções ativas.
    // Apenas ajuste a visibilidade do texto via CSS.
  };

  return (
    <div className={`${styles.container} ${isCollapsed ? styles.collapsedContainer : ''}`}>
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsedSidebar : ''}`}>
        <h1 className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <FiHome style={{ marginRight: isCollapsed ? '0' : '8px', verticalAlign: "middle" }} />
            {!isCollapsed && <span className={styles.logoText}>Pharma</span>} {/* Usando span.logoText */}
          </Link>
        </h1>
        <nav>
          {sidebarLayout.map((section) => (
            <div key={section.title} className={styles.section}>
              <div
                className={styles.sectionHeader}
                onClick={() => toggleSection(section.title)}
              >
                <span className={styles.sectionIcon}>{section.icon}</span>
                {!isCollapsed && <span className={styles.sectionTitleText}>{section.title}</span>} {/* Usando span.sectionTitleText */}
                {!isCollapsed && (
                  openSections[section.title] ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )
                )}
              </div>
              <ul
                // A classe dropdownOpen é aplicada se a seção estiver aberta,
                // independentemente do estado de colapso da sidebar.
                // O CSS controlará a visibilidade do conteúdo no modo colapsado.
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
                    {!isCollapsed && <span className={styles.menuItemText}>{item.name}</span>} {/* Usando span.menuItemText */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Botão de Retrair/Expandir Sidebar */}
        <div className={styles.collapseButtonContainer}>
          <button onClick={toggleCollapse} className={styles.collapseButton}>
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}