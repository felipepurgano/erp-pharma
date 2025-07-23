import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Vendas.module.css";
import { FiTrash, FiShoppingCart, FiUsers } from "react-icons/fi";
import { produtosMock, clientesMock } from "@/utils/mocks";

export default function Vendas() {
    const [codigo, setCodigo] = useState("");
    const [buscaNome, setBuscaNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [desconto, setDesconto] = useState("");
    const [itens, setItens] = useState([]);
    const [operacao, setOperacao] = useState("cupom");
    const [numeroCupom, setNumeroCupom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [clienteBuscaNome, setClienteBuscaNome] = useState("");
    const [clienteBuscaCpf, setClienteBuscaCpf] = useState("");
    const [produtoSelecionadoParaAdd, setProdutoSelecionadoParaAdd] = useState(null);

    // Modal de Clientes
    const [showModal, setShowModal] = useState(false);
    // Alterado: Inicia como array vazio, não com todos os clientes
    const [clientesFiltrados, setClientesFiltrados] = useState([]);

    const abrirModalClientes = () => setShowModal(true);
    const fecharModalClientes = () => {
        setShowModal(false);
        setClienteBuscaNome("");
        setClienteBuscaCpf("");
        // Ao fechar, também limpamos os clientes filtrados para que, ao abrir novamente, esteja vazio
        setClientesFiltrados([]);
    };

    const selecionarCliente = (cliente) => {
        setClienteSelecionado(cliente);
        fecharModalClientes();
    };

    // Efeito para filtrar clientes no modal
    useEffect(() => {
        const termoNome = clienteBuscaNome.toLowerCase().trim();
        const termoCpf = clienteBuscaCpf.trim();

        // Se nenhum dos termos de busca tiver pelo menos 3 caracteres, não filtra e retorna um array vazio.
        if (termoNome.length < 3 && termoCpf.length < 3) {
            setClientesFiltrados([]); // Define como vazio para não mostrar todos
            return;
        }

        const filtrados = clientesMock.filter((cliente) => {
            const nomeMatch = termoNome === "" || cliente.nome.toLowerCase().includes(termoNome);
            const cpfMatch = termoCpf === "" || cliente.cpf.includes(termoCpf);
            return nomeMatch && cpfMatch;
        });
        setClientesFiltrados(filtrados);
    }, [clienteBuscaNome, clienteBuscaCpf]);


    // Filtro de produtos para exibição na busca
    const produtosFiltradosDisplay = produtosMock.filter((p) => {
        const termoBuscaNome = buscaNome.toLowerCase().trim();
        const termoCodigo = codigo.trim();

        const nomeMatch = termoBuscaNome === "" ||
            p.nomeComercial.toLowerCase().includes(termoBuscaNome) ||
            p.nomeGenerico.toLowerCase().includes(termoBuscaNome);

        const codigoMatch = termoCodigo === "" ||
            p.codigoBarras.includes(termoCodigo) ||
            p.sku.toLowerCase().includes(termoCodigo);

        if (termoBuscaNome === "" && termoCodigo === "") {
            return false;
        }

        return nomeMatch && codigoMatch;
    });

    const adicionarProdutoSelecionado = (produtoParaAdicionar) => {
        const produtoOriginal = produtosMock.find(p => p.id === produtoParaAdicionar.id);

        if (!produtoOriginal) {
            alert("Produto não encontrado.");
            return;
        }
        if (!quantidade || parseInt(quantidade) <= 0) {
            alert("Por favor, insira uma quantidade válida.");
            return;
        }
        if (parseInt(quantidade) > produtoOriginal.estoqueAtual) {
            alert(`Estoque insuficiente para ${produtoOriginal.nomeComercial}. Disponível: ${produtoOriginal.estoqueAtual}`);
            return;
        }

        const qtd = parseInt(quantidade);
        const desc = parseFloat(desconto || 0);
        const valorFinal = calcularValorFinal(produtoOriginal.precoVenda, qtd, desc);

        const itemExistenteIndex = itens.findIndex(item => item.id === produtoOriginal.id);

        if (itemExistenteIndex > -1) {
            const novosItens = [...itens];
            const itemAtualizado = { ...novosItens[itemExistenteIndex] };
            const novaQtdTotal = itemAtualizado.quantidade + qtd;

            if (novaQtdTotal > produtoOriginal.estoqueAtual) {
                alert(`Estoque insuficiente para ${produtoOriginal.nomeComercial} ao adicionar mais. Disponível: ${produtoOriginal.estoqueAtual}`);
                return;
            }

            itemAtualizado.quantidade = novaQtdTotal;
            itemAtualizado.valorFinal = calcularValorFinal(itemAtualizado.preco, itemAtualizado.quantidade, itemAtualizado.desconto);
            novosItens[itemExistenteIndex] = itemAtualizado;
            setItens(novosItens);
        } else {
            setItens([
                ...itens,
                {
                    id: produtoOriginal.id,
                    codigo: produtoOriginal.codigoBarras,
                    nome: produtoOriginal.nomeComercial,
                    laboratorio: produtoOriginal.laboratorio,
                    classe: produtoOriginal.categoria,
                    principio: produtoOriginal.nomeGenerico,
                    desconto: desc,
                    quantidade: qtd,
                    preco: produtoOriginal.precoVenda,
                    valorFinal,
                    estoqueAtual: produtoOriginal.estoqueAtual
                },
            ]);
        }

        setCodigo("");
        setBuscaNome("");
        setQuantidade("");
        setDesconto("");
        setProdutoSelecionadoParaAdd(null);
    };


    const calcularValorFinal = (preco, qtd, desc) => {
        const descontoDecimal = (desc || 0) / 100;
        return preco * qtd * (1 - descontoDecimal);
    };

    const removerItem = (index) => {
        const novaLista = [...itens];
        novaLista.splice(index, 1);
        setItens(novaLista);
    };

    const alterarQuantidade = (index, novaQtdStr) => {
        const novaQtd = parseInt(novaQtdStr);
        if (isNaN(novaQtd) || novaQtd < 1) return;

        const novaLista = [...itens];
        const item = novaLista[index];
        const produtoOriginal = produtosMock.find(p => p.id === item.id);

        if (produtoOriginal && novaQtd > produtoOriginal.estoqueAtual) {
            alert(`Estoque insuficiente para ${item.nome}. Disponível: ${produtoOriginal.estoqueAtual}`);
            item.quantidade = parseInt(item.quantidade);
            return;
        }

        item.quantidade = novaQtd;
        item.valorFinal = calcularValorFinal(item.preco, item.quantidade, item.desconto);
        setItens(novaLista);
    };

    const valorTotal = itens.reduce((acc, item) => acc + item.valorFinal, 0);

    const finalizarVenda = async () => {
        if (itens.length === 0) {
            alert("Adicione pelo menos um item antes de finalizar a venda.");
            return;
        }

        setLoading(true);
        try {
            const numeroCupomGerado = Math.floor(Math.random() * 1000000) + 1;

            const novosProdutosMock = produtosMock.map(prod => {
                const itemVendido = itens.find(item => item.id === prod.id);
                if (itemVendido) {
                    return { ...prod, estoqueAtual: prod.estoqueAtual - itemVendido.quantidade };
                }
                return prod;
            });

            setNumeroCupom(numeroCupomGerado);
            setItens([]);
            setClienteSelecionado(null);
            alert(`Venda finalizada! Número do cupom: ${numeroCupomGerado}`);
        } catch (error) {
            console.error("Erro ao finalizar venda:", error);
            alert("Erro ao finalizar venda.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (buscaNome.trim() === "" && codigo.trim() === "") {
            setQuantidade("");
            setDesconto("");
            setProdutoSelecionadoParaAdd(null);
        }
    }, [buscaNome, codigo]);


    return (
        <Sidebar>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Tela de Vendas</h1>
                    {clienteSelecionado && (
                        <div className={styles.clienteSelecionado}>
                            Cliente selecionado: <strong>{clienteSelecionado.nome}</strong> ({clienteSelecionado.cpf})
                        </div>
                    )}
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <select
                            value={operacao}
                            onChange={(e) => setOperacao(e.target.value)}
                            className={styles.operacaoSelect}
                        >
                            <option value="orcamento">Orçamento</option>
                            <option value="cupom">Cupom de Venda</option>
                            <option value="nfce">NFC-e</option>
                        </select>

                        <button className={styles.button} onClick={abrirModalClientes}>
                            <FiUsers style={{ marginRight: "6px" }} />
                            Clientes
                        </button>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <input
                        type="text"
                        placeholder="Código de barras ou SKU"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        placeholder="Buscar por nome do produto"
                        value={buscaNome}
                        onChange={(e) => setBuscaNome(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="number"
                        placeholder="Qtd."
                        min="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="number"
                        placeholder="Desconto (%)"
                        value={desconto}
                        onChange={(e) => setDesconto(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                {/* Exibição dos produtos filtrados */}
                {produtosFiltradosDisplay.length > 0 && (
                    <div className={styles.listaProdutos}>
                        {produtosFiltradosDisplay.map((produto) => (
                            <div key={produto.id} className={styles.produtoPreview}>
                                <div>
                                    <p><strong>Medicamento:</strong> {produto.nomeComercial} ({produto.nomeGenerico || 'N/A'})</p>
                                    <p><strong>Laboratório:</strong> {produto.laboratorio}</p>
                                    <p><strong>Categoria:</strong> {produto.categoria}</p>
                                    <p><strong>Apresentação:</strong> {produto.apresentacao} - {produto.concentracao}</p>
                                    <p><strong>Preço:</strong> R$ {produto.precoVenda.toFixed(2)}</p>
                                    <p><strong>Estoque:</strong> {produto.estoqueAtual}</p>
                                </div>
                                <button
                                    className={styles.buttonAdicionarProduto}
                                    onClick={() => adicionarProdutoSelecionado(produto)}
                                >
                                    Adicionar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.grid}>
                    <div className={styles.gridHeader}>
                        <span>Cód. Barras/SKU</span>
                        <span>Medicamento</span>
                        <span>Desconto</span>
                        <span>Qtd</span>
                        <span>Valor Unit.</span>
                        <span>Valor Final</span>
                        <span></span>
                    </div>
                    {itens.length === 0 ? (
                        <div className={styles.noItemsMessage}>Nenhum item adicionado ao carrinho.</div>
                    ) : (
                        itens.map((item, index) => (
                            <div className={styles.gridRow} key={index}>
                                <span>{item.codigo}</span>
                                <span>{item.nome}</span>
                                <span>{item.desconto}%</span>
                                <span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantidade}
                                        onChange={(e) => alterarQuantidade(index, e.target.value)}
                                        className={styles.qtdInput}
                                    />
                                </span>
                                <span>R$ {item.preco.toFixed(2)}</span>
                                <span>R$ {item.valorFinal.toFixed(2)}</span>
                                <span>
                                    <button
                                        onClick={() => removerItem(index)}
                                        className={styles.deleteButton}
                                        title="Remover item"
                                    >
                                        <FiTrash />
                                    </button>
                                </span>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footerRight}>
                    <div className={styles.total}>
                        Total: <strong>R$ {valorTotal.toFixed(2)}</strong>
                    </div>

                    <button
                        className={styles.buttonFinalizar}
                        onClick={finalizarVenda}
                        disabled={itens.length === 0 || loading}
                    >
                        {loading ? "Finalizando..." : (
                            <>
                                <FiShoppingCart style={{ marginRight: "8px" }} />
                                Finalizar Venda
                            </>
                        )}
                    </button>
                </div>

                {numeroCupom && (
                    <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#007bff", textAlign: "center" }}>
                        Venda finalizada! Número do cupom: <strong>{numeroCupom}</strong>
                    </div>
                )}

                {/* Modal de Clientes */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2 style={{ marginBottom: "10px", color: "#00b89f" }}>Selecionar Cliente</h2>

                            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                                <input
                                    type="text"
                                    placeholder="Buscar por nome"
                                    value={clienteBuscaNome}
                                    onChange={(e) => setClienteBuscaNome(e.target.value)}
                                    className={styles.modalInput}
                                />
                                <input
                                    type="text"
                                    placeholder="Buscar por CPF"
                                    value={clienteBuscaCpf}
                                    onChange={(e) => setClienteBuscaCpf(e.target.value)}
                                    className={styles.modalInput}
                                />
                            </div>

                            <div className={styles.gridClientes}>
                                <div className={styles.gridHeader}>
                                    <span>Nome</span>
                                    <span>CPF</span>
                                    <span>Endereço</span>
                                    <span>Telefone</span>
                                    <span>CEP</span>
                                    <span>Cidade</span>
                                    <span></span>
                                </div>
                                {/* Alteração na renderização: Só mapeia clientesFiltrados se houver itens */}
                                {clientesFiltrados.length === 0 ? (
                                    <div className={styles.noItemsMessage}>
                                        {(clienteBuscaNome.length > 0 || clienteBuscaCpf.length > 0) &&
                                            (clienteBuscaNome.length < 3 && clienteBuscaCpf.length < 3)
                                            ? "Digite no mínimo 3 caracteres para buscar."
                                            : "Nenhum cliente encontrado."
                                        }
                                    </div>
                                ) : (
                                    clientesFiltrados.map((cliente) => (
                                        <div className={styles.gridRow} key={cliente.id}>
                                            <span>{cliente.nome}</span>
                                            <span>{cliente.cpf}</span>
                                            <span>{cliente.endereco}</span>
                                            <span>{cliente.telefone}</span>
                                            <span>{cliente.cep}</span>
                                            <span>{cliente.cidade}</span>
                                            <span>
                                                <button
                                                    className={styles.addClienteBtn}
                                                    onClick={() => selecionarCliente(cliente)}
                                                >
                                                    Adicionar
                                                </button>
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <button className={styles.buttonCloseModal} onClick={fecharModalClientes} style={{ marginTop: "20px" }}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    );
}