import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Caixa.module.css";
import { FiTrash, FiShoppingCart, FiUsers, FiXCircle, FiUpload, FiPrinter, FiPlus } from "react-icons/fi"; // FiUpload para o novo ícone
import { produtosMock, clientesMock } from "@/utils/mocks"; // Importando clientesMock

export default function Caixa() {
    // Estados para os inputs de produto
    const [codigoProduto, setCodigoProduto] = useState("");
    const [nomeProdutoBusca, setNomeProdutoBusca] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [descontoItem, setDescontoItem] = useState(0); // Desconto por item

    // Estado para o produto "em foco" para adicionar
    const [produtoEmFoco, setProdutoEmFoco] = useState(null);

    // Estados para os itens da venda
    const [itensVenda, setItensVenda] = useState([]);

    // Estados para o resumo da venda
    const [descontoTotalVenda, setDescontoTotalVenda] = useState(0); // Desconto geral da venda
    const [acrescimoTotalVenda, setAcrescimoTotalVenda] = useState(0); // Acréscimo geral da venda

    // Simulação de informações da caixa (como no header da imagem original)
    const operador = "OPERADOR";
    const terminal = "1";
    const empresa = "PHARMA";
    const versaoPDV = "1.10.0";
    const statusOnline = true; // true para online, false para offline

    // --- Estados e Funções para o Modal de Clientes (Replicados de Vendas.jsx) ---
    const [showModal, setShowModal] = useState(false);
    const [clienteBuscaNome, setClienteBuscaNome] = useState("");
    const [clienteBuscaCpf, setClienteBuscaCpf] = useState("");
    const [clientesFiltrados, setClientesFiltrados] = useState([]); // Inicializa vazio
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Para exibir o cliente selecionado

    const abrirModalClientes = () => setShowModal(true);
    const fecharModalClientes = () => {
        setShowModal(false);
        setClienteBuscaNome("");
        setClienteBuscaCpf("");
        setClientesFiltrados([]);
    };

    const selecionarCliente = (cliente) => {
        setClienteSelecionado(cliente);
        fecharModalClientes();
    };

    // Efeito para filtrar clientes no modal
    useEffect(() => {
        const nomeOk = clienteBuscaNome.trim().length >= 3;
        const cpfOk = clienteBuscaCpf.trim().length >= 3;

        if (!nomeOk && !cpfOk) {
            setClientesFiltrados([]);
            return;
        }

        const filtrados = clientesMock.filter((cliente) =>
            cliente.nome.toLowerCase().includes(clienteBuscaNome.toLowerCase()) &&
            cliente.cpf.includes(clienteBuscaCpf)
        );
        setClientesFiltrados(filtrados);
    }, [clienteBuscaNome, clienteBuscaCpf]);
    // --- Fim dos Estados e Funções para o Modal de Clientes ---


    // Filtra produtos conforme código ou nome
    const produtosFiltrados = produtosMock.filter((p) => {
        const nomeValido = nomeProdutoBusca.length >= 2 && p.nome.toLowerCase().includes(nomeProdutoBusca.toLowerCase());
        const codigoValido = codigoProduto && p.codigo === codigoProduto;
        return nomeValido || codigoValido;
    });

    // Função para calcular o valor final de um item
    const calcularValorFinalItem = (preco, qtd, desc) => {
        const descontoDecimal = (parseFloat(desc) || 0) / 100;
        return preco * qtd * (1 - descontoDecimal);
    };

    // Adiciona o produto em foco à venda
    const adicionarItemVenda = () => {
        if (!produtoEmFoco || quantidade <= 0) {
            alert("Selecione um produto e uma quantidade válida.");
            return;
        }

        const novoItem = {
            id: Date.now(), // Usar um ID único para a key
            codigo: produtoEmFoco.codigo,
            nome: produtoEmFoco.nome,
            precoUnitario: produtoEmFoco.preco,
            quantidade: parseInt(quantidade),
            desconto: parseFloat(descontoItem || 0),
            valorFinal: calcularValorFinalItem(produtoEmFoco.preco, parseInt(quantidade), parseFloat(descontoItem || 0)),
        };

        setItensVenda([...itensVenda, novoItem]);

        // Limpar campos após adicionar
        setCodigoProduto("");
        setNomeProdutoBusca("");
        setQuantidade(1);
        setDescontoItem(0);
        setProdutoEmFoco(null); // Limpa o produto em foco
    };

    const removerItemVenda = (id) => {
        setItensVenda(itensVenda.filter(item => item.id !== id));
    };

    const alterarQuantidadeItem = (id, novaQtd) => {
        const novaListaItens = itensVenda.map(item => {
            if (item.id === id) {
                const qtd = parseInt(novaQtd);
                return {
                    ...item,
                    // Garante que a quantidade é pelo menos 1 e é um número
                    quantidade: isNaN(qtd) || qtd <= 0 ? 1 : qtd,
                    valorFinal: calcularValorFinalItem(item.precoUnitario, isNaN(qtd) || qtd <= 0 ? 1 : qtd, item.desconto),
                };
            }
            return item;
        });
        setItensVenda(novaListaItens);
    };

    const totalItens = itensVenda.reduce((acc, item) => acc + item.valorFinal, 0);
    const valorDescontoTotal = (totalItens * (parseFloat(descontoTotalVenda) / 100)) || 0;
    const valorAcrescimoTotal = (totalItens * (parseFloat(acrescimoTotalVenda) / 100)) || 0;
    const totalDaVenda = (totalItens - valorDescontoTotal + valorAcrescimoTotal).toFixed(2);

    // Efeito para limpar o produto em foco se a busca for apagada
    useEffect(() => {
        if (!codigoProduto && !nomeProdutoBusca && produtoEmFoco) {
            setProdutoEmFoco(null);
        }
    }, [codigoProduto, nomeProdutoBusca, produtoEmFoco]);

    // Função para simular a importação de um orçamento
    const importarOrcamento = () => {
        const numeroOrcamentoSimulado = Math.floor(Math.random() * 100000) + 1;
        // Para simular, podemos adicionar alguns itens de exemplo ou apenas alertar
        alert(`Simulando importação do Orçamento #${numeroOrcamentoSimulado}.`);
        // Aqui você integraria com sua API para buscar o orçamento real
        // Por exemplo: fetch(`/api/orcamentos/${numeroOrcamentoSimulado}`).then(...)
        // Para demonstração, vamos adicionar alguns itens fictícios:
        const orcamentoFicticioItens = [
            { id: Date.now() + 1, codigo: "12345", nome: "Dipirona 500mg", precoUnitario: 5.50, quantidade: 2, desconto: 0, valorFinal: 11.00 },
            { id: Date.now() + 2, codigo: "67890", nome: "Amoxicilina 250mg", precoUnitario: 12.00, quantidade: 1, desconto: 10, valorFinal: 10.80 },
        ];
        setItensVenda(prevItens => [...prevItens, ...orcamentoFicticioItens]);
        setClienteSelecionado(clientesMock[0]); // Seleciona um cliente fictício para o orçamento
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <header className={styles.headerCaixa}>
                    <div className={styles.headerInfo}>
                        <span>Operador: <strong className={styles.headerValue}>{operador}</strong></span>
                        <span>Terminal: <strong className={styles.headerValue}>{terminal}</strong></span>
                        <span>Empresa: <strong className={styles.headerValue}>{empresa}</strong></span>
                    </div>
                    <div className={styles.headerStatus}>
                        <span>Versão PDV: <strong className={styles.headerValue}>{versaoPDV}</strong></span>
                        <span className={statusOnline ? styles.statusOnline : styles.statusOffline}>
                            {statusOnline ? "Online" : "Offline"}
                        </span>
                    </div>
                </header>

                <h1 className={styles.title}>CAIXA LIVRE</h1>

                {clienteSelecionado && (
                    <div className={styles.clienteSelecionado}>
                        Cliente selecionado: <strong>{clienteSelecionado.nome}</strong> ({clienteSelecionado.cpf})
                        <button className={styles.removeClienteBtn} onClick={() => setClienteSelecionado(null)}>
                            <FiXCircle />
                        </button>
                    </div>
                )}

                <div className={styles.formRow}>
                    <input
                        type="text"
                        placeholder="Código de barras"
                        value={codigoProduto}
                        onChange={(e) => {
                            setCodigoProduto(e.target.value);
                            setNomeProdutoBusca(""); // Limpa a busca por nome ao digitar código
                            setProdutoEmFoco(null); // Limpa o foco ao mudar o código
                        }}
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={nomeProdutoBusca}
                        onChange={(e) => {
                            setNomeProdutoBusca(e.target.value);
                            setCodigoProduto(""); // Limpa o código ao digitar nome
                            setProdutoEmFoco(null); // Limpa o foco ao mudar o nome
                        }}
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
                        placeholder="Desc. Item (%)"
                        value={descontoItem}
                        onChange={(e) => setDescontoItem(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                {/* Lista de Produtos Filtrados / Sugestões - Com botão Adicionar */}
                {(produtosFiltrados.length > 0 && (nomeProdutoBusca.length >= 2 || codigoProduto)) && (
                    <div className={styles.listaProdutosCaixa}>
                        {produtosFiltrados.map((produto) => (
                            <div key={produto.codigo} className={styles.produtoPreviewItem}>
                                <div>
                                    <p><strong>Medicamento:</strong> {produto.nome}</p>
                                    <p><strong>Laboratório:</strong> {produto.laboratorio}</p>
                                    <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
                                </div>
                                <button
                                    className={styles.button}
                                    onClick={() => setProdutoEmFoco(produto)}
                                >
                                    <FiPlus style={{ marginRight: "6px" }} />
                                    {produtoEmFoco && produtoEmFoco.codigo === produto.codigo ? "Em foco" : "Selecionar"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bloco de Adicionar Item Ativo quando um produto está em foco */}
                {produtoEmFoco && (
                    <div className={styles.addItemSection}>
                        <div className={styles.itemInfo}>
                            <p>Adicionando: <strong>{produtoEmFoco.nome}</strong></p>
                            <p>Preço Unitário: R$ {produtoEmFoco.preco.toFixed(2)}</p>
                            <p>Quantidade: {quantidade}</p>
                            <p>Desconto do Item: {descontoItem}%</p>
                            <p>Total do Item: R$ {calcularValorFinalItem(produtoEmFoco.preco, quantidade, descontoItem).toFixed(2)}</p>
                        </div>
                        <button
                            className={styles.buttonAddItem}
                            onClick={adicionarItemVenda}
                            disabled={quantidade <= 0 || isNaN(quantidade)}
                        >
                            <FiShoppingCart style={{ marginRight: "8px" }} /> Adicionar à Venda
                        </button>
                    </div>
                )}

                <div className={styles.grid}>
                    <div className={styles.gridHeader}>
                        <span>Cód. Barras</span>
                        <span>Medicamento</span>
                        <span>Qtd.</span>
                        <span>Valor Unit.</span>
                        <span>Desc. (%)</span>
                        <span>Valor Final</span>
                        <span></span>
                    </div>
                    {itensVenda.length === 0 ? (
                        <div className={styles.noItemsMessage}>Nenhum item adicionado à venda.</div>
                    ) : (
                        itensVenda.map((item) => (
                            <div className={styles.gridRow} key={item.id}>
                                <span>{item.codigo}</span>
                                <span>{item.nome}</span>
                                <span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantidade}
                                        onChange={(e) => alterQuantidadeItem(item.id, e.target.value)}
                                        className={styles.qtdInput}
                                    />
                                </span>
                                <span>R$ {item.precoUnitario.toFixed(2)}</span>
                                <span>{item.desconto.toFixed(2)}%</span>
                                <span>R$ {item.valorFinal.toFixed(2)}</span>
                                <span>
                                    <button
                                        onClick={() => removerItemVenda(item.id)}
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

                <div className={styles.summarySection}>
                    <div className={styles.summaryItem}>
                        <span>Desconto Total (%):</span>
                        <input
                            type="number"
                            value={descontoTotalVenda}
                            onChange={(e) => setDescontoTotalVenda(e.target.value)}
                            className={styles.summaryInputField}
                        />
                        <span className={styles.summaryValue}>R$ {valorDescontoTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Acréscimo Total (%):</span>
                        <input
                            type="number"
                            value={acrescimoTotalVenda}
                            onChange={(e) => setAcrescimoTotalVenda(e.target.value)}
                            className={styles.summaryInputField}
                        />
                        <span className={styles.summaryValue}>R$ {valorAcrescimoTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className={`${styles.summaryItem} ${styles.totalVendaRow}`}>
                        <span>Total da Venda:</span>
                        <span className={styles.totalVendaValue}>R$ {totalDaVenda.replace('.', ',')}</span>
                    </div>
                </div>

                <div className={styles.buttonGrid}>
                    <button className={styles.actionButton}>
                        <FiXCircle /> Fechar Caixa (F9)
                    </button>
                    <button className={styles.actionButton} onClick={abrirModalClientes}>
                        <FiUsers /> Clientes
                    </button>
                    <button className={styles.actionButton} onClick={importarOrcamento}>
                        <FiUpload /> Importar Cupom
                    </button>
                    <button className={styles.actionButton}>
                        <FiPrinter /> Imprimir (F10)
                    </button>
                    <button className={styles.actionButton}>
                        <FiShoppingCart /> Finalizar Venda (F12)
                    </button>
                </div>

                {/* Modal de Clientes (Replicado de Vendas.jsx) */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2 style={{ marginBottom: "10px" }}>Clientes</h2>

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
                                {clientesFiltrados.length === 0 ? (
                                    <div className={styles.noItemsMessage}>Nenhum cliente encontrado.</div>
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

                            <button className={styles.button} onClick={fecharModalClientes} style={{ marginTop: "20px" }}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    );
}