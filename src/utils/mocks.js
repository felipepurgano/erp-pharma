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

export const mockPromotions = [
    {
        id: 'PRM001',
        name: 'Desconto de Verão 10%',
        description: '10% de desconto em todos os produtos',
        type: 'Porcentagem',
        value: 10, // 10%
        applicability: 'Todos os Produtos',
        startDate: '2024-07-01',
        endDate: '2024-07-31',
        status: 'Ativa'
    },
    {
        id: 'PRM002',
        name: 'Frete Grátis acima de R$150',
        description: 'Frete grátis para compras acima de 150 reais',
        type: 'Frete Grátis',
        value: 0, // N/A, valor significa frete grátis
        applicability: 'Pedido > R$150',
        startDate: '2024-06-15',
        endDate: '2024-08-31',
        status: 'Ativa'
    },
    {
        id: 'PRM003',
        name: 'Leve 2 Pague 1 - Analgésicos',
        description: 'Compre 2 analgésicos e pague apenas 1',
        type: 'Compre X Leve Y',
        value: '2=1', // Representação simples
        applicability: 'Categoria: Analgésicos',
        startDate: '2024-05-01',
        endDate: '2024-06-30', // Esta promoção já expirou
        status: 'Inativa' 
    },
    {
        id: 'PRM004',
        name: 'Desconto R$20 primeira compra',
        description: 'R$20 de desconto para novos clientes',
        type: 'Valor Fixo',
        value: 20,
        applicability: 'Novos Clientes',
        startDate: '2024-07-01',
        endDate: '2025-12-31',
        status: 'Ativa'
    },
    {
        id: 'PRM005',
        name: '5% em Vitaminas',
        description: '5% de desconto em todas as vitaminas',
        type: 'Porcentagem',
        value: 5,
        applicability: 'Categoria: Vitaminas',
        startDate: '2024-07-10', // Data futura
        endDate: '2024-07-25',
        status: 'Ativa' // Poderia ser 'Agendada' ou 'Futura'
    },
    {
        id: 'PRM006',
        name: 'Combo Família Medicamentos',
        description: '15% de desconto na compra de 3 ou mais itens',
        type: 'Porcentagem',
        value: 15,
        applicability: '3+ Itens no Carrinho',
        startDate: '2024-07-01',
        endDate: '2024-09-30',
        status: 'Ativa'
    },
];

export const mockRevenues = [
    { id: 'REC001', date: '2024-06-01', description: 'Venda de Produtos - Loja', category: 'Vendas', amount: 1500.00, status: 'Recebido' },
    { id: 'REC002', date: '2024-06-05', description: 'Serviços Farmacêuticos', category: 'Serviços', amount: 300.00, status: 'Recebido' },
    { id: 'REC003', date: '2024-06-10', description: 'Venda de Produtos - Online', category: 'Vendas', amount: 850.00, status: 'Recebido' },
    { id: 'REC004', date: '2024-06-15', description: 'Convênio Farmácia Total - Jun', category: 'Convênios', amount: 2500.00, status: 'Pendente' }, // Pending
    { id: 'REC005', date: '2024-06-20', description: 'Venda de Produtos - Loja', category: 'Vendas', amount: 1200.00, status: 'Recebido' },
    { id: 'REC006', date: '2024-06-25', description: 'Serviços de Vacinação', category: 'Serviços', amount: 450.00, status: 'Recebido' },
    { id: 'REC007', date: '2024-07-01', description: 'Venda de Produtos - Online', category: 'Vendas', amount: 980.00, status: 'Recebido' },
    { id: 'REC008', date: '2024-07-03', description: 'Convênio SaudeMais - Jun', category: 'Convênios', amount: 1800.00, status: 'Recebido' },
    { id: 'REC009', date: '2024-07-05', description: 'Venda de Produtos - Loja', category: 'Vendas', amount: 1600.00, status: 'Recebido' },
    { id: 'REC010', date: '2024-07-10', description: 'Serviços de Aferição de Pressão', category: 'Serviços', amount: 150.00, status: 'Recebido' },
    { id: 'REC011', date: '2024-07-15', description: 'Venda de Produtos - Online', category: 'Vendas', amount: 700.00, status: 'Pendente' }, // Pending
    { id: 'REC012', date: '2024-07-20', description: 'Convênio BemEstar - Jul', category: 'Convênios', amount: 2000.00, status: 'Pendente' }, // Pending
    { id: 'REC013', date: '2024-05-10', description: 'Venda de Produtos - Loja', category: 'Vendas', amount: 1100.00, status: 'Recebido' },
];

