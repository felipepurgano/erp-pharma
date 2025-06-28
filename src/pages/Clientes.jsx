import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Clientes.module.css"; // CSS específico para clientes
import { FiSave, FiXCircle, FiSearch, FiEdit, FiTrash } from "react-icons/fi";
import { clientesMock } from "@/utils/mocks"; // Importa o mock de clientes

export default function Clientes() {
    // --- Estados para o Formulário de Cadastro ---
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState("");
    const [idEditando, setIdEditando] = useState(null); // Para saber se estamos editando um cliente existente

    // --- Estados para Busca e Listagem ---
    const [listaClientes, setListaClientes] = useState(clientesMock); // Usar o mock como estado inicial
    const [buscaNome, setBuscaNome] = useState("");
    const [buscaCpf, setBuscaCpf] = useState("");
    const [clientesExibidos, setClientesExibidos] = useState(clientesMock); // Clientes filtrados para exibição

    // --- Efeito para Filtrar Clientes para Exibição ---
    useEffect(() => {
        const filtrados = listaClientes.filter(cliente => {
            const nomeMatch = buscaNome === "" || cliente.nome.toLowerCase().includes(buscaNome.toLowerCase());
            const cpfMatch = buscaCpf === "" || cliente.cpf.includes(buscaCpf);
            return nomeMatch && cpfMatch;
        });
        setClientesExibidos(filtrados);
    }, [listaClientes, buscaNome, buscaCpf]);

    // --- Funções de Cadastro/Edição ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica
        if (!nome || !cpf || !telefone || !cep || !endereco || !cidade) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const novoCliente = {
            id: idEditando || Date.now(), // Usa o ID existente se estiver editando, senão gera um novo
            nome,
            cpf,
            telefone,
            cep,
            endereco,
            cidade,
        };

        if (idEditando) {
            // Lógica de Edição
            setListaClientes(listaClientes.map(c =>
                c.id === idEditando ? novoCliente : c
            ));
            alert("Cliente atualizado com sucesso!");
        } else {
            // Lógica de Cadastro
            setListaClientes([...listaClientes, novoCliente]);
            alert("Cliente cadastrado com sucesso!");
        }

        limparFormulario();
    };

    const limparFormulario = () => {
        setNome("");
        setCpf("");
        setTelefone("");
        setCep("");
        setEndereco("");
        setCidade("");
        setIdEditando(null); // Sai do modo de edição
    };

    const carregarParaEdicao = (cliente) => {
        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setTelefone(cliente.telefone);
        setCep(cliente.cep);
        setEndereco(cliente.endereco);
        setCidade(cliente.cidade);
        setIdEditando(cliente.id);
    };

    const excluirCliente = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            setListaClientes(listaClientes.filter(cliente => cliente.id !== id));
            alert("Cliente excluído com sucesso!");
        }
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                {/* O cabeçalho foi removido daqui */}

                <h1 className={styles.title}>{idEditando ? "EDITAR CLIENTE" : "CADASTRO DE CLIENTES"}</h1>

                {/* Formulário de Cadastro */}
                <form onSubmit={handleSubmit} className={styles.formCadastro}>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className={styles.inputField}
                            maxLength="11" // CPF sem pontuação
                            required
                        />
                        <input
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            className={styles.inputField}
                            maxLength="8"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Endereço (Rua, Número, Bairro)"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>
                            <FiSave style={{ marginRight: "8px" }} /> {idEditando ? "Atualizar" : "Salvar"} Cliente
                        </button>
                        <button type="button" onClick={limparFormulario} className={styles.clearButton}>
                            <FiXCircle style={{ marginRight: "8px" }} /> Limpar
                        </button>
                    </div>
                </form>

                {/* Linha Separadora */}
                <div className={styles.separator}></div>

                <h2 className={styles.subtitle}>LISTAGEM DE CLIENTES</h2>

                {/* Campos de Busca */}
                <div className={styles.searchRow}>
                    <input
                        type="text"
                        placeholder="Buscar por Nome"
                        value={buscaNome}
                        onChange={(e) => setBuscaNome(e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        placeholder="Buscar por CPF"
                        value={buscaCpf}
                        onChange={(e) => setBuscaCpf(e.target.value)}
                        className={styles.inputField}
                    />
                    <button className={styles.searchButton}>
                        <FiSearch /> Buscar
                    </button>
                </div>

                {/* Grid de Clientes */}
                <div className={styles.grid}>
                    <div className={styles.gridHeader}>
                        <span>Nome</span>
                        <span>CPF</span>
                        <span>Telefone</span>
                        <span>Endereço</span>
                        <span>Cidade</span>
                        <span>Ações</span>
                    </div>
                    {clientesExibidos.length === 0 ? (
                        <div className={styles.noItemsMessage}>Nenhum cliente encontrado.</div>
                    ) : (
                        clientesExibidos.map((cliente) => (
                            <div className={styles.gridRow} key={cliente.id}>
                                <span>{cliente.nome}</span>
                                <span>{cliente.cpf}</span>
                                <span>{cliente.telefone}</span>
                                <span>{cliente.endereco}</span>
                                <span>{cliente.cidade}</span>
                                <span className={styles.gridActions}>
                                    <button
                                        onClick={() => carregarParaEdicao(cliente)}
                                        className={styles.editButton}
                                        title="Editar"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => excluirCliente(cliente.id)}
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