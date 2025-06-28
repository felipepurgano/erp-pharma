import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Colaboradores.module.css"; // CSS específico para colaboradores
import { FiSave, FiXCircle, FiSearch, FiEdit, FiTrash } from "react-icons/fi";
import { colaboradoresMock } from "@/utils/mocks"; // Importa o mock de colaboradores

export default function Colaboradores() {
    // --- Estados para o Formulário de Cadastro ---
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [dataContratacao, setDataContratacao] = useState("");
    const [idEditando, setIdEditando] = useState(null); // Para saber se estamos editando um colaborador existente

    // --- Estados para Busca e Listagem ---
    const [listaColaboradores, setListaColaboradores] = useState(colaboradoresMock); // Usar o mock como estado inicial
    const [buscaNome, setBuscaNome] = useState("");
    const [buscaCpf, setBuscaCpf] = useState("");
    const [colaboradoresExibidos, setColaboradoresExibidos] = useState(colaboradoresMock); // Colaboradores filtrados para exibição

    // --- Efeito para Filtrar Colaboradores para Exibição ---
    useEffect(() => {
        const filtrados = listaColaboradores.filter(colaborador => {
            const nomeMatch = buscaNome === "" || colaborador.nomeCompleto.toLowerCase().includes(buscaNome.toLowerCase());
            const cpfMatch = buscaCpf === "" || colaborador.cpf.includes(buscaCpf);
            return nomeMatch && cpfMatch;
        });
        setColaboradoresExibidos(filtrados);
    }, [listaColaboradores, buscaNome, buscaCpf]);

    // --- Funções de Cadastro/Edição ---
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica
        if (!nomeCompleto || !cpf || !rg || !dataNascimento || !telefone || !email || !cargo || !departamento || !dataContratacao) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const novoColaborador = {
            id: idEditando || Date.now(), // Usa o ID existente se estiver editando, senão gera um novo
            nomeCompleto,
            cpf,
            rg,
            dataNascimento,
            telefone,
            email,
            cargo,
            departamento,
            dataContratacao,
        };

        if (idEditando) {
            // Lógica de Edição
            setListaColaboradores(listaColaboradores.map(c =>
                c.id === idEditando ? novoColaborador : c
            ));
            alert("Colaborador atualizado com sucesso!");
        } else {
            // Lógica de Cadastro
            setListaColaboradores([...listaColaboradores, novoColaborador]);
            alert("Colaborador cadastrado com sucesso!");
        }

        limparFormulario();
    };

    const limparFormulario = () => {
        setNomeCompleto("");
        setCpf("");
        setRg("");
        setDataNascimento("");
        setTelefone("");
        setEmail("");
        setCargo("");
        setDepartamento("");
        setDataContratacao("");
        setIdEditando(null); // Sai do modo de edição
    };

    const carregarParaEdicao = (colaborador) => {
        setNomeCompleto(colaborador.nomeCompleto);
        setCpf(colaborador.cpf);
        setRg(colaborador.rg);
        setDataNascimento(colaborador.dataNascimento);
        setTelefone(colaborador.telefone);
        setEmail(colaborador.email);
        setCargo(colaborador.cargo);
        setDepartamento(colaborador.departamento);
        setDataContratacao(colaborador.dataContratacao);
        setIdEditando(colaborador.id);
    };

    const excluirColaborador = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este colaborador?")) {
            setListaColaboradores(listaColaboradores.filter(colaborador => colaborador.id !== id));
            alert("Colaborador excluído com sucesso!");
        }
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>{idEditando ? "EDITAR COLABORADOR" : "CADASTRO DE COLABORADORES"}</h1>

                {/* Formulário de Cadastro */}
                <form onSubmit={handleSubmit} className={styles.formCadastro}>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Nome Completo"
                            value={nomeCompleto}
                            onChange={(e) => setNomeCompleto(e.target.value)}
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
                            placeholder="RG"
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="date"
                            placeholder="Data de Nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            className={styles.inputField}
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
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Departamento"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="date"
                            placeholder="Data de Contratação"
                            value={dataContratacao}
                            onChange={(e) => setDataContratacao(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveButton}>
                            <FiSave style={{ marginRight: "8px" }} /> {idEditando ? "Atualizar" : "Salvar"} Colaborador
                        </button>
                        <button type="button" onClick={limparFormulario} className={styles.clearButton}>
                            <FiXCircle style={{ marginRight: "8px" }} /> Limpar
                        </button>
                    </div>
                </form>

                {/* Linha Separadora */}
                <div className={styles.separator}></div>

                <h2 className={styles.subtitle}>LISTAGEM DE COLABORADORES</h2>

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

                {/* Grid de Colaboradores */}
                <div className={styles.grid}>
                    <div className={styles.gridHeader}>
                        <span>Nome</span>
                        <span>CPF</span>
                        <span>Telefone</span>
                        <span>E-mail</span>
                        <span>Cargo</span>
                        <span>Departamento</span>
                        <span>Ações</span>
                    </div>
                    {colaboradoresExibidos.length === 0 ? (
                        <div className={styles.noItemsMessage}>Nenhum colaborador encontrado.</div>
                    ) : (
                        colaboradoresExibidos.map((colaborador) => (
                            <div className={styles.gridRow} key={colaborador.id}>
                                <span>{colaborador.nomeCompleto}</span>
                                <span>{colaborador.cpf}</span>
                                <span>{colaborador.telefone}</span>
                                <span>{colaborador.email}</span>
                                <span>{colaborador.cargo}</span>
                                <span>{colaborador.departamento}</span>
                                <span className={styles.gridActions}>
                                    <button
                                        onClick={() => carregarParaEdicao(colaborador)}
                                        className={styles.editButton}
                                        title="Editar"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => excluirColaborador(colaborador.id)}
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