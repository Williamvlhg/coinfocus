import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import './Market.css';

const Market = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 10;

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 100,
                            page: 1,
                            sparkline: false
                        }
                    }
                );
                setCoins(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Une erreur est survenue lors du chargement des données");
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const totalPages = Math.ceil(coins.length / coinsPerPage);

    return (
        <>
        <Header />
        <div className="content">
            <div className="market-container">
                {loading ? (
                    <div className="loading">Chargement des cryptos...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <div>
                        <table className="coin-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prix</th>
                                    <th>Changement 24h</th>
                                    <th>Cap du marché</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coins.slice(indexOfFirstCoin, indexOfLastCoin).map((coin) => (
                                    <tr key={coin.id}>
                                        <td className="coin-name">
                                            <img 
                                                src={coin.image}
                                                alt={coin.name}
                                                className="coin-icon"
                                            />
                                            {coin.name}
                                        </td>
                                        <td>${coin.current_price.toFixed(2)}</td>
                                        <td className={coin.price_change_percentage_24h > 0 ? "positive" : "negative"}>
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </td>
                                        <td>${coin.market_cap.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="pagination-controls">
                            <button 
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                            >
                                Précédent
                            </button>
                            <span className="page-info">
                                Page {currentPage} sur {totalPages}
                            </span>
                            <button 
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
    
};

export default Market;