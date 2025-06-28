// pages/Orcamentos.jsx
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages//Orcamentos.module.css";
import { FiPlus, FiEdit, FiTrash, FiSearch, FiXCircle } from "react-icons/fi";
import {
    produtosMock,
    clientesMock,
    orcamentosMock,
    adicionarOrcamentoMock,
    atualizarOrcamentoMock,
    removerOrcamentoMock,
} from "@/utils/mocks";

export default function Orcamentos() {
    // --- Estados para o Formulário de Registro de Orçamento ---
    const [orcamentoId, setOrcamentoId] = useState(null); // Para edição
    const [numeroOrcamento, setNumeroOrcamento] = useState("");
    const [dataOrcamento, setDataOrcamento] = useState(new Date().toISOString().split('T')[0]);
    const [validade, setValidade] = useState("");
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [statusOrcamento, setStatusOrcamento] = useState("Pendente");
    const [vendedor, setVendedor] = useState("Atendente Padrão"); // Pode ser dinâmico no futuro
    const [observacoes, setObservacoes] = useState("");
    const [itensOrcamento, setItensOrcamento] = useState([]); // Itens para o orçamento atual (novo/edição)

    // --- Estados para Adição de Item ao Orçamento ---
    const [produtoParaAdicionar, setProdutoParaAdicionar] = useState(null);
    const [quantidadeParaAdicionar, setQuantidadeParaAdicionar] = useState("");
    const [descontoParaAdicionar, setDescontoParaAdicionar] = useState("");

    // --- Estados para a Listagem e Filtros ---
    const [listaOrcamentos, setListaOrcamentos] = useState(orcamentosMock); // A lista principal
    const [orcamentosExibidos, setOrcamentosExibidos] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState("Todos");
    const [termoBuscaGrid, setTermoBuscaGrid] = useState(""); // Busca geral no grid

    // --- Estados para Modais de Seleção ---
    const [showModalProduto, setShowModalProduto] = useState(false);
    const [termoBuscaModalProduto, setTermoBuscaModalProduto] = useState("");
    const [produtosFiltradosModal, setProdutosFiltradosModal] = useState([]);

    const [showModalCliente, setShowModalCliente] = useState(false);
    const [termoBuscaModalCliente, setTermoBuscaModalCliente] = useState("");
    const [clientesFiltradosModal, setClientesFiltradosModal] = useState([]);

    // --- Efeitos para Filtragem dos Modais ---
    useEffect(() => {
        const termo = termoBuscaModalProduto.toLowerCase().trim();
        if (termo.length < 3) {
            setProdutosFiltradosModal([]);
            return;
        }
        const filtrados = produtosMock.filter((p) =>
            p.nomeComercial.toLowerCase().includes(termo) ||
            p.nomeGenerico.toLowerCase().includes(termo) ||
            p.codigoBarras.includes(termo) ||
            p.sku.toLowerCase().includes(termo)
        );
        setProdutosFiltradosModal(filtrados);
    }, [termoBuscaModalProduto]);

    useEffect(() => {
        const termo = termoBuscaModalCliente.toLowerCase().trim();
        if (termo.length < 3) {
            setClientesFiltradosModal([]);
            return;
        }
        const filtrados = clientesMock.filter((c) =>
            c.nome.toLowerCase().includes(termo) ||
            c.cpf.includes(termo) ||
            c.telefone.includes(termo)
        );
        setClientesFiltradosModal(filtrados);
    }, [termoBuscaModalCliente]);

    // --- Efeito para Filtragem do Grid Principal de Orçamentos ---
    useEffect(() => {
        let listaFiltrada = [...listaOrcamentos];

        // Filtro por Status
        if (filtroStatus !== "Todos") {
            listaFiltrada = listaFiltrada.filter(orc => orc.status === filtroStatus);
        }

        // Busca por Termo (número do orçamento, nome do produto, cliente, observações)
        const termo = termoBuscaGrid.toLowerCase().trim();
        if (termo) {
            listaFiltrada = listaFiltrada.filter(orc =>
                orc.numero.toLowerCase().includes(termo) ||
                (orc.cliente && orc.cliente.nome.toLowerCase().includes(termo)) ||
                (orc.observacoes && orc.observacoes.toLowerCase().includes(termo)) ||
                orc.itens.some(item => item.produto.nomeComercial.toLowerCase().includes(termo))
            );
        }

        // Ordena por data de orçamento mais recente
        setOrcamentosExibidos(listaFiltrada.sort((a, b) => new Date(b.dataOrcamento) - new Date(a.dataOrcamento)));
    }, [listaOrcamentos, filtroStatus, termoBuscaGrid]);

    // --- Funções de Manipulação do Formulário de Orçamento ---

    const handleClearForm = () => {
        setOrcamentoId(null);
        setNumeroOrcamento("");
        setDataOrcamento(new Date().toISOString().split('T')[0]);
        setValidade("");
        setClienteSelecionado(null);
        setStatusOrcamento("Pendente");
        setObservacoes("");
        setItensOrcamento([]);
        setProdutoParaAdicionar(null);
        setQuantidadeParaAdicionar("");
        setDescontoParaAdicionar("");
        setTermoBuscaModalProduto("");
        setTermoBuscaModalCliente("");
    };

    const handleSelectProduto = (produto) => {
        setProdutoParaAdicionar(produto);
        setShowModalProduto(false);
        setTermoBuscaModalProduto("");
    };

    const handleSelectCliente = (cliente) => {
        setClienteSelecionado(cliente);
        setShowModalCliente(false);
        setTermoBuscaModalCliente("");
    };

    const handleAddItemToOrcamento = () => {
        if (!produtoParaAdicionar || !quantidadeParaAdicionar || parseFloat(quantidadeParaAdicionar) <= 0) {
            alert("Selecione um produto e informe uma quantidade válida para adicionar.");
            return;
        }

        const quantidade = parseInt(quantidadeParaAdicionar);
        const precoUnitario = produtoParaAdicionar.precoVenda;
        const desconto = parseFloat(descontoParaAdicionar) || 0;
        let subtotalItem = (quantidade * precoUnitario) - desconto;
        if (subtotalItem < 0) subtotalItem = 0; // Evita subtotal negativo

        const newItem = {
            id: Date.now(), // ID único para o item dentro do orçamento
            produto: {
                id: produtoParaAdicionar.id,
                nomeComercial: produtoParaAdicionar.nomeComercial,
                precoVenda: produtoParaAdicionar.precoVenda,
            },
            quantidade,
            precoUnitario,
            descontoItem: desconto,
            subtotalItem: parseFloat(subtotalItem.toFixed(2))
        };

        setItensOrcamento((prevItens) => [...prevItens, newItem]);
        setProdutoParaAdicionar(null);
        setQuantidadeParaAdicionar("");
        setDescontoParaAdicionar("");
    };

    const handleRemoveItemFromOrcamento = (itemId) => {
        setItensOrcamento((prevItens) => prevItens.filter((item) => item.id !== itemId));
    };

    const calculateTotals = () => {
        const subtotal = itensOrcamento.reduce((acc, item) => acc + item.subtotalItem, 0);
        // Por enquanto, não implementamos desconto geral, mas pode ser adicionado aqui.
        const total = subtotal; // Considerando que descontoGeral é 0 por enquanto
        return {
            subtotalGeral: parseFloat(subtotal.toFixed(2)),
            descontoGeral: 0, // Implementar se houver desconto geral no futuro
            totalOrcamento: parseFloat(total.toFixed(2))
        };
    };

    const handleSaveOrcamento = (e) => {
        e.preventDefault();

        if (itensOrcamento.length === 0) {
            alert("Um orçamento deve conter ao menos um item.");
            return;
        }
        if (!clienteSelecionado && !observacoes.trim()) {
            alert("Selecione um cliente ou adicione observações ao orçamento.");
            return;
        }

        const totals = calculateTotals();
        const newOrcamento = {
            id: orcamentoId || Date.now(),
            numero: numeroOrcamento || `ORC-${listaOrcamentos.length + 1}-${Date.now().toString().slice(-4)}`, // Geração simples
            dataOrcamento,
            validade,
            cliente: clienteSelecionado ? {
                id: clienteSelecionado.id,
                nome: clienteSelecionado.nome,
                cpf: clienteSelecionado.cpf,
            } : null,
            status: statusOrcamento,
            vendedor,
            observacoes,
            itens: itensOrcamento,
            ...totals
        };

        if (orcamentoId) {
            // Edição
            atualizarOrcamentoMock(orcamentoId, newOrcamento);
            setListaOrcamentos([...orcamentosMock]); // Força a atualização do estado
            alert("Orçamento atualizado com sucesso!");
        } else {
            // Novo registro
            adicionarOrcamentoMock(newOrcamento);
            setListaOrcamentos([...orcamentosMock]); // Força a atualização do estado
            alert("Orçamento adicionado com sucesso!");
        }
        handleClearForm();
    };

    const handleEditOrcamento = (orcamento) => {
        setOrcamentoId(orcamento.id);
        setNumeroOrcamento(orcamento.numero);
        setDataOrcamento(orcamento.dataOrcamento);
        setValidade(orcamento.validade);
        setClienteSelecionado(orcamento.cliente || null);
        setStatusOrcamento(orcamento.status);
        setVendedor(orcamento.vendedor);
        setObservacoes(orcamento.observacoes || "");
        // Cria uma cópia profunda dos itens para evitar mutação direta
        setItensOrcamento(orcamento.itens.map(item => ({ ...item, produto: { ...item.produto } })));

        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para edição
    };

    const handleDeleteOrcamento = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este orçamento?")) {
            const removido = removerOrcamentoMock(idToDelete);
            if (removido) {
                setListaOrcamentos([...orcamentosMock]); // Força a atualização do estado
                alert("Orçamento excluído com sucesso!");
                if (orcamentoId === idToDelete) { // Se o item excluído era o que estava em edição
                    handleClearForm();
                }
            } else {
                alert("Erro ao excluir orçamento.");
            }
        }
    };

    // Calcular totais ao adicionar/remover itens no formulário
    const { subtotalGeral, totalOrcamento } = calculateTotals();


    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>ORÇAMENTOS</h1>

                {/* --- Seção de Registro/Edição de Orçamento --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>{orcamentoId ? "Editar Orçamento" : "Novo Orçamento"}</h2>
                    <form onSubmit={handleSaveOrcamento}>
                        {/* Detalhes do Cabeçalho do Orçamento */}
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="numeroOrcamento">Número Orçamento:</label>
                                <input
                                    id="numeroOrcamento"
                                    type="text"
                                    value={numeroOrcamento}
                                    readOnly={!!orcamentoId} // Apenas leitura em edição
                                    placeholder="Gerado automaticamente"
                                    className={`${styles.inputField} ${orcamentoId ? styles.readOnlyInput : ''}`}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="dataOrcamento">Data do Orçamento:</label>
                                <input
                                    id="dataOrcamento"
                                    type="date"
                                    value={dataOrcamento}
                                    onChange={(e) => setDataOrcamento(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="validade">Validade (até):</label>
                                <input
                                    id="validade"
                                    type="date"
                                    value={validade}
                                    onChange={(e) => setValidade(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cliente">Cliente:</label>
                                <div className={styles.selectItemContainer}>
                                    <input
                                        type="text"
                                        id="cliente"
                                        value={clienteSelecionado ? clienteSelecionado.nome : "Nenhum cliente selecionado"}
                                        readOnly
                                        className={`${styles.inputField} ${styles.readOnlyInput}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowModalCliente(true)}
                                        className={styles.buttonSelect}
                                    >
                                        Selecionar
                                    </button>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="statusOrcamento">Status:</label>
                                <select
                                    id="statusOrcamento"
                                    value={statusOrcamento}
                                    onChange={(e) => setStatusOrcamento(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Aprovado">Aprovado</option>
                                    <option value="Rejeitado">Rejeitado</option>
                                    <option value="Concluído/Vendido">Concluído/Vendido</option>
                                    <option value="Expirado">Expirado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="vendedor">Vendedor:</label>
                                <input
                                    id="vendedor"
                                    type="text"
                                    value={vendedor}
                                    onChange={(e) => setVendedor(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroupFullWidth}>
                            <label htmlFor="observacoes">Observações:</label>
                            <textarea
                                id="observacoes"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                className={styles.textareaField}
                                rows="3"
                            ></textarea>
                        </div>

                        {/* --- Seção de Itens do Orçamento --- */}
                        <div className={styles.itemsSection}>
                            <h3 className={styles.sectionSubtitle}>Itens do Orçamento</h3>
                            <div className={styles.addItemForm}>
                                <div className={styles.inputGroup}>
                                    <label>Produto:</label>
                                    <div className={styles.selectItemContainer}>
                                        <input
                                            type="text"
                                            value={produtoParaAdicionar ? produtoParaAdicionar.nomeComercial : "Selecione um produto"}
                                            readOnly
                                            className={`${styles.inputField} ${styles.readOnlyInput}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowModalProduto(true)}
                                            className={styles.buttonSelect}
                                        >
                                            Selecionar
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="quantidadeAdd">Qtd:</label>
                                    <input
                                        id="quantidadeAdd"
                                        type="number"
                                        min="1"
                                        value={quantidadeParaAdicionar}
                                        onChange={(e) => setQuantidadeParaAdicionar(e.target.value)}
                                        className={styles.inputField}
                                        placeholder="Qtd."
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="precoUnitarioAdd">Preço Un.:</label>
                                    <input
                                        id="precoUnitarioAdd"
                                        type="text"
                                        value={produtoParaAdicionar ? `R$ ${produtoParaAdicionar.precoVenda.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
                                        readOnly
                                        className={`${styles.inputField} ${styles.readOnlyInput}`}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="descontoAdd">Desconto Item:</label>
                                    <input
                                        id="descontoAdd"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={descontoParaAdicionar}
                                        onChange={(e) => setDescontoParaAdicionar(e.target.value)}
                                        className={styles.inputField}
                                        placeholder="R$"
                                    />
                                </div>
                                <button type="button" onClick={handleAddItemToOrcamento} className={styles.buttonAddItem}>
                                    <FiPlus style={{ marginRight: "4px" }} /> Adicionar Item
                                </button>
                            </div>

                            {/* Grid de Itens Atuais do Orçamento */}
                            {itensOrcamento.length > 0 && (
                                <div className={styles.itemsGrid}>
                                    <div className={styles.itemsGridHeader}>
                                        <span>Produto</span>
                                        <span>Qtd</span>
                                        <span>Preço Un.</span>
                                        <span>Desc. Item</span>
                                        <span>Subtotal</span>
                                        <span>Ações</span>
                                    </div>
                                    {itensOrcamento.map((item) => (
                                        <div className={styles.itemsGridRow} key={item.id}>
                                            <span>{item.produto.nomeComercial}</span>
                                            <span>{item.quantidade}</span>
                                            <span>{item.precoUnitario.toFixed(2).replace('.', ',')}</span>
                                            <span>{item.descontoItem.toFixed(2).replace('.', ',')}</span>
                                            <span>{item.subtotalItem.toFixed(2).replace('.', ',')}</span>
                                            <span className={styles.gridActions}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItemFromOrcamento(item.id)}
                                                    className={styles.actionButtonRed}
                                                    title="Remover Item"
                                                >
                                                    <FiTrash />
                                                </button>
                                            </span>
                                        </div>
                                    ))}
                                    <div className={styles.itemsGridFooter}>
                                        <div className={styles.totalizers}>
                                            <span>Subtotal Geral: <strong>R$ {subtotalGeral.toFixed(2).replace('.', ',')}</strong></span>
                                            <span>Total Orçamento: <strong>R$ {totalOrcamento.toFixed(2).replace('.', ',')}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {itensOrcamento.length === 0 && (
                                <div className={styles.noItemsMessage}>Nenhum item adicionado ao orçamento.</div>
                            )}
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.buttonSave}>
                                <FiPlus style={{ marginRight: "8px" }} />
                                {orcamentoId ? "Atualizar Orçamento" : "Criar Orçamento"}
                            </button>
                            {orcamentoId && (
                                <button type="button" onClick={handleClearForm} className={styles.buttonClear}>
                                    Cancelar Edição
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- Seção de Listagem e Filtros de Orçamentos --- */}
                <div className={styles.gridSection}>
                    <h2 className={styles.sectionTitle}>Orçamentos Registrados</h2>

                    <div className={styles.filterBar}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroStatusGrid">Filtrar por Status:</label>
                            <select
                                id="filtroStatusGrid"
                                value={filtroStatus}
                                onChange={(e) => setFiltroStatus(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Rejeitado">Rejeitado</option>
                                <option value="Concluído/Vendido">Concluído/Vendido</option>
                                <option value="Expirado">Expirado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="termoBuscaGrid">Buscar (Número/Cliente/Obs):</label>
                            <input
                                id="termoBuscaGrid"
                                type="text"
                                value={termoBuscaGrid}
                                onChange={(e) => setTermoBuscaGrid(e.target.value)}
                                className={styles.inputField}
                                placeholder="Digite para buscar..."
                            />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.gridHeader}>
                            <span>Número</span>
                            <span>Data</span>
                            <span>Cliente</span>
                            <span>Status</span>
                            <span>Total</span>
                            <span>Ações</span>
                        </div>
                        {orcamentosExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>Nenhum orçamento encontrado.</div>
                        ) : (
                            orcamentosExibidos.map((orcamento) => (
                                <div className={styles.gridRow} key={orcamento.id}>
                                    <span>{orcamento.numero}</span>
                                    <span>{new Date(orcamento.dataOrcamento).toLocaleDateString()}</span>
                                    <span>{orcamento.cliente ? orcamento.cliente.nome : "Cliente Balcão"}</span>
                                    <span className={`${styles.statusBadge} ${styles[orcamento.status.toLowerCase().replace(/ /g, '-')]}`}>
                                        {orcamento.status}
                                    </span>
                                    <span>R$ {orcamento.totalOrcamento.toFixed(2).replace('.', ',')}</span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleEditOrcamento(orcamento)}
                                            className={styles.actionButton}
                                            title="Editar Orçamento"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOrcamento(orcamento.id)}
                                            className={styles.actionButtonRed}
                                            title="Excluir Orçamento"
                                        >
                                            <FiTrash />
                                        </button>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- Modal de Seleção de Produto (Reutilizado) --- */}
                {showModalProduto && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>Selecionar Produto</h2>
                            <div className={styles.modalSearchBar}>
                                <input
                                    type="text"
                                    placeholder="Buscar por nome, código ou SKU..."
                                    value={termoBuscaModalProduto}
                                    onChange={(e) => setTermoBuscaModalProduto(e.target.value)}
                                    className={styles.inputField}
                                />
                                <FiSearch className={styles.searchIcon} />
                            </div>
                            <div className={styles.modalGrid}>
                                <div className={styles.modalGridHeader}>
                                    <span>Nome Comercial</span>
                                    <span>Código de Barras</span>
                                    <span>Estoque</span>
                                    <span>Preço Venda</span>
                                    <span></span>
                                </div>
                                {produtosFiltradosModal.length === 0 ? (
                                    <div className={styles.noItemsMessage}>
                                        {termoBuscaModalProduto.length < 3 ? "Digite no mínimo 3 caracteres para buscar." : "Nenhum produto encontrado."}
                                    </div>
                                ) : (
                                    produtosFiltradosModal.map((produto) => (
                                        <div className={styles.modalGridRow} key={produto.id}>
                                            <span>{produto.nomeComercial}</span>
                                            <span>{produto.codigoBarras}</span>
                                            <span>{produto.estoqueAtual}</span>
                                            <span>R$ {produto.precoVenda.toFixed(2).replace('.', ',')}</span>
                                            <span>
                                                <button
                                                    className={styles.modalActionButton}
                                                    onClick={() => handleSelectProduto(produto)}
                                                >
                                                    Selecionar
                                                </button>
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button className={styles.modalCloseButton} onClick={() => setShowModalProduto(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}

                {/* --- Modal de Seleção de Cliente (Reutilizado) --- */}
                {showModalCliente && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>Selecionar Cliente</h2>
                            <div className={styles.modalSearchBar}>
                                <input
                                    type="text"
                                    placeholder="Buscar por nome, CPF ou telefone..."
                                    value={termoBuscaModalCliente}
                                    onChange={(e) => setTermoBuscaModalCliente(e.target.value)}
                                    className={styles.inputField}
                                />
                                <FiSearch className={styles.searchIcon} />
                            </div>
                            <div className={styles.modalGrid}>
                                <div className={styles.modalGridHeader}>
                                    <span>Nome</span>
                                    <span>CPF</span>
                                    <span>Telefone</span>
                                    <span></span>
                                </div>
                                {clientesFiltradosModal.length === 0 ? (
                                    <div className={styles.noItemsMessage}>
                                        {termoBuscaModalCliente.length < 3 ? "Digite no mínimo 3 caracteres para buscar." : "Nenhum cliente encontrado."}
                                    </div>
                                ) : (
                                    clientesFiltradosModal.map((cliente) => (
                                        <div className={styles.modalGridRow} key={cliente.id}>
                                            <span>{cliente.nome}</span>
                                            <span>{cliente.cpf}</span>
                                            <span>{cliente.telefone}</span>
                                            <span>
                                                <button
                                                    className={styles.modalActionButton}
                                                    onClick={() => handleSelectCliente(cliente)}
                                                >
                                                    Selecionar
                                                </button>
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button className={styles.modalCloseButton} onClick={() => setShowModalCliente(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    );
}