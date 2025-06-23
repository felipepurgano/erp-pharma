// Vendas.jsx
import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import styles from "./Vendas.module.css";
import { FiShoppingCart, FiTrash } from "react-icons/fi";

const produtosMock = [
  { codigo: '7891234567890', nome: 'Dipirona 500mg', laboratorio: 'MedPharma', classe: 'Analgésico', principio: 'Dipirona Monoidratada', preco: 5.00 },
  { codigo: '7891234567891', nome: 'Paracetamol 750mg', laboratorio: 'BioMed', classe: 'Antitérmico', principio: 'Paracetamol', preco: 4.50 },
  { codigo: '7891234567892', nome: 'Ibuprofeno 400mg', laboratorio: 'SaúdePlus', classe: 'Anti-inflamatório', principio: 'Ibuprofeno', preco: 6.00 },
  { codigo: '7891234567893', nome: 'Amoxicilina 500mg', laboratorio: 'PharmaLife', classe: 'Antibiótico', principio: 'Amoxicilina Tri-Hidratada', preco: 7.80 },
  { codigo: '7891234567894', nome: 'Omeprazol 20mg', laboratorio: 'GastroCare', classe: 'Antiácido', principio: 'Omeprazol Magnésico', preco: 3.70 },
  { codigo: '7891234567895', nome: 'Loratadina 10mg', laboratorio: 'Alergix', classe: 'Antialérgico', principio: 'Loratadina', preco: 2.90 },
  { codigo: '7891234567896', nome: 'Losartana 50mg', laboratorio: 'CardioPharma', classe: 'Antipertensivo', principio: 'Losartana Potássica', preco: 4.20 },
  { codigo: '7891234567897', nome: 'Simeticona 125mg', laboratorio: 'DigestWell', classe: 'Antiflatulento', principio: 'Simeticona', preco: 3.50 },
  { codigo: '7891234567898', nome: 'Cetoconazol 200mg', laboratorio: 'DermaCare', classe: 'Antifúngico', principio: 'Cetoconazol', preco: 9.10 },
  { codigo: '7891234567899', nome: 'AAS 100mg', laboratorio: 'CardioPlus', classe: 'Antiagregante', principio: 'Ácido Acetilsalicílico', preco: 1.90 },
];

// Mock da função que simula o envio da venda para backend e retorna um número de cupom
const enviarVendaMock = (venda) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numeroCupom = Math.floor(Math.random() * 10000) + 1;
      resolve({ numero_cupom: numeroCupom });
    }, 1000);
  });
};

export default function Vendas() {
  const [codigo, setCodigo] = useState("");
  const [buscaNome, setBuscaNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [desconto, setDesconto] = useState("");
  const [itens, setItens] = useState([]);
  const [operacao, setOperacao] = useState("cupom");
  const [numeroCupom, setNumeroCupom] = useState(null);
  const [loading, setLoading] = useState(false);

  const produto = produtosMock.find(
    (p) =>
      p.codigo === codigo ||
      (buscaNome && p.nome.toLowerCase().includes(buscaNome.toLowerCase()))
  );

  const calcularValorFinal = (preco, qtd, desc) => {
    const descontoDecimal = (desc || 0) / 100;
    return preco * qtd * (1 - descontoDecimal);
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
    setNumeroCupom(null); // limpa cupom ao adicionar produto novo
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

  // Função para finalizar venda
  const finalizarVenda = async () => {
    if (itens.length === 0) {
      alert("Adicione pelo menos um item antes de finalizar a venda.");
      return;
    }

    setLoading(true);
    try {
      const resposta = await enviarVendaMock({ itens, total: valorTotal });
      setNumeroCupom(resposta.numero_cupom);
      setItens([]); // Limpa o carrinho após finalizar
      alert(`Venda finalizada! Número do cupom: ${resposta.numero_cupom}`);
    } catch (error) {
      alert("Erro ao finalizar venda.");
    } finally {
      setLoading(false);
    }
  };

  // Limpa preview de produto quando buscaNome é apagado
  React.useEffect(() => {
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
          <select
            value={operacao}
            onChange={(e) => setOperacao(e.target.value)}
            className={styles.operacaoSelect}
          >
            <option value="orcamento">Orçamento</option>
            <option value="cupom">Cupom de Venda</option>
            <option value="nfce">NFC-e</option>
          </select>
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

        {produto && buscaNome.trim() !== "" && (
          <div className={styles.produtoPreview}>
            <div>
              <p><strong>Medicamento:</strong> {produto.nome}</p>
              <p><strong>Laboratório:</strong> {produto.laboratorio}</p>
              <p><strong>Classe:</strong> {produto.classe}</p>
              <p><strong>Princípio Ativo:</strong> {produto.principio}</p>
              <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
            </div>
            <button className={styles.button} onClick={adicionarProduto}>Adicionar</button>
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
      </div>
    </Sidebar>
  );
}
