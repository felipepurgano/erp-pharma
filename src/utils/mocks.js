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
  { id: 1, nome: "Maria Silva", cpf: "123.456.789-00" },
  { id: 2, nome: "João Souza", cpf: "987.654.321-00" },
  { id: 3, nome: "Ana Costa", cpf: "456.789.123-00" },
  { id: 4, nome: "Pedro Oliveira", cpf: "111.222.333-44" },
  { id: 5, nome: "Carla Martins", cpf: "555.666.777-88" },
  { id: 6, nome: "Bruno Lima", cpf: "999.888.777-66" },
  { id: 7, nome: "Fernanda Rocha", cpf: "321.654.987-00" },
  { id: 8, nome: "Lucas Fernandes", cpf: "741.852.963-12" },
  { id: 9, nome: "Juliana Reis", cpf: "369.258.147-00" },
  { id: 10, nome: "Paulo Santos", cpf: "654.321.987-10" },
  { id: 11, nome: "Vanessa Moura", cpf: "741.963.852-20" },
  { id: 12, nome: "Ricardo Alves", cpf: "111.333.555-77" },
  { id: 13, nome: "Débora Mendes", cpf: "999.000.888-77" },
  { id: 14, nome: "Marcos Tavares", cpf: "666.777.888-99" },
  { id: 15, nome: "Bianca Lopes", cpf: "222.444.666-00" },
  { id: 16, nome: "Felipe Garcia", cpf: "555.333.111-22" },
  { id: 17, nome: "Tatiane Azevedo", cpf: "888.999.000-11" },
  { id: 18, nome: "Eduardo Ramos", cpf: "444.222.111-55" },
  { id: 19, nome: "Aline Peixoto", cpf: "777.555.333-22" },
  { id: 20, nome: "Roberto Silva", cpf: "333.666.999-88" }
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
