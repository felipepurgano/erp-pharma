import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/LogAuditoria.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de logs de auditoria
import { mockAuditLogs } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function AuditLog() {
    // Estados para filtros
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterUser, setFilterUser] = useState('');
    const [filterActionType, setFilterActionType] = useState('');
    const [filterModule, setFilterModule] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [filteredLogs, setFilteredLogs] = useState([]);

    // Extrair opções únicas para os filtros
    const uniqueUsers = [...new Set(mockAuditLogs.map(log => log.user))].sort();
    const uniqueActionTypes = [...new Set(mockAuditLogs.map(log => log.actionType))].sort();
    const uniqueModules = [...new Set(mockAuditLogs.map(log => log.module))].sort();

    useEffect(() => {
        let currentLogs = [...mockAuditLogs]; // Copia para não modificar o array original

        // 1. Filtrar por Data
        currentLogs = currentLogs.filter(log => {
            const logDate = new Date(log.timestamp);
            const startOfDay = startDate ? new Date(startDate.setHours(0,0,0,0)) : null;
            const endOfDay = endDate ? new Date(endDate.setHours(23,59,59,999)) : null;

            return (!startOfDay || logDate >= startOfDay) &&
                   (!endOfDay || logDate <= endOfDay);
        });

        // 2. Filtrar por Usuário
        if (filterUser) {
            currentLogs = currentLogs.filter(log => log.user === filterUser);
        }

        // 3. Filtrar por Tipo de Ação
        if (filterActionType) {
            currentLogs = currentLogs.filter(log => log.actionType === filterActionType);
        }

        // 4. Filtrar por Módulo
        if (filterModule) {
            currentLogs = currentLogs.filter(log => log.module === filterModule);
        }

        // 5. Filtrar por Termo de Busca na Descrição
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentLogs = currentLogs.filter(log =>
                log.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        
        // Ordenar do mais recente para o mais antigo
        currentLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setFilteredLogs(currentLogs);

    }, [startDate, endDate, filterUser, filterActionType, filterModule, searchTerm]);

    const getActionTypeClass = (actionType) => {
        switch (actionType) {
            case 'Login':
            case 'Visualização':
            case 'Venda':
                return styles.actionInfo;
            case 'Criação':
                return styles.actionSuccess;
            case 'Edição':
            case 'Configuração':
                return styles.actionWarning;
            case 'Exclusão':
            case 'Login Falho':
                return styles.actionDanger;
            default:
                return '';
        }
    };

    return (
        <Sidebar>
            <div className={styles.auditLogPage}>
                <h1 className={styles.pageTitle}>Log de Auditoria</h1>

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
                            inputClassName={styles.textInput}
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
                            inputClassName={styles.textInput}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Usuário:</label>
                        <select
                            value={filterUser}
                            onChange={(e) => setFilterUser(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueUsers.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Tipo de Ação:</label>
                        <select
                            value={filterActionType}
                            onChange={(e) => setFilterActionType(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueActionTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Módulo:</label>
                        <select
                            value={filterModule}
                            onChange={(e) => setFilterModule(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueModules.map(module => (
                                <option key={module} value={module}>{module}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className={styles.filterGroup}>
                        <label>Buscar na Descrição:</label>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                            setFilterUser('');
                            setFilterActionType('');
                            setFilterModule('');
                            setSearchTerm('');
                        }}
                        className={styles.clearFiltersButton}
                    >
                        Limpar Filtros
                    </button>
                </div>

                {/* Tabela do Log de Auditoria */}
                <div className={styles.auditTableSection}>
                    <h2>Eventos de Auditoria</h2>
                    <div className={styles.tableContainer}>
                        {filteredLogs.length > 0 ? (
                            <table className={styles.auditTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Data/Hora</th>
                                        <th>Usuário</th>
                                        <th>Tipo de Ação</th>
                                        <th>Módulo</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.map(log => (
                                        <tr key={log.id}>
                                            <td>{log.id}</td>
                                            <td>{new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                                            <td>{log.user}</td>
                                            <td>
                                                <span className={`${styles.actionBadge} ${getActionTypeClass(log.actionType)}`}>
                                                    {log.actionType}
                                                </span>
                                            </td>
                                            <td>{log.module}</td>
                                            <td>{log.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noDataMessage}>Nenhum evento de auditoria encontrado com os filtros aplicados.</p>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}