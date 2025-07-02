import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/AnaliseClientes.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de clientes
import { mockCustomerData } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function AnaliseClientes() {
    // Estados para filtros
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterType, setFilterType] = useState('registrationDate'); // 'registrationDate' ou 'lastPurchaseDate'
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para dados processados
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [summaryMetrics, setSummaryMetrics] = useState({});

    // Extrair status únicos para os filtros
    const uniqueStatuses = [...new Set(mockCustomerData.map(item => item.status))];

    // Efeito para filtrar e processar os dados sempre que os filtros mudam
    useEffect(() => {
        let filtered = mockCustomerData.filter(customer => {
            const dateToCheck = new Date(filterType === 'registrationDate' ? customer.registrationDate : customer.lastPurchaseDate);
            const startOfDay = startDate ? new Date(startDate.setHours(0,0,0,0)) : null;
            const endOfDay = endDate ? new Date(endDate.setHours(23,59,59,999)) : null;

            const matchesDate = (!startOfDay || dateToCheck >= startOfDay) &&
                                (!endOfDay || dateToCheck <= endOfDay);
            const matchesStatus = !selectedStatus || customer.status === selectedStatus;
            const matchesSearch = !searchTerm || 
                                  customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  customer.phone.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesDate && matchesStatus && matchesSearch;
        });

        setFilteredCustomers(filtered);
        
        // Calcular métricas de resumo
        const totalCustomers = filtered.length;
        const activeCustomers = filtered.filter(c => c.status === 'Ativo').length;
        const newCustomers = filtered.filter(c => c.status === 'Novo').length;
        const inactiveCustomers = filtered.filter(c => c.status === 'Inativo').length;
        
        const totalRevenue = filtered.reduce((sum, c) => sum + c.totalPurchases, 0);
        const averagePurchaseValue = totalCustomers > 0 ? (totalRevenue / totalCustomers) : 0;

        setSummaryMetrics({
            totalCustomers,
            activeCustomers,
            newCustomers,
            inactiveCustomers,
            totalRevenue: totalRevenue.toFixed(2),
            averagePurchaseValue: averagePurchaseValue.toFixed(2),
        });

    }, [startDate, endDate, filterType, selectedStatus, searchTerm]);


    // Função auxiliar para obter a classe de estilo do status do cliente
    const getStatusClass = (status) => {
        switch (status) {
            case 'Ativo': return styles.statusActive;
            case 'Novo': return styles.statusNew;
            case 'Inativo': return styles.statusInactive;
            default: return '';
        }
    };

    return (
        <Sidebar>
            <div className={styles.customerAnalysisPage}>
                <h1 className={styles.pageTitle}>Análise de Clientes</h1>

                {/* Seção de Filtros */}
                <div className={styles.filtersSection}>
                    <div className={styles.filterGroup}>
                        <label>Período por:</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="registrationDate">Data de Registro</option>
                            <option value="lastPurchaseDate">Última Compra</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Datas:</label>
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
                        <label>Status Cliente:</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Buscar Cliente:</label>
                        <input
                            type="text"
                            placeholder="Nome, ID, Email ou Telefone"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                            setFilterType('registrationDate');
                            setSelectedStatus('');
                            setSearchTerm('');
                        }}
                        className={styles.clearFiltersButton}
                    >
                        Limpar Filtros
                    </button>
                </div>

                {/* Seção de Métricas de Resumo */}
                <div className={styles.summaryCards}>
                    <div className={styles.card}>
                        <h3>Total de Clientes</h3>
                        <p>{summaryMetrics.totalCustomers}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Clientes Ativos</h3>
                        <p className={styles.statusActiveText}>{summaryMetrics.activeCustomers}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Novos Clientes</h3>
                        <p className={styles.statusNewText}>{summaryMetrics.newCustomers}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Clientes Inativos</h3>
                        <p className={styles.statusInactiveText}>{summaryMetrics.inactiveCustomers}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Receita Total de Clientes</h3>
                        <p>R$ {summaryMetrics.totalRevenue}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Valor Médio por Compra</h3>
                        <p>R$ {summaryMetrics.averagePurchaseValue}</p>
                    </div>
                </div>

                {/* Seção de Gráficos (Placeholder) */}
                <div className={styles.chartsSection}>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Clientes Registrados por Mês</h3>
                        <div className={styles.chartPlaceholder}>
                            Gráfico de Linha aqui (Ex: aquisição de clientes)
                            {/* Gráfico de aquisição de clientes aqui, usando Chart.js ou outra lib */}
                        </div>
                    </div>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Distribuição de Clientes por Total de Compras</h3>
                        <div className={styles.chartPlaceholder}>
                            Gráfico de Barras/Histograma aqui (Ex: faixas de gasto)
                            {/* Gráfico de distribuição de clientes aqui */}
                        </div>
                    </div>
                </div>

                {/* Seção de Tabela Detalhada */}
                <div className={styles.detailTableSection}>
                    <h2>Lista de Clientes</h2>
                    <button className={styles.addCustomerButton}>+ Cadastrar Novo Cliente</button>
                    <div className={styles.tableContainer}>
                        <table className={styles.customersTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Contato (Email)</th>
                                    <th>Telefone</th>
                                    <th>Data Registro</th>
                                    <th>Última Compra</th>
                                    <th>Total Compras</th>
                                    <th>Qtd. Pedidos</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map(customer => (
                                        <tr key={customer.id}>
                                            <td>{customer.id}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>{new Date(customer.registrationDate).toLocaleDateString('pt-BR')}</td>
                                            <td>{new Date(customer.lastPurchaseDate).toLocaleDateString('pt-BR')}</td>
                                            <td>R$ {customer.totalPurchases.toFixed(2)}</td>
                                            <td>{customer.orderCount}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${getStatusClass(customer.status)}`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className={styles.actionButton}>Ver Perfil</button>
                                                <button className={styles.actionButton}>Editar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">Nenhum cliente encontrado com os filtros aplicados.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}