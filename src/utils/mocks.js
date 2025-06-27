// Usamos 'let' para que 'produtosMock' possa ser reatribuído após uma compra.
// Em um app real, o estoque viria de um backend.
export let produtosMock = [
    {
        id: 1,
        nomeComercial: "Dorflex",
        nomeGenerico: "Dipirona Monoidratada + Orfenadrina + Cafeína",
        sku: "DOR-FLEX-300",
        codigoBarras: "7896006209809",
        laboratorio: "Sanofi",
        apresentacao: "Comprimidos",
        concentracao: "300mg",
        unidadeMedida: "CX",
        precoCusto: 8.50,
        precoVenda: 12.50,
        estoqueAtual: 150,
        controlado: false,
        categoria: "Analgésicos", // Adicione esta propriedade
        tipoReceita: null,
    },
    {
        id: 2,
        nomeComercial: "Amoxicilina",
        nomeGenerico: "Amoxicilina",
        sku: "AMOX-500",
        codigoBarras: "7891234567890",
        laboratorio: "Eurofarma",
        apresentacao: "Cápsulas",
        concentracao: "500mg",
        unidadeMedida: "CX",
        precoCusto: 15.00,
        precoVenda: 25.00,
        estoqueAtual: 80,
        controlado: false,
        categoria: "Antibióticos", // Adicione esta propriedade
        tipoReceita: "Branca Comum",
    },
    {
        id: 3,
        nomeComercial: "Neosaldina",
        nomeGenerico: "Dipirona + Isometepteno + Cafeína",
        sku: "NEO-SALD-30",
        codigoBarras: "7896006210000",
        laboratorio: "Takeda",
        apresentacao: "Comprimidos",
        concentracao: "30mg",
        unidadeMedida: "CX",
        precoCusto: 10.20,
        precoVenda: 18.90,
        estoqueAtual: 120,
        controlado: false,
        categoria: "Analgésicos", // Adicione esta propriedade
        tipoReceita: null,
    },
    {
        id: 4,
        nomeComercial: "Captopril",
        nomeGenerico: "Captopril",
        sku: "CAPTO-25",
        codigoBarras: "7897897897890",
        laboratorio: "EMS",
        apresentacao: "Comprimidos",
        concentracao: "25mg",
        unidadeMedida: "CX",
        precoCusto: 5.50,
        precoVenda: 9.90,
        estoqueAtual: 200,
        controlado: false,
        categoria: "Anti-hipertensivos", // Adicione esta propriedade
        tipoReceita: null,
    },
    {
        id: 5,
        nomeComercial: "Cloridrato de Fluoxetina",
        nomeGenerico: "Fluoxetina",
        sku: "FLUOX-20",
        codigoBarras: "7896543210987",
        laboratorio: "Medley",
        apresentacao: "Cápsulas",
        concentracao: "20mg",
        unidadeMedida: "CX",
        precoCusto: 20.00,
        precoVenda: 35.00,
        estoqueAtual: 60,
        controlado: true,
        categoria: "Antidepressivos", // Adicione esta propriedade
        tipoReceita: "Branca C",
    },
    {
        id: 6,
        nomeComercial: "Vitamina C",
        nomeGenerico: "Ácido Ascórbico",
        sku: "VIT-C-1G",
        codigoBarras: "7891122334455",
        laboratorio: "Cimed",
        apresentacao: "Comprimidos Efervescentes",
        concentracao: "1g",
        unidadeMedida: "CX",
        precoCusto: 7.00,
        precoVenda: 15.00,
        estoqueAtual: 180,
        controlado: false,
        categoria: "Vitaminas e Suplementos", // Adicione esta propriedade
        tipoReceita: null,
    },
    {
        id: 7,
        nomeComercial: "Omeprazol",
        nomeGenerico: "Omeprazol",
        sku: "OMEP-20",
        codigoBarras: "7890001112223",
        laboratorio: "Teuto",
        apresentacao: "Cápsulas",
        concentracao: "20mg",
        unidadeMedida: "CX",
        precoCusto: 9.00,
        precoVenda: 16.00,
        estoqueAtual: 100,
        controlado: false,
        categoria: "Antiácidos e Digestivos", // Adicione esta propriedade
        tipoReceita: null,
    },
    {
        id: 8,
        nomeComercial: "Protetor Solar FPS 50",
        nomeGenerico: "Protetor Solar",
        sku: "PROT-SOL-50",
        codigoBarras: "7895544332211",
        laboratorio: "Sundown",
        apresentacao: "Creme",
        concentracao: "50+",
        unidadeMedida: "UND",
        precoCusto: 30.00,
        precoVenda: 55.00,
        estoqueAtual: 70,
        controlado: false,
        categoria: "Dermatológicos", // Adicione esta propriedade
        tipoReceita: null,
    },
    {
        id: 9,
        nomeComercial: "Insulina Novolin N",
        nomeGenerico: "Insulina Humana NPH",
        sku: "INSUL-NOV-N",
        codigoBarras: "7891234000011",
        laboratorio: "Novo Nordisk",
        apresentacao: "Caneta injetora",
        concentracao: "100 UI/ml",
        unidadeMedida: "UND",
        precoCusto: 60.00,
        precoVenda: 90.00,
        estoqueAtual: 30,
        controlado: true,
        categoria: "Diabetes", // Adicione esta propriedade
        tipoReceita: "Branca C",
    },
    {
        id: 10,
        nomeComercial: "Xarope Vick 44E",
        nomeGenerico: "Dextrometorfano + Guaifenesina",
        sku: "XAROPE-VICK",
        codigoBarras: "7500435112233",
        laboratorio: "Procter & Gamble",
        apresentacao: "Xarope",
        concentracao: "N/A",
        unidadeMedida: "FR",
        precoCusto: 18.00,
        precoVenda: 32.00,
        estoqueAtual: 90,
        controlado: false,
        categoria: "Respiratórios", // Adicione esta propriedade
        tipoReceita: null,
    },
];