export const mockExpenses = [
    { id: 'EXP001', date: '2024-06-02', description: 'Aluguel - Junho', category: 'Despesas Fixas', amount: 3500.00, status: 'Pago' },
    { id: 'EXP002', date: '2024-06-05', description: 'Folha de Pagamento - Junho', category: 'Despesas Fixas', amount: 7000.00, status: 'Pago' },
    { id: 'EXP003', date: '2024-06-07', description: 'Compra de Estoque - Fornecedor A', category: 'Compras', amount: 4200.00, status: 'Pago' },
    { id: 'EXP004', date: '2024-06-12', description: 'Conta de Luz - Junho', category: 'Contas de Consumo', amount: 450.00, status: 'Pago' },
    { id: 'EXP005', date: '2024-06-18', description: 'Manutenção de Equipamentos', category: 'Manutenção', amount: 600.00, status: 'Pendente' }, // Pending
    { id: 'EXP006', date: '2024-06-22', description: 'Marketing Digital - Campanha Jun', category: 'Marketing', amount: 800.00, status: 'Pago' },
    { id: 'EXP007', date: '2024-06-28', description: 'Compra de Estoque - Fornecedor B', category: 'Compras', amount: 3100.00, status: 'Pago' },
    { id: 'EXP008', date: '2024-07-01', description: 'Aluguel - Julho', category: 'Despesas Fixas', amount: 3500.00, status: 'Pendente' }, // Pending
    { id: 'EXP009', date: '2024-07-05', description: 'Folha de Pagamento - Julho', category: 'Despesas Fixas', amount: 7200.00, status: 'Pendente' }, // Pending
    { id: 'EXP010', date: '2024-07-10', description: 'Compra de Estoque - Fornecedor C', category: 'Compras', amount: 5000.00, status: 'Pago' },
    { id: 'EXP011', date: '2024-07-15', description: 'Conta de Água - Julho', category: 'Contas de Consumo', amount: 200.00, status: 'Pendente' }, // Pending
    { id: 'EXP012', date: '2024-07-20', description: 'Software de Gestão - Mensalidade', category: 'Serviços TI', amount: 250.00, status: 'Pago' },
    { id: 'EXP013', date: '2024-05-15', description: 'Compra de Estoque - Fornecedor A', category: 'Compras', amount: 3800.00, status: 'Pago' },
];

