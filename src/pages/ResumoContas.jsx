import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/ResumoContas.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de receitas e despesas
import { mockRevenues, mockExpenses } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function ResumoContas() {
    // Estados para filtros
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Estados para dados processados
    const [filteredRevenues, setFilteredRevenues] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [summaryMetrics, setSummaryMetrics] = useState({});

    useEffect(() => {
        const filterTransactions = (transactions, start, end) => {
            return transactions.filter(item => {
                const itemDate = new Date(item.date);
                const startOfDay = start ? new Date(start.setHours(0, 0, 0, 0)) : null;
                const endOfDay = end ? new Date(end.setHours(23, 59, 59, 999)) : null;

                return (!startOfDay || itemDate >= startOfDay) &&
                    (!endOfDay || itemDate <= endOfDay);
            });
        };

        const currentRevenues = filterTransactions(mockRevenues, startDate, endDate);
        const currentExpenses = filterTransactions(mockExpenses, startDate, endDate);

        setFilteredRevenues(currentRevenues);
        setFilteredExpenses(currentExpenses);

        // Calcular métricas de resumo
        const totalRevenues = currentRevenues.reduce((sum, item) => sum + (item.status === 'Recebido' ? item.amount : 0), 0);
        const totalExpenses = currentExpenses.reduce((sum, item) => sum + (item.status === 'Pago' ? item.amount : 0), 0);
        const netBalance = totalRevenues - totalExpenses;

        const accountsReceivable = mockRevenues.reduce((sum, item) => sum + (item.status === 'Pendente' ? item.amount : 0), 0);
        const accountsPayable = mockExpenses.reduce((sum, item) => sum + (item.status === 'Pendente' ? item.amount : 0), 0);

        // Saldo atual em caixa/banco (simplificado: todas as receitas recebidas - todas as despesas pagas)
        const totalReceivedOverall = mockRevenues.reduce((sum, item) => sum + (item.status === 'Recebido' ? item.amount : 0), 0);
        const totalPaidOverall = mockExpenses.reduce((sum, item) => sum + (item.status === 'Pago' ? item.amount : 0), 0);
        const currentCashBalance = totalReceivedOverall - totalPaidOverall;


        setSummaryMetrics({
            totalRevenues: totalRevenues.toFixed(2),
            totalExpenses: totalExpenses.toFixed(2),
            netBalance: netBalance.toFixed(2),
            accountsReceivable: accountsReceivable.toFixed(2),
            accountsPayable: accountsPayable.toFixed(2),
            currentCashBalance: currentCashBalance.toFixed(2),
        });

    }, [startDate, endDate]);


    return (
        <Sidebar>
            <div className={styles.accountSummaryPage}>
                <h1 className={styles.pageTitle}>Resumo de Contas</h1>

                {/* Seção de Filtros */}
                <div className={styles.filtersSection}>
                    <div className={styles.filterGroup}>
                        <label>Período:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Data Início"
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePickerInput}
                            inputClassName={styles.textInput} /* Adicionado para estilizar o input */
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
                            inputClassName={styles.textInput} /* Adicionado para estilizar o input */
                        />
                    </div>

                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                        }}
                        className={styles.clearFiltersButton}
                    >
                        Limpar Filtros
                    </button>
                </div>

                {/* Seção de Métricas de Resumo */}
                <div className={styles.summaryCards}>
                    <div className={`${styles.card} ${styles.revenueCard}`}>
                        <h3>Receitas Totais (Período)</h3>
                        <p>R$ {summaryMetrics.totalRevenues || '0.00'}</p>
                    </div>
                    <div className={`${styles.card} ${styles.expenseCard}`}>
                        <h3>Despesas Totais (Período)</h3>
                        <p>R$ {summaryMetrics.totalExpenses || '0.00'}</p>
                    </div>
                    <div className={`${styles.card} ${summaryMetrics.netBalance >= 0 ? styles.positiveBalance : styles.negativeBalance}`}>
                        <h3>Saldo Líquido (Período)</h3>
                        <p>R$ {summaryMetrics.netBalance || '0.00'}</p>
                    </div>
                    <div className={`${styles.card} ${styles.receivableCard}`}>
                        <h3>Contas a Receber</h3>
                        <p>R$ {summaryMetrics.accountsReceivable || '0.00'}</p>
                    </div>
                    <div className={`${styles.card} ${styles.payableCard}`}>
                        <h3>Contas a Pagar</h3>
                        <p>R$ {summaryMetrics.accountsPayable || '0.00'}</p>
                    </div>
                    <div className={`${styles.card} ${summaryMetrics.currentCashBalance >= 0 ? styles.positiveBalance : styles.negativeBalance}`}>
                        <h3>Saldo Atual em Caixa/Banco</h3>
                        <p>R$ {summaryMetrics.currentCashBalance || '0.00'}</p>
                    </div>
                </div>

                {/* Tabela de Detalhes de Receitas */}
                <div className={styles.detailTableSection}>
                    <h2>Receitas do Período</h2>
                    <div className={styles.tableContainer}>
                        {filteredRevenues.length > 0 ? (
                            <table className={styles.transactionTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Data</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRevenues.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.category}</td>
                                            <td className={styles.amountPositive}>R$ {item.amount.toFixed(2)}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${item.status === 'Recebido' ? styles.statusReceived : styles.statusPending}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noDataMessage}>Nenhuma receita encontrada para o período selecionado.</p>
                        )}
                    </div>
                </div>

                {/* Tabela de Detalhes de Despesas */}
                <div className={styles.detailTableSection} style={{ marginTop: '2.5rem' }}>
                    <h2>Despesas do Período</h2>
                    <div className={styles.tableContainer}>
                        {filteredExpenses.length > 0 ? (
                            <table className={styles.transactionTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Data</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Valor</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredExpenses.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                                            <td>{item.description}</td>
                                            <td>{item.category}</td>
                                            <td className={styles.amountNegative}>R$ {item.amount.toFixed(2)}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${item.status === 'Pago' ? styles.statusPaid : styles.statusPending}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noDataMessage}>Nenhuma despesa encontrada para o período selecionado.</p>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}