// Esta é uma simulação, inclua vendas para diferentes datas e produtos para ter dados para os gráficos
export let vendasMock = [
    // Vendas de Junho
    {
        id: 1,
        dataVenda: "2025-06-01",
        valorTotal: 37.50,
        itensVendidos: [
            { produtoId: 1, quantidade: 3, valorUnitario: 12.50 }, // Dorflex
        ],
        clienteId: 1,
        metodoPagamento: "Pix"
    },
    {
        id: 2,
        dataVenda: "2025-06-01",
        valorTotal: 55.00,
        itensVendidos: [
            { produtoId: 8, quantidade: 1, valorUnitario: 55.00 }, // Protetor Solar
        ],
        clienteId: null,
        metodoPagamento: "Cartão de Crédito"
    },
    {
        id: 3,
        dataVenda: "2025-06-02",
        valorTotal: 25.00,
        itensVendidos: [
            { produtoId: 2, quantidade: 1, valorUnitario: 25.00 }, // Amoxicilina
        ],
        clienteId: 2,
        metodoPagamento: "Convênio"
    },
    {
        id: 4,
        dataVenda: "2025-06-03",
        valorTotal: 18.90,
        itensVendidos: [
            { produtoId: 3, quantidade: 1, valorUnitario: 18.90 }, // Neosaldina
        ],
        clienteId: null,
        metodoPagamento: "Dinheiro"
    },
    {
        id: 5,
        dataVenda: "2025-06-04",
        valorTotal: 15.00,
        itensVendidos: [
            { produtoId: 6, quantidade: 1, valorUnitario: 15.00 }, // Vitamina C
        ],
        clienteId: 3,
        metodoPagamento: "Pix"
    },
    {
        id: 6,
        dataVenda: "2025-06-05",
        valorTotal: 9.90,
        itensVendidos: [
            { produtoId: 4, quantidade: 1, valorUnitario: 9.90 }, // Captopril
        ],
        clienteId: null,
        metodoPagamento: "Cartão de Débito"
    },
    {
        id: 7,
        dataVenda: "2025-06-05",
        valorTotal: 70.00, // 2x Fluoxetina (35*2)
        itensVendidos: [
            { produtoId: 5, quantidade: 2, valorUnitario: 35.00 },
        ],
        clienteId: 4,
        metodoPagamento: "Cartão de Crédito"
    },
    {
        id: 8,
        dataVenda: "2025-06-06",
        valorTotal: 16.00,
        itensVendidos: [
            { produtoId: 7, quantidade: 1, valorUnitario: 16.00 }, // Omeprazol
        ],
        clienteId: null,
        metodoPagamento: "Dinheiro"
    },
    {
        id: 9,
        dataVenda: "2025-06-07",
        valorTotal: 90.00,
        itensVendidos: [
            { produtoId: 9, quantidade: 1, valorUnitario: 90.00 }, // Insulina
        ],
        clienteId: 5,
        metodoPagamento: "Convênio"
    },
    {
        id: 10,
        dataVenda: "2025-06-08",
        valorTotal: 32.00,
        itensVendidos: [
            { produtoId: 10, quantidade: 1, valorUnitario: 32.00 }, // Xarope Vick
        ],
        clienteId: null,
        metodoPagamento: "Pix"
    },
    {
        id: 11,
        dataVenda: "2025-06-08",
        valorTotal: 25.00,
        itensVendidos: [
            { produtoId: 2, quantidade: 1, valorUnitario: 25.00 }, // Amoxicilina
        ],
        clienteId: null,
        metodoPagamento: "Dinheiro"
    },
    // Mais algumas vendas para ter mais dados
    {
        id: 12,
        dataVenda: "2025-06-09",
        valorTotal: 12.50,
        itensVendidos: [
            { produtoId: 1, quantidade: 1, valorUnitario: 12.50 }, // Dorflex
        ],
        clienteId: null,
        metodoPagamento: "Dinheiro"
    },
    {
        id: 13,
        dataVenda: "2025-06-10",
        valorTotal: 18.90,
        itensVendidos: [
            { produtoId: 3, quantidade: 1, valorUnitario: 18.90 }, // Neosaldina
        ],
        clienteId: 1,
        metodoPagamento: "Cartão de Débito"
    },
    {
        id: 14,
        dataVenda: "2025-06-10",
        dataVenda: "2025-06-10",
        valorTotal: 45.00,
        itensVendidos: [
            { produtoId: 6, quantidade: 3, valorUnitario: 15.00 }, // Vitamina C
        ],
        clienteId: 2,
        metodoPagamento: "Pix"
    },
    {
        id: 15,
        dataVenda: "2025-06-11",
        valorTotal: 35.00,
        itensVendidos: [
            { produtoId: 5, quantidade: 1, valorUnitario: 35.00 }, // Fluoxetina
        ],
        clienteId: 4,
        metodoPagamento: "Cartão de Crédito"
    },
    {
        id: 16,
        dataVenda: "2025-05-15", // Venda de mês anterior para testar filtros
        valorTotal: 12.50,
        itensVendidos: [
            { produtoId: 1, quantidade: 1, valorUnitario: 12.50 }, // Dorflex
        ],
        clienteId: null,
        metodoPagamento: "Dinheiro"
    },
    {
        id: 17,
        dataVenda: "2025-05-20",
        valorTotal: 55.00,
        itensVendidos: [
            { produtoId: 8, quantidade: 1, valorUnitario: 55.00 }, // Protetor Solar
        ],
        clienteId: null,
        metodoPagamento: "Pix"
    },
    {
        id: 18,
        dataVenda: "2025-06-20",
        valorTotal: 90.00,
        itensVendidos: [
            { produtoId: 9, quantidade: 1, valorUnitario: 90.00 }, // Insulina
        ],
        clienteId: 5,
        metodoPagamento: "Convênio"
    },
    {
        id: 19,
        dataVenda: "2025-06-20",
        valorTotal: 12.50,
        itensVendidos: [
            { produtoId: 1, quantidade: 1, valorUnitario: 12.50 }, // Dorflex
        ],
        clienteId: 1,
        metodoPagamento: "Dinheiro"
    },
    {
        id: 20,
        dataVenda: "2025-06-21",
        valorTotal: 18.90,
        itensVendidos: [
            { produtoId: 3, quantidade: 1, valorUnitario: 18.90 }, // Neosaldina
        ],
        clienteId: 3,
        metodoPagamento: "Cartão de Crédito"
    },
    {
        id: 21,
        dataVenda: "2025-06-22",
        valorTotal: 32.00,
        itensVendidos: [
            { produtoId: 10, quantidade: 1, valorUnitario: 32.00 }, // Xarope Vick
        ],
        clienteId: null,
        metodoPagamento: "Pix"
    },
    {
        id: 22,
        dataVenda: "2025-06-23",
        valorTotal: 25.00,
        itensVendidos: [
            { produtoId: 2, quantidade: 1, valorUnitario: 25.00 }, // Amoxicilina
        ],
        clienteId: 2,
        metodoPagamento: "Convênio"
    },
    {
        id: 23,
        dataVenda: "2025-06-24",
        valorTotal: 9.90,
        itensVendidos: [
            { produtoId: 4, quantidade: 1, valorUnitario: 9.90 }, // Captopril
        ],
        clienteId: null,
        metodoPagamento: "Dinheiro"
    },
    {
        id: 24,
        dataVenda: "2025-06-24",
        valorTotal: 16.00,
        itensVendidos: [
            { produtoId: 7, quantidade: 1, valorUnitario: 16.00 }, // Omeprazol
        ],
        clienteId: null,
        metodoPagamento: "Cartão de Débito"
    },
];