export const mockProductSales = [
    { id: 1, name: 'Paracetamol 500mg', category: 'Analgésicos', supplier: 'FarmacoLabs', quantity: 150, price: 12.50, date: '2024-06-01' },
    { id: 2, name: 'Amoxicilina 250mg', category: 'Antibióticos', supplier: 'BioGen', quantity: 80, price: 35.00, date: '2024-06-02' },
    { id: 3, name: 'Omeprazol 20mg', category: 'Gastro', supplier: 'PharmaPlus', quantity: 200, price: 18.00, date: '2024-06-01' },
    { id: 4, name: 'Vitamina C', category: 'Vitaminas', supplier: 'VitaCorp', quantity: 300, price: 8.00, date: '2024-06-03' },
    { id: 5, name: 'Ibuprofeno 400mg', category: 'Analgésicos', supplier: 'FarmacoLabs', quantity: 120, price: 15.00, date: '2024-06-02' },
    { id: 6, name: 'Dipirona 1g', category: 'Analgésicos', supplier: 'FarmacoLabs', quantity: 180, price: 10.00, date: '2024-06-04' },
    { id: 7, name: 'Pantoprazol 40mg', category: 'Gastro', supplier: 'PharmaPlus', quantity: 90, price: 25.00, date: '2024-06-03' },
    { id: 8, name: 'Captopril 25mg', category: 'Cardiovascular', supplier: 'CardioMeds', quantity: 60, price: 22.00, date: '2024-06-04' },
    { id: 9, name: 'Claritromicina 500mg', category: 'Antibióticos', supplier: 'BioGen', quantity: 40, price: 45.00, date: '2024-06-05' },
    { id: 10, name: 'Probiótico', category: 'Gastro', supplier: 'VitaCorp', quantity: 100, price: 28.00, date: '2024-06-05' },
    { id: 11, name: 'Paracetamol 500mg', category: 'Analgésicos', supplier: 'FarmacoLabs', quantity: 50, price: 12.50, date: '2024-06-06' },
    { id: 12, name: 'Vitamina D', category: 'Vitaminas', supplier: 'VitaCorp', quantity: 200, price: 12.00, date: '2024-06-06' },
    { id: 13, name: 'Amoxicilina 250mg', category: 'Antibióticos', supplier: 'BioGen', quantity: 30, price: 35.00, date: '2024-06-07' },
    { id: 14, name: 'Omeprazol 20mg', category: 'Gastro', supplier: 'PharmaPlus', quantity: 70, price: 18.00, date: '2024-06-07' },
    { id: 15, name: 'Paracetamol 500mg', category: 'Analgésicos', supplier: 'FarmacoLabs', quantity: 100, price: 12.50, date: '2024-05-15' },
    { id: 16, name: 'Vitamina C', category: 'Vitaminas', supplier: 'VitaCorp', quantity: 250, price: 8.00, date: '2024-05-20' },
    { id: 17, name: 'Omeprazol 20mg', category: 'Gastro', supplier: 'PharmaPlus', quantity: 150, price: 18.00, date: '2024-04-10' },
];

export const mockDeliveryData = [
    { id: 'DEL001', orderId: 'ORD001', customerName: 'Ana Silva', address: 'Rua A, 123', deliveryPerson: 'João', status: 'Entregue', estimatedTime: '10:00', actualTime: '10:15', paymentStatus: 'Pago', date: '2024-06-01' },
    { id: 'DEL002', orderId: 'ORD002', customerName: 'Bruno Costa', address: 'Av. B, 456', deliveryPerson: 'Maria', status: 'Em Rota', estimatedTime: '11:00', actualTime: null, paymentStatus: 'Pendente', date: '2024-06-01' },
    { id: 'DEL003', orderId: 'ORD003', customerName: 'Carla Dias', address: 'Travessa C, 78', deliveryPerson: 'João', status: 'Pendente', estimatedTime: '12:00', actualTime: null, paymentStatus: 'Pago', date: '2024-06-01' },
    { id: 'DEL004', orderId: 'ORD004', customerName: 'Daniel Rocha', address: 'Rua D, 90', deliveryPerson: 'Maria', status: 'Entregue', estimatedTime: '14:00', actualTime: '14:05', paymentStatus: 'Pago', date: '2024-06-02' },
    { id: 'DEL005', orderId: 'ORD005', customerName: 'Eliana Souza', address: 'Av. E, 11', deliveryPerson: 'Pedro', status: 'Cancelado', estimatedTime: '15:00', actualTime: null, paymentStatus: 'Estornado', date: '2024-06-02' },
    { id: 'DEL006', orderId: 'ORD006', customerName: 'Felipe Gomes', address: 'Rua F, 22', deliveryPerson: 'João', status: 'Entregue', estimatedTime: '16:00', actualTime: '16:30', paymentStatus: 'Pago', date: '2024-06-03' },
    { id: 'DEL007', orderId: 'ORD007', customerName: 'Gabriela Lima', address: 'Av. G, 33', deliveryPerson: 'Pedro', status: 'Pendente', estimatedTime: '10:30', actualTime: null, paymentStatus: 'Pendente', date: '2024-06-03' },
    { id: 'DEL008', orderId: 'ORD008', customerName: 'Hugo Martins', address: 'Rua H, 44', deliveryPerson: 'Maria', status: 'Em Rota', estimatedTime: '11:30', actualTime: null, paymentStatus: 'Pago', date: '2024-06-04' },
    { id: 'DEL009', orderId: 'ORD009', customerName: 'Isabela Nunes', address: 'Travessa I, 55', deliveryPerson: 'João', status: 'Entregue', estimatedTime: '13:00', actualTime: '13:00', paymentStatus: 'Pago', date: '2024-06-04' },
    { id: 'DEL010', orderId: 'ORD010', customerName: 'Julio Oliveira', address: 'Rua J, 66', deliveryPerson: 'Pedro', status: 'Pendente', estimatedTime: '14:30', actualTime: null, paymentStatus: 'Pago', date: '2024-06-05' },
    { id: 'DEL011', orderId: 'ORD011', customerName: 'Laura Pereira', address: 'Av. L, 77', deliveryPerson: 'Maria', status: 'Entregue', estimatedTime: '09:00', actualTime: '09:10', paymentStatus: 'Pago', date: '2024-05-28' },
    { id: 'DEL012', orderId: 'ORD012', customerName: 'Marcelo Queiroz', address: 'Rua M, 88', deliveryPerson: 'João', status: 'Pendente', estimatedTime: '11:00', actualTime: null, paymentStatus: 'Pendente', date: '2024-05-29' },
    { id: 'DEL013', orderId: 'ORD013', customerName: 'Natalia Reis', address: 'Rua N, 99', deliveryPerson: 'Maria', status: 'Em Rota', estimatedTime: '13:45', actualTime: null, paymentStatus: 'Pendente', date: '2024-06-06' },
    { id: 'DEL014', orderId: 'ORD014', customerName: 'Otavio Santos', address: 'Av. O, 10', deliveryPerson: 'João', status: 'Entregue', estimatedTime: '16:00', actualTime: '16:00', paymentStatus: 'Pago', date: '2024-06-06' },
    { id: 'DEL015', orderId: 'ORD015', customerName: 'Paula Torres', address: 'Travessa P, 21', deliveryPerson: 'Pedro', status: 'Cancelado', estimatedTime: '10:00', actualTime: null, paymentStatus: 'Não Pago', date: '2024-06-07' },
];

