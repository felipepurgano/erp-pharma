import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/AnaliseProdutos.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Importar o Sidebar
import Sidebar from '@/layouts/Sidebar'; // Ajuste o caminho se seu Sidebar estiver em outro lugar, ex: '@/components/layouts/Sidebar'

// Importar os dados mockados
import { mockProductSales } from '@/utils/mocks'; // Ajuste o caminho se seu arquivo mock.js estiver em outro lugar, ex: '@/data/mock'

// Importe componentes de gráfico se for usar, por exemplo:
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

export default function AnaliseProdutos() {
    // Estados para filtros
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para dados processados
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [summaryMetrics, setSummaryMetrics] = useState({});
    const [topProductsByQuantity, setTopProductsByQuantity] = useState([]);
    const [topProductsByRevenue, setTopProductsByRevenue] = useState([]);
    // const [salesTrendData, setSalesTrendData] = useState({}); // Para dados de gráfico de linha

    // Extrair categorias e fornecedores únicos para os filtros
    const uniqueCategories = [...new Set(mockProductSales.map(item => item.category))];
    const uniqueSuppliers = [...new Set(mockProductSales.map(item => item.supplier))];

    // Efeito para filtrar e processar os dados sempre que os filtros mudam
    useEffect(() => {
        let filtered = mockProductSales.filter(product => {
            const productDate = new Date(product.date);
            // Certifica-se de que as datas de início/fim sejam tratadas como o início/fim do dia
            const startOfDay = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null;
            const endOfDay = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null;

            const matchesDate = (!startOfDay || productDate >= startOfDay) &&
                (!endOfDay || productDate <= endOfDay);
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            const matchesSupplier = !selectedSupplier || product.supplier === selectedSupplier;
            const matchesSearch = !searchTerm ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.id.toString().includes(searchTerm);

            return matchesDate && matchesCategory && matchesSupplier && matchesSearch;
        });

        setFilteredProducts(filtered);

        // Calcular métricas de resumo
        const totalRevenue = filtered.reduce((sum, p) => sum + (p.quantity * p.price), 0);
        const totalQuantitySold = filtered.reduce((sum, p) => sum + p.quantity, 0);
        // Usar um Set para contar produtos únicos de forma mais robusta (se houver vendas repetidas do mesmo ID/nome)
        const uniqueProductsCount = new Set(filtered.map(p => p.id)).size;

        setSummaryMetrics({
            totalRevenue: totalRevenue.toFixed(2),
            totalQuantitySold: totalQuantitySold,
            uniqueProductsCount: uniqueProductsCount,
        });

        // Calcular Top Produtos por Quantidade e Receita
        const productAggregates = filtered.reduce((acc, product) => {
            const key = product.name; // Agrupar por nome do produto
            if (!acc[key]) {
                acc[key] = { name: product.name, quantity: 0, revenue: 0, id: product.id }; // Mantém um ID de exemplo
            }
            acc[key].quantity += product.quantity;
            acc[key].revenue += product.quantity * product.price;
            return acc;
        }, {});

        const sortedByQuantity = Object.values(productAggregates)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5); // Top 5
        setTopProductsByQuantity(sortedByQuantity);

        const sortedByRevenue = Object.values(productAggregates)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5); // Top 5
        setTopProductsByRevenue(sortedByRevenue);

        // --- Preparar dados para Gráficos (Exemplo para react-chartjs-2) ---
        // Seção de código comentada para gráficos, como no exemplo anterior.

    }, [startDate, endDate, selectedCategory, selectedSupplier, searchTerm]); // Dependências dos filtros


    return (
        <Sidebar> {/* Sidebar envolvendo o conteúdo da página */}
            <div className={styles.productAnalysisPage}>
                <h1 className={styles.pageTitle}>Análise de Produtos</h1>

                {/* Seção de Filtros */}
                <div className={styles.filtersSection}>
                    <div className={styles.filterGroup}>
                        <label>Período:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Data Início"
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePickerInput}
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="Data Fim"
                            dateFormat="dd/MM/yyyy"
                            className={styles.datePickerInput}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Categoria:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todas</option>
                            {uniqueCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Fornecedor:</label>
                        <select
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Todos</option>
                            {uniqueSuppliers.map(sup => (
                                <option key={sup} value={sup}>{sup}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Buscar Produto:</label>
                        <input
                            type="text"
                            placeholder="Nome ou ID do produto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.textInput}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                            setSelectedCategory('');
                            setSelectedSupplier('');
                            setSearchTerm('');
                        }}
                        className={styles.clearFiltersButton}
                    >
                        Limpar Filtros
                    </button>
                </div>

                {/* Seção de Métricas de Resumo */}
                <div className={styles.summaryCards}>
                    <div className={styles.card}>
                        <h3>Receita Total de Produtos</h3>
                        <p>R$ {summaryMetrics.totalRevenue}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Quantidade Total Vendida</h3>
                        <p>{summaryMetrics.totalQuantitySold}</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Produtos Únicos Vendidos</h3>
                        <p>{summaryMetrics.uniqueProductsCount}</p>
                    </div>
                </div>

                {/* Seção de Gráficos */}
                <div className={styles.chartsSection}>
                    <div className={styles.chartCard}>
                        <h3>Top 5 Produtos por Quantidade Vendida</h3>
                        {/* Exemplo de uso de gráfico Bar (descomente se instalar react-chartjs-2) */}
                        {/* <Bar
                            data={{
                                labels: topProductsByQuantity.map(p => p.name),
                                datasets: [{
                                    label: 'Quantidade Vendida',
                                    data: topProductsByQuantity.map(p => p.quantity),
                                    backgroundColor: 'rgba(0, 51, 102, 0.7)',
                                }]
                            }}
                            options={{ responsive: true, plugins: { legend: { position: 'top' }} }}
                        /> */}
                        <div className={styles.chartPlaceholder}>
                            Gráfico de Barras aqui (Top Quantidade)
                            <ul>
                                {topProductsByQuantity.map(p => (
                                    <li key={p.id}>{p.name}: {p.quantity} un.</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.chartCard}>
                        <h3>Top 5 Produtos por Receita</h3>
                        {/* Exemplo de uso de gráfico Bar (descomente se instalar react-chartjs-2) */}
                        {/* <Bar
                            data={{
                                labels: topProductsByRevenue.map(p => p.name),
                                datasets: [{
                                    label: 'Receita',
                                    data: topProductsByRevenue.map(p => p.revenue),
                                    backgroundColor: 'rgba(0, 194, 165, 0.7)',
                                }]
                            }}
                            options={{ responsive: true, plugins: { legend: { position: 'top' }} }}
                        /> */}
                        <div className={styles.chartPlaceholder}>
                            Gráfico de Barras aqui (Top Receita)
                            <ul>
                                {topProductsByRevenue.map(p => (
                                    <li key={p.id}>{p.name}: R$ {p.revenue.toFixed(2)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Exemplo de Gráfico de Linha para Tendência de Vendas
                    <div className={styles.chartCardFullWidth}>
                        <h3>Tendência de Receita Diária</h3>
                         <Line data={salesTrendData} options={{ responsive: true, plugins: { legend: { position: 'top' }} }} />
                        <div className={styles.chartPlaceholder}>Gráfico de Linha aqui (Tendência de Vendas)</div>
                    </div>
                    */}
                </div>

                {/* Seção de Tabela Detalhada */}
                <div className={styles.detailTableSection}>
                    <h2>Detalhes dos Produtos</h2>
                    <div className={styles.tableContainer}>
                        <table className={styles.productTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Fornecedor</th>
                                    <th>Quantidade Vendida</th>
                                    <th>Preço Unitário</th>
                                    <th>Receita</th>
                                    <th>Data da Venda</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => (
                                        <tr key={`${product.id}-${product.date}-${product.quantity}`}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.supplier}</td>
                                            <td>{product.quantity}</td>
                                            <td>R$ {product.price.toFixed(2)}</td>
                                            <td>R$ {(product.quantity * product.price).toFixed(2)}</td>
                                            <td>{new Date(product.date).toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">Nenhum produto encontrado com os filtros aplicados.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}