export const adicionarVendaMock = (novaVenda) => {
    vendasMock.push(novaVenda);
    console.log("Nova venda adicionada:", novaVenda);
};


export let sngpcLancamentosMock = [
    {
        id: 1,
        tipoOperacao: "Entrada",
        dataOperacao: "2025-06-01",
        produto: { id: 4, nomeComercial: "Rivotril", concentracao: "2mg", tipoReceita: "B1" },
        lote: "RVL2025A",
        quantidade: 20,
        fornecedor: { id: 2, nomeFantasia: "MedControl LTDA" },
        numeroNotaFiscal: "NF0012345",
        observacoes: "Recebimento de estoque inicial",
        paciente: null,
        medico: null,
        crmMedico: null,
        numeroReceita: null,
    },
    {
        id: 2,
        tipoOperacao: "Saída",
        dataOperacao: "2025-06-05",
        produto: { id: 4, nomeComercial: "Rivotril", concentracao: "2mg", tipoReceita: "B1" },
        lote: "RVL2025A",
        quantidade: 1,
        paciente: { id: 1, nome: "Ana Silva", cpf: "111.222.333-44" },
        medico: "Dr. Carlos Eduardo",
        crmMedico: "CRM/SP 123456",
        numeroReceita: "REC12345",
        observacoes: "Venda para Ana Silva",
        fornecedor: null,
        numeroNotaFiscal: null,
    },
    {
        id: 3,
        tipoOperacao: "Saída",
        dataOperacao: "2025-06-10",
        produto: { id: 5, nomeComercial: "Gardenal", concentracao: "100mg", tipoReceita: "B1" },
        lote: "GRD2025X",
        quantidade: 2,
        paciente: { id: 3, nome: "Carla Dias", cpf: "333.444.555-66" },
        medico: "Dra. Patrícia Souza",
        crmMedico: "CRM/RJ 789012",
        numeroReceita: "REC67890",
        observacoes: "Venda para Carla Dias",
        fornecedor: null,
        numeroNotaFiscal: null,
    },
    {
        id: 4,
        tipoOperacao: "Vencimento",
        dataOperacao: "2025-06-20",
        produto: { id: 4, nomeComercial: "Rivotril", concentracao: "2mg", tipoReceita: "B1" },
        lote: "RVL2025A",
        quantidade: 1,
        observacoes: "Medicamento vencido, baixa no sistema.",
        fornecedor: null,
        numeroNotaFiscal: null,
        paciente: null,
        medico: null,
        crmMedico: null,
        numeroReceita: null,
    },
];

// Funções para manipular o mock de SNGPC
export const adicionarSNGPCLancamentoMock = (novoLancamento) => {
    sngpcLancamentosMock.push(novoLancamento);
    // Na vida real, isso atualizaria o estoque do produto controlado
    const produtoIndex = produtosMock.findIndex(p => p.id === novoLancamento.produto.id);
    if (produtoIndex !== -1) {
        if (novoLancamento.tipoOperacao === "Entrada") {
            produtosMock[produtoIndex].estoqueAtual += novoLancamento.quantidade;
        } else if (novoLancamento.tipoOperacao === "Saída" || novoLancamento.tipoOperacao === "Perda" || novoLancamento.tipoOperacao === "Vencimento") {
            produtosMock[produtoIndex].estoqueAtual -= novoLancamento.quantidade;
        }
        console.log(`Estoque de ${produtosMock[produtoIndex].nomeComercial} atualizado para ${produtosMock[produtoIndex].estoqueAtual} (via SNGPC).`);
    }
    console.log("Novo lançamento SNGPC adicionado:", novoLancamento);
};

export const atualizarSNGPCLancamentoMock = (id, dadosAtualizados) => {
    const index = sngpcLancamentosMock.findIndex(lanc => lanc.id === id);
    if (index !== -1) {
        // Lógica de ajuste de estoque para edição: seria mais complexa na vida real
        // Aqui, apenas atualizamos o item, não revertemos o estoque anterior.
        // Em um sistema real, edições de SNGPC geram lançamentos de retificação ou exigem cuidado.
        sngpcLancamentosMock[index] = { ...sngpcLancamentosMock[index], ...dadosAtualizados };
        console.log(`Lançamento SNGPC ${id} atualizado:`, sngpcLancamentosMock[index]);
    }
};