export const mockCustomerData = [
    { id: 'C001', name: 'João Silva', email: 'joao.silva@example.com', phone: '11987654321', registrationDate: '2023-01-15', lastPurchaseDate: '2024-06-20', totalPurchases: 1500.50, orderCount: 12, status: 'Ativo' },
    { id: 'C002', name: 'Maria Souza', email: 'maria.souza@example.com', phone: '11991234567', registrationDate: '2023-02-01', lastPurchaseDate: '2024-06-18', totalPurchases: 2200.00, orderCount: 8, status: 'Ativo' },
    { id: 'C003', name: 'Pedro Lima', email: 'pedro.lima@example.com', phone: '11988776655', registrationDate: '2023-03-10', lastPurchaseDate: '2024-05-25', totalPurchases: 750.80, orderCount: 5, status: 'Inativo' },
    { id: 'C004', name: 'Ana Costa', email: 'ana.costa@example.com', phone: '11992345678', registrationDate: '2024-01-05', lastPurchaseDate: '2024-06-28', totalPurchases: 300.20, orderCount: 3, status: 'Ativo' },
    { id: 'C005', name: 'Carlos Santos', email: 'carlos.s@example.com', phone: '11987651234', registrationDate: '2024-02-20', lastPurchaseDate: '2024-06-10', totalPurchases: 50.00, orderCount: 1, status: 'Novo' },
    { id: 'C006', name: 'Mariana Pereira', email: 'mariana.p@example.com', phone: '11993456789', registrationDate: '2023-04-01', lastPurchaseDate: '2023-11-01', totalPurchases: 120.00, orderCount: 2, status: 'Inativo' },
    { id: 'C007', name: 'Lucas Rocha', email: 'lucas.r@example.com', phone: '11981234567', registrationDate: '2024-05-01', lastPurchaseDate: '2024-06-05', totalPurchases: 800.00, orderCount: 4, status: 'Novo' },
    { id: 'C008', name: 'Sofia Mendes', email: 'sofia.m@example.com', phone: '11990987654', registrationDate: '2023-06-15', lastPurchaseDate: '2024-06-22', totalPurchases: 450.00, orderCount: 6, status: 'Ativo' },
    { id: 'C009', name: 'Gabriel Almeida', email: 'gabriel.a@example.com', phone: '11987659876', registrationDate: '2024-06-01', lastPurchaseDate: '2024-06-25', totalPurchases: 150.00, orderCount: 1, status: 'Novo' },
    { id: 'C010', name: 'Isabela Fernandes', email: 'isabela.f@example.com', phone: '11991112233', registrationDate: '2023-07-01', lastPurchaseDate: '2024-06-01', totalPurchases: 900.00, orderCount: 7, status: 'Ativo' },
    { id: 'C011', name: 'Rafael Cardoso', email: 'rafael.c@example.com', phone: '11983334455', registrationDate: '2023-08-01', lastPurchaseDate: '2024-01-10', totalPurchases: 200.00, orderCount: 2, status: 'Inativo' },
    { id: 'C012', name: 'Juliana Gomes', email: 'juliana.g@example.com', phone: '11995556677', registrationDate: '2024-06-10', lastPurchaseDate: '2024-06-29', totalPurchases: 100.00, orderCount: 1, status: 'Novo' },
    { id: 'C013', name: 'Fernando Dias', email: 'fernando.d@example.com', phone: '11986667788', registrationDate: '2023-09-01', lastPurchaseDate: '2024-06-15', totalPurchases: 1800.00, orderCount: 10, status: 'Ativo' },
    { id: 'C014', name: 'Beatriz Martins', email: 'beatriz.m@example.com', phone: '11997778899', registrationDate: '2024-03-01', lastPurchaseDate: '2024-06-08', totalPurchases: 600.00, orderCount: 3, status: 'Ativo' },
    { id: 'C015', name: 'Roberto Vieira', email: 'roberto.v@example.com', phone: '11988889900', registrationDate: '2023-10-01', lastPurchaseDate: '2024-02-01', totalPurchases: 350.00, orderCount: 4, status: 'Inativo' },
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

export const mockAuditLogs = [
    {
        id: 'AUD001',
        timestamp: '2024-07-25T10:00:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Login',
        module: 'Sistema',
        description: 'Login bem-sucedido do usuário admin@farmacia.com'
    },
    {
        id: 'AUD002',
        timestamp: '2024-07-25T10:05:30Z',
        user: 'admin@farmacia.com',
        actionType: 'Criação',
        module: 'Produtos',
        description: 'Novo produto "Paracetamol 750mg" criado.'
    },
    {
        id: 'AUD003',
        timestamp: '2024-07-25T10:15:45Z',
        user: 'gerente@farmacia.com',
        actionType: 'Edição',
        module: 'Produtos',
        description: 'Produto "Ibuprofeno 400mg" atualizado: preço de R$15.00 para R$14.50.'
    },
    {
        id: 'AUD004',
        timestamp: '2024-07-25T10:20:10Z',
        user: 'admin@farmacia.com',
        actionType: 'Exclusão',
        module: 'Promoções',
        description: 'Promoção "Desconto de Verão 10%" excluída.'
    },
    {
        id: 'AUD005',
        timestamp: '2024-07-25T10:30:00Z',
        user: 'vendedor@farmacia.com',
        actionType: 'Visualização',
        module: 'Relatórios',
        description: 'Relatório "Análise de Vendas" visualizado por vendedor@farmacia.com.'
    },
    {
        id: 'AUD006',
        timestamp: '2024-07-25T11:00:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Criação',
        module: 'Usuários',
        description: 'Novo usuário "caixa01@farmacia.com" criado com perfil "Caixa".'
    },
    {
        id: 'AUD007',
        timestamp: '2024-07-25T11:15:00Z',
        user: 'caixa01@farmacia.com',
        actionType: 'Login',
        module: 'Sistema',
        description: 'Login bem-sucedido do usuário caixa01@farmacia.com'
    },
    {
        id: 'AUD008',
        timestamp: '2024-07-25T11:30:00Z',
        user: 'caixa01@farmacia.com',
        actionType: 'Venda',
        module: 'Vendas',
        description: 'Venda registrada: Pedido #20240725-001 (3 itens).'
    },
    {
        id: 'AUD009',
        timestamp: '2024-07-24T15:00:00Z',
        user: 'gerente@farmacia.com',
        actionType: 'Edição',
        module: 'Promoções',
        description: 'Promoção "Frete Grátis acima de R$150" status alterado para Inativa.'
    },
    {
        id: 'AUD010',
        timestamp: '2024-07-24T16:00:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Configuração',
        module: 'Sistema',
        description: 'Configuração de impostos atualizada.'
    },
    {
        id: 'AUD011',
        timestamp: '2024-07-23T09:00:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Criação',
        module: 'Produtos',
        description: 'Novo produto "Protetor Solar FPS 30" criado.'
    },
    {
        id: 'AUD012',
        timestamp: '2024-07-23T10:00:00Z',
        user: 'gerente@farmacia.com',
        actionType: 'Visualização',
        module: 'Clientes',
        description: 'Perfil do cliente "Maria Silva" visualizado.'
    },
    {
        id: 'AUD013',
        timestamp: '2024-07-22T08:00:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Exclusão',
        module: 'Usuários',
        description: 'Usuário "antigo_func@farmacia.com" excluído.'
    },
    {
        id: 'AUD014',
        timestamp: '2024-07-22T09:30:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Login Falho',
        module: 'Sistema',
        description: 'Tentativa de login falha para "desconhecido@farmacia.com".'
    },
    {
        id: 'AUD015',
        timestamp: '2024-07-22T09:35:00Z',
        user: 'admin@farmacia.com',
        actionType: 'Login Falho',
        module: 'Sistema',
        description: 'Tentativa de login falha para "admin@farmacia.com" (senha incorreta).'
    },
    {
        id: 'AUD016',
        timestamp: '2024-07-22T09:35:30Z',
        user: 'admin@farmacia.com',
        actionType: 'Login',
        module: 'Sistema',
        description: 'Login bem-sucedido do usuário admin@farmacia.com'
    },
];

export const mockSpedFiles = [
    {
        id: 'SPED001',
        fileName: 'SPED_CONTABIL_ECD_2023_FARMACIA_A.zip',
        spedType: 'SPED Contábil (ECD)',
        periodStart: '2023-01-01',
        periodEnd: '2023-12-31',
        generationDate: '2024-03-10T14:30:00Z',
        status: 'Gerado'
    },
    {
        id: 'SPED002',
        fileName: 'SPED_CONTABIL_ECF_2023_FARMACIA_A.zip',
        spedType: 'SPED Contábil (ECF)',
        periodStart: '2023-01-01',
        periodEnd: '2023-12-31',
        generationDate: '2024-05-20T10:00:00Z',
        status: 'Gerado'
    },
    {
        id: 'SPED003',
        fileName: 'SPED_FISCAL_ICMS_IPI_2024_01_FARMACIA_A.zip',
        spedType: 'SPED Fiscal (ICMS/IPI)',
        periodStart: '2024-01-01',
        periodEnd: '2024-01-31',
        generationDate: '2024-02-15T09:00:00Z',
        status: 'Gerado'
    },
    {
        id: 'SPED004',
        fileName: 'SPED_CONTRIBUICOES_PIS_COFINS_2024_01_FARMACIA_A.zip',
        spedType: 'SPED Contribuições (PIS/COFINS)',
        periodStart: '2024-01-01',
        periodEnd: '2024-01-31',
        generationDate: '2024-02-20T11:00:00Z',
        status: 'Erro' // Exemplo de status de erro
    },
    {
        id: 'SPED005',
        fileName: 'SPED_CONTABIL_ECD_2022_FARMACIA_A.zip',
        spedType: 'SPED Contábil (ECD)',
        periodStart: '2022-01-01',
        periodEnd: '2022-12-31',
        generationDate: '2023-03-05T16:00:00Z',
        status: 'Gerado'
    },
    {
        id: 'SPED006',
        fileName: 'SPED_CONTABIL_ECF_2022_FARMACIA_A.zip',
        spedType: 'SPED Contábil (ECF)',
        periodStart: '2022-01-01',
        periodEnd: '2022-12-31',
        generationDate: '2023-05-15T09:30:00Z',
        status: 'Gerado'
    },
    {
        id: 'SPED007',
        fileName: 'SPED_CONTABIL_ECD_2024_FARMACIA_A.zip',
        spedType: 'SPED Contábil (ECD)',
        periodStart: '2024-01-01',
        periodEnd: '2024-12-31',
        generationDate: '2025-01-10T10:00:00Z',
        status: 'Em Processamento' // Exemplo de status em processamento
    }
];