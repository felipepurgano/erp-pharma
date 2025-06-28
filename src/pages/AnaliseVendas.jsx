// pages/AnaliseVendas.jsx
import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/AnaliseVendas.module.css";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { vendasMock, produtosMock } from "@/utils/mocks";

// Cores para os gráficos (pode expandir ou usar uma paleta mais sofisticada)
const COLORS = ['#00B89F', '#007bff', '#dc3545', '#ffc107', '#28a745', '#6f42c1', '#fd7e14', '#e83e8c', '#6610f2', '#20c997'];

export default function AnaliseVendas() {
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [filteredSales, setFilteredSales] = useState([]);

    useEffect(() => {
        // Define as datas padrão: 30 dias atrás até hoje
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        setDataFim(today.toISOString().split('T')[0]);
        setDataInicio(thirtyDaysAgo.toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        const start = dataInicio ? new Date(dataInicio) : null;
        const end = dataFim ? new Date(dataFim) : null;

        const sales = vendasMock.filter(venda => {
            const vendaDate = new Date(venda.dataVenda);
            return (!start || vendaDate >= start) && (!end || vendaDate <= end);
        });
        setFilteredSales(sales);
    }, [dataInicio, dataFim]);

    // --- Funções de Preparação de Dados para Gráficos ---

    // Dados para Vendas Diárias (Gráfico de Linha/Barras)
    const dailySalesData = useMemo(() => {
        const dailyTotals = {};
        filteredSales.forEach(sale => {
            const date = sale.dataVenda; // 'YYYY-MM-DD'
            dailyTotals[date] = (dailyTotals[date] || 0) + sale.valorTotal;
        });

        const sortedDates = Object.keys(dailyTotals).sort();
        return sortedDates.map(date => ({
            date: date,
            Vendas: parseFloat(dailyTotals[date].toFixed(2))
        }));
    }, [filteredSales]);

    // Dados para Vendas por Categoria (Gráfico de Pizza)
    const salesByCategoryData = useMemo(() => {
        const categoryTotals = {};
        filteredSales.forEach(sale => {
            sale.itensVendidos.forEach(item => {
                const product = produtosMock.find(p => p.id === item.produtoId);
                if (product && product.categoria) {
                    const category = product.categoria;
                    const itemValue = item.quantidade * item.valorUnitario;
                    categoryTotals[category] = (categoryTotals[category] || 0) + itemValue;
                }
            });
        });
        return Object.keys(categoryTotals).map(category => ({
            name: category,
            value: parseFloat(categoryTotals[category].toFixed(2))
        })).sort((a, b) => b.value - a.value); // Ordena do maior para o menor
    }, [filteredSales]);

    // Dados para Top 5 Produtos Mais Vendidos (Gráfico de Barras Verticais)
    const topSellingProductsData = useMemo(() => {
        const productQuantities = {};
        filteredSales.forEach(sale => {
            sale.itensVendidos.forEach(item => {
                const product = produtosMock.find(p => p.id === item.produtoId);
                if (product) {
                    productQuantities[product.nomeComercial] = (productQuantities[product.nomeComercial] || 0) + item.quantidade;
                }
            });
        });

        return Object.keys(productQuantities)
            .map(productName => ({
                name: productName,
                Quantidade: productQuantities[productName]
            }))
            .sort((a, b) => b.Quantidade - a.Quantidade)
            .slice(0, 5); // Top 5
    }, [filteredSales]);

    // Dados para Vendas por Forma de Pagamento (Gráfico de Pizza)
    const salesByPaymentMethodData = useMemo(() => {
        const paymentMethodTotals = {};
        filteredSales.forEach(sale => {
            const method = sale.metodoPagamento;
            paymentMethodTotals[method] = (paymentMethodTotals[method] || 0) + sale.valorTotal;
        });

        return Object.keys(paymentMethodTotals).map(method => ({
            name: method,
            value: parseFloat(paymentMethodTotals[method].toFixed(2))
        })).sort((a, b) => b.value - a.value);
    }, [filteredSales]);


    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>Análise de Vendas</h1>

                {/* --- Filtros de Período --- */}
                <div className={styles.filterSection}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="dataInicio">Data Início:</label>
                        <input
                            id="dataInicio"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="dataFim">Data Fim:</label>
                        <input
                            id="dataFim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                </div>

                {filteredSales.length === 0 && (
                    <div className={styles.noDataMessage}>
                        Nenhum dado de vendas disponível para o período selecionado.
                    </div>
                )}

                {filteredSales.length > 0 && (
                    <div className={styles.chartsGrid}>
                        {/* Gráfico 1: Vendas Diárias (Linha) */}
                        <div className={styles.chartCard}>
                            <h2 className={styles.chartTitle}>Vendas Totais por Dia</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dailySalesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={getComputedStyle(document.documentElement).getPropertyValue('--border-color-light')} />
                                    <XAxis dataKey="date" stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color-light')} />
                                    <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color-light')} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card-background-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        labelStyle={{ color: 'var(--primary-color)' }}
                                        itemStyle={{ color: 'var(--text-color)' }}
                                        formatter={(value) => `R$ ${value.toFixed(2)}`}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="Vendas" stroke="#00B89F" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Gráfico 2: Vendas por Categoria (Pizza) */}
                        <div className={styles.chartCard}>
                            <h2 className={styles.chartTitle}>Vendas por Categoria de Produto</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Pie
                                        data={salesByCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    >
                                        {salesByCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card-background-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        labelStyle={{ color: 'var(--primary-color)' }}
                                        itemStyle={{ color: 'var(--text-color)' }}
                                        formatter={(value) => `R$ ${value.toFixed(2)}`}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Gráfico 3: Top 5 Produtos Mais Vendidos (Barras Verticais) */}
                        <div className={styles.chartCard}>
                            <h2 className={styles.chartTitle}>Top 5 Produtos Mais Vendidos (Qtd)</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topSellingProductsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={getComputedStyle(document.documentElement).getPropertyValue('--border-color-light')} />
                                    <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={60} stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color-light')} />
                                    <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color-light')} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card-background-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        labelStyle={{ color: 'var(--primary-color)' }}
                                        itemStyle={{ color: 'var(--text-color)' }}
                                        formatter={(value) => `${value} unidades`}
                                    />
                                    <Legend />
                                    <Bar dataKey="Quantidade" fill="#007bff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Gráfico 4: Vendas por Forma de Pagamento (Pizza) */}
                        <div className={styles.chartCard}>
                            <h2 className={styles.chartTitle}>Vendas por Forma de Pagamento</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Pie
                                        data={salesByPaymentMethodData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    >
                                        {salesByPaymentMethodData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card-background-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        labelStyle={{ color: 'var(--primary-color)' }}
                                        itemStyle={{ color: 'var(--text-color)' }}
                                        formatter={(value) => `R$ ${value.toFixed(2)}`}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    );
}