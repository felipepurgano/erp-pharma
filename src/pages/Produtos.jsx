import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Produtos.module.css"; // CSS específico para produtos
import { FiSave, FiXCircle, FiSearch, FiEdit, FiTrash } from "react-icons/fi";
import { produtosMock } from "@/utils/mocks"; // Importa o mock de produtos

export default function Produtos() {
    // --- Estados para o Formulário de Cadastro ---
    const [nomeComercial, setNomeComercial] = useState("");
    const [nomeGenerico, setNomeGenerico] = useState("");
    const [codigoBarras, setCodigoBarras] = useState("");
    const [sku, setSku] = useState("");
    const [apresentacao, setApresentacao] = useState("");
    const [concentracao, setConcentracao] = useState("");
    const [laboratorio, setLaboratorio] = useState("");
    const [precoVenda, setPrecoVenda] = useState("");
    const [precoCusto, setPrecoCusto] = useState("");
    const [estoqueMinimo, setEstoqueMinimo] = useState("");
    const [estoqueAtual, setEstoqueAtual] = useState("");
    const [unidadeMedida, setUnidadeMedida] = useState("");
    const [categoria, setCategoria] = useState("");
    const [necessitaReceita, setNecessitaReceita] = useState(false);
    const [tipoReceita, setTipoReceita] = useState("");
    const [controlado, setControlado] = useState(false);
    const [validade, setValidade] = useState("");
    const [lote, setLote] = useState("");
    const [registroAnvisa, setRegistroAnvisa] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [idEditando, setIdEditando] = useState(null); // Para saber se estamos editando um produto existente

    // --- Estados para Busca e Listagem ---
    const [listaProdutos, setListaProdutos] = useState(produtosMock); // Usar o mock como estado inicial
    const [buscaNome, setBuscaNome] = useState("");
    const [buscaCodigoBarras, setBuscaCodigoBarras] = useState("");
    const [produtosExibidos, setProdutosExibidos] = useState(produtosMock); // Produtos filtrados para exibição

    // --- Efeito para Filtrar Produtos para Exibição ---
    useEffect(() => {
        const filtrados = listaProdutos.filter(produto => {
            const nomeMatch = buscaNome === "" || produto.nomeComercial.toLowerCase().includes(buscaNome.toLowerCase()) || produto.nomeGenerico.toLowerCase().includes(buscaNome.toLowerCase());
            const codigoBarrasMatch = buscaCodigoBarras === "" || produto.codigoBarras.includes(buscaCodigoBarras) || produto.sku.toLowerCase().includes(buscaCodigoBarras.toLowerCase());
            return nomeMatch && codigoBarrasMatch;
        });
        setProdutosExibidos(filtrados);
    }, [listaProdutos, buscaNome, buscaCodigoBarras]);

    // --- Funções de Cadastro/Edição ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica (ajuste conforme a real necessidade de campos obrigatórios)
        if (!nomeComercial || !codigoBarras || !precoVenda || !estoqueAtual || !laboratorio) {
            alert("Por favor, preencha os campos obrigatórios: Nome Comercial, Código de Barras, Preço de Venda, Estoque Atual e Laboratório.");
            return;
        }

        const novoProduto = {
            id: idEditando || Date.now(), // Usa o ID existente se estiver editando, senão gera um novo
            nomeComercial,
            nomeGenerico,
            codigoBarras,
            sku,
            apresentacao,
            concentracao,
            laboratorio,
            precoVenda: parseFloat(precoVenda),
            precoCusto: parseFloat(precoCusto),
            estoqueMinimo: parseInt(estoqueMinimo),
            estoqueAtual: parseInt(estoqueAtual),
            unidadeMedida,
            categoria,
            necessitaReceita,
            tipoReceita: necessitaReceita ? tipoReceita : "", // Salva tipoReceita apenas se for necessário
            controlado,
            validade,
            lote,
            registroAnvisa,
            observacoes,
        };

        if (idEditando) {
            // Lógica de Edição
            setListaProdutos(listaProdutos.map(p =>
                p.id === idEditando ? novoProduto : p
            ));
            alert("Produto atualizado com sucesso!");
        } else {
            // Lógica de Cadastro
            setListaProdutos([...listaProdutos, novoProduto]);
            alert("Produto cadastrado com sucesso!");
        }

        limparFormulario();
    };

    const limparFormulario = () => {
        setNomeComercial("");
        setNomeGenerico("");
        setCodigoBarras("");
        setSku("");
        setApresentacao("");
        setConcentracao("");
        setLaboratorio("");
        setPrecoVenda("");
        setPrecoCusto("");
        setEstoqueMinimo("");
        setEstoqueAtual("");
        setUnidadeMedida("");
        setCategoria("");
        setNecessitaReceita(false);
        setTipoReceita("");
        setControlado(false);
        setValidade("");
        setLote("");
        setRegistroAnvisa("");
        setObservacoes("");
        setIdEditando(null); // Sai do modo de edição
    };

    const carregarParaEdicao = (produto) => {
        setNomeComercial(produto.nomeComercial);
        setNomeGenerico(produto.nomeGenerico);
        setCodigoBarras(produto.codigoBarras);
        setSku(produto.sku);
        setApresentacao(produto.apresentacao);
        setConcentracao(produto.concentracao);
        setLaboratorio(produto.laboratorio);
        setPrecoVenda(produto.precoVenda.toString()); // Converte para string para o input
        setPrecoCusto(produto.precoCusto.toString());
        setEstoqueMinimo(produto.estoqueMinimo.toString());
        setEstoqueAtual(produto.estoqueAtual.toString());
        setUnidadeMedida(produto.unidadeMedida);
        setCategoria(produto.categoria);
        setNecessitaReceita(produto.necessitaReceita);
        setTipoReceita(produto.tipoReceita);
        setControlado(produto.controlado);
        setValidade(produto.validade);
        setLote(produto.lote);
        setRegistroAnvisa(produto.registroAnvisa);
        setObservacoes(produto.observacoes);
        setIdEditando(produto.id);
    };

    const excluirProduto = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            setListaProdutos(listaProdutos.filter(produto => produto.id !== id));
            alert("Produto excluído com sucesso!");
        }
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>{idEditando ? "EDITAR PRODUTO" : "CADASTRO DE PRODUTOS"}</h1>

                {/* Formulário de Cadastro */}
                <form onSubmit={handleSubmit} className={styles.formCadastro}>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Nome Comercial"
                            value={nomeComercial}
                            onChange={(e) => setNomeComercial(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nome Genérico (Princípio Ativo)"
                            value={nomeGenerico}
                            onChange={(e) => setNomeGenerico(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="Código de Barras (EAN)"
                            value={codigoBarras}
                            onChange={(e) => setCodigoBarras(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            placeholder="SKU (Código Interno)"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Apresentação (Ex: Comprimido, Xarope)"
                            value={apresentacao}
                            onChange={(e) => setApresentacao(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="Concentração (Ex: 500mg, 250ml)"
                            value={concentracao}
                            onChange={(e) => setConcentracao(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="Laboratório"
                            value={laboratorio}
                            onChange={(e) => setLaboratorio(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="number"
                            placeholder="Preço de Venda"
                            value={precoVenda}
                            onChange={(e) => setPrecoVenda(e.target.value)}
                            className={styles.inputField}
                            step="0.01"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Preço de Custo"
                            value={precoCusto}
                            onChange={(e) => setPrecoCusto(e.target.value)}
                            className={styles.inputField}
                            step="0.01"
                        />
                        <input
                            type="number"
                            placeholder="Estoque Mínimo"
                            value={estoqueMinimo}
                            onChange={(e) => setEstoqueMinimo(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="number"
                            placeholder="Estoque Atual"
                            value={estoqueAtual}
                            onChange={(e) => setEstoqueAtual(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <select
                            value={unidadeMedida}
                            onChange={(e) => setUnidadeMedida(e.target.value)}
                            className={styles.inputField}
                        >
                            <option value="">Unidade de Medida</option>
                            <option value="CX">Caixa</option>
                            <option value="UN">Unidade</option>
                            <option value="FR">Frasco</option>
                            <option value="BL">Blíster</option>
                            <option value="G">Grama</option>
                            <option value="ML">Mililitro</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Categoria (Ex: Analgésico, Higiene)"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className={styles.inputField}
                        />
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="necessitaReceita"
                                checked={necessitaReceita}
                                onChange={(e) => setNecessitaReceita(e.target.checked)}
                                className={styles.checkboxField}
                            />
                            <label htmlFor="necessitaReceita">Necessita Receita?</label>
                        </div>
                        {necessitaReceita && (
                            <select
                                value={tipoReceita}
                                onChange={(e) => setTipoReceita(e.target.value)}
                                className={styles.inputField}
                            >
                                <option value="">Tipo de Receita</option>
                                <option value="Branca Comum">Branca Comum</option>
                                <option value="Branca Especial">Branca Especial (C1, C2...)</option>
                                <option value="Azul">Azul (B1, B2)</option>
                                <option value="Amarela">Amarela (A)</option>
                            </select>
                        )}
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="controlado"
                                checked={controlado}
                                onChange={(e) => setControlado(e.target.checked)}
                                className={styles.checkboxField}
                            />
                            <label htmlFor="controlado">Controlado?</label>
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="date"
                            placeholder="Validade"
                            value={validade}
                            onChange={(e) => setValidade(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="Lote"
                            value={lote}
                            onChange={(e) => setLote(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="Registro ANVISA"
                            value={registroAnvisa}
                            onChange={(e) => setRegistroAnvisa(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formRowFull}>
                        <textarea
                            placeholder="Observações"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            className={styles.textareaField}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>
                            <FiSave style={{ marginRight: "8px" }} /> {idEditando ? "Atualizar" : "Salvar"} Produto
                        </button>
                        <button type="button" onClick={limparFormulario} className={styles.clearButton}>
                            <FiXCircle style={{ marginRight: "8px" }} /> Limpar
                        </button>
                    </div>
                </form>

                {/* Linha Separadora */}
                <div className={styles.separator}></div>

                <h2 className={styles.subtitle}>LISTAGEM DE PRODUTOS</h2>

                {/* Campos de Busca */}
                <div className={styles.searchRow}>
                    <input
                        type="text"
                        placeholder="Buscar por Nome Comercial/Genérico"
                        value={buscaNome}
                        onChange={(e) => setBuscaNome(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        placeholder="Buscar por Código de Barras/SKU"
                        value={buscaCodigoBarras}
                        onChange={(e) => setBuscaCodigoBarras(e.target.value)}
                        className={styles.inputField}
                    />
                    <button className={styles.searchButton}>
                        <FiSearch /> Buscar
                    </button>
                </div>

                {/* Grid de Produtos */}
                <div className={styles.grid}>
                    <div className={styles.gridHeader}>
                        <span>Cód. Barras</span>
                        <span>SKU</span>
                        <span>Nome Comercial</span>
                        <span>Genérico</span>
                        <span>Lab.</span>
                        <span>Preço Venda</span>
                        <span>Estoque</span>
                        <span>Validade</span>
                        <span>Controlado</span>
                        <span>Ações</span>
                    </div>
                    {produtosExibidos.length === 0 ? (
                        <div className={styles.noItemsMessage}>Nenhum produto encontrado.</div>
                    ) : (
                        produtosExibidos.map((produto) => (
                            <div className={styles.gridRow} key={produto.id}>
                                <span>{produto.codigoBarras}</span>
                                <span>{produto.sku}</span>
                                <span>{produto.nomeComercial}</span>
                                <span>{produto.nomeGenerico || "N/A"}</span>
                                <span>{produto.laboratorio}</span>
                                <span>R$ {produto.precoVenda.toFixed(2)}</span>
                                <span className={produto.estoqueAtual <= produto.estoqueMinimo ? styles.estoqueBaixo : ''}>
                                    {produto.estoqueAtual}
                                </span>
                                <span>{produto.validade}</span>
                                <span>{produto.controlado ? "Sim" : "Não"}</span>
                                <span className={styles.gridActions}>
                                    <button
                                        onClick={() => carregarParaEdicao(produto)}
                                        className={styles.editButton}
                                        title="Editar"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => excluirProduto(produto.id)}
                                        className={styles.deleteButton}
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
        </Sidebar>
    );
}