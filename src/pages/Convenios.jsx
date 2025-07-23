// pages/Convenios.js
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/styles/pages/Convenios.module.css"; // Vamos criar este CSS
import { FiEdit, FiTrash, FiSearch, FiPlus } from "react-icons/fi";
import { conveniosMock } from "@/utils/mocks"; // Importar o mock de convênios

export default function Convenios() {
    // Estados para os campos do formulário
    const [id, setId] = useState(null); // Para edição
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [cnpjCpf, setCnpjCpf] = useState("");
    const [contatoPrincipal, setContatoPrincipal] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState(true); // Ativo por padrão
    const [observacoes, setObservacoes] = useState("");
    const [percentualDescontoPadrao, setPercentualDescontoPadrao] = useState("");
    const [requerAutorizacao, setRequerAutorizacao] = useState(false);
    const [prazoReembolso, setPrazoReembolso] = useState("");
    const [documentosNecessarios, setDocumentosNecessarios] = useState("");

    // Estados para a busca e listagem
    const [termoBusca, setTermoBusca] = useState("");
    const [convenios, setConvenios] = useState(conveniosMock); // Lista de convênios (mutável)
    const [conveniosExibidos, setConveniosExibidos] = useState([]); // Convênios filtrados para exibição
    const [mensagemBusca, setMensagemBusca] = useState("Digite no mínimo 3 caracteres para buscar.");

    // Efeito para filtrar convênios com base no termoBusca
    useEffect(() => {
        const termo = termoBusca.toLowerCase().trim();

        if (termo.length < 3) {
            setConveniosExibidos([]); // Limpa a lista se o termo for muito curto
            setMensagemBusca("Digite no mínimo 3 caracteres para buscar.");
            return;
        }

        const filtrados = convenios.filter((convenio) =>
            convenio.nome.toLowerCase().includes(termo) ||
            (convenio.cnpjCpf && convenio.cnpjCpf.includes(termo)) ||
            (convenio.contatoPrincipal && convenio.contatoPrincipal.toLowerCase().includes(termo)) ||
            (convenio.tipo && convenio.tipo.toLowerCase().includes(termo))
        );

        setConveniosExibidos(filtrados);
        if (filtrados.length === 0) {
            setMensagemBusca("Nenhum convênio encontrado com o termo informado.");
        } else {
            setMensagemBusca(""); // Limpa a mensagem se houver resultados
        }
    }, [termoBusca, convenios]);

    const handleClearForm = () => {
        setId(null);
        setNome("");
        setTipo("");
        setCnpjCpf("");
        setContatoPrincipal("");
        setTelefone("");
        setEmail("");
        setEndereco("");
        setWebsite("");
        setStatus(true);
        setObservacoes("");
        setPercentualDescontoPadrao("");
        setRequerAutorizacao(false);
        setPrazoReembolso("");
        setDocumentosNecessarios("");
    };

    const handleSaveConvenio = (e) => {
        e.preventDefault();

        // Validação básica
        if (!nome || !tipo || !telefone || !email) {
            alert("Nome, Tipo, Telefone e Email são campos obrigatórios.");
            return;
        }

        const novoConvenio = {
            id: id || convenios.length + 1, // Gera um ID simples ou mantém para edição
            nome,
            tipo,
            cnpjCpf: cnpjCpf || null,
            contatoPrincipal: contatoPrincipal || null,
            telefone,
            email,
            endereco: endereco || null,
            website: website || null,
            status,
            observacoes: observacoes || null,
            percentualDescontoPadrao: percentualDescontoPadrao ? parseFloat(percentualDescontoPadrao) : null,
            requerAutorizacao,
            prazoReembolso: prazoReembolso ? parseInt(prazoReembolso) : null,
            documentosNecessarios: documentosNecessarios || null,
        };

        if (id) {
            // Modo de edição
            setConvenios(convenios.map((c) => (c.id === id ? novoConvenio : c)));
            alert("Convênio atualizado com sucesso!");
        } else {
            // Modo de cadastro
            setConvenios([...convenios, novoConvenio]);
            alert("Convênio cadastrado com sucesso!");
        }
        handleClearForm(); // Limpa o formulário após salvar
    };

    const handleEditConvenio = (convenio) => {
        setId(convenio.id);
        setNome(convenio.nome);
        setTipo(convenio.tipo);
        setCnpjCpf(convenio.cnpjCpf || "");
        setContatoPrincipal(convenio.contatoPrincipal || "");
        setTelefone(convenio.telefone);
        setEmail(convenio.email);
        setEndereco(convenio.endereco || "");
        setWebsite(convenio.website || "");
        setStatus(convenio.status);
        setObservacoes(convenio.observacoes || "");
        setPercentualDescontoPadrao(convenio.percentualDescontoPadrao || "");
        setRequerAutorizacao(convenio.requerAutorizacao);
        setPrazoReembolso(convenio.prazoReembolso || "");
        setDocumentosNecessarios(convenio.documentosNecessarios || "");
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo para facilitar a edição
    };

    const handleDeleteConvenio = (idToDelete) => {
        if (confirm("Tem certeza que deseja excluir este convênio? Esta ação não pode ser desfeita.")) {
            setConvenios(convenios.filter((c) => c.id !== idToDelete));
            alert("Convênio excluído com sucesso!");
            handleClearForm(); // Limpa o formulário caso o item excluído estivesse em edição
        }
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>CADASTRO DE CONVÊNIOS</h1>

                {/* Formulário de Cadastro/Edição */}
                <div className={styles.formSection}>
                    <form onSubmit={handleSaveConvenio}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="nome">Nome do Convênio:</label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className={styles.inputField}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="tipo">Tipo de Convênio:</label>
                                <select
                                    id="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    className={styles.inputField}
                                    required
                                >
                                    <option value="">Selecione um tipo</option>
                                    <option value="Plano de Saúde">Plano de Saúde</option>
                                    <option value="Cartão de Desconto">Cartão de Desconto</option>
                                    <option value="Convênio Corporativo">Convênio Corporativo</option>
                                    <option value="Governamental (Farmácia Popular)">Governamental (Farmácia Popular)</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cnpjCpf">CNPJ/CPF:</label>
                                <input
                                    id="cnpjCpf"
                                    type="text"
                                    value={cnpjCpf}
                                    onChange={(e) => setCnpjCpf(e.target.value)}
                                    className={styles.inputField}
                                    maxLength="18" // Para CNPJ: 00.000.000/0000-00
                                    placeholder="00.000.000/0000-00 ou 000.000.000-00"
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="contatoPrincipal">Contato Principal:</label>
                                <input
                                    id="contatoPrincipal"
                                    type="text"
                                    value={contatoPrincipal}
                                    onChange={(e) => setContatoPrincipal(e.target.value)}
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
                                    maxLength="15"
                                    placeholder="(XX) XXXX-XXXX"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputField}
                                    required
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
                                <label htmlFor="website">Website/Portal:</label>
                                <input
                                    id="website"
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="https://www.convenio.com.br"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="percentualDescontoPadrao">Desconto Padrão (%):</label>
                                <input
                                    id="percentualDescontoPadrao"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={percentualDescontoPadrao}
                                    onChange={(e) => setPercentualDescontoPadrao(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="prazoReembolso">Prazo Reembolso (dias):</label>
                                <input
                                    id="prazoReembolso"
                                    type="number"
                                    min="0"
                                    value={prazoReembolso}
                                    onChange={(e) => setPrazoReembolso(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="documentosNecessarios">Documentos Necessários:</label>
                                <input
                                    id="documentosNecessarios"
                                    type="text"
                                    value={documentosNecessarios}
                                    onChange={(e) => setDocumentosNecessarios(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                            <div className={styles.inputGroupCheckbox}>
                                <label htmlFor="requerAutorizacao">Requer Autorização?</label>
                                <input
                                    id="requerAutorizacao"
                                    type="checkbox"
                                    checked={requerAutorizacao}
                                    onChange={(e) => setRequerAutorizacao(e.target.checked)}
                                    className={styles.checkboxField}
                                />
                            </div>
                            <div className={styles.inputGroupCheckbox}>
                                <label htmlFor="status">Convênio Ativo?</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                    className={styles.checkboxField}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroupFullWidth}>
                            <label htmlFor="observacoes">Observações/Regras Específicas:</label>
                            <textarea
                                id="observacoes"
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                className={styles.textareaField}
                                rows="3"
                            ></textarea>
                        </div>


                        <div className={styles.formActions}>
                            <button type="submit" className={styles.buttonSave}>
                                <FiPlus style={{ marginRight: "8px" }} />
                                {id ? "Atualizar Convênio" : "Cadastrar Convênio"}
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
                            placeholder="Buscar convênio por nome, CNPJ, contato ou tipo..."
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                            className={styles.inputField}
                        />
                        <FiSearch className={styles.searchIcon} />
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.gridHeader}>
                            <span>Nome</span>
                            <span>Tipo</span>
                            <span>CNPJ/CPF</span>
                            <span>Telefone</span>
                            <span>Email</span>
                            <span>Status</span>
                            <span>Desconto</span>
                            <span>Ações</span>
                        </div>
                        {conveniosExibidos.length === 0 ? (
                            <div className={styles.noItemsMessage}>
                                {mensagemBusca}
                            </div>
                        ) : (
                            conveniosExibidos.map((convenio) => (
                                <div className={styles.gridRow} key={convenio.id}>
                                    <span>{convenio.nome}</span>
                                    <span>{convenio.tipo}</span>
                                    <span>{convenio.cnpjCpf || 'N/A'}</span>
                                    <span>{convenio.telefone}</span>
                                    <span>{convenio.email}</span>
                                    <span>{convenio.status ? "Ativo" : "Inativo"}</span>
                                    <span>{convenio.percentualDescontoPadrao ? `${convenio.percentualDescontoPadrao}%` : 'N/A'}</span>
                                    <span className={styles.gridActions}>
                                        <button
                                            onClick={() => handleEditConvenio(convenio)}
                                            className={styles.actionButton}
                                            title="Editar"
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteConvenio(convenio.id)}
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