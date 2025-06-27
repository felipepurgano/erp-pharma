// pages/AreaFiscal.jsx
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/pages/AreaFiscal.module.css";
import { FiPlus, FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import {
    documentosFiscaisMock,
    adicionarDocumentoFiscalMock,
    atualizarDocumentoFiscalMock,
    removerDocumentoFiscalMock,
    clientesMock, // Para associar a clientes
    produtosMock, // Para simular itens
} from "@/utils/mocks";

export default function AreaFiscal() {
    // --- Estados para o Formulário de Documento Fiscal ---
    const [documentoId, setDocumentoId] = useState(null);
    const [tipoDocumento, setTipoDocumento] = useState("NFC-e");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [dataEmissao, setDataEmissao] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Objeto do cliente
    const [itensDocumento, setItensDocumento] = useState([]); // [{produto: 'Nome', quantidade: 1, precoUnitario: 10.00}]
    const [icms, setIcms] = useState("");
    const [pis, setPis] = useState("");
    const [cofins, setCofins] = useState("");
    const [status, setStatus] = useState("Emitido");
    const [observacoes, setObservacoes] = useState("");

    // Estado temporário para adicionar itens ao documento
    const [itemProdutoTemp, setItemProdutoTemp] = useState("");
    const [itemQuantidadeTemp, setItemQuantidadeTemp] = useState("");

    // --- Estados para a Listagem e Filtros ---
    const [listaDocumentos, setListaDocumentos] = useState(documentosFiscaisMock);
    const [documentosExibidos, setDocumentosExibidos] = useState([]);
    const [filtroTipoDocumento, setFiltroTipoDocumento] = useState("Todos");
    const [filtroStatus, setFiltroStatus] = useState("Todos");
    const [filtroDataInicio, setFiltroDataInicio] = useState("");
    const [filtroDataFim, setFiltroDataFim] = useState("");
    const [termoBuscaGrid, setTermoBuscaGrid] = useState("");

    // --- Efeito para Filtrar Grid ---
    useEffect(() => {
        let docsFiltrados = [...listaDocumentos];

        // Filtro por Tipo de Documento
        if (filtroTipoDocumento !== "Todos") {
            docsFiltrados = docsFiltrados.filter(
                (doc) => doc.tipoDocumento === filtroTipoDocumento
            );
        }

        // Filtro por Status
        if (filtroStatus !== "Todos") {
            docsFiltrados = docsFiltrados.filter(
                (doc) => doc.status === filtroStatus
            );
        }

        // Filtro por Período de Data de Emissão
        if (filtroDataInicio) {
            docsFiltrados = docsFiltrados.filter(
                (doc) => new Date(doc.dataEmissao) >= new Date(filtroDataInicio)
            );
        }
        if (filtroDataFim) {
            docsFiltrados = docsFiltrados.filter(
                (doc) => new Date(doc.dataEmissao) <= new Date(filtroDataFim)
            );
        }

        // Busca por Termo (Número do documento, cliente, observações, itens)
        const termo = termoBuscaGrid.toLowerCase().trim();
        if (termo) {
            docsFiltrados = docsFiltrados.filter(
                (doc) =>
                    doc.numeroDocumento.toLowerCase().includes(termo) ||
                    doc.cliente?.nome.toLowerCase().includes(termo) ||
                    doc.observacoes?.toLowerCase().includes(termo) ||
                    doc.itens.some(item => item.produto.toLowerCase().includes(termo))
            );
        }

        // Ordena por data de emissão (mais recente primeiro)
        setDocumentosExibidos(docsFiltrados.sort((a, b) => new Date(b.dataEmissao) - new Date(a.dataEmissao)));
    }, [
        listaDocumentos,
        filtroTipoDocumento,
        filtroStatus,
        filtroDataInicio,
        filtroDataFim,
        termoBuscaGrid,
    ]);

    // --- Funções de Manipulação do Formulário ---
    const handleClearForm = () => {
        setDocumentoId(null);
        setTipoDocumento("NFC-e");
        setNumeroDocumento("");
        setDataEmissao("");
        setValorTotal("");
        setClienteSelecionado(null);
        setItensDocumento([]);
        setIcms("");
        setPis("");
        setCofins("");
        setStatus("Emitido");
        setObservacoes("");
        setItemProdutoTemp("");
        setItemQuantidadeTemp("");
    };

    const handleAddItem = () => {
        if (itemProdutoTemp && itemQuantidadeTemp > 0) {
            const produtoExistente = produtosMock.find(p => p.nomeComercial.toLowerCase() === itemProdutoTemp.toLowerCase());
            const preco = produtoExistente ? produtoExistente.precoVenda : 0;
            setItensDocumento([...itensDocumento, {
                produto: itemProdutoTemp,
                quantidade: parseFloat(itemQuantidadeTemp),
                precoUnitario: preco,
                subtotal: preco * parseFloat(itemQuantidadeTemp)
            }]);
            setItemProdutoTemp("");
            setItemQuantidadeTemp("");
        } else {
            alert("Preencha o nome do item e uma quantidade válida.");
        }
    };

    const handleRemoveItem = (index) => {
        const novosItens = [...itensDocumento];
        novosItens.splice(index, 1);
        setItensDocumento(novosItens);
    };

    // Recalcula valorTotal e impostos (simplificado)
    useEffect(() => {
        const totalItens = itensDocumento.reduce((acc, item) => acc + item.subtotal, 0);
        setValorTotal(totalItens.toFixed(2));

        // Cálculo de impostos simplificado (ex: ICMS 18%, PIS 0.65%, COFINS 3%)
        setIcms((totalItens * 0.18).toFixed(2));
        setPis((totalItens * 0.0065).toFixed(2));
        setCofins((totalItens * 0.03).toFixed(2));
    }, [itensDocumento]);

    const handleSaveDocumento = (e) => {
        e.preventDefault();

        // Validações básicas
        if (!tipoDocumento || !numeroDocumento || !dataEmissao || !valorTotal || parseFloat(valorTotal) <= 0 || itensDocumento.length === 0) {
            alert("Por favor, preencha todos os campos obrigatórios: Tipo, Número, Data, Valor Total e adicione ao menos um item.");
            return;
        }

        const novoDocumento = {
            id: documentoId || Date.now(),
            tipoDocumento,
            numeroDocumento,
            dataEmissao,
            valorTotal: parseFloat(valorTotal),
            cliente: clienteSelecionado ? { id: clienteSelecionado.id, nome: clienteSelecionado.nome } : null,
            itens: itensDocumento,
            impostos: {
                icms: parseFloat(icms),
                pis: parseFloat(pis),
                cofins: parseFloat(cofins),
            },
            status,
            observacoes: observacoes || null,
        };

        if (documentoId) {
            atualizarDocumentoFiscalMock(documentoId, novoDocumento);
            alert("Documento Fiscal atualizado com sucesso!");
        } else {
            adicionarDocumentoFiscalMock(novoDocumento);
            alert("Documento Fiscal adicionado com sucesso!");
        }
        setListaDocumentos([...documentosFiscaisMock]); // Atualiza o estado local
        handleClearForm();
    };

    const handleEditDocumento = (doc) => {
        setDocumentoId(doc.id);
        setTipoDocumento(doc.tipoDocumento);
        setNumeroDocumento(doc.numeroDocumento);
        setDataEmissao(doc.dataEmissao);
        setValorTotal(doc.valorTotal.toFixed(2));
        setClienteSelecionado(doc.cliente ? clientesMock.find(c => c.id === doc.cliente.id) : null);
        setItensDocumento(doc.itens || []);
        setIcms(doc.impostos?.icms?.toFixed(2) || "");
        setPis(doc.impostos?.pis?.toFixed(2) || "");
        setCofins(doc.impostos?.cofins?.toFixed(2) || "");
        setStatus(doc.status);
        setObservacoes(doc.observacoes || "");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteDocumento = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este documento fiscal?")) {
            const removido = removerDocumentoFiscalMock(idToDelete);
            if (removido) {
                setListaDocumentos([...documentosFiscaisMock]);
                alert("Documento Fiscal excluído com sucesso!");
                if (documentoId === idToDelete) {
                    handleClearForm();
                }
            } else {
                alert("Erro ao excluir documento fiscal.");
            }
        }
    };

    // Função para buscar e selecionar cliente para o formulário
    const handleSelectCliente = (id) => {
        const cli = clientesMock.find(c => c.id === parseInt(id));
        setClienteSelecionado(cli);
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>Área Fiscal</h1>

                {/* --- Seção de Lançamento/Edição de Documento Fiscal --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>{documentoId ? "Editar Documento Fiscal" : "Novo Documento Fiscal"}</h2>
                    <form onSubmit={handleSaveDocumento}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                                <select
                                    id="tipoDocumento"
                                    value={tipoDocumento}
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="NFC-e">NFC-e (Consumidor)</option>
                                    <option value="NF-e">NF-e (Produto)</option>
                                    <option value="Cupom Fiscal">Cupom Fiscal (Simplificado)</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="numeroDocumento">Número do Documento:</label>
                                <input
                                    id="numeroDocumento"
                                    type="text"
                                    value={numeroDocumento}
                                    onChange={(e) => setNumeroDocumento(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="Ex: 123456789"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="dataEmissao">Data de Emissão:</label>
                                <input
                                    id="dataEmissao"
                                    type="date"
                                    value={dataEmissao}
                                    onChange={(e) => setDataEmissao(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cliente">Cliente (Opcional):</label>
                                <select
                                    id="cliente"
                                    value={clienteSelecionado?.id || ""}
                                    onChange={(e) => handleSelectCliente(e.target.value)}
                                    className={styles.inputField}
                                >
                                    <option value="">Selecione um cliente</option>
                                    {clientesMock.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.nome} ({c.cpf})
                                        </option>
                                    ))}
                                </select>
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
                                    <option value="Emitido">Emitido</option>
                                    <option value="Cancelado">Cancelado</option>
                                    <option value="Em Digitação">Em Digitação</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="valorTotal">Valor Total (R$):</label>
                                <input
                                    id="valorTotal"
                                    type="number"
                                    step="0.01"
                                    value={valorTotal}
                                    className={styles.inputField}
                                    readOnly // Valor calculado pelos itens
                                    placeholder="Calculado automaticamente"
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroupFullWidth}>
                                <label>Itens do Documento:</label>
                                <div className={styles.itemAddContainer}>
                                    <input
                                        type="text"
                                        placeholder="Nome do Item/Produto"
                                        value={itemProdutoTemp}
                                        onChange={(e) => setItemProdutoTemp(e.target.value)}
                                        className={styles.inputField}
                                    />
                                    <input
                                        type="number"
                                        step="1"
                                        min="1"
                                        placeholder="Qtd."
                                        value={itemQuantidadeTemp}
                                        onChange={(e) => setItemQuantidadeTemp(e.target.value)}
                                        className={`${styles.inputField} ${styles.itemQuantityField}`}
                                    />
                                    <button type="button" onClick={handleAddItem} className={styles.buttonAddItem}>
                                        Adicionar Item
                                    </button>
                                </div>
                                <ul className={styles.itemList}>
                                    {itensDocumento.length === 0 ? (
                                        <li>Nenhum item adicionado.</li>
                                    ) : (
                                        itensDocumento.map((item, index) => (
                                            <li key={index} className={styles.itemListItem}>
                                                {item.produto} (Qtd: {item.quantidade}) - R$ {item.subtotal.toFixed(2)}
                                                <button type="button" onClick={() => handleRemoveItem(index)} className={styles.removeItemButton}>
                                                    X
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className={styles.sectionTitleSmall}>Impostos (Calculado - Simplificado)</div>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="icms">ICMS (R$):</label>
                                <input
                                    id="icms"
                                    type="number"
                                    step="0.01"
                                    value={icms}
                                    className={styles.inputField}
                                    readOnly
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="pis">PIS (R$):</label>
                                <input
                                    id="pis"
                                    type="number"
                                    step="0.01"
                                    value={pis}
                                    className={styles.inputField}
                                    readOnly
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cofins">COFINS (R$):</label>
                                <input
                                    id="cofins"
                                    type="number"
                                    step="0.01"
                                    value={cofins}
                                    className={styles.inputField}
                                    readOnly
                                />
                            </div>
                        </div>

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
                                {documentoId ? "Atualizar Documento" : "Emitir Documento"}
                            </button>
                            {documentoId && (
                                <button type="button" onClick={handleClearForm} className={styles.buttonClear}>
                                    Cancelar Edição
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* --- Seção de Listagem e Filtros de Documentos Fiscais --- */}
                <div className={styles.gridSection}>
                    <h2 className={styles.sectionTitle}>Documentos Fiscais Registrados</h2>

                    <div className={styles.filterBar}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="filtroTipoDocumento">Tipo:</label>
                            <select
                                id="filtroTipoDocumento"
                                value={filtroTipoDocumento}
                                onChange={(e) => setFiltroTipoDocumento(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="Todos">Todos</option>
                                <option value="NFC-e">NFC-e</option>
                                <option value="NF-e">NF-e</option>
                                <option value="Cupom Fiscal">Cupom Fiscal</option>
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
                                <option value="Emitido">Emitido</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Em Digitação">Em Digitação</option>
                            </select>
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
                            <label htmlFor="termoBuscaGrid">Buscar (Número/Cliente/Obs.):</label>
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
                            <span>Número</span>
                            <span>Data</span>
                            <span>Cliente</span>
                            <span>Valor Total</span>
                            <span>ICMS</span>
                            <span>PIS</span>
                            <span>COFINS</span>
                            <span>Status</span>
                            <span>Ações</span>
                        </div>
                        {documentosExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>Nenhum documento fiscal encontrado.</div>
                        ) : (
                            documentosExibidos.map((doc) => (
                                <div className={styles.gridRow} key={doc.id}>
                                    <span>{doc.tipoDocumento}</span>
                                    <span>{doc.numeroDocumento}</span>
                                    <span>{new Date(doc.dataEmissao).toLocaleDateString()}</span>
                                    <span>{doc.cliente?.nome || 'Consumidor Final'}</span>
                                    <span>R$ {doc.valorTotal.toFixed(2)}</span>
                                    <span>R$ {doc.impostos?.icms?.toFixed(2) || '0.00'}</span>
                                    <span>R$ {doc.impostos?.pis?.toFixed(2) || '0.00'}</span>
                                    <span>R$ {doc.impostos?.cofins?.toFixed(2) || '0.00'}</span>
                                    <span className={`${styles.badge} ${styles[doc.status.toLowerCase().replace(/[^a-z0-9]/g, '')]}`}>
                                        {doc.status}
                                    </span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleEditDocumento(doc)}
                                            className={styles.actionButton}
                                            title="Editar Documento"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDocumento(doc.id)}
                                            className={styles.actionButtonRed}
                                            title="Excluir Documento"
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