import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/pages/Vendas.module.css";
import { FiTrash, FiShoppingCart, FiUsers } from "react-icons/fi";
import { produtosMock, enviarVendaMock, clientesMock } from "@/utils/mocks";

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


  // Modal de Clientes
  const [showModal, setShowModal] = useState(false);
  const [clienteBusca, setClienteBusca] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState(clientesMock);

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
    if (clienteBuscaNome.trim() === "" && clienteBuscaCpf.trim() === "") {
      setClientesFiltrados([]);
      return;
    }

    const filtrados = clientesMock.filter((cliente) =>
      cliente.nome.toLowerCase().includes(clienteBuscaNome.toLowerCase()) &&
      cliente.cpf.includes(clienteBuscaCpf)
    );
    setClientesFiltrados(filtrados);
  }, [clienteBuscaNome, clienteBuscaCpf]);

    const produtosFiltrados = produtosMock.filter((p) => {
    const nomeValido =
      buscaNome.length >= 3 &&
      p.nome.toLowerCase().includes(buscaNome.toLowerCase());
    const codigoValido = codigo && p.codigo === codigo;
    return nomeValido || codigoValido;
  });

  const calcularValorFinal = (preco, qtd, desc) => {
    const descontoDecimal = (desc || 0) / 100;
    return preco * qtd * (1 - descontoDecimal);
  };

  const adicionarProdutoSelecionado = (produtoSelecionado) => {
  if (!produtoSelecionado || !quantidade) return;

  const preco = produtoSelecionado.preco;
  const qtd = parseInt(quantidade);
  const desc = parseFloat(desconto || 0);
  const valorFinal = calcularValorFinal(preco, qtd, desc);

      setItens([
    ...itens,
    {
      codigo: produtoSelecionado.codigo,
      nome: produtoSelecionado.nome,
      laboratorio: produtoSelecionado.laboratorio,
      classe: produtoSelecionado.classe,
      principio: produtoSelecionado.principio,
      desconto: desc,
      quantidade: qtd,
      preco,
      valorFinal,
    },
  ]);

  setCodigo("");
  setBuscaNome("");
  setQuantidade("");
  setDesconto("");
};

  const adicionarProduto = () => {
    if (!produto || !quantidade) return;

    const preco = produto.preco;
    const qtd = parseInt(quantidade);
    const desc = parseFloat(desconto || 0);
    const valorFinal = calcularValorFinal(preco, qtd, desc);

    setItens([
      ...itens,
      {
        codigo: produto.codigo,
        nome: produto.nome,
        laboratorio: produto.laboratorio,
        classe: produto.classe,
        principio: produto.principio,
        desconto: desc,
        quantidade: qtd,
        preco,
        valorFinal,
      },
    ]);

    setCodigo("");
    setBuscaNome("");
    setQuantidade("");
    setDesconto("");
    setNumeroCupom(null);
  };

  const removerItem = (index) => {
    const novaLista = [...itens];
    novaLista.splice(index, 1);
    setItens(novaLista);
  };

  const alterarQuantidade = (index, novaQtd) => {
    const novaLista = [...itens];
    const item = novaLista[index];
    item.quantidade = parseInt(novaQtd);
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
      const resposta = await enviarVendaMock({ itens, total: valorTotal });
      setNumeroCupom(resposta.numero_cupom);
      setItens([]);
      alert(`Venda finalizada! Número do cupom: ${resposta.numero_cupom}`);
    } catch (error) {
      alert("Erro ao finalizar venda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (buscaNome.trim() === "") {
      setCodigo("");
      setQuantidade("");
      setDesconto("");
    }
  }, [buscaNome]);

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
            placeholder="Código de barras"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por nome"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Qtd."
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <input
            type="number"
            placeholder="Desconto (%)"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
          />
        </div>

        {produtosFiltrados.length > 0 && (
          <div className={styles.listaProdutos}>
            {produtosFiltrados.map((produto) => (
              <div key={produto.codigo} className={styles.produtoPreview}>
                <div>
                  <p><strong>Medicamento:</strong> {produto.nome}</p>
                  <p><strong>Laboratório:</strong> {produto.laboratorio}</p>
                  <p><strong>Classe:</strong> {produto.classe}</p>
                  <p><strong>Princípio Ativo:</strong> {produto.principio}</p>
                  <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
                </div>
                <button
                  className={styles.button}
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
            <span>Cód. Barras</span>
            <span>Medicamento</span>
            <span>Desconto</span>
            <span>Qtd</span>
            <span>Valor Unit.</span>
            <span>Valor Final</span>
            <span></span>
          </div>
          {itens.map((item, index) => (
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
          ))}
        </div>

        <div className={styles.footerRight}>
          <div className={styles.total}>
            Total: <strong>R$ {valorTotal.toFixed(2)}</strong>
          </div>

          <button
            className={styles.button}
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
          <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#007bff" }}>
            Venda finalizada! Número do cupom: <strong>{numeroCupom}</strong>
          </div>
        )}

        {/* Modal de Clientes */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 style={{ marginBottom: "10px" }}>Clientes</h2>
              <div className={styles.modalSearchRow}>
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
              <ul className={styles.listaClientes}>
                {clientesFiltrados.map((cliente) => (
                  <li key={cliente.id} className={styles.clienteItem}>
                    <div>
                      <strong>{cliente.nome}</strong> - {cliente.cpf}
                    </div>
                    <button
                      className={styles.addClienteBtn}
                      onClick={() => selecionarCliente(cliente)}
                    >
                      Adicionar
                    </button>
                  </li>
                ))}
              </ul>
              <button className={styles.button} onClick={fecharModalClientes}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
