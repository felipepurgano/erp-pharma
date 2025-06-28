// pages/Fornecedores.js
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Fornecedores.module.css"; // Vamos criar este CSS
import { FiEdit, FiTrash, FiSearch, FiPlus } from "react-icons/fi";
import { fornecedoresMock } from "@/utils/mocks"; // Importar o mock de fornecedores

export default function Fornecedores() {
    // Estados para os campos do formulário
    const [id, setId] = useState(null); // Para edição
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [contato, setContato] = useState("");

    // Estados para a busca e listagem
    const [termoBusca, setTermoBusca] = useState("");
    const [fornecedores, setFornecedores] = useState(fornecedoresMock); // Lista de fornecedores (pode ser mutável para add/edit/delete)
    const [fornecedoresExibidos, setFornecedoresExibidos] = useState([]); // Fornecedores filtrados para exibição
    const [mensagemBusca, setMensagemBusca] = useState("Digite no mínimo 3 caracteres para buscar.");

    // Efeito para filtrar fornecedores com base no termoBusca
    useEffect(() => {
        const termo = termoBusca.toLowerCase().trim();

        if (termo.length < 3) {
            setFornecedoresExibidos([]); // Limpa a lista se o termo for muito curto
            setMensagemBusca("Digite no mínimo 3 caracteres para buscar.");
            return;
        }

        const filtrados = fornecedores.filter((fornecedor) =>
            fornecedor.nomeFantasia.toLowerCase().includes(termo) ||
            fornecedor.razaoSocial.toLowerCase().includes(termo) ||
            fornecedor.cnpj.includes(termo) ||
            fornecedor.contato.toLowerCase().includes(termo)
        );

        setFornecedoresExibidos(filtrados);
        if (filtrados.length === 0) {
            setMensagemBusca("Nenhum fornecedor encontrado com o termo informado.");
        } else {
            setMensagemBusca(""); // Limpa a mensagem se houver resultados
        }
    }, [termoBusca, fornecedores]); // Adicione 'fornecedores' como dependência para re-filtrar após add/edit/delete

    const handleClearForm = () => {
        setId(null);
        setNomeFantasia("");
        setRazaoSocial("");
        setCnpj("");
        setEndereco("");
        setTelefone("");
        setEmail("");
        setContato("");
    };

    const handleSaveFornecedor = (e) => {
        e.preventDefault();

        // Validação básica
        if (!nomeFantasia || !cnpj || !telefone) {
            alert("Nome Fantasia, CNPJ e Telefone são campos obrigatórios.");
            return;
        }

        const novoFornecedor = {
            id: id || fornecedores.length + 1, // Gera um ID simples ou mantém para edição
            nomeFantasia,
            razaoSocial,
            cnpj,
            endereco,
            telefone,
            email,
            contato,
        };

        if (id) {
            // Modo de edição
            setFornecedores(fornecedores.map((f) => (f.id === id ? novoFornecedor : f)));
            alert("Fornecedor atualizado com sucesso!");
        } else {
            // Modo de cadastro
            setFornecedores([...fornecedores, novoFornecedor]);
            alert("Fornecedor cadastrado com sucesso!");
        }
        handleClearForm(); // Limpa o formulário após salvar
    };

    const handleEditFornecedor = (fornecedor) => {
        setId(fornecedor.id);
        setNomeFantasia(fornecedor.nomeFantasia);
        setRazaoSocial(fornecedor.razaoSocial);
        setCnpj(fornecedor.cnpj);
        setEndereco(fornecedor.endereco);
        setTelefone(fornecedor.telefone);
        setEmail(fornecedor.email);
        setContato(fornecedor.contato);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para facilitar a edição
    };

    const handleDeleteFornecedor = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
            setFornecedores(fornecedores.filter((f) => f.id !== idToDelete));
            alert("Fornecedor excluído com sucesso!");
            handleClearForm(); // Limpa o formulário caso o item excluído estivesse em edição
        }
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>CADASTRO DE FORNECEDORES</h1>

                {/* Formulário de Cadastro/Edição */}
                <div className={styles.formSection}>
                    <form onSubmit={handleSaveFornecedor}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="nomeFantasia">Nome Fantasia:</label>
                                <input
                                    id="nomeFantasia"
                                    type="text"
                                    value={nomeFantasia}
                                    onChange={(e) => setNomeFantasia(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="razaoSocial">Razão Social:</label>
                                <input
                                    id="razaoSocial"
                                    type="text"
                                    value={razaoSocial}
                                    onChange={(e) => setRazaoSocial(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cnpj">CNPJ:</label>
                                <input
                                    id="cnpj"
                                    type="text"
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                    className={styles.inputField}
                                    required
                                    maxLength="18" // Inclui pontos, barras e traço
                                    placeholder="00.000.000/0000-00"
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="endereco">Endereço:</label>
                                <input
                                    id="endereco"
                                    type="text"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="telefone">Telefone:</label>
                                <input
                                    id="telefone"
                                    type="text"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    className={styles.inputField}
                                    required
                                    maxLength="15" // Ex: (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX
                                    placeholder="(XX) XXXX-XXXX"
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="contato">Contato:</label>
                                <input
                                    id="contato"
                                    type="text"
                                    value={contato}
                                    onChange={(e) => setContato(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.buttonSave}>
                                <FiPlus style={{ marginRight: "8px" }} />
                                {id ? "Atualizar Fornecedor" : "Cadastrar Fornecedor"}
                            </button>
                            {id && (
                                <button type="button" onClick={handleClearForm} className={styles.buttonClear}>
                                    Cancelar Edição
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Seção de Busca e Grid */}
                <div className={styles.searchAndGridSection}>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Buscar fornecedor por nome, CNPJ ou contato..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            className={styles.inputField}
                        />
                        <FiSearch className={styles.searchIcon} />
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.gridHeader}>
                            <span>Nome Fantasia</span>
                            <span>Razão Social</span>
                            <span>CNPJ</span>
                            <span>Telefone</span>
                            <span>Email</span>
                            <span>Contato</span>
                            <span>Ações</span>
                        </div>
                        {fornecedoresExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>
                                {mensagemBusca}
                            </div>
                        ) : (
                            fornecedoresExibidos.map((fornecedor) => (
                                <div className={styles.gridRow} key={fornecedor.id}>
                                    <span>{fornecedor.nomeFantasia}</span>
                                    <span>{fornecedor.razaoSocial}</span>
                                    <span>{fornecedor.cnpj}</span>
                                    <span>{fornecedor.telefone}</span>
                                    <span>{fornecedor.email}</span>
                                    <span>{fornecedor.contato}</span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleEditFornecedor(fornecedor)}
                                            className={styles.actionButton}
                                            title="Editar"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFornecedor(fornecedor.id)}
                                            className={styles.actionButtonRed}
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
            </div>
        </Sidebar>
    );
}