export const removerSNGPCLancamentoMock = (id) => {
    const initialLength = sngpcLancamentosMock.length;
    const lancamentoRemovido = sngpcLancamentosMock.find(item => item.id === id);

    sngpcLancamentosMock = sngpcLancamentosMock.filter(item => item.id !== id);

    if (lancamentoRemovido) {
        // Lógica de ajuste de estoque para remoção (inverte a operação original)
        const produtoIndex = produtosMock.findIndex(p => p.id === lancamentoRemovido.produto.id);
        if (produtoIndex !== -1) {
            if (lancamentoRemovido.tipoOperacao === "Entrada") {
                produtosMock[produtoIndex].estoqueAtual -= lancamentoRemovido.quantidade;
            } else if (lancamentoRemovido.tipoOperacao === "Saída" || lancamentoRemovido.tipoOperacao === "Perda" || lancamentoRemovido.tipoOperacao === "Vencimento") {
                produtosMock[produtoIndex].estoqueAtual += lancamentoRemovido.quantidade;
            }
            console.log(`Estoque de ${produtosMock[produtoIndex].nomeComercial} ajustado após remoção de SNGPC para ${produtosMock[produtoIndex].estoqueAtual}.`);
        }
        console.log(`Lançamento SNGPC ${id} removido.`);
        return true;
    }
    return false;
};

export const fornecedoresMock = [
    {
        id: 1,
        nomeFantasia: "PharmaDistri S.A.",
        razaoSocial: "Farmacêutica Distribuidora S.A.",
        cnpj: "00.111.222/0001-33",
        endereco: "Rua da Entrega, 100",
        telefone: "(11) 5555-1234",
        email: "contato@pharmadistri.com.br",
        contato: "Dr. Alberto Silva"
    },
    {
        id: 2,
        nomeFantasia: "MedSupply Brasil",
        razaoSocial: "Suprimentos Médicos Ltda.",
        cnpj: "11.222.333/0001-44",
        endereco: "Av. dos Medicamentos, 250",
        telefone: "(21) 4444-5678",
        email: "vendas@medsupply.com.br",
        contato: "Sra. Beatriz Costa"
    },
    {
        id: 3,
        nomeFantasia: "Quimifarma Ltda.",
        razaoSocial: "Química Farmacêutica Ltda.",
        cnpj: "22.333.444/0001-55",
        endereco: "Rua da Indústria, 300",
        telefone: "(31) 3333-9876",
        email: "atendimento@quimifarma.com",
        contato: "Eng. Carlos Dantas"
    },
    {
        id: 4,
        nomeFantasia: "Global Pharma",
        razaoSocial: "Global Pharmaceutical Solutions S.A.",
        cnpj: "33.444.555/0001-66",
        endereco: "Praça da Inovação, 50",
        telefone: "(11) 2222-3333",
        email: "info@globalpharma.com",
        contato: "Dra. Denise Vieira"
    },
    {
        id: 5,
        nomeFantasia: "Distribuidor Saúde",
        razaoSocial: "Distribuidor Saúde e Bem-estar Ltda.",
        cnpj: "44.555.666/0001-77",
        endereco: "Estrada Velha, 700",
        telefone: "(19) 1111-2222",
        email: "comercial@distribuidorsaude.com.br",
        contato: "Sr. Eduardo Neves"
    }
];

export const conveniosMock = [
    {
        id: 1,
        nome: "Unimed Central",
        tipo: "Plano de Saúde",
        cnpjCpf: "00.001.001/0001-00",
        contatoPrincipal: "Departamento Comercial",
        telefone: "(11) 3000-1000",
        email: "comercial@unimed.com.br",
        endereco: "Av. Principal, 123",
        website: "www.unimed.com.br",
        status: true, // Ativo
        observacoes: "Cobertura ampla para medicamentos.",
        percentualDescontoPadrao: 15,
        requerAutorizacao: false,
        prazoReembolso: 30,
        documentosNecessarios: "Carteirinha do convênio, RG"
    },
    {
        id: 2,
        nome: "Bradesco Saúde",
        tipo: "Plano de Saúde",
        cnpjCpf: "00.002.002/0001-00",
        contatoPrincipal: "Atendimento Credenciados",
        telefone: "(21) 4002-3000",
        email: "credenciados@bradescosaude.com.br",
        endereco: "Rua da Paz, 456",
        website: "www.bradescosaude.com.br",
        status: true,
        observacoes: "Exige autorização para medicamentos de alto custo.",
        percentualDescontoPadrao: 10,
        requerAutorizacao: true,
        prazoReembolso: 45,
        documentosNecessarios: "Carteirinha do convênio, CPF, Receita Médica"
    },
    {
        id: 3,
        nome: "Farmácia Popular",
        tipo: "Governamental (Farmácia Popular)",
        cnpjCpf: null, // Não se aplica para este tipo
        contatoPrincipal: "Ministério da Saúde",
        telefone: "(61) 3315-2000",
        email: "farmaciapopular@saude.gov.br",
        endereco: "Esplanada dos Ministérios",
        website: "www.gov.br/saude",
        status: true,
        observacoes: "Programa do governo para medicamentos gratuitos ou com baixo custo. Regras específicas por medicamento.",
        percentualDescontoPadrao: null, // Varia por medicamento
        requerAutorizacao: false,
        prazoReembolso: 60,
        documentosNecessarios: "CPF, RG, Receita Médica"
    },
    {
        id: 4,
        nome: "Convênio Empresa Alfa",
        tipo: "Convênio Corporativo",
        cnpjCpf: "12.345.678/0001-90",
        contatoPrincipal: "RH - Sra. Claudia",
        telefone: "(11) 9988-7766",
        email: "rh@empresaalfa.com.br",
        endereco: "Av. Empresarial, 789",
        website: null,
        status: true,
        observacoes: "Desconto de 8% em todos os produtos para funcionários.",
        percentualDescontoPadrao: 8,
        requerAutorizacao: false,
        prazoReembolso: 15,
        documentosNecessarios: "Crachá da empresa"
    },
    {
        id: 5,
        nome: "Cartão Desconto Saúde Fácil",
        tipo: "Cartão de Desconto",
        cnpjCpf: "98.765.432/0001-21",
        contatoPrincipal: "Atendimento ao Cliente",
        telefone: "(31) 2222-1111",
        email: "contato@saudefacil.com",
        endereco: "Rua do Cartão, 50",
        website: "www.saudefacil.com",
        status: false, // Inativo para teste
        observacoes: "Oferece descontos variados. Este convênio está inativo.",
        percentualDescontoPadrao: 5,
        requerAutorizacao: false,
        prazoReembolso: 0,
        documentosNecessarios: "Cartão Saúde Fácil"
    }
];

