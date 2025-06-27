// pages/Compras.js
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/pages/Compras.module.css"; // Vamos criar este CSS
import { FiPlus, FiTrash, FiEdit, FiSearch } from "react-icons/fi";
import { produtosMock, fornecedoresMock, atualizarEstoqueMock, adicionarCompraMock } from "@/utils/mocks";

export default function Compras() {
    // --- Estados para os dados da Compra (Cabeçalho) ---
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
    const [numNotaFiscal, setNumNotaFiscal] = useState("");
    const [dataCompra, setDataCompra] = useState(new Date().toISOString().split('T')[0]); // Data atual padrão
    const [dataEmissao, setDataEmissao] = useState("");
    const [observacoesCompra, setObservacoesCompra] = useState("");
    const [descontoGeral, setDescontoGeral] = useState(""); // Desconto em %
    const [frete, setFrete] = useState("");
    const [outrasDespesas, setOutrasDespesas] = useState("");

    // --- Estados para Adição de Itens ---
    const [termoBuscaProduto, setTermoBuscaProduto] = useState("");
    const [produtosEncontrados, setProdutosEncontrados] = useState([]);
    const [produtoSelecionadoParaAdd, setProdutoSelecionadoParaAdd] = useState(null);
    const [quantidadeItem, setQuantidadeItem] = useState("");
    const [valorUnitarioCompra, setValorUnitarioCompra] = useState("");
    const [loteItem, setLoteItem] = useState("");
    const [validadeItem, setValidadeItem] = useState("");
    const [markupItem, setMarkupItem] = useState(""); // Markup percentual
    const [descontoItem, setDescontoItem] = useState(""); // Desconto em % por item

    // --- Estado para os Itens da Compra (Grid) ---
    const [itensCompra, setItensCompra] = useState([]);

    // --- Estados para Modais ---
    const [showModalFornecedor, setShowModalFornecedor] = useState(false);
    const [termoBuscaFornecedor, setTermoBuscaFornecedor] = useState("");
    const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState([]);

    // --- Efeito para filtrar fornecedores no modal ---
    useEffect(() => {
        const termo = termoBuscaFornecedor.toLowerCase().trim();
        if (termo.length < 3) {
            setFornecedoresFiltrados([]);
            return;
        }
        const filtrados = fornecedoresMock.filter((fornecedor) =>
            fornecedor.nomeFantasia.toLowerCase().includes(termo) ||
            fornecedor.cnpj.includes(termo)
        );
        setFornecedoresFiltrados(filtrados);
    }, [termoBuscaFornecedor]);

    // --- Efeito para filtrar produtos na busca de itens ---
    useEffect(() => {
        const termo = termoBuscaProduto.toLowerCase().trim();
        if (termo.length < 3) {
            setProdutosEncontrados([]);
            setProdutoSelecionadoParaAdd(null);
            return;
        }
        const filtrados = produtosMock.filter((produto) =>
            produto.nomeComercial.toLowerCase().includes(termo) ||
            produto.nomeGenerico.toLowerCase().includes(termo) ||
            produto.codigoBarras.includes(termo) ||
            produto.sku.toLowerCase().includes(termo)
        );
        setProdutosEncontrados(filtrados);
        if (filtrados.length === 1) {
            setProdutoSelecionadoParaAdd(filtrados[0]);
        } else {
            setProdutoSelecionadoParaAdd(null);
        }
    }, [termoBuscaProduto]);

    // --- Funções de Manipulação ---

    const handleSelectFornecedor = (fornecedor) => {
        setFornecedorSelecionado(fornecedor);
        setShowModalFornecedor(false);
        setTermoBuscaFornecedor("");
    };

    const handleAddItem = () => {
        if (!produtoSelecionadoParaAdd || !quantidadeItem || parseFloat(quantidadeItem) <= 0 || !valorUnitarioCompra || parseFloat(valorUnitarioCompra) <= 0) {
            alert("Selecione um produto, informe a quantidade e o valor unitário de compra.");
            return;
        }
        if (!loteItem || !validadeItem) {
            alert("Por favor, informe o lote e a validade do produto.");
            return;
        }

        const qtd = parseInt(quantidadeItem);
        const valorUnit = parseFloat(valorUnitarioCompra);
        const desc = parseFloat(descontoItem || 0);

        const valorTotalItem = (valorUnit * qtd) * (1 - (desc / 100));

        const itemExistenteIndex = itensCompra.findIndex(item =>
            item.id === produtoSelecionadoParaAdd.id &&
            item.lote === loteItem &&
            item.validade === validadeItem
        );

        if (itemExistenteIndex > -1) {
            // Se o mesmo produto com MESMO LOTE e VALIDADE já existe, atualiza a quantidade
            const novosItens = [...itensCompra];
            const itemAtualizado = { ...novosItens[itemExistenteIndex] };
            itemAtualizado.quantidade += qtd;
            itemAtualizado.valorTotal += valorTotalItem; // Soma o valor total
            novosItens[itemExistenteIndex] = itemAtualizado;
            setItensCompra(novosItens);
        } else {
            setItensCompra([
                ...itensCompra,
                {
                    id: produtoSelecionadoParaAdd.id,
                    codigo: produtoSelecionadoParaAdd.codigoBarras,
                    nome: produtoSelecionadoParaAdd.nomeComercial,
                    quantidade: qtd,
                    valorUnitario: valorUnit,
                    desconto: desc,
                    lote: loteItem,
                    validade: validadeItem,
                    markup: parseFloat(markupItem || 0),
                    valorTotal: valorTotalItem,
                    // Propriedades do produto para referência (não alteráveis no grid de itens)
                    nomeGenerico: produtoSelecionadoParaAdd.nomeGenerico,
                    laboratorio: produtoSelecionadoParaAdd.laboratorio,
                    precoVendaAtual: produtoSelecionadoParaAdd.precoVenda // Preço de venda atual do produto
                },
            ]);
        }

        // Limpar campos de adição de item
        setTermoBuscaProduto("");
        setProdutoSelecionadoParaAdd(null);
        setQuantidadeItem("");
        setValorUnitarioCompra("");
        setLoteItem("");
        setValidadeItem("");
        setMarkupItem("");
        setDescontoItem("");
    };

    const handleRemoveItem = (index) => {
        const novaLista = [...itensCompra];
        novaLista.splice(index, 1);
        setItensCompra(novaLista);
    };

    const handleUpdateItem = (index, field, value) => {
        const novosItens = [...itensCompra];
        const item = { ...novosItens[index] }; // Cria uma cópia do item

        if (field === "quantidade" || field === "valorUnitario" || field === "desconto") {
            item[field] = parseFloat(value) || 0;
            if (field === "quantidade" && parseInt(value) < 1) item[field] = 1;
            if (field === "desconto" && parseFloat(value) < 0) item[field] = 0;
            if (field === "desconto" && parseFloat(value) > 100) item[field] = 100;


            // Recalcular valor total do item
            const qtd = item.quantidade;
            const valorUnit = item.valorUnitario;
            const desc = item.desconto;
            item.valorTotal = (valorUnit * qtd) * (1 - (desc / 100));
        } else {
            item[field] = value;
        }

        novosItens[index] = item;
        setItensCompra(novosItens);
    };


    const calcularTotalCompra = () => {
        let totalItens = itensCompra.reduce((acc, item) => acc + item.valorTotal, 0);

        const descGeral = parseFloat(descontoGeral || 0);
        if (descGeral > 0) {
            totalItens = totalItens * (1 - (descGeral / 100));
        }

        const freteVal = parseFloat(frete || 0);
        const outrasDespesasVal = parseFloat(outrasDespesas || 0);

        return totalItens + freteVal + outrasDespesasVal;
    };

    const totalFinalCompra = calcularTotalCompra();

    const handleFinalizarCompra = () => {
        if (!fornecedorSelecionado) {
            alert("Por favor, selecione o fornecedor.");
            return;
        }
        if (!numNotaFiscal.trim()) {
            alert("Por favor, informe o número da Nota Fiscal.");
            return;
        }
        if (itensCompra.length === 0) {
            alert("Adicione pelo menos um item à compra.");
            return;
        }

        // 1. Atualizar estoque (mock)
        atualizarEstoqueMock(itensCompra);

        // 2. Criar objeto de compra para histórico
        const novaCompra = {
            id: Date.now(), // ID único para a compra
            fornecedor: fornecedorSelecionado,
            numNotaFiscal,
            dataCompra,
            dataEmissao: dataEmissao || null,
            observacoes: observacoesCompra || null,
            descontoGeral: parseFloat(descontoGeral || 0),
            frete: parseFloat(frete || 0),
            outrasDespesas: parseFloat(outrasDespesas || 0),
            valorTotal: totalFinalCompra,
            itens: itensCompra.map(item => ({
                id: item.id,
                nome: item.nome,
                codigo: item.codigo,
                quantidade: item.quantidade,
                valorUnitario: item.valorUnitario,
                desconto: item.desconto,
                lote: item.lote,
                validade: item.validade,
                markup: item.markup,
                valorTotalItem: item.valorTotal,
                // Aqui você pode adicionar lógica para sugerir um novo precoVenda com base no markup
                // Ou atualizar o precoVenda no mock de produtos, se desejar.
            })),
            dataRegistro: new Date().toISOString(), // Data em que a compra foi registrada no sistema
        };

        // 3. Adicionar compra ao histórico (mock)
        adicionarCompraMock(novaCompra);

        alert("Compra registrada com sucesso! Estoque atualizado.");
        handleClearForm();
    };

    const handleClearForm = () => {
        setFornecedorSelecionado(null);
        setNumNotaFiscal("");
        setDataCompra(new Date().toISOString().split('T')[0]);
        setDataEmissao("");
        setObservacoesCompra("");
        setDescontoGeral("");
        setFrete("");
        setOutrasDespesas("");
        setTermoBuscaProduto("");
        setProdutosEncontrados([]);
        setProdutoSelecionadoParaAdd(null);
        setQuantidadeItem("");
        setValorUnitarioCompra("");
        setLoteItem("");
        setValidadeItem("");
        setMarkupItem("");
        setDescontoItem("");
        setItensCompra([]);
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>REGISTRO DE COMPRAS</h1>

                {/* --- Seção de Dados da Compra (Cabeçalho) --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Dados da Compra</h2>
                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="fornecedor">Fornecedor:</label>
                            <div className={styles.selectFornecedorContainer}>
                                <input
                                    type="text"
                                    id="fornecedor"
                                    value={fornecedorSelecionado ? fornecedorSelecionado.nomeFantasia : "Nenhum fornecedor selecionado"}
                                    readOnly
                                    className={`${styles.inputField} ${styles.readOnlyInput}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowModalFornecedor(true)}
                                    className={styles.buttonSelect}
                                >
                                    Selecionar
                                </button>
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="numNotaFiscal">Nº Nota Fiscal:</label>
                            <input
                                id="numNotaFiscal"
                                type="text"
                                value={numNotaFiscal}
                                onChange={(e) => setNumNotaFiscal(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="dataCompra">Data da Compra:</label>
                            <input
                                id="dataCompra"
                                type="date"
                                value={dataCompra}
                                onChange={(e) => setDataCompra(e.target.value)}
                                className={styles.inputField}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="dataEmissao">Data Emissão NF:</label>
                            <input
                                id="dataEmissao"
                                type="date"
                                value={dataEmissao}
                                onChange={(e) => setDataEmissao(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                         <div className={styles.inputGroup}>
                            <label htmlFor="descontoGeral">Desconto Geral (%):</label>
                            <input
                                id="descontoGeral"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={descontoGeral}
                                onChange={(e) => setDescontoGeral(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="frete">Frete (R$):</label>
                            <input
                                id="frete"
                                type="number"
                                min="0"
                                step="0.01"
                                value={frete}
                                onChange={(e) => setFrete(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="outrasDespesas">Outras Despesas (R$):</label>
                            <input
                                id="outrasDespesas"
                                type="number"
                                min="0"
                                step="0.01"
                                value={outrasDespesas}
                                onChange={(e) => setOutrasDespesas(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroupFullWidth}>
                        <label htmlFor="observacoesCompra">Observações:</label>
                        <textarea
                            id="observacoesCompra"
                            value={observacoesCompra}
                            onChange={(e) => setObservacoesCompra(e.target.value)}
                            className={styles.textareaField}
                            rows="2"
                        ></textarea>
                    </div>
                </div>

                {/* --- Seção de Adicionar Itens --- */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Adicionar Itens</h2>
                    <div className={styles.formRow}>
                        <div className={styles.inputGroupFullWidth}>
                            <label htmlFor="termoBuscaProduto">Buscar Produto (Nome, Código, SKU):</label>
                            <input
                                id="termoBuscaProduto"
                                type="text"
                                value={termoBuscaProduto}
                                onChange={(e) => setTermoBuscaProduto(e.target.value)}
                                className={styles.inputField}
                                placeholder="Digite no mínimo 3 caracteres para buscar..."
                            />
                        </div>
                    </div>
                    {termoBuscaProduto.length >= 3 && produtosEncontrados.length > 0 && (
                        <div className={styles.produtosEncontradosList}>
                            {produtosEncontrados.map((produto) => (
                                <div
                                    key={produto.id}
                                    className={`${styles.produtoListItem} ${produto.id === produtoSelecionadoParaAdd?.id ? styles.selected : ''}`}
                                    onClick={() => setProdutoSelecionadoParaAdd(produto)}
                                >
                                    {produto.nomeComercial} ({produto.codigoBarras}) - Estoque: {produto.estoqueAtual}
                                </div>
                            ))}
                        </div>
                    )}
                     {termoBuscaProduto.length >=3 && produtosEncontrados.length === 0 && (
                        <div className={styles.noItemsMessage}>Nenhum produto encontrado.</div>
                    )}

                    {produtoSelecionadoParaAdd && (
                        <div className={styles.selectedProductDetails}>
                            <h3>Produto Selecionado: {produtoSelecionadoParaAdd.nomeComercial}</h3>
                            <p><strong>SKU:</strong> {produtoSelecionadoParaAdd.sku}</p>
                            <p><strong>Laboratório:</strong> {produtoSelecionadoParaAdd.laboratorio}</p>
                            <p><strong>Preço Venda Atual:</strong> R$ {produtoSelecionadoParaAdd.precoVenda.toFixed(2)}</p>
                        </div>
                    )}

                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="quantidadeItem">Quantidade:</label>
                            <input
                                id="quantidadeItem"
                                type="number"
                                min="1"
                                value={quantidadeItem}
                                onChange={(e) => setQuantidadeItem(e.target.value)}
                                className={styles.inputField}
                                disabled={!produtoSelecionadoParaAdd}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="valorUnitarioCompra">Valor Unit. Compra (R$):</label>
                            <input
                                id="valorUnitarioCompra"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={valorUnitarioCompra}
                                onChange={(e) => setValorUnitarioCompra(e.target.value)}
                                className={styles.inputField}
                                disabled={!produtoSelecionadoParaAdd}
                            />
                        </div>
                         <div className={styles.inputGroup}>
                            <label htmlFor="descontoItem">Desconto Item (%):</label>
                            <input
                                id="descontoItem"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={descontoItem}
                                onChange={(e) => setDescontoItem(e.target.value)}
                                className={styles.inputField}
                                disabled={!produtoSelecionadoParaAdd}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="loteItem">Lote:</label>
                            <input
                                id="loteItem"
                                type="text"
                                value={loteItem}
                                onChange={(e) => setLoteItem(e.target.value)}
                                className={styles.inputField}
                                disabled={!produtoSelecionadoParaAdd}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="validadeItem">Validade:</label>
                            <input
                                id="validadeItem"
                                type="date"
                                value={validadeItem}
                                onChange={(e) => setValidadeItem(e.target.value)}
                                className={styles.inputField}
                                disabled={!produtoSelecionadoParaAdd}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="markupItem">Markup Sugerido (%):</label>
                            <input
                                id="markupItem"
                                type="number"
                                min="0"
                                step="0.01"
                                value={markupItem}
                                onChange={(e) => setMarkupItem(e.target.value)}
                                className={styles.inputField}
                                disabled={!produtoSelecionadoParaAdd}
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            onClick={handleAddItem}
                            className={styles.buttonAddItem}
                            disabled={!produtoSelecionadoParaAdd || !quantidadeItem || !valorUnitarioCompra || !loteItem || !validadeItem}
                        >
                            <FiPlus style={{ marginRight: "8px" }} />
                            Adicionar Item
                        </button>
                    </div>
                </div>

                {/* --- Grid de Itens da Compra --- */}
                <div className={styles.gridSection}>
                    <h2 className={styles.sectionTitle}>Itens da Compra</h2>
                    <div className={styles.grid}>
                        <div className={styles.gridHeader}>
                            <span>Produto</span>
                            <span>Qtd.</span>
                            <span>Valor Unit. Compra</span>
                            <span>Desc. (%)</span>
                            <span>Lote</span>
                            <span>Validade</span>
                            <span>Valor Total Item</span>
                            <span>Ações</span>
                        </div>
                        {itensCompra.length === 0 ? (
                            <div className={styles.noItemsMessage}>Nenhum item adicionado à compra.</div>
                        ) : (
                            itensCompra.map((item, index) => (
                                <div className={styles.gridRow} key={index}>
                                    <span>{item.nome} ({item.codigo})</span>
                                    <span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantidade}
                                            onChange={(e) => handleUpdateItem(index, 'quantidade', e.target.value)}
                                            className={styles.gridInputSmall}
                                        />
                                    </span>
                                    <span>
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            value={item.valorUnitario}
                                            onChange={(e) => handleUpdateItem(index, 'valorUnitario', e.target.value)}
                                            className={styles.gridInputSmall}
                                        />
                                    </span>
                                    <span>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            value={item.desconto}
                                            onChange={(e) => handleUpdateItem(index, 'desconto', e.target.value)}
                                            className={styles.gridInputSmall}
                                        />
                                    </span>
                                    <span>{item.lote}</span>
                                    <span>{item.validade}</span>
                                    <span>R$ {item.valorTotal.toFixed(2)}</span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleRemoveItem(index)}
                                            className={styles.actionButtonRed}
                                            title="Remover item"
                                        >
                                            <FiTrash />
                                        </button>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- Rodapé com Total e Ações Finais --- */}
                <div className={styles.footerSection}>
                    <div className={styles.totalDisplay}>
                        Valor Total da Compra: <strong>R$ {totalFinalCompra.toFixed(2)}</strong>
                    </div>
                    <div className={styles.finalActions}>
                        <button
                            onClick={handleClearForm}
                            className={styles.buttonClearForm}
                            disabled={itensCompra.length === 0 && !fornecedorSelecionado && !numNotaFiscal}
                        >
                            Limpar Formulário
                        </button>
                        <button
                            onClick={handleFinalizarCompra}
                            className={styles.buttonFinalizeCompra}
                            disabled={itensCompra.length === 0 || !fornecedorSelecionado || !numNotaFiscal.trim()}
                        >
                            <FiPlus style={{ marginRight: "8px" }} />
                            Registrar Compra
                        </button>
                    </div>
                </div>

                {/* --- Modal de Seleção de Fornecedor --- */}
                {showModalFornecedor && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>Selecionar Fornecedor</h2>
                            <div className={styles.modalSearchBar}>
                                <input
                                    type="text"
                                    placeholder="Buscar por nome ou CNPJ..."
                                    value={termoBuscaFornecedor}
                                    onChange={(e) => setTermoBuscaFornecedor(e.target.value)}
                                    className={styles.inputField}
                                />
                                <FiSearch className={styles.searchIcon} />
                            </div>

                            <div className={styles.modalGrid}>
                                <div className={styles.modalGridHeader}>
                                    <span>Nome Fantasia</span>
                                    <span>CNPJ</span>
                                    <span>Telefone</span>
                                    <span></span>
                                </div>
                                {fornecedoresFiltrados.length === 0 ? (
                                    <div className={styles.noItemsMessage}>
                                        {termoBuscaFornecedor.length < 3 ? "Digite no mínimo 3 caracteres para buscar." : "Nenhum fornecedor encontrado."}
                                    </div>
                                ) : (
                                    fornecedoresFiltrados.map((fornecedor) => (
                                        <div className={styles.modalGridRow} key={fornecedor.id}>
                                            <span>{fornecedor.nomeFantasia}</span>
                                            <span>{fornecedor.cnpj}</span>
                                            <span>{fornecedor.telefone}</span>
                                            <span>
                                                <button
                                                    className={styles.modalActionButton}
                                                    onClick={() => handleSelectFornecedor(fornecedor)}
                                                >
                                                    Selecionar
                                                </button>
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <button className={styles.modalCloseButton} onClick={() => setShowModalFornecedor(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    );
}