// pages/FaltasEncomendas.js
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/pages/FaltasEncomendas.module.css"; // Vamos criar este CSS
import { FiPlus, FiEdit, FiTrash, FiSearch, FiCheckSquare, FiXSquare } from "react-icons/fi";
import { produtosMock, clientesMock, faltasEncomendasMock, adicionarFaltaEncomendaMock, atualizarFaltaEncomendaMock, removerFaltaEncomendaMock } from "@/utils/mocks";

export default function FaltasEncomendas() {
    // --- Estados para o Formulário de Registro ---
    const [registroId, setRegistroId] = useState(null); // Para edição
    const [tipoRegistro, setTipoRegistro] = useState("Falta"); // "Falta" ou "Encomenda"
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState("");
    const [dataSolicitacao, setDataSolicitacao] = useState(new Date().toISOString().split('T')[0]);
    const [observacoes, setObservacoes] = useState("");

    // Estados específicos para Encomenda
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [previsaoChegada, setPrevisaoChegada] = useState("");
    const [statusEncomenda, setStatusEncomenda] = useState("Pendente");
    const [vendedor, setVendedor] = useState("");

    // --- Estados para a Listagem e Filtros ---
    const [listaRegistros, setListaRegistros] = useState(faltasEncomendasMock); // A lista principal
    const [registrosExibidos, setRegistrosExibidos] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("Todos"); // "Todos", "Falta", "Encomenda"
    const [filtroStatus, setFiltroStatus] = useState("Todos"); // Para encomendas
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

    // --- Efeito para Filtragem do Grid Principal ---
    useEffect(() => {
        let listaFiltrada = [...listaRegistros]; // Começa com a lista principal (mutável)

        // Filtro por Tipo
        if (filtroTipo !== "Todos") {
            listaFiltrada = listaFiltrada.filter(reg => reg.tipo === filtroTipo);
        }

        // Filtro por Status (apenas para Encomendas)
        if (filtroStatus !== "Todos" && filtroTipo !== "Falta") { // Aplica status apenas se não for "Falta"
            listaFiltrada = listaFiltrada.filter(reg => reg.status === filtroStatus);
        }


        // Busca por Termo (nome do produto, cliente, observações, etc.)
        const termo = termoBuscaGrid.toLowerCase().trim();
        if (termo) {
            listaFiltrada = listaFiltrada.filter(reg =>
                reg.produto.nomeComercial.toLowerCase().includes(termo) ||
                (reg.cliente && reg.cliente.nome.toLowerCase().includes(termo)) ||
                (reg.observacoes && reg.observacoes.toLowerCase().includes(termo)) ||
                reg.tipo.toLowerCase().includes(termo)
            );
        }

        setRegistrosExibidos(listaFiltrada.sort((a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao)));
    }, [listaRegistros, filtroTipo, filtroStatus, termoBuscaGrid]);

    // --- Funções de Manipulação ---

    const handleClearForm = () => {
        setRegistroId(null);
        setTipoRegistro("Falta");
        setProdutoSelecionado(null);
        setQuantidade("");
        setDataSolicitacao(new Date().toISOString().split('T')[0]);
        setObservacoes("");
        setClienteSelecionado(null);
        setPrevisaoChegada("");
        setStatusEncomenda("Pendente");
        setVendedor("");
        setTermoBuscaModalProduto(""); // Limpa busca do modal de produto
        setTermoBuscaModalCliente(""); // Limpa busca do modal de cliente
    };

    const handleSelectProduto = (produto) => {
        setProdutoSelecionado(produto);
        setShowModalProduto(false);
        setTermoBuscaModalProduto("");
    };

    const handleSelectCliente = (cliente) => {
        setClienteSelecionado(cliente);
        setShowModalCliente(false);
        setTermoBuscaModalCliente("");
    };

    const handleSaveRegistro = (e) => {
        e.preventDefault();

        if (!produtoSelecionado || !quantidade || parseFloat(quantidade) <= 0) {
            alert("Por favor, selecione um produto e informe a quantidade.");
            return;
        }

        let novoRegistro;
        if (tipoRegistro === "Encomenda") {
            if (!clienteSelecionado && !observacoes.trim()) {
                alert("Para encomendas, selecione um cliente ou adicione observações.");
                return;
            }
            novoRegistro = {
                id: registroId || Date.now(),
                tipo: "Encomenda",
                produto: {
                    id: produtoSelecionado.id,
                    nomeComercial: produtoSelecionado.nomeComercial,
                    codigoBarras: produtoSelecionado.codigoBarras
                },
                quantidade: parseInt(quantidade),
                dataSolicitacao,
                cliente: clienteSelecionado ? {
                    id: clienteSelecionado.id,
                    nome: clienteSelecionado.nome,
                    telefone: clienteSelecionado.telefone
                } : null,
                previsaoChegada: previsaoChegada || null,
                status: statusEncomenda,
                vendedor: vendedor || null,
                observacoes: observacoes || null,
            };
        } else { // Tipo "Falta"
            novoRegistro = {
                id: registroId || Date.now(),
                tipo: "Falta",
                produto: {
                    id: produtoSelecionado.id,
                    nomeComercial: produtoSelecionado.nomeComercial,
                    codigoBarras: produtoSelecionado.codigoBarras
                },
                quantidade: parseInt(quantidade),
                dataSolicitacao,
                observacoes: observacoes || null,
                status: "Pendente", // Faltas iniciam como Pendente
            };
        }

        if (registroId) {
            // Edição
            atualizarFaltaEncomendaMock(registroId, novoRegistro);
            setListaRegistros([...faltasEncomendasMock]); // Força a atualização do estado
            alert("Registro atualizado com sucesso!");
        } else {
            // Novo registro
            adicionarFaltaEncomendaMock(novoRegistro);
            setListaRegistros([...faltasEncomendasMock]); // Força a atualização do estado
            alert("Registro adicionado com sucesso!");
        }
        handleClearForm();
    };

    const handleEditRegistro = (registro) => {
        setRegistroId(registro.id);
        setTipoRegistro(registro.tipo);
        setProdutoSelecionado(registro.produto);
        setQuantidade(registro.quantidade);
        setDataSolicitacao(registro.dataSolicitacao);
        setObservacoes(registro.observacoes || "");

        if (registro.tipo === "Encomenda") {
            setClienteSelecionado(registro.cliente || null);
            setPrevisaoChegada(registro.previsaoChegada || "");
            setStatusEncomenda(registro.status || "Pendente");
            setVendedor(registro.vendedor || "");
        } else {
            // Limpa estados de encomenda se mudar para Falta
            setClienteSelecionado(null);
            setPrevisaoChegada("");
            setStatusEncomenda("Pendente");
            setVendedor("");
        }
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para edição
    };

    const handleDeleteRegistro = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este registro?")) {
            const removido = removerFaltaEncomendaMock(idToDelete);
            if (removido) {
                setListaRegistros([...faltasEncomendasMock]); // Força a atualização do estado
                alert("Registro excluído com sucesso!");
                if (registroId === idToDelete) { // Se o item excluído era o que estava em edição
                    handleClearForm();
                }
            } else {
                alert("Erro ao excluir registro.");
            }
        }
    };

    const handleUpdateStatus = (registro, novoStatus) => {
        if (confirm(`Alterar status de "${registro.produto.nomeComercial}" para "${novoStatus}"?`)) {
            atualizarFaltaEncomendaMock(registro.id, { status: novoStatus });
            setListaRegistros([...faltasEncomendasMock]); // Força a atualização do estado
            alert("Status atualizado!");
        }
    };


    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>FALTAS E ENCOMENDAS</h1>

                {/* --- Seção de Registro/Edição --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>{registroId ? "Editar Registro" : "Novo Registro"}</h2>
                    <form onSubmit={handleSaveRegistro}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tipoRegistro">Tipo:</label>
                                <select
                                    id="tipoRegistro"
                                    value={tipoRegistro}
                                    onChange={(e) => {
                                        setTipoRegistro(e.target.value);
                                        // Limpa campos específicos ao mudar o tipo
                                        setClienteSelecionado(null);
                                        setPrevisaoChegada("");
                                        setStatusEncomenda("Pendente");
                                        setVendedor("");
                                    }}
                                    className={styles.inputField}
                                >
                                    <option value="Falta">Falta</option>
                                    <option value="Encomenda">Encomenda</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="produto">Produto:</label>
                                <div className={styles.selectItemContainer}>
                                    <input
                                        type="text"
                                        id="produto"
                                        value={produtoSelecionado ? produtoSelecionado.nomeComercial : "Nenhum produto selecionado"}
                                        readOnly
                                        className={`${styles.inputField} ${styles.readOnlyInput}`}
                                        required
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
                                <label htmlFor="quantidade">Quantidade:</label>
                                <input
                                    id="quantidade"
                                    type="number"
                                    min="1"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="dataSolicitacao">Data da Solicitação:</label>
                                <input
                                    id="dataSolicitacao"
                                    type="date"
                                    value={dataSolicitacao}
                                    onChange={(e) => setDataSolicitacao(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                        </div>

                        {tipoRegistro === "Encomenda" && (
                            <>
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
                                        <label htmlFor="telefoneCliente">Telefone Cliente:</label>
                                        <input
                                            id="telefoneCliente"
                                            type="text"
                                            value={clienteSelecionado ? clienteSelecionado.telefone : ""}
                                            readOnly
                                            className={`${styles.inputField} ${styles.readOnlyInput}`}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="previsaoChegada">Previsão de Chegada:</label>
                                        <input
                                            id="previsaoChegada"
                                            type="date"
                                            value={previsaoChegada}
                                            onChange={(e) => setPrevisaoChegada(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="statusEncomenda">Status da Encomenda:</label>
                                        <select
                                            id="statusEncomenda"
                                            value={statusEncomenda}
                                            onChange={(e) => setStatusEncomenda(e.target.value)}
                                            className={styles.inputField}
                                        >
                                            <option value="Pendente">Pendente</option>
                                            <option value="Em Pedido">Em Pedido</option>
                                            <option value="Recebido">Recebido</option>
                                            <option value="Entregue/Retirado">Entregue/Retirado</option>
                                            <option value="Cancelado">Cancelado</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="vendedor">Vendedor/Atendente:</label>
                                        <input
                                            id="vendedor"
                                            type="text"
                                            value={vendedor}
                                            onChange={(e) => setVendedor(e.target.value)}
                                            className={styles.inputField}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}></div> {/* Espaçador */}
                                </div>
                            </>
                        )}

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

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.buttonSave}>
                                <FiPlus style={{ marginRight: "8px" }} />
                                {registroId ? "Atualizar Registro" : "Registrar"}
                            </button>
                            {registroId && (
                                <button type="button" onClick={handleClearForm} className={styles.buttonClear}>
                                    Cancelar Edição
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- Seção de Listagem e Filtros --- */}
                <div className={styles.gridSection}>
                    <h2 className={styles.sectionTitle}>Registros de Faltas e Encomendas</h2>

                    <div className={styles.filterBar}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroTipo">Filtrar por Tipo:</label>
                            <select
                                id="filtroTipo"
                                value={filtroTipo}
                                onChange={(e) => setFiltroTipo(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Falta">Faltas</option>
                                <option value="Encomenda">Encomendas</option>
                            </select>
                        </div>
                        {filtroTipo !== "Falta" && (
                            <div className={styles.inputGroup}>
                                <label htmlFor="filtroStatus">Filtrar por Status:</label>
                                <select
                                    id="filtroStatus"
                                    value={filtroStatus}
                                    onChange={(e) => setFiltroStatus(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="Todos">Todos</option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em Pedido">Em Pedido</option>
                                    <option value="Recebido">Recebido</option>
                                    <option value="Entregue/Retirado">Entregue/Retirado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </div>
                        )}
                        <div className={styles.inputGroup}>
                            <label htmlFor="termoBuscaGrid">Buscar (Produto/Cliente/Obs):</label>
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
                            <span>Tipo</span>
                            <span>Produto</span>
                            <span>Cliente</span>
                            <span>Qtd.</span>
                            <span>Data Solicitação</span>
                            <span>Status</span>
                            <span>Previsão</span>
                            <span>Ações</span>
                        </div>
                        {registrosExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>Nenhum registro encontrado.</div>
                        ) : (
                            registrosExibidos.map((registro) => (
                                <div className={styles.gridRow} key={registro.id}>
                                    <span>{registro.tipo}</span>
                                    <span>{registro.produto.nomeComercial}</span>
                                    <span>{registro.cliente ? registro.cliente.nome : "-"}</span>
                                    <span>{registro.quantidade}</span>
                                    <span>{new Date(registro.dataSolicitacao).toLocaleDateString()}</span>
                                    <span className={styles.statusCell}>
                                        {registro.status}
                                        {registro.tipo === "Falta" && registro.status === "Pendente" && (
                                            <button
                                                className={styles.actionButtonGreen}
                                                onClick={() => handleUpdateStatus(registro, "Resolvida")}
                                                title="Marcar como Resolvida"
                                            >
                                                <FiCheckSquare />
                                            </button>
                                        )}
                                        {registro.tipo === "Falta" && registro.status === "Resolvida" && (
                                            <button
                                                className={styles.actionButtonYellow}
                                                onClick={() => handleUpdateStatus(registro, "Pendente")}
                                                title="Marcar como Pendente"
                                            >
                                                <FiXSquare />
                                            </button>
                                        )}
                                    </span>
                                    <span>{registro.previsaoChegada ? new Date(registro.previsaoChegada).toLocaleDateString() : "-"}</span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleEditRegistro(registro)}
                                            className={styles.actionButton}
                                            title="Editar"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRegistro(registro.id)}
                                            className={styles.actionButtonRed}
                                            title="Excluir"
                                        >
                                            <FiTrash />
                                        </button>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- Modal de Seleção de Produto --- */}
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

                {/* --- Modal de Seleção de Cliente --- */}
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