// Lista fictícia de clientes
export const clientesMock = [
  {
    id: 1,
    nome: "João da Silva",
    cpf: "12345678900",
    endereco: "Rua A, 123",
    telefone: "(11) 99999-0001",
    cep: "01234-000",
    cidade: "São Paulo"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    cpf: "98765432100",
    endereco: "Av. Central, 456",
    telefone: "(11) 98888-1111",
    cep: "02222-000",
    cidade: "Guarulhos"
  },
  {
    id: 3,
    nome: "Carlos Souza",
    cpf: "45678912300",
    endereco: "Rua das Flores, 789",
    telefone: "(11) 97777-2222",
    cep: "03333-000",
    cidade: "Osasco"
  },
  {
    id: 4,
    nome: "Ana Paula Lima",
    cpf: "32165498700",
    endereco: "Rua B, 321",
    telefone: "(11) 96666-3333",
    cep: "04444-000",
    cidade: "Santo André"
  },
  {
    id: 5,
    nome: "Pedro Henrique",
    cpf: "85274196300",
    endereco: "Rua C, 654",
    telefone: "(11) 95555-4444",
    cep: "05555-000",
    cidade: "São Bernardo do Campo"
  },
  {
    id: 6,
    nome: "Luciana Ferreira",
    cpf: "96385274100",
    endereco: "Av. Paulista, 1000",
    telefone: "(11) 94444-5555",
    cep: "06666-000",
    cidade: "São Paulo"
  },
  {
    id: 7,
    nome: "Roberto Almeida",
    cpf: "74125896300",
    endereco: "Rua D, 111",
    telefone: "(11) 93333-6666",
    cep: "07777-000",
    cidade: "Mauá"
  },
  {
    id: 8,
    nome: "Fernanda Costa",
    cpf: "15975348600",
    endereco: "Rua E, 222",
    telefone: "(11) 92222-7777",
    cep: "08888-000",
    cidade: "Diadema"
  },
  {
    id: 9,
    nome: "Marcelo Teixeira",
    cpf: "35715925800",
    endereco: "Av. das Nações, 999",
    telefone: "(11) 91111-8888",
    cep: "09999-000",
    cidade: "Ribeirão Pires"
  },
  {
    id: 10,
    nome: "Juliana Mendes",
    cpf: "95135785200",
    endereco: "Rua F, 333",
    telefone: "(11) 90000-9999",
    cep: "10101-000",
    cidade: "São Caetano do Sul"
  },
  {
    id: 11,
    nome: "Bruno Lima",
    cpf: "25896314700",
    endereco: "Rua G, 444",
    telefone: "(11) 98888-7777",
    cep: "11111-000",
    cidade: "Campinas"
  },
  {
    id: 12,
    nome: "Larissa Rocha",
    cpf: "78945612300",
    endereco: "Av. Brasil, 555",
    telefone: "(11) 97777-6666",
    cep: "12121-000",
    cidade: "Barueri"
  },
  {
    id: 13,
    nome: "Ricardo Gomes",
    cpf: "12378945600",
    endereco: "Rua H, 666",
    telefone: "(11) 96666-5555",
    cep: "13131-000",
    cidade: "Carapicuíba"
  },
  {
    id: 14,
    nome: "Patrícia Andrade",
    cpf: "96314785200",
    endereco: "Rua I, 777",
    telefone: "(11) 95555-4444",
    cep: "14141-000",
    cidade: "Cotia"
  },
  {
    id: 15,
    nome: "André Santos",
    cpf: "74196385200",
    endereco: "Rua J, 888",
    telefone: "(11) 94444-3333",
    cep: "15151-000",
    cidade: "Jandira"
  },
  {
    id: 16,
    nome: "Tatiane Barros",
    cpf: "36925814700",
    endereco: "Rua K, 999",
    telefone: "(11) 93333-2222",
    cep: "16161-000",
    cidade: "Itapevi"
  },
  {
    id: 17,
    nome: "Eduardo Martins",
    cpf: "65498732100",
    endereco: "Rua L, 101",
    telefone: "(11) 92222-1111",
    cep: "17171-000",
    cidade: "Taboão da Serra"
  },
  {
    id: 18,
    nome: "Camila Pires",
    cpf: "85296374100",
    endereco: "Av. Rio Branco, 202",
    telefone: "(11) 91111-0000",
    cep: "18181-000",
    cidade: "Suzano"
  },
  {
    id: 19,
    nome: "Thiago Ribeiro",
    cpf: "14725836900",
    endereco: "Rua M, 303",
    telefone: "(11) 90000-1111",
    cep: "19191-000",
    cidade: "Ferraz de Vasconcelos"
  },
  {
    id: 20,
    nome: "Vanessa Souza",
    cpf: "32178965400",
    endereco: "Rua N, 404",
    telefone: "(11) 98888-2222",
    cep: "20202-000",
    cidade: "Poá"
  }
];

