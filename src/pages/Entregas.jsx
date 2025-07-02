import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/Entregas.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de entregas
import { mockDeliveryData } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function Entregas() {
    // Estados para filtros
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para dados processados
    const [filteredDeliveries, setFilteredDeliveries] = useState([]);
    const [summaryMetrics, setSummaryMetrics] = useState({});

    // Extrair entregadores e status únicos para os filtros
    const uniqueDeliveryPeople = [...new Set(mockDeliveryData.map(item => item.deliveryPerson))];
    const uniqueStatuses = [...new Set(mockDeliveryData.map(item => item.status))];

    // Efeito para filtrar e processar os dados sempre que os filtros mudam
    useEffect(() => {
        let filtered = mockDeliveryData.filter(delivery => {
            const deliveryDate = new Date(delivery.date);
            const startOfDay = startDate ? new Date(startDate.setHours(0,0,0,0)) : null;
            const endOfDay = endDate ? new Date(endDate.setHours(23,59,59,999)) : null;

            const matchesDate = (!startOfDay || deliveryDate >= startOfDay) &&
                                (!endOfDay || deliveryDate <= endOfDay);
            const matchesStatus = !selectedStatus || delivery.status === selectedStatus;
            const matchesDeliveryPerson = !selectedDeliveryPerson || delivery.deliveryPerson === selectedDeliveryPerson;
            const matchesSearch = !searchTerm || 
                                  delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  delivery.address.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesDate && matchesStatus && matchesDeliveryPerson && matchesSearch;
        });

        setFilteredDeliveries(filtered);
        
        // Calcular métricas de resumo
        const totalDeliveries = filtered.length;
        const pendingDeliveries = filtered.filter(d => d.status === 'Pendente').length;
        const inRouteDeliveries = filtered.filter(d => d.status === 'Em Rota').length;
        const deliveredDeliveries = filtered.filter(d => d.status === 'Entregue').length;
        const canceledDeliveries = filtered.filter(d => d.status === 'Cancelado').length;

        setSummaryMetrics({
            totalDeliveries,
            pendingDeliveries,
            inRouteDeliveries,
            deliveredDeliveries,
            canceledDeliveries,
        });

    }, [startDate, endDate, selectedStatus, selectedDeliveryPerson, searchTerm]);


    // Função auxiliar para obter a classe de estilo do status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Entregue': return styles.statusDelivered;
            case 'Em Rota': return styles.statusInRoute;
            case 'Pendente': return styles.statusPending;
            case 'Cancelado': return styles.statusCanceled;
            default: return '';
        }
    };

    return (
        <Sidebar>
            <div className={styles.deliveriesPage}>
                <h1 className={styles.pageTitle}>Gerenciamento de Entregas</h1>

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
                        <label>Status:</label>
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
                        <label>Entregador:</label>
                        <select
                            value={selectedDeliveryPerson}
                            onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueDeliveryPeople.map(person => (
                                <option key={person} value={person}>{person}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Buscar:</label>
                        <input
                            type="text"
                            placeholder="Nome Cliente, Pedido ou Endereço"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                            setSelectedStatus('');
                            setSelectedDeliveryPerson('');
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
                        <h3>Total de Entregas</h3>
                        <p>{summaryMetrics.totalDeliveries}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Entregas Pendentes</h3>
                        <p className={styles.statusPendingText}>{summaryMetrics.pendingDeliveries}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Entregas Em Rota</h3>
                        <p className={styles.statusInRouteText}>{summaryMetrics.inRouteDeliveries}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Entregas Concluídas</h3>
                        <p className={styles.statusDeliveredText}>{summaryMetrics.deliveredDeliveries}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Entregas Canceladas</h3>
                        <p className={styles.statusCanceledText}>{summaryMetrics.canceledDeliveries}</p>
                    </div>
                </div>

                {/* Seção de Tabela de Entregas */}
                <div className={styles.detailTableSection}>
                    <h2>Lista de Entregas</h2>
                    <button className={styles.addDeliveryButton}>+ Adicionar Nova Entrega</button>
                    <div className={styles.tableContainer}>
                        <table className={styles.deliveriesTable}>
                            <thead>
                                <tr>
                                    <th>ID Entrega</th>
                                    <th>Pedido</th>
                                    <th>Cliente</th>
                                    <th>Endereço</th>
                                    <th>Entregador</th>
                                    <th>Status</th>
                                    <th>Previsão</th>
                                    <th>Concluído em</th>
                                    <th>Pagamento</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDeliveries.length > 0 ? (
                                    filteredDeliveries.map(delivery => (
                                        <tr key={delivery.id}>
                                            <td>{delivery.id}</td>
                                            <td>{delivery.orderId}</td>
                                            <td>{delivery.customerName}</td>
                                            <td>{delivery.address}</td>
                                            <td>{delivery.deliveryPerson}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${getStatusClass(delivery.status)}`}>
                                                    {delivery.status}
                                                </span>
                                            </td>
                                            <td>{delivery.estimatedTime}</td>
                                            <td>{delivery.actualTime || 'N/A'}</td>
                                            <td>{delivery.paymentStatus}</td>
                                            <td>
                                                <button className={styles.actionButton}>Ver Detalhes</button>
                                                {delivery.status === 'Pendente' && (
                                                    <button className={styles.actionButton}>Designar</button>
                                                )}
                                                {delivery.status === 'Em Rota' && (
                                                    <button className={styles.actionButton}>Marcar Entregue</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">Nenhuma entrega encontrada com os filtros aplicados.</td>
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