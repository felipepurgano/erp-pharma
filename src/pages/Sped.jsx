import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/Sped.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiDownload } from 'react-icons/fi'; // Para o ícone de download

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de arquivos SPED
import { mockSpedFiles } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function SpedAccounting() {
    // Estados para geração de novo SPED
    const [selectedSpedType, setSelectedSpedType] = useState('SPED Contábil (ECD)');
    const [generationPeriodStart, setGenerationPeriodStart] = useState(null);
    const [generationPeriodEnd, setGenerationPeriodEnd] = useState(null);
    const [generationMessage, setGenerationMessage] = useState('');

    // Estados para filtros do histórico
    const [filterSpedType, setFilterSpedType] = useState('');
    const [filterGenerationDateStart, setFilterGenerationDateStart] = useState(null);
    const [filterGenerationDateEnd, setFilterGenerationDateEnd] = useState(null);

    const [filteredSpedHistory, setFilteredSpedHistory] = useState([]);

    // Opções de tipos de SPED
    const spedTypesOptions = [
        'SPED Contábil (ECD)',
        'SPED Contábil (ECF)',
        'SPED Fiscal (ICMS/IPI)',
        'SPED Contribuições (PIS/COFINS)',
        // Adicione outros tipos de SPED conforme necessário
    ];

    useEffect(() => {
        let currentHistory = [...mockSpedFiles]; // Copia para não modificar o array original

        // 1. Filtrar por Tipo de SPED
        if (filterSpedType) {
            currentHistory = currentHistory.filter(file => file.spedType === filterSpedType);
        }

        // 2. Filtrar por Data de Geração
        currentHistory = currentHistory.filter(file => {
            const fileGenerationDate = new Date(file.generationDate);
            const startOfDay = filterGenerationDateStart ? new Date(filterGenerationDateStart.setHours(0, 0, 0, 0)) : null;
            const endOfDay = filterGenerationDateEnd ? new Date(filterGenerationDateEnd.setHours(23, 59, 59, 999)) : null;

            return (!startOfDay || fileGenerationDate >= startOfDay) &&
                (!endOfDay || fileGenerationDate <= endOfDay);
        });

        // Ordenar do mais recente para o mais antigo
        currentHistory.sort((a, b) => new Date(b.generationDate) - new Date(a.generationDate));


        setFilteredSpedHistory(currentHistory);

    }, [filterSpedType, filterGenerationDateStart, filterGenerationDateEnd]);

    const handleGenerateSped = () => {
        if (!selectedSpedType || !generationPeriodStart || !generationPeriodEnd) {
            setGenerationMessage('Por favor, preencha todos os campos para gerar o arquivo SPED.');
            return;
        }

        setGenerationMessage(`Gerando arquivo ${selectedSpedType} para o período de ${generationPeriodStart.toLocaleDateString('pt-BR')} a ${generationPeriodEnd.toLocaleDateString('pt-BR')}...`);

        // Simula um tempo de processamento
        setTimeout(() => {
            const newFile = {
                id: `SPED${String(mockSpedFiles.length + 1).padStart(3, '0')}`,
                fileName: `${selectedSpedType.replace(/\s/g, '_').replace(/[\(\)]/g, '')}_${generationPeriodStart.getFullYear()}_${Date.now()}.zip`,
                spedType: selectedSpedType,
                periodStart: generationPeriodStart.toISOString().split('T')[0],
                periodEnd: generationPeriodEnd.toISOString().split('T')[0],
                generationDate: new Date().toISOString(),
                status: 'Gerado'
            };
            mockSpedFiles.unshift(newFile); // Adiciona ao início para aparecer primeiro
            setFilteredSpedHistory([...mockSpedFiles].sort((a, b) => new Date(b.generationDate) - new Date(a.generationDate))); // Atualiza a lista filtrada
            setGenerationMessage(`Arquivo ${selectedSpedType} gerado com sucesso!`);
            // Limpa os campos após a geração (opcional)
            setSelectedSpedType('SPED Contábil (ECD)');
            setGenerationPeriodStart(null);
            setGenerationPeriodEnd(null);
        }, 2000);
    };

    const handleDownload = (fileName) => {
        alert(`Simulando download do arquivo: ${fileName}`);
        // Em um ambiente real, aqui você dispararia a lógica para baixar o arquivo.
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Gerado':
                return styles.statusSuccess;
            case 'Erro':
                return styles.statusError;
            case 'Em Processamento':
                return styles.statusProcessing;
            default:
                return '';
        }
    };

    return (
        <Sidebar>
            <div className={styles.spedPage}>
                <h1 className={styles.pageTitle}>SPED Contabilidade</h1>

                {/* Seção de Geração de Arquivo SPED */}
                <div className={styles.formSection}>
                    <h2>Gerar Novo Arquivo SPED</h2>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="spedType">Tipo de SPED</label>
                            <select
                                id="spedType"
                                value={selectedSpedType}
                                onChange={(e) => setSelectedSpedType(e.target.value)}
                                className={styles.selectInput}
                            >
                                {spedTypesOptions.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Período de Referência</label>
                            <DatePicker
                                selected={generationPeriodStart}
                                onChange={(date) => setGenerationPeriodStart(date)}
                                selectsStart
                                startDate={generationPeriodStart}
                                endDate={generationPeriodEnd}
                                placeholderText="Data Início"
                                dateFormat="dd/MM/yyyy"
                                className={styles.datePickerInput}
                                inputClassName={styles.textInput}
                            />
                            <DatePicker
                                selected={generationPeriodEnd}
                                onChange={(date) => setGenerationPeriodEnd(date)}
                                selectsEnd
                                startDate={generationPeriodStart}
                                endDate={generationPeriodEnd}
                                minDate={generationPeriodStart}
                                placeholderText="Data Fim"
                                dateFormat="dd/MM/yyyy"
                                className={styles.datePickerInput}
                                inputClassName={styles.textInput}
                            />
                        </div>
                    </div>
                    <button onClick={handleGenerateSped} className={styles.generateButton}>
                        Gerar Arquivo SPED
                    </button>
                    {generationMessage && (
                        <p className={styles.generationMessage}>{generationMessage}</p>
                    )}
                </div>

                {/* Seção de Histórico de Arquivos SPED */}
                <div className={styles.historySection}>
                    <h2>Histórico de Geração de Arquivos</h2>

                    {/* Filtros do Histórico */}
                    <div className={styles.filtersSection}>
                        <div className={styles.filterGroup}>
                            <label>Tipo de SPED:</label>
                            <select
                                value={filterSpedType}
                                onChange={(e) => setFilterSpedType(e.target.value)}
                                className={styles.selectInput}
                            >
                                <option value="">Todos</option>
                                {spedTypesOptions.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.filterGroup}>
                            <label>Data de Geração:</label>
                            <DatePicker
                                selected={filterGenerationDateStart}
                                onChange={(date) => setFilterGenerationDateStart(date)}
                                selectsStart
                                startDate={filterGenerationDateStart}
                                endDate={filterGenerationDateEnd}
                                placeholderText="Início"
                                dateFormat="dd/MM/yyyy"
                                className={styles.datePickerInput}
                                inputClassName={styles.textInput}
                            />
                            <DatePicker
                                selected={filterGenerationDateEnd}
                                onChange={(date) => setFilterGenerationDateEnd(date)}
                                selectsEnd
                                startDate={filterGenerationDateStart}
                                endDate={filterGenerationDateEnd}
                                minDate={filterGenerationDateStart}
                                placeholderText="Fim"
                                dateFormat="dd/MM/yyyy"
                                className={styles.datePickerInput}
                                inputClassName={styles.textInput}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setFilterSpedType('');
                                setFilterGenerationDateStart(null);
                                setFilterGenerationDateEnd(null);
                            }}
                            className={styles.clearFiltersButton}
                        >
                            Limpar Filtros
                        </button>
                    </div>

                    <div className={styles.tableContainer}>
                        {filteredSpedHistory.length > 0 ? (
                            <table className={styles.spedTable}>
                                <thead>
                                    <tr>
                                        <th>Nome do Arquivo</th>
                                        <th>Tipo de SPED</th>
                                        <th>Período</th>
                                        <th>Data de Geração</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSpedHistory.map(file => (
                                        <tr key={file.id}>
                                            <td>{file.fileName}</td>
                                            <td>{file.spedType}</td>
                                            <td>
                                                {new Date(file.periodStart).toLocaleDateString('pt-BR')} - {new Date(file.periodEnd).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td>{new Date(file.generationDate).toLocaleString('pt-BR')}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${getStatusClass(file.status)}`}>
                                                    {file.status}
                                                </span>
                                            </td>
                                            <td>
                                                {file.status === 'Gerado' && (
                                                    <button
                                                        onClick={() => handleDownload(file.fileName)}
                                                        className={styles.downloadButton}
                                                        title="Fazer Download"
                                                    >
                                                        <FiDownload />
                                                    </button>
                                                )}
                                                {file.status === 'Erro' && (
                                                    <span className={styles.errorText} title="Ver detalhes do erro">Erro!</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noDataMessage}>Nenhum arquivo SPED encontrado com os filtros aplicados.</p>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}