export const colaboradoresMock = [
    {
        id: 1,
        nomeCompleto: "Felipe Almeida",
        cpf: "44455566677",
        rg: "MG-12.345.678",
        dataNascimento: "1985-03-15",
        telefone: "31991234567",
        email: "felipe.almeida@empresa.com",
        cargo: "Gerente de Vendas",
        departamento: "Vendas",
        dataContratacao: "2020-01-10",
    },
    {
        id: 2,
        nomeCompleto: "Camila Fernandes",
        cpf: "55566677788",
        rg: "SP-98.765.432",
        dataNascimento: "1992-07-22",
        telefone: "11992345678",
        email: "camila.f@empresa.com",
        cargo: "Farmacêutico(a)",
        departamento: "Farmácia",
        dataContratacao: "2021-05-01",
    },
    {
        id: 3,
        nomeCompleto: "Roberto Santos",
        cpf: "66677788899",
        rg: "RJ-21.098.765",
        dataNascimento: "1978-11-05",
        telefone: "21983456789",
        email: "roberto.s@empresa.com",
        cargo: "Estoquista",
        departamento: "Logística",
        dataContratacao: "2019-09-15",
    },
    {
        id: 4,
        nomeCompleto: "Mariana Costa",
        cpf: "77788899900",
        rg: "BA-34.567.890",
        dataNascimento: "1995-02-28",
        telefone: "71994567890",
        email: "mariana.c@empresa.com",
        cargo: "Atendente",
        departamento: "Vendas",
        dataContratacao: "2022-03-20",
    },
    {
        id: 5,
        nomeCompleto: "Gustavo Rocha",
        cpf: "88899900011",
        rg: "PR-45.678.901",
        dataNascimento: "1989-09-10",
        telefone: "41995678901",
        email: "gustavo.r@empresa.com",
        cargo: "Analista de TI",
        departamento: "Tecnologia",
        dataContratacao: "2018-07-01",
    },
];

export let faltasEncomendasMock = [
    {
        id: 1,
        tipo: "Falta",
        produto: { id: 1, nomeComercial: "Dorflex", codigoBarras: "7891234567890" },
        quantidade: 5,
        dataSolicitacao: "2025-06-20",
        observacoes: "Cliente procurou, mas não tinha em estoque. Perdeu venda.",
        status: "Pendente" // Para faltas, pode ser 'Pendente' ou 'Resolvida'
    },
    {
        id: 2,
        tipo: "Encomenda",
        produto: { id: 5, nomeComercial: "Amoxicilina", codigoBarras: "7893333444455" },
        quantidade: 2,
        cliente: { id: 1, nome: "Ana Silva", telefone: "(11) 9876-5432" },
        dataSolicitacao: "2025-06-22",
        previsaoChegada: "2025-06-28",
        status: "Em Pedido", // Pendente, Em Pedido, Recebido, Entregue/Retirado, Cancelado
        vendedor: "João"
    },
    {
        id: 3,
        tipo: "Falta",
        produto: { id: 8, nomeComercial: "Omeprazol", codigoBarras: "7899999000011" },
        quantidade: 10,
        dataSolicitacao: "2025-06-24",
        observacoes: "Estoque zero, demanda alta.",
        status: "Pendente"
    },
    {
        id: 4,
        tipo: "Encomenda",
        produto: { id: 10, nomeComercial: "Clavulin BD", codigoBarras: "7894444555566" },
        quantidade: 1,
        cliente: { id: 3, nome: "Carla Souza", telefone: "(31) 9654-3210" },
        dataSolicitacao: "2025-06-25",
        previsaoChegada: "2025-07-01",
        status: "Pendente",
        vendedor: "Maria"
    },
];

// Função para adicionar uma nova falta/encomenda ao histórico
export const adicionarFaltaEncomendaMock = (novoRegistro) => {
    faltasEncomendasMock.push(novoRegistro);
    console.log("Novo registro de falta/encomenda adicionado:", novoRegistro);
};

// Função para atualizar uma falta/encomenda existente
export const atualizarFaltaEncomendaMock = (id, dadosAtualizados) => {
    const index = faltasEncomendasMock.findIndex(item => item.id === id);
    if (index !== -1) {
        faltasEncomendasMock[index] = { ...faltasEncomendasMock[index], ...dadosAtualizados };
        console.log(`Registro ${id} de falta/encomenda atualizado:`, faltasEncomendasMock[index]);
    }
};

// Função para remover uma falta/encomenda
export const removerFaltaEncomendaMock = (id) => {
    const initialLength = faltasEncomendasMock.length;
    faltasEncomendasMock = faltasEncomendasMock.filter(item => item.id !== id);
    if (faltasEncomendasMock.length < initialLength) {
        console.log(`Registro ${id} de falta/encomenda removido.`);
        return true;
    }
    return false;
};

// Simula envio da venda e retorna um número de cupom
export const enviarVendaMock = async (dadosVenda) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Simulando envio de venda:", dadosVenda);
            // Em um cenário real, aqui seria uma chamada API POST
            resolve({
                success: true,
                message: "Venda processada com sucesso!",
                numero_cupom: Math.floor(Math.random() * 900000) + 100000, // Gera um número de 6 dígitos
            });
        }, 1500); // Simula um atraso de rede de 1.5 segundos
    });
};

// Mock para armazenar o histórico de compras
export const comprasMock = [];

// Função para simular a atualização do estoque (será chamada pela tela de Compras)
export const atualizarEstoqueMock = (itensComprados) => {
    itensComprados.forEach(itemComprado => {
        const produtoIndex = produtosMock.findIndex(p => p.id === itemComprado.id);
        if (produtoIndex !== -1) {
            produtosMock[produtoIndex].estoqueAtual += itemComprado.quantidade;
            // Em um sistema real, aqui você também associaria lote/validade ao estoque do produto
            console.log(`Estoque de ${produtosMock[produtoIndex].nomeComercial} atualizado para ${produtosMock[produtoIndex].estoqueAtual}`);
        }
    });
};

