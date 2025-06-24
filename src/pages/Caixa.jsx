import React, { useState } from "react";
import { format } from "date-fns";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/pages/Caixa.module.css";

export default function Caixa() {
  const [operacoes, setOperacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [fundoInicial, setFundoInicial] = useState(0);
  const [cupom, setCupom] = useState(null);
  const [pagamento, setPagamento] = useState({ tipo: "dinheiro", valorRecebido: "" });
  const [caixaAberto, setCaixaAberto] = useState(false);
  const operador = "Operador: João";

  const abrirCaixa = () => {
    if (fundoInicial <= 0) return alert("Informe um valor inicial válido.");
    setCaixaAberto(true);
    adicionarOperacao("Fundo de Troco", fundoInicial, "entrada");
  };

  const adicionarOperacao = (desc, val, tipoMov) => {
    const novaOperacao = {
      id: Date.now(),
      descricao: desc,
      valor: parseFloat(val),
      tipo: tipoMov,
      data: new Date()
    };
    setOperacoes((prev) => [novaOperacao, ...prev]);
  };

  const handleRecebimento = () => {
    if (!cupom) return alert("Nenhum cupom importado.");
    const valorTotal = cupom.total;
    const recebido = parseFloat(pagamento.valorRecebido);
    if (recebido < valorTotal) return alert("Valor insuficiente.");

    adicionarOperacao(`Recebimento Cupom #${cupom.id}`, valorTotal, "entrada");
    setCupom(null);
    setPagamento({ tipo: "dinheiro", valorRecebido: "" });
    alert(`Troco: R$ ${(recebido - valorTotal).toFixed(2)}`);
  };

  const fecharCaixa = () => {
    const total = calcularTotal();
    alert(`Caixa fechado com saldo de R$ ${total.toFixed(2)}`);
    setOperacoes([]);
    setCaixaAberto(false);
    setFundoInicial(0);
  };

  const calcularTotal = () => {
    return operacoes.reduce((acc, op) =>
      op.tipo === "entrada" ? acc + op.valor : acc - op.valor, 0);
  };

  const importarCupomFicticio = () => {
    const cupomFake = {
      id: 101,
      cliente: "Maria Oliveira",
      total: 89.90,
      itens: [
        { nome: "Paracetamol 500mg", qtd: 2, valor: 10.00 },
        { nome: "Vitamina C", qtd: 1, valor: 69.90 }
      ]
    };
    setCupom(cupomFake);
  };

  return (
    <Sidebar>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Caixa</h1>
            <span>{operador}</span>
          </div>

          {!caixaAberto ? (
            <div className={styles.formRow}>
              <input
                type="number"
                placeholder="Fundo de Troco"
                value={fundoInicial}
                onChange={(e) => setFundoInicial(parseFloat(e.target.value))}
              />
              <button className={styles.button} onClick={abrirCaixa}>Abrir Caixa</button>
            </div>
          ) : (
            <>
              <div className={styles.formRow}>
                <input
                  type="text"
                  placeholder="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
                <select
                  className={styles.operacaoSelect}
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
                <button className={styles.button} onClick={() => {
                  if (descricao && valor) {
                    adicionarOperacao(descricao, valor, tipo);
                    setDescricao("");
                    setValor("");
                  }
                }}>Adicionar</button>
              </div>

              <div className={styles.recebimento}>
                <h2>Receber Venda</h2>
                {cupom ? (
                  <div className={styles.cupomItem}>
                    <p><strong>Cupom #{cupom.id}</strong> - Cliente: {cupom.cliente}</p>
                    <ul>
                      {cupom.itens.map((item, index) => (
                        <li key={index}>{item.qtd}x {item.nome} - R$ {item.valor.toFixed(2)}</li>
                      ))}
                    </ul>
                    <p className="valor"><strong>Total:</strong> R$ {cupom.total.toFixed(2)}</p>
                    <select
                      className={styles.select}
                      value={pagamento.tipo}
                      onChange={(e) => setPagamento({ ...pagamento, tipo: e.target.value })}
                    >
                      <option value="dinheiro">Dinheiro</option>
                      <option value="cartao">Cartão</option>
                      <option value="pix">Pix</option>
                    </select>

                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Valor Recebido"
                      value={pagamento.valorRecebido}
                      onChange={(e) => setPagamento({ ...pagamento, valorRecebido: e.target.value })}
                    />
                    <button className={styles.button} onClick={handleRecebimento}>Confirmar Pagamento</button>
                  </div>
                ) : (
                  <button className={`${styles.button} ${styles.importarBtn}`} onClick={importarCupomFicticio}>
                    Importar Cupom de Venda
                  </button>
                )}
              </div>

              <div className={styles.grid}>
                <h2>Movimentações</h2>
                <div className={styles.gridHeader}>
                  <span>Descrição</span>
                  <span>Tipo</span>
                  <span>Valor</span>
                  <span>Data</span>
                </div>
                {operacoes.map((op) => (
                  <div className={styles.gridRow} key={op.id}>
                    <span>{op.descricao}</span>
                    <span className={styles[op.tipo]}>{op.tipo}</span>
                    <span>R$ {op.valor.toFixed(2)}</span>
                    <span>{format(op.data, "dd/MM/yyyy HH:mm")}</span>
                  </div>
                ))}
                <div className={styles.footerRight}>
                  <div className={styles.total}>Saldo Atual: R$ {calcularTotal().toFixed(2)}</div>
                </div>
              </div>

              <div className={styles.footer}>
                <button className={styles.button} onClick={fecharCaixa}>Fechar Caixa</button>
              </div>
            </>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
