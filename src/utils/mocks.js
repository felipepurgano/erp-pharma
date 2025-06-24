// Lista fictícia de produtos (medicamentos)
export const produtosMock = [
  { codigo: "123456", nome: "Paracetamol 500mg", laboratorio: "Farmalab", classe: "Analgésico", principio: "Paracetamol", preco: 5.50 },
  { codigo: "789012", nome: "Amoxicilina 500mg", laboratorio: "Genfar", classe: "Antibiótico", principio: "Amoxicilina", preco: 12.30 },
  { codigo: "345678", nome: "Ibuprofeno 400mg", laboratorio: "Medley", classe: "Anti-inflamatório", principio: "Ibuprofeno", preco: 8.90 },
  { codigo: "901234", nome: "Dipirona 1g", laboratorio: "Neo Química", classe: "Analgésico", principio: "Dipirona", preco: 4.20 },
  { codigo: "901234", nome: "Dipirona 500mg", laboratorio: "Neo Química", classe: "Analgésico", principio: "Dipirona", preco: 3.20 },
  { codigo: "112233", nome: "Cetirizina 10mg", laboratorio: "EMS", classe: "Antialérgico", principio: "Cetirizina", preco: 6.75 },
  { codigo: "223344", nome: "Omeprazol 20mg", laboratorio: "Teuto", classe: "Antiácido", principio: "Omeprazol", preco: 9.50 },
  { codigo: "334455", nome: "Losartana 50mg", laboratorio: "Eurofarma", classe: "Anti-hipertensivo", principio: "Losartana", preco: 7.80 },
  { codigo: "445566", nome: "Simeticona 125mg", laboratorio: "Neo Química", classe: "Antigases", principio: "Simeticona", preco: 5.10 },
  { codigo: "556677", nome: "Metformina 850mg", laboratorio: "EMS", classe: "Antidiabético", principio: "Metformina", preco: 11.00 },
  { codigo: "667788", nome: "Clonazepam 2mg", laboratorio: "Teuto", classe: "Ansiolítico", principio: "Clonazepam", preco: 14.90 },
  { codigo: "778899", nome: "Loratadina 10mg", laboratorio: "Medley", classe: "Antialérgico", principio: "Loratadina", preco: 6.25 },
  { codigo: "889900", nome: "Sinvastatina 20mg", laboratorio: "EMS", classe: "Hipolipemiante", principio: "Sinvastatina", preco: 10.40 },
  { codigo: "998877", nome: "Azitromicina 500mg", laboratorio: "Genfar", classe: "Antibiótico", principio: "Azitromicina", preco: 18.90 },
  { codigo: "121212", nome: "Prednisona 20mg", laboratorio: "Neo Química", classe: "Corticóide", principio: "Prednisona", preco: 7.60 },
  { codigo: "131313", nome: "Diclofenaco Sódico 50mg", laboratorio: "Teuto", classe: "Anti-inflamatório", principio: "Diclofenaco", preco: 6.80 },
  { codigo: "141414", nome: "Ranitidina 150mg", laboratorio: "Medley", classe: "Antiácido", principio: "Ranitidina", preco: 8.10 },
  { codigo: "151515", nome: "Sertralina 50mg", laboratorio: "Eurofarma", classe: "Antidepressivo", principio: "Sertralina", preco: 13.70 },
  { codigo: "161616", nome: "Pantoprazol 40mg", laboratorio: "Teuto", classe: "Inibidor da bomba de prótons", principio: "Pantoprazol", preco: 10.60 },
  { codigo: "171717", nome: "Enalapril 10mg", laboratorio: "EMS", classe: "Anti-hipertensivo", principio: "Enalapril", preco: 5.90 },
  { codigo: "181818", nome: "Hidroclorotiazida 25mg", laboratorio: "Neo Química", classe: "Diurético", principio: "Hidroclorotiazida", preco: 4.80 }
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


// Simula envio da venda e retorna um número de cupom
export const enviarVendaMock = ({ itens, total }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "ok",
        numero_cupom: Math.floor(Math.random() * 90000) + 10000, // número aleatório entre 10000 e 99999
      });
    }, 1000);
  });
};
