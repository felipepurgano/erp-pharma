// pages/SNGPC.jsx
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/SNGPC.module.css";
import { FiPlus, FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import {
    sngpcLancamentosMock,
    adicionarSNGPCLancamentoMock,
    atualizarSNGPCLancamentoMock,
    removerSNGPCLancamentoMock,
    produtosMock, // Para buscar produtos controlados
    clientesMock, // Para buscar pacientes
    fornecedoresMock, // Para buscar fornecedores
} from "@/utils/mocks";

export default function SNGPC() {
    // --- Estados para o Formulário de Lançamento ---
    const [lancamentoId, setLancamentoId] = useState(null);
    const [tipoOperacao, setTipoOperacao] = useState("Entrada"); // Entrada, Saída, Perda, Vencimento
    const [dataOperacao, setDataOperacao] = useState("");
    const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Objeto do produto
    const [lote, setLote] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null); // Objeto do fornecedor
    const [numeroNotaFiscal, setNumeroNotaFiscal] = useState("");
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null); // Objeto do cliente/paciente
    const [medico, setMedico] = useState("");
    const [crmMedico, setCrmMedico] = useState("");
    const [numeroReceita, setNumeroReceita] = useState("");
    const [observacoes, setObservacoes] = useState("");

    // --- Estados para a Listagem e Filtros ---
    const [listaLancamentos, setListaLancamentos] = useState(sngpcLancamentosMock);
    const [lancamentosExibidos, setLancamentosExibidos] = useState([]);
    const [filtroTipoOperacao, setFiltroTipoOperacao] = useState("Todos");
    const [filtroProdutoNome, setFiltroProdutoNome] = useState("");
    const [filtroDataInicio, setFiltroDataInicio] = useState("");
    const [filtroDataFim, setFiltroDataFim] = useState("");
    const [termoBuscaGrid, setTermoBuscaGrid] = useState("");

    // Produtos, Clientes, Fornecedores filtrados para os selects/autocompletes
    const produtosControlados = produtosMock.filter(p => p.controlado);
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtosControlados);
    const [clientesFiltrados, setClientesFiltrados] = useState(clientesMock);
    const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState(fornecedoresMock);

    // --- Efeito para Filtrar Grid ---
    useEffect(() => {
        let lancamentosFiltrados = [...listaLancamentos];

        // Filtro por Tipo de Operação
        if (filtroTipoOperacao !== "Todos") {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => lanc.tipoOperacao === filtroTipoOperacao
            );
        }

        // Filtro por Nome do Produto
        const produtoNomeFiltro = filtroProdutoNome.toLowerCase().trim();
        if (produtoNomeFiltro) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => lanc.produto.nomeComercial.toLowerCase().includes(produtoNomeFiltro)
            );
        }

        // Filtro por Período de Data de Operação
        if (filtroDataInicio) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => new Date(lanc.dataOperacao) >= new Date(filtroDataInicio)
            );
        }
        if (filtroDataFim) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) => new Date(lanc.dataOperacao) <= new Date(filtroDataFim)
            );
        }

        // Busca por Termo (descrição, observações, lote, NF)
        const termo = termoBuscaGrid.toLowerCase().trim();
        if (termo) {
            lancamentosFiltrados = lancamentosFiltrados.filter(
                (lanc) =>
                    lanc.observacoes?.toLowerCase().includes(termo) ||
                    lanc.lote?.toLowerCase().includes(termo) ||
                    lanc.numeroNotaFiscal?.toLowerCase().includes(termo) ||
                    lanc.paciente?.nome.toLowerCase().includes(termo) ||
                    lanc.medico?.toLowerCase().includes(termo)
            );
        }

        // Ordena por data de operação (mais recente primeiro)
        setLancamentosExibidos(lancamentosFiltrados.sort((a, b) => new Date(b.dataOperacao) - new Date(a.dataOperacao)));
    }, [
        listaLancamentos,
        filtroTipoOperacao,
        filtroProdutoNome,
        filtroDataInicio,
        filtroDataFim,
        termoBuscaGrid,
    ]);

    // --- Funções de Manipulação do Formulário ---
    const handleClearForm = () => {
        setLancamentoId(null);
        setTipoOperacao("Entrada");
        setDataOperacao("");
        setProdutoSelecionado(null);
        setLote("");
        setQuantidade("");
        setFornecedorSelecionado(null);
        setNumeroNotaFiscal("");
        setPacienteSelecionado(null);
        setMedico("");
        setCrmMedico("");
        setNumeroReceita("");
        setObservacoes("");
    };

    const handleSaveLancamento = (e) => {
        e.preventDefault();

        // Validações básicas
        if (!tipoOperacao || !dataOperacao || !produtoSelecionado || !lote || !quantidade || parseFloat(quantidade) <= 0) {
            alert("Por favor, preencha todos os campos obrigatórios: Tipo, Data, Produto, Lote, Quantidade.");
            return;
        }

        if (tipoOperacao === "Entrada" && !fornecedorSelecionado) {
            alert("Para Entrada, o Fornecedor é obrigatório.");
            return;
        }

        if (tipoOperacao === "Saída" && (!pacienteSelecionado || !medico || !crmMedico || !numeroReceita)) {
            alert("Para Saída (Venda), o Paciente, Médico, CRM e Número da Receita são obrigatórios.");
            return;
        }

        const novoLancamento = {
            id: lancamentoId || Date.now(),
            tipoOperacao,
            dataOperacao,
            produto: {
                id: produtoSelecionado.id,
                nomeComercial: produtoSelecionado.nomeComercial,
                concentracao: produtoSelecionado.concentracao,
                tipoReceita: produtoSelecionado.tipoReceita,
            },
            lote,
            quantidade: parseFloat(quantidade),
            fornecedor: fornecedorSelecionado ? { id: fornecedorSelecionado.id, nomeFantasia: fornecedorSelecionado.nomeFantasia } : null,
            numeroNotaFiscal: numeroNotaFiscal || null,
            paciente: pacienteSelecionado ? { id: pacienteSelecionado.id, nome: pacienteSelecionado.nome, cpf: pacienteSelecionado.cpf } : null,
            medico: medico || null,
            crmMedico: crmMedico || null,
            numeroReceita: numeroReceita || null,
            observacoes: observacoes || null,
        };

        if (lancamentoId) {
            atualizarSNGPCLancamentoMock(lancamentoId, novoLancamento);
            alert("Lançamento SNGPC atualizado com sucesso!");
        } else {
            adicionarSNGPCLancamentoMock(novoLancamento);
            alert("Lançamento SNGPC adicionado com sucesso!");
        }
        setListaLancamentos([...sngpcLancamentosMock]); // Atualiza o estado local com os dados atualizados
        handleClearForm();
    };

    const handleEditLancamento = (lancamento) => {
        setLancamentoId(lancamento.id);
        setTipoOperacao(lancamento.tipoOperacao);
        setDataOperacao(lancamento.dataOperacao);
        setProdutoSelecionado(produtosControlados.find(p => p.id === lancamento.produto.id));
        setLote(lancamento.lote);
        setQuantidade(lancamento.quantidade.toString());
        setFornecedorSelecionado(lancamento.fornecedor ? fornecedoresMock.find(f => f.id === lancamento.fornecedor.id) : null);
        setNumeroNotaFiscal(lancamento.numeroNotaFiscal || "");
        setPacienteSelecionado(lancamento.paciente ? clientesMock.find(c => c.id === lancamento.paciente.id) : null);
        setMedico(lancamento.medico || "");
        setCrmMedico(lancamento.crmMedico || "");
        setNumeroReceita(lancamento.numeroReceita || "");
        setObservacoes(lancamento.observacoes || "");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteLancamento = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este lançamento SNGPC? (Isso afetará o estoque mockado)")) {
            const removido = removerSNGPCLancamentoMock(idToDelete);
            if (removido) {
                setListaLancamentos([...sngpcLancamentosMock]);
                alert("Lançamento SNGPC excluído com sucesso!");
                if (lancamentoId === idToDelete) {
                    handleClearForm();
                }
            } else {
                alert("Erro ao excluir lançamento SNGPC.");
            }
        }
    };

    // Funções para autocompletes
    const handleSearchProduto = (e) => {
        const termo = e.target.value.toLowerCase();
        const filtered = produtosControlados.filter(p =>
            p.nomeComercial.toLowerCase().includes(termo) ||
            p.sku.toLowerCase().includes(termo) ||
            p.codigoBarras.includes(termo)
        );
        setProdutosFiltrados(filtered);
        // Se o termo estiver vazio, limpa o produto selecionado
        if (!termo) setProdutoSelecionado(null);
    };

    const handleSelectProduto = (id) => {
        const prod = produtosControlados.find(p => p.id === parseInt(id));
        setProdutoSelecionado(prod);
        // Define o valor do input de busca para o nome do produto selecionado
        setFiltroProdutoNome(prod ? prod.nomeComercial : "");
    };

    const handleSearchCliente = (e) => {
        const termo = e.target.value.toLowerCase();
        const filtered = clientesMock.filter(c =>
            c.nome.toLowerCase().includes(termo) ||
            c.cpf.includes(termo)
        );
        setClientesFiltrados(filtered);
        if (!termo) setPacienteSelecionado(null);
    };

    const handleSelectCliente = (id) => {
        const cli = clientesMock.find(c => c.id === parseInt(id));
        setPacienteSelecionado(cli);
    };

    const handleSearchFornecedor = (e) => {
        const termo = e.target.value.toLowerCase();
        const filtered = fornecedoresMock.filter(f =>
            f.nomeFantasia.toLowerCase().includes(termo) ||
            f.cnpj.includes(termo)
        );
        setFornecedoresFiltrados(filtered);
        if (!termo) setFornecedorSelecionado(null);
    };

    const handleSelectFornecedor = (id) => {
        const forn = fornecedoresMock.find(f => f.id === parseInt(id));
        setFornecedorSelecionado(forn);
    };


    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>Gerenciamento SNGPC</h1>

                {/* --- Seção de Lançamento/Edição de SNGPC --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>{lancamentoId ? "Editar Lançamento SNGPC" : "Novo Lançamento SNGPC"}</h2>
                    <form onSubmit={handleSaveLancamento}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tipoOperacao">Tipo de Operação:</label>
                                <select
                                    id="tipoOperacao"
                                    value={tipoOperacao}
                                    onChange={(e) => setTipoOperacao(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="Entrada">Entrada (Compra/Devolução)</option>
                                    <option value="Saída">Saída (Venda)</option>
                                    <option value="Perda">Perda (Extravio/Quebra)</option>
                                    <option value="Vencimento">Vencimento/Inutilização</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="dataOperacao">Data da Operação:</label>
                                <input
                                    id="dataOperacao"
                                    type="date"
                                    value={dataOperacao}
                                    onChange={(e) => setDataOperacao(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="produto">Produto Controlado:</label>
                                <select
                                    id="produto"
                                    value={produtoSelecionado?.id || ""}
                                    onChange={(e) => handleSelectProduto(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="">Selecione um produto</option>
                                    {produtosControlados.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.nomeComercial} {p.concentracao ? `(${p.concentracao})` : ''} - {p.tipoReceita || 'N/A'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="lote">Lote:</label>
                                <input
                                    id="lote"
                                    type="text"
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="Ex: ABC12345"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="quantidade">Quantidade:</label>
                                <input
                                    id="quantidade"
                                    type="number"
                                    step="1"
                                    min="1"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            {(tipoOperacao === "Entrada" || tipoOperacao === "Saída") && (
                                <div className={styles.inputGroup}>
                                    <label htmlFor="numeroNotaFiscal">Nº da Nota Fiscal:</label>
                                    <input
                                        id="numeroNotaFiscal"
                                        type="text"
                                        value={numeroNotaFiscal}
                                        onChange={(e) => setNumeroNotaFiscal(e.target.value)}
                                        className={styles.inputField}
                                        placeholder="Ex: 000.123.456"
                                    />
                                </div>
                            )}
                        </div>

                        {tipoOperacao === "Entrada" && (
                            <div className={styles.formRow}>
                                <div className={styles.inputGroupFullWidth}>
                                    <label htmlFor="fornecedor">Fornecedor:</label>
                                    <select
                                        id="fornecedor"
                                        value={fornecedorSelecionado?.id || ""}
                                        onChange={(e) => handleSelectFornecedor(e.target.value)}
                                        className={styles.inputField}
                                        required={tipoOperacao === "Entrada"}
                                    >
                                        <option value="">Selecione um fornecedor</option>
                                        {fornecedoresMock.map(f => (
                                            <option key={f.id} value={f.id}>
                                                {f.nomeFantasia} ({f.cnpj})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {tipoOperacao === "Saída" && (
                            <>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="paciente">Paciente (Cliente):</label>
                                        <select
                                            id="paciente"
                                            value={pacienteSelecionado?.id || ""}
                                            onChange={(e) => handleSelectCliente(e.target.value)}
                                            className={styles.inputField}
                                            required={tipoOperacao === "Saída"}
                                        >
                                            <option value="">Selecione um paciente</option>
                                            {clientesMock.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.nome} ({c.cpf})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="medico">Médico:</label>
                                        <input
                                            id="medico"
                                            type="text"
                                            value={medico}
                                            onChange={(e) => setMedico(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Nome do Médico"
                                            required={tipoOperacao === "Saída"}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="crmMedico">CRM do Médico:</label>
                                        <input
                                            id="crmMedico"
                                            type="text"
                                            value={crmMedico}
                                            onChange={(e) => setCrmMedico(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Ex: CRM/SP 123456"
                                            required={tipoOperacao === "Saída"}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="numeroReceita">Nº da Receita:</label>
                                        <input
                                            id="numeroReceita"
                                            type="text"
                                            value={numeroReceita}
                                            onChange={(e) => setNumeroReceita(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Ex: REC000123"
                                            required={tipoOperacao === "Saída"}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className={styles.formRow}>
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

                {/* --- Seção de Listagem e Filtros de Lançamentos SNGPC --- */}
                <div className={styles.gridSection}>
                    <h2 className={styles.sectionTitle}>Lançamentos SNGPC Registrados</h2>

                    <div className={styles.filterBar}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroTipoOperacao">Tipo de Operação:</label>
                            <select
                                id="filtroTipoOperacao"
                                value={filtroTipoOperacao}
                                onChange={(e) => setFiltroTipoOperacao(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todos">Todos</option>
                                <option value="Entrada">Entrada</option>
                                <option value="Saída">Saída</option>
                                <option value="Perda">Perda</option>
                                <option value="Vencimento">Vencimento</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroProdutoNome">Produto:</label>
                            <input
                                id="filtroProdutoNome"
                                type="text"
                                value={filtroProdutoNome}
                                onChange={(e) => setFiltroProdutoNome(e.target.value)}
                                className={styles.inputField}
                                placeholder="Nome do produto"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroDataInicio">Data Início:</label>
                            <input
                                id="filtroDataInicio"
                                type="date"
                                value={filtroDataInicio}
                                onChange={(e) => setFiltroDataInicio(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroDataFim">Data Fim:</label>
                            <input
                                id="filtroDataFim"
                                type="date"
                                value={filtroDataFim}
                                onChange={(e) => setFiltroDataFim(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="termoBuscaGrid">Buscar (Lote/NF/Paciente/Médico/Obs):</label>
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
                            <span>Tipo Op.</span>
                            <span>Data</span>
                            <span>Produto</span>
                            <span>Lote</span>
                            <span>Qtd.</span>
                            <span>NF/Receita</span>
                            <span>Origem/Destino</span>
                            <span>Ações</span>
                        </div>
                        {lancamentosExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>Nenhum lançamento SNGPC encontrado.</div>
                        ) : (
                            lancamentosExibidos.map((lanc) => (
                                <div className={styles.gridRow} key={lanc.id}>
                                    <span className={`${styles.badge} ${styles[lanc.tipoOperacao.toLowerCase().replace(/[^a-z0-9]/g, '')]}`}>
                                        {lanc.tipoOperacao}
                                    </span>
                                    <span>{new Date(lanc.dataOperacao).toLocaleDateString()}</span>
                                    <span>{lanc.produto.nomeComercial} ({lanc.produto.concentracao}) - {lanc.produto.tipoReceita || 'N/A'}</span>
                                    <span>{lanc.lote}</span>
                                    <span>{lanc.quantidade}</span>
                                    <span>{lanc.numeroNotaFiscal || lanc.numeroReceita || '-'}</span>
                                    <span>
                                        {lanc.fornecedor?.nomeFantasia || lanc.paciente?.nome || lanc.tipoOperacao}
                                    </span>
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