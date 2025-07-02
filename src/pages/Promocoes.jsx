import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/Promocoes.module.css'; // Novo CSS Module
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho conforme a sua estrutura

// Importar os dados mockados de promoções
import { mockPromotions } from '@/utils/mocks'; // Ajuste o caminho conforme a sua estrutura

export default function Promocoes() {
    const [promotions, setPromotions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPromotion, setCurrentPromotion] = useState({
        id: '',
        name: '',
        description: '',
        type: 'Porcentagem', // Default type
        value: '',
        applicability: '',
        startDate: null,
        endDate: null,
        status: 'Ativa', // Default status
    });

    const [filterName, setFilterName] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Load initial promotions and filter whenever filters change
    useEffect(() => {
        let filtered = mockPromotions.filter(promo => {
            const matchesName = promo.name.toLowerCase().includes(filterName.toLowerCase());
            const matchesType = !filterType || promo.type === filterType;
            const matchesStatus = !filterStatus || promo.status === filterStatus;
            return matchesName && matchesType && matchesStatus;
        });
        setPromotions(filtered);
    }, [filterName, filterType, filterStatus]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentPromotion({ ...currentPromotion, [name]: value });
    };

    const handleDateChange = (date, type) => {
        setCurrentPromotion({ ...currentPromotion, [type]: date });
    };

    const handleStatusToggle = (promoId) => {
        setPromotions(promotions.map(promo =>
            promo.id === promoId
                ? { ...promo, status: promo.status === 'Ativa' ? 'Inativa' : 'Ativa' }
                : promo
        ));
        // Also update the mock data source in a real application
    };

    const handleEdit = (promo) => {
        setIsEditing(true);
        // Ensure dates are Date objects for DatePicker
        setCurrentPromotion({
            ...promo,
            startDate: promo.startDate ? new Date(promo.startDate) : null,
            endDate: promo.endDate ? new Date(promo.endDate) : null,
        });
    };

    const handleDelete = (promoId) => {
        if (window.confirm("Tem certeza que deseja excluir esta promoção?")) {
            setPromotions(promotions.filter(promo => promo.id !== promoId));
            // Also remove from mock data source in a real application
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const formattedStartDate = currentPromotion.startDate ? currentPromotion.startDate.toISOString().split('T')[0] : null;
        const formattedEndDate = currentPromotion.endDate ? currentPromotion.endDate.toISOString().split('T')[0] : null;

        if (isEditing) {
            setPromotions(promotions.map(promo =>
                promo.id === currentPromotion.id
                    ? {
                        ...currentPromotion,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        // Recalcular status se necessário, ou deixar manual
                        status: currentPromotion.status // Mantém o status do formulário
                      }
                    : promo
            ));
            setIsEditing(false);
        } else {
            const newId = `PRM${String(promotions.length + 1).padStart(3, '0')}`;
            setPromotions([...promotions, {
                ...currentPromotion,
                id: newId,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                status: currentPromotion.status, // Define o status inicial do formulário
            }]);
        }
        // Reset form
        setCurrentPromotion({
            id: '', name: '', description: '', type: 'Porcentagem', value: '', applicability: '', startDate: null, endDate: null, status: 'Ativa'
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentPromotion({
            id: '', name: '', description: '', type: 'Porcentagem', value: '', applicability: '', startDate: null, endDate: null, status: 'Ativa'
        });
    };

    const getStatusClass = (status) => {
        const today = new Date();
        const promoStartDate = currentPromotion.startDate ? new Date(currentPromotion.startDate) : null;
        const promoEndDate = currentPromotion.endDate ? new Date(currentPromotion.endDate) : null;

        if (status === 'Ativa') {
            if (promoEndDate && today > promoEndDate) return styles.statusExpired; // Expirada
            if (promoStartDate && today < promoStartDate) return styles.statusScheduled; // Agendada
            return styles.statusActive; // Ativa
        } else {
            return styles.statusInactive; // Inativa (manualmente desativada)
        }
    };

    const getDisplayStatus = (promo) => {
        const today = new Date();
        const promoStartDate = promo.startDate ? new Date(promo.startDate) : null;
        const promoEndDate = promo.endDate ? new Date(promo.endDate) : null;

        if (promo.status === 'Inativa') return 'Inativa';
        if (promoStartDate && today < promoStartDate) return 'Agendada';
        if (promoEndDate && today > promoEndDate) return 'Expirada';
        return 'Ativa';
    };


    return (
        <Sidebar>
            <div className={styles.promotionsPage}>
                <h1 className={styles.pageTitle}>Gestão de Promoções</h1>

                {/* Formulário de Adição/Edição de Promoção */}
                <div className={styles.formSection}>
                    <h2>{isEditing ? 'Editar Promoção' : 'Adicionar Nova Promoção'}</h2>
                    <form onSubmit={handleSubmit} className={styles.promotionForm}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nome da Promoção</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={currentPromotion.name}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="type">Tipo</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={currentPromotion.type}
                                    onChange={handleInputChange}
                                    className={styles.selectInput}
                                    required
                                >
                                    <option value="Porcentagem">Porcentagem</option>
                                    <option value="Valor Fixo">Valor Fixo</option>
                                    <option value="Frete Grátis">Frete Grátis</option>
                                    <option value="Compre X Leve Y">Compre X Leve Y</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="value">Valor/Detalhe</label>
                                <input
                                    type="text"
                                    id="value"
                                    name="value"
                                    value={currentPromotion.value}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    placeholder="Ex: 10 (para %), 50.00 (para R$), 2=1"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="applicability">Aplicabilidade</label>
                                <input
                                    type="text"
                                    id="applicability"
                                    name="applicability"
                                    value={currentPromotion.applicability}
                                    onChange={handleInputChange}
                                    className={styles.textInput}
                                    placeholder="Ex: Todos, Categoria: Analgésicos, Pedido > R$100"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="startDate">Data de Início</label>
                                <DatePicker
                                    selected={currentPromotion.startDate}
                                    onChange={(date) => handleDateChange(date, 'startDate')}
                                    dateFormat="dd/MM/yyyy"
                                    className={styles.datePickerInput}
                                    placeholderText="Selecione a data de início"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="endDate">Data de Fim</label>
                                <DatePicker
                                    selected={currentPromotion.endDate}
                                    onChange={(date) => handleDateChange(date, 'endDate')}
                                    dateFormat="dd/MM/yyyy"
                                    className={styles.datePickerInput}
                                    placeholderText="Selecione a data de fim"
                                />
                            </div>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                name="description"
                                value={currentPromotion.description}
                                onChange={handleInputChange}
                                className={styles.textareaInput}
                                rows="3"
                                placeholder="Descreva os detalhes da promoção"
                            ></textarea>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="status">Status da Promoção</label>
                            <select
                                id="status"
                                name="status"
                                value={currentPromotion.status}
                                onChange={handleInputChange}
                                className={styles.selectInput}
                            >
                                <option value="Ativa">Ativa</option>
                                <option value="Inativa">Inativa</option>
                            </select>
                        </div>


                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitButton}>
                                {isEditing ? 'Salvar Edição' : 'Adicionar Promoção'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Filtros da Tabela de Promoções */}
                <div className={styles.filtersSection} style={{marginTop: '3rem'}}>
                    <div className={styles.filterGroup}>
                        <label>Buscar por Nome:</label>
                        <input
                            type="text"
                            placeholder="Nome da promoção"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Filtrar por Tipo:</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            <option value="Porcentagem">Porcentagem</option>
                            <option value="Valor Fixo">Valor Fixo</option>
                            <option value="Frete Grátis">Frete Grátis</option>
                            <option value="Compre X Leve Y">Compre X Leve Y</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Filtrar por Status:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            <option value="Ativa">Ativa</option>
                            <option value="Inativa">Inativa</option>
                        </select>
                    </div>
                    <button onClick={() => { setFilterName(''); setFilterType(''); setFilterStatus(''); }} className={styles.clearFiltersButton}>
                        Limpar Filtros
                    </button>
                </div>


                {/* Tabela de Promoções */}
                <div className={styles.promotionsTableSection}>
                    <h2>Promoções Cadastradas</h2>
                    <div className={styles.tableContainer}>
                        {promotions.length > 0 ? (
                            <table className={styles.promotionsTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Valor</th>
                                        <th>Aplicabilidade</th>
                                        <th>Início</th>
                                        <th>Fim</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {promotions.map(promo => (
                                        <tr key={promo.id}>
                                            <td>{promo.id}</td>
                                            <td>{promo.name}</td>
                                            <td>{promo.type}</td>
                                            <td>{promo.value}</td>
                                            <td>{promo.applicability}</td>
                                            <td>{promo.startDate ? new Date(promo.startDate).toLocaleDateString('pt-BR') : 'N/A'}</td>
                                            <td>{promo.endDate ? new Date(promo.endDate).toLocaleDateString('pt-BR') : 'N/A'}</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${getStatusClass(getDisplayStatus(promo))}`}>
                                                    {getDisplayStatus(promo)}
                                                </span>
                                            </td>
                                            <td className={styles.actionsCell}>
                                                <button onClick={() => handleEdit(promo)} className={styles.actionButton}>Editar</button>
                                                <button onClick={() => handleStatusToggle(promo.id)} className={`${styles.actionButton} ${promo.status === 'Ativa' ? styles.deactivateButton : styles.activateButton}`}>
                                                    {promo.status === 'Ativa' ? 'Inativar' : 'Ativar'}
                                                </button>
                                                <button onClick={() => handleDelete(promo.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noDataMessage}>Nenhuma promoção encontrada.</p>
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}