// Função para adicionar uma nova compra ao histórico
export const adicionarCompraMock = (novaCompra) => {
    comprasMock.push(novaCompra);
    console.log("Nova compra adicionada ao histórico:", novaCompra);
};

export let orcamentosMock = [
    {
        id: 1,
        numero: "ORC-0001",
        dataOrcamento: "2025-06-20",
        validade: "2025-06-27",
        cliente: { id: 1, nome: "Ana Silva", cpf: "111.222.333-44" },
        status: "Pendente", // Pendente, Aprovado, Rejeitado, Concluído/Vendido, Expirado, Cancelado
        vendedor: "João",
        observacoes: "Orçamento para cliente frequente.",
        itens: [
            {
                id: 1,
                produto: { id: 1, nomeComercial: "Dorflex", precoVenda: 12.50 },
                quantidade: 2,
                precoUnitario: 12.50,
                descontoItem: 0,
                subtotalItem: 25.00
            },
            {
                id: 2,
                produto: { id: 3, nomeComercial: "Tylenol", precoVenda: 10.00 },
                quantidade: 1,
                precoUnitario: 10.00,
                descontoItem: 0,
                subtotalItem: 10.00
            }
        ],
        subtotalGeral: 35.00,
        descontoGeral: 0,
        totalOrcamento: 35.00
    },
    {
        id: 2,
        numero: "ORC-0002",
        dataOrcamento: "2025-06-22",
        validade: "2025-06-29",
        cliente: { id: 5, nome: "Erika Fernandes", cpf: "555.666.777-88" },
        status: "Aprovado",
        vendedor: "Maria",
        observacoes: "Aguardando retirada.",
        itens: [
            {
                id: 1,
                produto: { id: 5, nomeComercial: "Amoxicilina", precoVenda: 35.00 },
                quantidade: 1,
                precoUnitario: 35.00,
                descontoItem: 3.50, // 10% de desconto
                subtotalItem: 31.50
            },
            {
                id: 2,
                produto: { id: 8, nomeComercial: "Omeprazol", precoVenda: 28.00 },
                quantidade: 2,
                precoUnitario: 28.00,
                descontoItem: 0,
                subtotalItem: 56.00
            }
        ],
        subtotalGeral: 87.00, // 31.50 + 56.00
        descontoGeral: 0,
        totalOrcamento: 87.00
    }
];

// Função para adicionar um novo orçamento
export const adicionarOrcamentoMock = (novoOrcamento) => {
    orcamentosMock.push(novoOrcamento);
    console.log("Novo orçamento adicionado:", novoOrcamento);
};

// Função para atualizar um orçamento existente
export const atualizarOrcamentoMock = (id, dadosAtualizados) => {
    const index = orcamentosMock.findIndex(orc => orc.id === id);
    if (index !== -1) {
        orcamentosMock[index] = { ...orcamentosMock[index], ...dadosAtualizados };
        console.log(`Orçamento ${id} atualizado:`, orcamentosMock[index]);
    }
};

// Função para remover um orçamento
export const removerOrcamentoMock = (id) => {
    const initialLength = orcamentosMock.length;
    orcamentosMock = orcamentosMock.filter(orc => orc.id !== id);
    if (orcamentosMock.length < initialLength) {
        console.log(`Orçamento ${id} removido.`);
        return true;
    }
    return false;
};

export const categoriasFinanceirasMock = [
    "Receita de Vendas",
    "Despesa Operacional",
    "Aluguel",
    "Salários e Encargos",
    "Impostos",
    "Fornecedores (Compras)",
    "Contas de Consumo (Água, Luz, Telefone)",
    "Marketing e Publicidade",
    "Manutenção",
    "Outras Receitas",
    "Outras Despesas",
];

export const contasBancariasMock = [
    "Caixa Principal",
    "Banco X - Conta Corrente",
    "Banco Y - Conta Poupança",
    "Cartão de Crédito da Farmácia",
];

export let financeiroMock = [
    {
        id: 1,
        tipo: "Receber",
        descricao: "Venda PDV 001 - 2025-06-25",
        valor: 550.00,
        dataVencimento: "2025-06-25",
        dataEfetiva: "2025-06-25",
        status: "Recebido",
        categoria: "Receita de Vendas",
        contaOrigemDestino: "Caixa Principal",
        observacoes: "Vendas do dia"
    },
    {
        id: 2,
        tipo: "Pagar",
        descricao: "Aluguel Junho/2025",
        valor: 3500.00,
        dataVencimento: "2025-07-05",
        dataEfetiva: null,
        status: "Pendente",
        categoria: "Aluguel",
        contaOrigemDestino: "Banco X - Conta Corrente",
        observacoes: ""
    },
    {
        id: 3,
        tipo: "Receber",
        descricao: "Convênio Unimed - Junho/2025",
        valor: 1200.00,
        dataVencimento: "2025-07-10",
        dataEfetiva: null,
        status: "Pendente",
        categoria: "Receita de Vendas",
        contaOrigemDestino: "Banco X - Conta Corrente",
        observacoes: "Pagamento de convênio"
    },
    {
        id: 4,
        tipo: "Pagar",
        descricao: "Nota fiscal PharmaDistri S.A. - Compra de produtos",
        valor: 780.50,
        dataVencimento: "2025-07-01",
        dataEfetiva: "2025-06-26",
        status: "Pago",
        categoria: "Fornecedores (Compras)",
        contaOrigemDestino: "Banco X - Conta Corrente",
        observacoes: "NF 12345"
    },
    {
        id: 5,
        tipo: "Pagar",
        descricao: "Salário Funcionário João",
        valor: 2000.00,
        dataVencimento: "2025-07-05",
        dataEfetiva: null,
        status: "Pendente",
        categoria: "Salários e Encargos",
        contaOrigemDestino: "Banco Y - Conta Poupança",
        observacoes: "Referente ao mês de Junho"
    },
    {
        id: 6,
        tipo: "Receber",
        descricao: "Venda PDV 002 - 2025-06-26",
        valor: 320.80,
        dataVencimento: "2025-06-26",
        dataEfetiva: "2025-06-26",
        status: "Recebido",
        categoria: "Receita de Vendas",
        contaOrigemDestino: "Caixa Principal",
        observacoes: "Vendas do dia"
    },
    {
        id: 7,
        tipo: "Pagar",
        descricao: "Conta de Luz - Junho/2025",
        valor: 280.00,
        dataVencimento: "2025-07-15",
        dataEfetiva: null,
        status: "Pendente",
        categoria: "Contas de Consumo (Água, Luz, Telefone)",
        contaOrigemDestino: "Banco X - Conta Corrente",
        observacoes: "Cemig"
    },
];

