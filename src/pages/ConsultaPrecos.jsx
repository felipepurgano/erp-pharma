// pages/ConsultaPrecos.jsx
import { useState, useEffect } from "react";
import Sidebar from "@/layouts/Sidebar";
import styles from "@/pages/ConsultaPrecos.module.css";
import { FiSearch } from "react-icons/fi";
import { produtosMock } from "@/utils/mocks";

export default function ConsultaPrecos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts([]);
            setSelectedProduct(null);
            return;
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = produtosMock.filter(product =>
            product.nomeComercial.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.nomeGenerico.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.codigoBarras.includes(lowerCaseSearchTerm) ||
            product.sku.toLowerCase().includes(lowerCaseSearchTerm)
        ).sort((a, b) => a.nomeComercial.localeCompare(b.nomeComercial)); // Ordena por nome comercial

        setFilteredProducts(results);
        setSelectedProduct(null); // Limpa o produto selecionado ao digitar nova busca
    }, [searchTerm]);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setSearchTerm(product.nomeComercial); // Preenche a barra de busca com o nome do produto selecionado
        setFilteredProducts([]); // Esconde a lista de resultados após selecionar
    };

    return (
        <Sidebar>
            <div className={styles.container}>
                <h1 className={styles.title}>Consulta de Preços</h1>

                <div className={styles.searchSection}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="searchTerm">Buscar Produto:</label>
                        <div className={styles.searchInputContainer}>
                            <input
                                id="searchTerm"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.inputField}
                                placeholder="Nome, SKU, Código de Barras, Genérico..."
                            />
                            <FiSearch className={styles.searchIcon} />
                        </div>
                    </div>

                    {filteredProducts.length > 0 && searchTerm.trim() !== "" && (
                        <div className={styles.searchResults}>
                            <ul className={styles.productList}>
                                {filteredProducts.map(product => (
                                    <li key={product.id} onClick={() => handleProductSelect(product)}>
                                        {product.nomeComercial} ({product.sku}) - R$ {product.precoVenda?.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {selectedProduct && (
                    <div className={styles.productDetailsSection}>
                        <h2 className={styles.sectionTitle}>Detalhes do Produto</h2>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <strong>Nome Comercial:</strong> <span>{selectedProduct.nomeComercial}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Nome Genérico:</strong> <span>{selectedProduct.nomeGenerico || 'N/A'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>SKU:</strong> <span>{selectedProduct.sku}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Cód. de Barras:</strong> <span>{selectedProduct.codigoBarras}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Laboratório:</strong> <span>{selectedProduct.laboratorio || 'N/A'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Apresentação:</strong> <span>{selectedProduct.apresentacao || 'N/A'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Concentração:</strong> <span>{selectedProduct.concentracao || 'N/A'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Unidade de Medida:</strong> <span>{selectedProduct.unidadeMedida || 'N/A'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Estoque Atual:</strong> <span className={selectedProduct.estoqueAtual <= 10 ? styles.lowStock : ''}>{selectedProduct.estoqueAtual}</span>
                            </div>
                            <div className={`${styles.detailItem} ${styles.priceItem}`}>
                                <strong>Preço de Venda:</strong> <span className={styles.priceValue}>R$ {selectedProduct.precoVenda?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className={`${styles.detailItem} ${styles.priceItem}`}>
                                <strong>Preço de Custo:</strong> <span className={styles.priceValue}>R$ {selectedProduct.precoCusto?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong>Controlado:</strong> <span>{selectedProduct.controlado ? 'Sim' : 'Não'}</span>
                            </div>
                            {selectedProduct.controlado && (
                                <div className={styles.detailItem}>
                                    <strong>Tipo Receita:</strong> <span>{selectedProduct.tipoReceita || 'N/A'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!selectedProduct && searchTerm.trim() !== "" && filteredProducts.length === 0 && (
                    <div className={styles.noResultsMessage}>Nenhum produto encontrado com o termo "{searchTerm}".</div>
                )}
                 {!selectedProduct && searchTerm.trim() === "" && (
                    <div className={styles.initialMessage}>
                        Comece a digitar no campo de busca para encontrar produtos e ver seus detalhes de preço e estoque.
                    </div>
                )}
            </div>
        </Sidebar>
    );
}