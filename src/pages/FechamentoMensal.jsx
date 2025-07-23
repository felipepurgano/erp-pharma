import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/FechamentoMensal.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados
import { mockProductSales, mockDeliveryData } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function FechamentoMensal() {
    // Estado para o mês e ano selecionados (começa no mês atual)
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Estados para dados processados
    const [summaryMetrics, setSummaryMetrics] = useState({});
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [revenueByCategory, setRevenueByCategory] = useState([]);

    useEffect(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth(); // 0-indexed month

        // 1. Filtrar Vendas pelo mês/ano
        const salesForMonth = mockProductSales.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate.getFullYear() === year && saleDate.getMonth() === month;
        });

        // 2. Filtrar Entregas pelo mês/ano
        const deliveriesForMonth = mockDeliveryData.filter(delivery => {
            const deliveryDate = new Date(delivery.date);
            return deliveryDate.getFullYear() === year && deliveryDate.getMonth() === month;
        });

        // 3. Calcular Métricas de Resumo
        let totalRevenue = 0;
        let totalSimulatedCost = 0; // Custo simulado, por exemplo, 60% do preço de venda
        const salesOrderIds = new Set(); // Para contar pedidos únicos

        salesForMonth.forEach(sale => {
            const revenueItem = sale.quantity * sale.price;
            totalRevenue += revenueItem;
            totalSimulatedCost += sale.quantity * (sale.price * 0.6); // Simula custo de 60%
            // Se o mockProductSales tiver um orderId, usar aqui. Caso contrário, conte itens.
            // Para simplicidade, vou considerar cada entrada em mockProductSales um "item de venda".
            // Para tickets médios, a contagem de pedidos das entregas é mais precisa.
        });

        deliveriesForMonth.forEach(delivery => {
            salesOrderIds.add(delivery.orderId); // Contar IDs de pedidos únicos das entregas
        });

        const numberOfSalesItems = salesForMonth.length; // Número de itens vendidos
        const numberOfUniqueOrders = salesOrderIds.size; // Número de pedidos únicos
        const numberOfDeliveries = deliveriesForMonth.length;

        const grossProfit = totalRevenue - totalSimulatedCost;
        const averageTicket = numberOfUniqueOrders > 0 ? (totalRevenue / numberOfUniqueOrders) : 0;

        setSummaryMetrics({
            totalRevenue: totalRevenue.toFixed(2),
            totalSimulatedCost: totalSimulatedCost.toFixed(2),
            grossProfit: grossProfit.toFixed(2),
            numberOfSalesItems,
            numberOfUniqueOrders,
            averageTicket: averageTicket.toFixed(2),
            numberOfDeliveries,
        });

        // 4. Produtos Mais Vendidos
        const productSalesMap = salesForMonth.reduce((acc, sale) => {
            if (!acc[sale.name]) {
                acc[sale.name] = { quantity: 0, revenue: 0 };
            }
            acc[sale.name].quantity += sale.quantity;
            acc[sale.name].revenue += sale.quantity * sale.price;
            return acc;
        }, {});

        const sortedTopProducts = Object.keys(productSalesMap)
            .map(name => ({
                name,
                quantity: productSalesMap[name].quantity,
                revenue: productSalesMap[name].revenue.toFixed(2),
            }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5); // Top 5 produtos

        setTopSellingProducts(sortedTopProducts);

        // 5. Receita por Categoria
        const revenueByCategoryMap = salesForMonth.reduce((acc, sale) => {
            if (!acc[sale.category]) {
                acc[sale.category] = 0;
            }
            acc[sale.category] += sale.quantity * sale.price;
            return acc;
        }, {});

        const sortedRevenueByCategory = Object.keys(revenueByCategoryMap)
            .map(category => ({
                category,
                revenue: revenueByCategoryMap[category].toFixed(2),
            }))
            .sort((a, b) => b.revenue - a.revenue);

        setRevenueByCategory(sortedRevenueByCategory);

    }, [selectedDate]);

    return (
        <Sidebar>
            <div className={styles.monthlyClosingPage}>
                <h1 className={styles.pageTitle}>Fechamento Mensal</h1>

                {/* Seção de Filtros */}
                <div className={styles.filtersSection}>
                    <div className={styles.filterGroup}>
                        <label>Selecione o Mês:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            className={styles.datePickerInput}
                        />
                    </div>
                </div>

                {/* Seção de Métricas de Resumo */}
                <div className={styles.summaryCards}>
                    <div className={styles.card}>
                        <h3>Receita Total</h3>
                        <p>R$ {summaryMetrics.totalRevenue || '0.00'}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Custo Total (Simulado)</h3>
                        <p>R$ {summaryMetrics.totalSimulatedCost || '0.00'}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Lucro Bruto</h3>
                        <p className={styles.profitText}>R$ {summaryMetrics.grossProfit || '0.00'}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Nº de Itens Vendidos</h3>
                        <p>{summaryMetrics.numberOfSalesItems || 0}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Nº de Pedidos Únicos</h3>
                        <p>{summaryMetrics.numberOfUniqueOrders || 0}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Ticket Médio</h3>
                        <p>R$ {summaryMetrics.averageTicket || '0.00'}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Nº de Entregas</h3>
                        <p>{summaryMetrics.numberOfDeliveries || 0}</p>
                    </div>
                </div>

                {/* Seção de Gráficos e Detalhes */}
                <div className={styles.chartsAndDetailsGrid}>
                    {/* Top Produtos Vendidos */}
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Top 5 Produtos Mais Vendidos</h3>
                        <div className={styles.tableContainer}>
                            {topSellingProducts.length > 0 ? (
                                <table className={styles.topProductsTable}>
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                            <th>Receita (R$)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topSellingProducts.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.revenue}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className={styles.noDataMessage}>Nenhum produto vendido no período.</p>
                            )}
                        </div>
                    </div>

                    {/* Receita por Categoria */}
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Receita por Categoria</h3>
                        <div className={styles.tableContainer}>
                            {revenueByCategory.length > 0 ? (
                                <table className={styles.categoryRevenueTable}>
                                    <thead>
                                        <tr>
                                            <th>Categoria</th>
                                            <th>Receita (R$)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenueByCategory.map((cat, index) => (
                                            <tr key={index}>
                                                <td>{cat.category}</td>
                                                <td>{cat.revenue}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className={styles.noDataMessage}>Nenhuma receita por categoria no período.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Seção de Vendas Detalhadas (Opcional, ou link para Análise de Vendas) */}
                <div className={styles.detailTableSection}>
                    <h2>Vendas Detalhadas do Mês</h2>
                    <p className={styles.noDataMessage}>
                        Detalhes das vendas podem ser visualizados na tela de "Análise de Vendas" aplicando os filtros de data.
                    </p>
                </div>

                {/* Seção de Entregas Detalhadas (Opcional, ou link para Entregas) */}
                <div className={styles.detailTableSection} style={{ marginTop: '2rem' }}>
                    <h2>Entregas Detalhadas do Mês</h2>
                    <p className={styles.noDataMessage}>
                        Detalhes das entregas podem ser visualizados na tela de "Entregas" aplicando os filtros de data.
                    </p>
                </div>

            </div>
        </Sidebar>
    );
}