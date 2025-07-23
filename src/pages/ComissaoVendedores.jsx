import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/ComissaoVendedores.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de vendas (agora com campo salesperson)
import { mockProductSales } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function ComissaoVendedores() {
    // Estados para filtros
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');

    // Estados para dados processados
    const [filteredSales, setFilteredSales] = useState([]);
    const [summaryMetrics, setSummaryMetrics] = useState({});

    // Definir as taxas de comissão por categoria
    const commissionRates = {
        'Analgésicos': 0.05,    // 5%
        'Antibióticos': 0.07,   // 7%
        'Gastro': 0.06,         // 6%
        'Vitaminas': 0.04,      // 4%
        'Cardiovascular': 0.055, // 5.5%
        'Default': 0.05         // 5% para categorias não definidas
    };

    // Extrair vendedores únicos para o filtro
    const uniqueSalespeople = [...new Set(mockProductSales.map(sale => sale.salesperson))];

    useEffect(() => {
        let filtered = mockProductSales.filter(sale => {
            const saleDate = new Date(sale.date);
            const startOfDay = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null;
            const endOfDay = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null;

            const matchesDate = (!startOfDay || saleDate >= startOfDay) &&
                (!endOfDay || saleDate <= endOfDay);
            const matchesSalesperson = !selectedSalesperson || sale.salesperson === selectedSalesperson;

            return matchesDate && matchesSalesperson;
        });

        // Calcular comissão para cada venda
        let totalSalesValue = 0;
        let totalCommissionEarned = 0;

        const salesWithCommission = filtered.map(sale => {
            const itemValue = sale.quantity * sale.price;
            const rate = commissionRates[sale.category] || commissionRates['Default'];
            const commissionAmount = itemValue * rate;

            totalSalesValue += itemValue;
            totalCommissionEarned += commissionAmount;

            return {
                ...sale,
                itemValue: itemValue.toFixed(2),
                commissionRate: (rate * 100).toFixed(1), // Em porcentagem
                commissionAmount: commissionAmount.toFixed(2),
            };
        });

        setFilteredSales(salesWithCommission);
        setSummaryMetrics({
            totalSalesValue: totalSalesValue.toFixed(2),
            numberOfSales: salesWithCommission.length,
            totalCommissionEarned: totalCommissionEarned.toFixed(2),
            averageCommissionRate: (totalSalesValue > 0 ? (totalCommissionEarned / totalSalesValue * 100) : 0).toFixed(2),
        });

    }, [startDate, endDate, selectedSalesperson]);


    return (
        <Sidebar>
            <div className={styles.salesCommissionPage}>
                <h1 className={styles.pageTitle}>Comissão de Vendedores</h1>

                {/* Seção de Filtros */}
                <div className={styles.filtersSection}>
                    <div className={styles.filterGroup}>
                        <label>Período das Vendas:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Data Início"
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePickerInput}
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="Data Fim"
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePickerInput}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Vendedor:</label>
                        <select
                            value={selectedSalesperson}
                            onChange={(e) => setSelectedSalesperson(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueSalespeople.map(person => (
                                <option key={person} value={person}>{person}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                            setSelectedSalesperson('');
                        }}
                        className={styles.clearFiltersButton}
                    >
                        Limpar Filtros
                    </button>
                </div>

                {/* Seção de Métricas de Resumo */}
                <div className={styles.summaryCards}>
                    <div className={styles.card}>
                        <h3>Vendas Totais</h3>
                        <p>R$ {summaryMetrics.totalSalesValue || '0.00'}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Número de Vendas</h3>
                        <p>{summaryMetrics.numberOfSales || 0}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Comissão Total</h3>
                        <p className={styles.commissionText}>R$ {summaryMetrics.totalCommissionEarned || '0.00'}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Taxa Média Comissão</h3>
                        <p>{summaryMetrics.averageCommissionRate || '0.00'}%</p>
                    </div>
                </div>

                {/* Tabela de Detalhes da Comissão */}
                <div className={styles.detailTableSection}>
                    <h2>Detalhes da Comissão</h2>
                    <div className={styles.tableContainer}>
                        {filteredSales.length > 0 ? (
                            <table className={styles.commissionTable}>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Vendedor</th>
                                        <th>Produto</th>
                                        <th>Categoria</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unitário</th>
                                        <th>Valor da Venda</th>
                                        <th>Taxa Comissão</th>
                                        <th>Valor Comissão</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSales.map(sale => (
                                        <tr key={sale.id}>
                                            <td>{new Date(sale.date).toLocaleDateString('pt-BR')}</td>
                                            <td>{sale.salesperson}</td>
                                            <td>{sale.name}</td>
                                            <td>{sale.category}</td>
                                            <td>{sale.quantity}</td>
                                            <td>R$ {sale.price.toFixed(2)}</td>
                                            <td>R$ {sale.itemValue}</td>
                                            <td>{sale.commissionRate}%</td>
                                            <td className={styles.commissionAmountCell}>R$ {sale.commissionAmount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noDataMessage}>Nenhuma venda encontrada para os filtros selecionados ou período.</p>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}