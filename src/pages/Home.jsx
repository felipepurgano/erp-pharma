// src/pages/Home.jsx
import React from "react";
import styles from "../styles/App.module.css";
import { useNavigate } from "react-router-dom"; // Ou 'next/router' se for Next.js puro
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
    FiPackage, // Adicionado para Faltas e Encomendas, se FiTruck não for ideal
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
            // Alterado ícone para FiPackage que pode ser mais representativo
            { name: "Faltas e encomendas", icon: <FiPackage size={36} /> },
            { name: "Orçamentos", icon: <FiFileText size={36} /> },
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

    const handleNavigation = (itemName) => {
        switch (itemName) {
            case "Vendas":
                navigate("/vendas");
                break;
            case "SNGPC":
                navigate("/sngpc");
                break;
            case "Área fiscal":
                navigate("/area-fiscal");
                break;
            case "Consulta de preços":
                navigate("/consulta-precos");
                break;
            case "Caixa":
                navigate("/caixa");
                break;
            case "Compras":
                navigate("/compras");
                break;
            case "Faltas e encomendas":
                navigate("/faltas-encomendas");
                break;
            case "Orçamentos":
                navigate("/orcamentos");
                break;
            case "Financeiro":
                navigate("/financeiro");
                break;
            case "Clientes":
                navigate("/clientes");
                break;
            case "Colaboradores":
                navigate("/colaboradores");
                break;
            case "Produtos":
                navigate("/produtos");
                break;
            case "Fornecedores":
                navigate("/fornecedores");
                break;
            case "Convênios":
                navigate("/convenios");
                break;
            case "Análise de vendas":
                navigate("/analise-vendas");
                break;
            case "Análise de produtos":
                navigate("/analise-produtos");
                break;
            case "Entregas":
                navigate("/entregas");
                break;
            case "Análise de clientes":
                navigate("/analise-clientes");
                break;
            case "Fechamento mensal":
                navigate("/fechamento-mensal");
                break;
            case "Comissão de vendedores":
                navigate("/comissao-vendedores");
                break;
            case "Promoções":
                navigate("/promocoes");
                break;
            case "Resumo de contas":
                navigate("/resumo-contas");
                break;
            case "Log de auditoria":
                navigate("/log-auditoria");
                break;
            default:
                alert(`Funcionalidade "${itemName}" em desenvolvimento.`);
                break;
        }
    };

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
                                    onClick={() => handleNavigation(item.name)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleNavigation(item.name);
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