// Funções para manipular o mock de financeiro
export const adicionarLancamentoFinanceiroMock = (novoLancamento) => {
    financeiroMock.push(novoLancamento);
    console.log("Novo lançamento financeiro adicionado:", novoLancamento);
};

export const atualizarLancamentoFinanceiroMock = (id, dadosAtualizados) => {
    const index = financeiroMock.findIndex(lanc => lanc.id === id);
    if (index !== -1) {
        financeiroMock[index] = { ...financeiroMock[index], ...dadosAtualizados };
        console.log(`Lançamento financeiro ${id} atualizado:`, financeiroMock[index]);
    }
};

export const removerLancamentoFinanceiroMock = (id) => {
    const initialLength = financeiroMock.length;
    financeiroMock = financeiroMock.filter(lanc => lanc.id !== id);
    if (financeiroMock.length < initialLength) {
        console.log(`Lançamento financeiro ${id} removido.`);
        return true;
    }
    return false;
};

export let documentosFiscaisMock = [
    {
        id: 1,
        tipoDocumento: "NFC-e",
        numeroDocumento: "123456789",
        dataEmissao: "2025-06-20",
        valorTotal: 150.75,
        cliente: { id: 1, nome: "Ana Silva" },
        itens: [
            { produto: "Dorflex (300mg)", quantidade: 1, precoUnitario: 12.50, subtotal: 12.50 },
            { produto: "Vitamina C (1g)", quantidade: 2, precoUnitario: 15.00, subtotal: 30.00 },
            { produto: "Shampoo XYZ", quantidade: 1, precoUnitario: 25.00, subtotal: 25.00 },
        ],
        impostos: { icms: 27.13, pis: 1.00, cofins: 4.60 }, // Exemplo de cálculo simplificado
        status: "Emitido",
        observacoes: "Venda via PDV"
    },
    {
        id: 2,
        tipoDocumento: "NF-e",
        numeroDocumento: "000000001",
        dataEmissao: "2025-06-21",
        valorTotal: 750.00,
        cliente: { id: 2, nome: "Bruno Costa" },
        itens: [
            { produto: "Kit Primeiros Socorros", quantidade: 1, precoUnitario: 150.00, subtotal: 150.00 },
            { produto: "Insumos Hospitalares", quantidade: 5, precoUnitario: 120.00, subtotal: 600.00 },
        ],
        impostos: { icms: 135.00, pis: 5.00, cofins: 23.00 },
        status: "Emitido",
        observacoes: "Venda para Clínica XYZ"
    },
    {
        id: 3,
        tipoDocumento: "Cupom Fiscal",
        numeroDocumento: "987654",
        dataEmissao: "2025-06-22",
        valorTotal: 45.90,
        cliente: null, // Venda para consumidor final sem CPF
        itens: [
            { produto: "Analgésico Genérico", quantidade: 1, precoUnitario: 8.50, subtotal: 8.50 },
            { produto: "Band-aid (cx)", quantidade: 1, precoUnitario: 7.00, subtotal: 7.00 },
        ],
        impostos: { icms: 8.26, pis: 0.30, cofins: 1.40 },
        status: "Emitido",
        observacoes: "Venda balcão"
    },
    {
        id: 4,
        tipoDocumento: "NF-e",
        numeroDocumento: "000000002",
        dataEmissao: "2025-06-23",
        valorTotal: 120.00,
        cliente: { id: 3, nome: "Carla Dias" },
        itens: [
            { produto: "Suplemento Vitamínico", quantidade: 1, precoUnitario: 120.00, subtotal: 120.00 },
        ],
        impostos: { icms: 21.60, pis: 0.80, cofins: 3.60 },
        status: "Cancelado", // Exemplo de NF cancelada
        observacoes: "NF cancelada a pedido do cliente"
    }
];

// Funções para manipular o mock de Documentos Fiscais
export const adicionarDocumentoFiscalMock = (novoDocumento) => {
    documentosFiscaisMock.push(novoDocumento);
    console.log("Novo documento fiscal adicionado:", novoDocumento);
};

export const atualizarDocumentoFiscalMock = (id, dadosAtualizados) => {
    const index = documentosFiscaisMock.findIndex(doc => doc.id === id);
    if (index !== -1) {
        documentosFiscaisMock[index] = { ...documentosFiscaisMock[index], ...dadosAtualizados };
        console.log(`Documento fiscal ${id} atualizado:`, documentosFiscaisMock[index]);
    }
};

export const removerDocumentoFiscalMock = (id) => {
    const initialLength = documentosFiscaisMock.length;
    documentosFiscaisMock = documentosFiscaisMock.filter(doc => doc.id !== id);
    if (documentosFiscaisMock.length < initialLength) {
        console.log(`Documento fiscal ${id} removido.`);
        return true;
    }
    return false;
};
