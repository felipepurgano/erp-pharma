import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Caixa.module.css";
import { FiTrash, FiShoppingCart, FiUsers, FiXCircle, FiUpload, FiPrinter, FiPlus } from "react-icons/fi";
import { produtosMock, clientesMock } from "@/utils/mocks";

export default function Caixa() {
    // Estados para os inputs de produto
    const [codigoProduto, setCodigoProduto] = useState("");
    const [nomeProdutoBusca, setNomeProdutoBusca] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [descontoItem, setDescontoItem] = useState(0);

    // Estado para o produto "em foco" para adicionar
    const [produtoEmFoco, setProdutoEmFoco] = useState(null);

    // Estados para os itens da venda
    const [itensVenda, setItensVenda] = useState([]);

    // Estados para o resumo da venda
    const [descontoTotalVenda, setDescontoTotalVenda] = useState(0);
    const [acrescimoTotalVenda, setAcrescimoTotalVenda] = useState(0);

    // Simulação de informações da caixa
    const operador = "OPERADOR";
    const terminal = "1";
    const empresa = "PHARMA";
    const versaoPDV = "1.10.0";
    const statusOnline = true;

    // --- Estados e Funções para o Modal de Clientes ---
    const [showModal, setShowModal] = useState(false);
    const [clienteBuscaNome, setClienteBuscaNome] = useState("");
    const [clienteBuscaCpf, setClienteBuscaCpf] = useState("");
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

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

    useEffect(() => {
        const nomeOk = clienteBuscaNome.trim().length >= 3;
        const cpfOk = clienteBuscaCpf.trim().length >= 3;

        if (!nomeOk && !cpfOk) {
            setClientesFiltrados([]);
            return;
        }

        const filtrados = clientesMock.filter((cliente) => {
            const nomeClienteLower = cliente.nome ? cliente.nome.toLowerCase() : ''; // Segurança
            const cpfCliente = cliente.cpf ? String(cliente.cpf) : ''; // Segurança

            const nomeMatches = clienteBuscaNome.trim() === '' || nomeClienteLower.includes(clienteBuscaNome.toLowerCase().trim());
            const cpfMatches = clienteBuscaCpf.trim() === '' || cpfCliente.includes(clienteBuscaCpf.trim());
            
            return nomeMatches && cpfMatches;
        });
        setClientesFiltrados(filtrados);
    }, [clienteBuscaNome, clienteBuscaCpf]);
    // --- Fim dos Estados e Funções para o Modal de Clientes ---


    // Filtra produtos conforme código ou nome, exigindo 3+ caracteres
    const produtosFiltrados = produtosMock.filter((p) => {
        const nomeBuscaValor = nomeProdutoBusca.trim().toLowerCase();
        const codigoBuscaValor = codigoProduto.trim().toLowerCase();

        const nomeBuscaAtiva = nomeBuscaValor.length >= 3;
        const codigoBuscaAtiva = codigoBuscaValor.length >= 3;

        // Se nenhuma busca está ativa (menos de 3 caracteres em ambas as caixas),
        // não retorna nenhum produto.
        if (!nomeBuscaAtiva && !codigoBuscaAtiva) {
            return false;
        }

        // Prepara as propriedades do produto para comparação, garantindo que são strings
        const pNomeComercialLower = typeof p.nomeComercial === 'string' ? p.nomeComercial.toLowerCase() : '';
        const pNomeGenericoLower = typeof p.nomeGenerico === 'string' ? p.nomeGenerico.toLowerCase() : '';
        const pSkuLower = typeof p.sku === 'string' ? p.sku.toLowerCase() : '';
        const pCodigoBarrasLower = typeof p.codigoBarras === 'string' ? p.codigoBarras.toLowerCase() : '';

        // Variável para armazenar se o produto corresponde a ALGUMA das buscas ativas
        let corresponde = false;

        // Se a busca por nome está ativa, verifica se o nome comercial OU genérico do produto inclui o valor buscado
        if (nomeBuscaAtiva) {
            corresponde = pNomeComercialLower.includes(nomeBuscaValor) || pNomeGenericoLower.includes(nomeBuscaValor);
        }

        // Se a busca por código está ativa, verifica se o SKU OU código de barras do produto inclui o valor buscado.
        // Usa `||` (OU) para que o produto corresponda se encontrar por nome OU por código.
        if (codigoBuscaAtiva) {
            corresponde = corresponde || pSkuLower.includes(codigoBuscaValor) || pCodigoBarrasLower.includes(codigoBuscaValor);
        }
        
        // Retorna verdadeiro se o produto corresponde a alguma das buscas ativas
        return corresponde;
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

        // Usamos codigoBarras para identificar unicamente o item na venda
        const itemExistenteIndex = itensVenda.findIndex(item => item.codigo === produtoEmFoco.codigoBarras);

        if (itemExistenteIndex > -1) {
            const novaListaItens = [...itensVenda];
            const itemExistente = novaListaItens[itemExistenteIndex];
            itemExistente.quantidade += parseInt(quantidade);
            itemExistente.valorFinal = calcularValorFinalItem(itemExistente.precoUnitario, itemExistente.quantidade, itemExistente.desconto);
            setItensVenda(novaListaItens);
        } else {
            const novoItem = {
                id: Date.now(),
                codigo: produtoEmFoco.codigoBarras, // Usar codigoBarras
                nome: produtoEmFoco.nomeComercial, // Usar nomeComercial
                precoUnitario: produtoEmFoco.precoVenda, // Usar precoVenda
                quantidade: parseInt(quantidade),
                desconto: parseFloat(descontoItem || 0),
                valorFinal: calcularValorFinalItem(produtoEmFoco.precoVenda, parseInt(quantidade), parseFloat(descontoItem || 0)),
            };
            setItensVenda([...itensVenda, novoItem]);
        }

        setCodigoProduto("");
        setNomeProdutoBusca("");
        setQuantidade(1);
        setDescontoItem(0);
        setProdutoEmFoco(null);
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

    // Efeito para limpar o produto em foco se a busca for apagada ou inválida
    useEffect(() => {
        const nomeBuscaValida = nomeProdutoBusca.trim().length >= 3;
        const codigoBuscaValida = codigoProduto.trim().length >= 3;

        if (!nomeBuscaValida && !codigoBuscaValida && produtoEmFoco) {
            setProdutoEmFoco(null);
        }
    }, [codigoProduto, nomeProdutoBusca, produtoEmFoco]);

    // Função para simular a importação de um orçamento
    const importarOrcamento = () => {
        const numeroOrcamentoSimulado = Math.floor(Math.random() * 100000) + 1;
        alert(`Simulando importação do Orçamento #${numeroOrcamentoSimulado}.`);
        const orcamentoFicticioItens = [
            // Adapte estes para as novas propriedades do seu mocks.js
            { id: Date.now() + 1, codigo: "7896006209809", nome: "Dorflex", precoUnitario: 12.50, quantidade: 2, desconto: 0, valorFinal: 25.00 },
            { id: Date.now() + 2, codigo: "7891234567890", nome: "Amoxicilina", precoUnitario: 25.00, quantidade: 1, desconto: 10, valorFinal: 22.50 },
        ];
        setItensVenda(prevItens => [...prevItens, ...orcamentoFicticioItens]);
        setClienteSelecionado(clientesMock[0]);
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

                {/* Lista de Produtos Filtrados / Sugestões - Só exibe se há 3+ caracteres e resultados */}
                {(
                    // Verifica se há produtos filtrados E se a busca é "ativa" (3+ caracteres em qualquer campo)
                    produtosFiltrados.length > 0 &&
                    (nomeProdutoBusca.trim().length >= 3 || codigoProduto.trim().length >= 3)
                ) && (
                    <div className={styles.listaProdutosCaixa}>
                        {produtosFiltrados.map((produto) => (
                            <div key={produto.codigoBarras} className={styles.produtoPreviewItem}>
                                <div>
                                    <p><strong>Medicamento:</strong> {produto.nomeComercial}</p>
                                    <p><strong>Laboratório:</strong> {produto.laboratorio}</p>
                                    <p><strong>Preço:</strong> R$ {produto.precoVenda.toFixed(2)}</p>
                                </div>
                                <button
                                    className={styles.button}
                                    onClick={() => setProdutoEmFoco(produto)}
                                >
                                    <FiPlus style={{ marginRight: "6px" }} />
                                    {produtoEmFoco && produtoEmFoco.codigoBarras === produto.codigoBarras ? "Em foco" : "Selecionar"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bloco de Adicionar Item Ativo quando um produto está em foco */}
                {produtoEmFoco && (
                    <div className={styles.addItemSection}>
                        <div className={styles.itemInfo}>
                            <p>Adicionando: <strong>{produtoEmFoco.nomeComercial}</strong></p>
                            <p>Preço Unitário: R$ {produtoEmFoco.precoVenda.toFixed(2)}</p>
                            <p>Quantidade: {quantidade}</p>
                            <p>Desconto do Item: {descontoItem}%</p>
                            <p>Total do Item: R$ {calcularValorFinalItem(produtoEmFoco.precoVenda, quantidade, descontoItem).toFixed(2)}</p>
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
                                        onChange={(e) => alterarQuantidadeItem(item.id, e.target.value)}
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

                {/* Modal de Clientes */}
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