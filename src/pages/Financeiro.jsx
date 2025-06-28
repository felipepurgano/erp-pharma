// pages/Financeiro.jsx
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Financeiro.module.css";
import { FiPlus, FiEdit, FiTrash, FiSearch, FiDollarSign, FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import {
    financeiroMock,
    adicionarLancamentoFinanceiroMock,
    atualizarLancamentoFinanceiroMock,
    removerLancamentoFinanceiroMock,
    categoriasFinanceirasMock,
    contasBancariasMock,
} from "@/utils/mocks";

export default function Financeiro() {
    // --- Estados para o Formulário de Lançamento ---
    const [lancamentoId, setLancamentoId] = useState(null); // Para edição
    const [tipo, setTipo] = useState("Pagar"); // "Pagar" ou "Receber"
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");
    const [dataEfetiva, setDataEfetiva] = useState("");
    const [status, setStatus] = useState("Pendente");
    const [categoria, setCategoria] = useState("");
    const [contaOrigemDestino, setContaOrigemDestino] = useState("");
    const [observacoes, setObservacoes] = useState("");

    // --- Estados para a Listagem e Filtros ---
    const [listaLancamentos, setListaLancamentos] = useState(financeiroMock);
    const [lancamentosExibidos, setLancamentosExibidos] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [filtroStatus, setFiltroStatus] = useState("Todos");
    const [filtroCategoria, setFiltroCategoria] = useState("Todas");
    const [filtroDataInicio, setFiltroDataInicio] = useState("");
    const [filtroDataFim, setFiltroDataFim] = useState("");
    const [termoBuscaGrid, setTermoBuscaGrid] = useState("");

    // --- Resumo Financeiro ---
    const [totalPagarPendente, setTotalPagarPendente] = useState(0);
    const [totalReceberPendente, setTotalReceberPendente] = useState(0);
    const [saldoTeorico, setSaldoTeorico] = useState(0); // Recebidos - Pagos

    // --- Efeito para Calcular Resumo e Filtrar Grid ---
    useEffect(() => {
        let lancamentosFiltrados = [...listaLancamentos];

        // Filtro por Tipo
        if (filtroTipo !== "Todos") {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => lanc.tipo === filtroTipo
            );
        }

        // Filtro por Status
        if (filtroStatus !== "Todos") {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => lanc.status === filtroStatus
            );
        }

        // Filtro por Categoria
        if (filtroCategoria !== "Todas") {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => lanc.categoria === filtroCategoria
            );
        }

        // Filtro por Período de Data de Vencimento
        if (filtroDataInicio) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => new Date(lanc.dataVencimento) >= new Date(filtroDataInicio)
            );
        }
        if (filtroDataFim) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => new Date(lanc.dataVencimento) <= new Date(filtroDataFim)
            );
        }

        // Busca por Termo (descrição, observações, conta)
        const termo = termoBuscaGrid.toLowerCase().trim();
        if (termo) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) =>
                    lanc.descricao.toLowerCase().includes(termo) ||
                    (lanc.observacoes && lanc.observacoes.toLowerCase().includes(termo)) ||
                    lanc.contaOrigemDestino.toLowerCase().includes(termo)
            );
        }

        // Ordena por data de vencimento
        setLancamentosExibidos(lancamentosFiltrados.sort((a, b) => {
            if (a.status === "Pendente" && b.status !== "Pendente") return -1;
            if (a.status !== "Pendente" && b.status === "Pendente") return 1;
            return new Date(a.dataVencimento) - new Date(b.dataVencimento);
        }));

        // Calcular totais para o resumo
        let pagarPendente = 0;
        let receberPendente = 0;
        let saldo = 0;

        listaLancamentos.forEach((lanc) => {
            if (lanc.tipo === "Pagar" && (lanc.status === "Pendente" || lanc.status === "Atrasado")) {
                pagarPendente += lanc.valor;
            }
            if (lanc.tipo === "Receber" && (lanc.status === "Pendente" || lanc.status === "Atrasado")) {
                receberPendente += lanc.valor;
            }
            if (lanc.status === "Recebido") {
                saldo += lanc.valor;
            } else if (lanc.status === "Pago") {
                saldo -= lanc.valor;
            }
        });

        setTotalPagarPendente(pagarPendente);
        setTotalReceberPendente(receberPendente);
        setSaldoTeorico(saldo);
    }, [
        listaLancamentos,
        filtroTipo,
        filtroStatus,
        filtroCategoria,
        filtroDataInicio,
        filtroDataFim,
        termoBuscaGrid,
    ]);

    // --- Funções de Manipulação do Formulário de Lançamento ---
    const handleClearForm = () => {
        setLancamentoId(null);
        setTipo("Pagar");
        setDescricao("");
        setValor("");
        setDataVencimento("");
        setDataEfetiva("");
        setStatus("Pendente");
        setCategoria("");
        setContaOrigemDestino("");
        setObservacoes("");
    };

    const handleSaveLancamento = (e) => {
        e.preventDefault();

        if (!descricao || !valor || parseFloat(valor) <= 0 || !dataVencimento || !categoria || !contaOrigemDestino) {
            alert("Por favor, preencha todos os campos obrigatórios (Descrição, Valor, Vencimento, Categoria, Conta).");
            return;
        }

        const novoLancamento = {
            id: lancamentoId || Date.now(),
            tipo,
            descricao,
            valor: parseFloat(valor),
            dataVencimento,
            dataEfetiva: dataEfetiva || null,
            status,
            categoria,
            contaOrigemDestino,
            observacoes,
        };

        if (lancamentoId) {
            // Edição
            atualizarLancamentoFinanceiroMock(lancamentoId, novoLancamento);
            setListaLancamentos([...financeiroMock]);
            alert("Lançamento financeiro atualizado com sucesso!");
        } else {
            // Novo registro
            adicionarLancamentoFinanceiroMock(novoLancamento);
            setListaLancamentos([...financeiroMock]);
            alert("Lançamento financeiro adicionado com sucesso!");
        }
        handleClearForm();
    };

    const handleEditLancamento = (lancamento) => {
        setLancamentoId(lancamento.id);
        setTipo(lancamento.tipo);
        setDescricao(lancamento.descricao);
        setValor(lancamento.valor.toFixed(2));
        setDataVencimento(lancamento.dataVencimento);
        setDataEfetiva(lancamento.dataEfetiva || "");
        setStatus(lancamento.status);
        setCategoria(lancamento.categoria);
        setContaOrigemDestino(lancamento.contaOrigemDestino);
        setObservacoes(lancamento.observacoes || "");
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para edição
    };

    const handleDeleteLancamento = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este lançamento financeiro?")) {
            const removido = removerLancamentoFinanceiroMock(idToDelete);
            if (removido) {
                setListaLancamentos([...financeiroMock]);
                alert("Lançamento financeiro excluído com sucesso!");
                if (lancamentoId === idToDelete) {
                    handleClearForm();
                }
            } else {
                alert("Erro ao excluir lançamento financeiro.");
            }
        }
    };

    // Atualiza o status automaticamente se a data efetiva for preenchida
    useEffect(() => {
        if (dataEfetiva) {
            if (tipo === "Pagar") {
                setStatus("Pago");
            } else if (tipo === "Receber") {
                setStatus("Recebido");
            }
        } else {
            const today = new Date().toISOString().split('T')[0];
            if (dataVencimento && dataVencimento < today && (status === "Pendente" || status === "Atrasado")) {
                setStatus("Atrasado");
            } else if (dataVencimento >= today) {
                if (status !== "Pendente") setStatus("Pendente"); // Se não foi pago/recebido, volta para pendente se a data for futura
            }
        }
    }, [dataEfetiva, dataVencimento, tipo]);


    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>FINANCEIRO</h1>

                {/* --- Seção de Resumo Financeiro --- */}
                <div className={styles.summarySection}>
                    <div className={styles.summaryCard}>
                        <FiArrowDownCircle size={36} className={styles.iconRed} />
                        <h3>A Pagar Pendente</h3>
                        <p className={styles.valueRed}>R$ {totalPagarPendente.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className={styles.summaryCard}>
                        <FiArrowUpCircle size={36} className={styles.iconGreen} />
                        <h3>A Receber Pendente</h3>
                        <p className={styles.valueGreen}>R$ {totalReceberPendente.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className={styles.summaryCard}>
                        <FiDollarSign size={36} className={styles.iconBlue} />
                        <h3>Saldo Teórico</h3>
                        <p className={saldoTeorico >= 0 ? styles.valueGreen : styles.valueRed}>
                            R$ {saldoTeorico.toFixed(2).replace('.', ',')}
                        </p>
                    </div>
                </div>

                {/* --- Seção de Lançamento/Edição de Conta --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>{lancamentoId ? "Editar Lançamento" : "Novo Lançamento Financeiro"}</h2>
                    <form onSubmit={handleSaveLancamento}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tipo">Tipo:</label>
                                <select
                                    id="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="Pagar">Pagar</option>
                                    <option value="Receber">Receber</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="descricao">Descrição:</label>
                                <input
                                    id="descricao"
                                    type="text"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="Ex: Aluguel, Venda, Salário"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="valor">Valor (R$):</label>
                                <input
                                    id="valor"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="dataVencimento">Data de Vencimento/Previsão:</label>
                                <input
                                    id="dataVencimento"
                                    type="date"
                                    value={dataVencimento}
                                    onChange={(e) => setDataVencimento(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="dataEfetiva">Data de Pagamento/Recebimento:</label>
                                <input
                                    id="dataEfetiva"
                                    type="date"
                                    value={dataEfetiva}
                                    onChange={(e) => setDataEfetiva(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="status">Status:</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Pago">Pago</option>
                                    <option value="Recebido">Recebido</option>
                                    <option value="Atrasado">Atrasado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="categoria">Categoria:</label>
                                <select
                                    id="categoria"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categoriasFinanceirasMock.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="contaOrigemDestino">Conta de Origem/Destino:</label>
                                <select
                                    id="contaOrigemDestino"
                                    value={contaOrigemDestino}
                                    onChange={(e) => setContaOrigemDestino(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="">Selecione uma conta</option>
                                    {contasBancariasMock.map((conta, index) => (
                                        <option key={index} value={conta}>
                                            {conta}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputGroupFullWidth}>
                                <label htmlFor="observacoes">Observações:</label>
                                <textarea
                                    id="observacoes"
                                    value={observacoes}
                                    onChange={(e) => setObservacoes(e.target.value)}
                                    className={styles.textareaField}
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.buttonSave}>
                                <FiPlus style={{ marginRight: "8px" }} />
                                {lancamentoId ? "Atualizar Lançamento" : "Adicionar Lançamento"}
                            </button>
                            {lancamentoId && (
                                <button type="button" onClick={handleClearForm} className={styles.buttonClear}>
                                    Cancelar Edição
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- Seção de Listagem e Filtros de Lançamentos --- */}
                <div className={styles.gridSection}>
                    <h2 className={styles.sectionTitle}>Lançamentos Financeiros</h2>

                    <div className={styles.filterBar}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroTipo">Tipo:</label>
                            <select
                                id="filtroTipo"
                                value={filtroTipo}
                                onChange={(e) => setFiltroTipo(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Pagar">Pagar</option>
                                <option value="Receber">Receber</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroStatus">Status:</label>
                            <select
                                id="filtroStatus"
                                value={filtroStatus}
                                onChange={(e) => setFiltroStatus(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Pago">Pago</option>
                                <option value="Recebido">Recebido</option>
                                <option value="Atrasado">Atrasado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroCategoria">Categoria:</label>
                            <select
                                id="filtroCategoria"
                                value={filtroCategoria}
                                onChange={(e) => setFiltroCategoria(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todas">Todas</option>
                                {categoriasFinanceirasMock.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroDataInicio">Data Início (Vencimento):</label>
                            <input
                                id="filtroDataInicio"
                                type="date"
                                value={filtroDataInicio}
                                onChange={(e) => setFiltroDataInicio(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroDataFim">Data Fim (Vencimento):</label>
                            <input
                                id="filtroDataFim"
                                type="date"
                                value={filtroDataFim}
                                onChange={(e) => setFiltroDataFim(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="termoBuscaGrid">Buscar (Descrição/Obs/Conta):</label>
                            <input
                                id="termoBuscaGrid"
                                type="text"
                                value={termoBuscaGrid}
                                onChange={(e) => setTermoBuscaGrid(e.target.value)}
                                className={styles.inputField}
                                placeholder="Buscar..."
                            />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.gridHeader}>
                            <span>Tipo</span>
                            <span>Descrição</span>
                            <span>Valor (R$)</span>
                            <span>Vencimento</span>
                            <span>Efetiva</span>
                            <span>Status</span>
                            <span>Categoria</span>
                            <span>Conta</span>
                            <span>Ações</span>
                        </div>
                        {lancamentosExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>Nenhum lançamento encontrado.</div>
                        ) : (
                            lancamentosExibidos.map((lanc) => (
                                <div className={styles.gridRow} key={lanc.id}>
                                    <span className={`${styles.typeBadge} ${lanc.tipo === 'Pagar' ? styles.typePagar : styles.typeReceber}`}>
                                        {lanc.tipo}
                                    </span>
                                    <span>{lanc.descricao}</span>
                                    <span>{lanc.valor.toFixed(2).replace('.', ',')}</span>
                                    <span>{new Date(lanc.dataVencimento).toLocaleDateString()}</span>
                                    <span>{lanc.dataEfetiva ? new Date(lanc.dataEfetiva).toLocaleDateString() : '-'}</span>
                                    <span className={`${styles.statusBadge} ${styles[lanc.status.toLowerCase()]}`}>
                                        {lanc.status}
                                    </span>
                                    <span>{lanc.categoria}</span>
                                    <span>{lanc.contaOrigemDestino}</span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleEditLancamento(lanc)}
                                            className={styles.actionButton}
                                            title="Editar Lançamento"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLancamento(lanc.id)}
                                            className={styles.actionButtonRed}
                                            title="Excluir Lançamento"
                                        >
                                            <FiTrash />
                                        </button>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}