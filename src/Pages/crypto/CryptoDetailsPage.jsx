import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import PostList from "../../Components/MiniBlog/PostList";
import PostForm from "../../Components/MiniBlog/PostForm";

// Fonction utilitaire pour ajouter un délai entre les requêtes
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Générer des données fictives
const generateFakePriceData = () => {
  const data = [];
  let currentPrice = 50000; // Prix initial de la crypto-monnaie (par exemple Bitcoin)
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (7 - i)); // Récupère les 7 derniers jours
    const priceChange = (Math.random() - 0.5) * 2000; // Variation aléatoire entre -2000 et +2000
    currentPrice += priceChange;

    data.push({
      date: date.toLocaleDateString(),
      price: Math.max(0, currentPrice), // Empêche le prix de devenir négatif
    });
  }
  return data;
};

const CryptoDetailsPage = () => {
  const { cryptoId } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Vérifiez si les données sont déjà dans le localStorage
      const storedCryptoData = localStorage.getItem(`cryptoData-${cryptoId}`);
      const storedPriceHistory = localStorage.getItem(`priceHistory-${cryptoId}`);

      if (storedCryptoData && storedPriceHistory) {
        // Si elles existent, utilisez les données stockées
        setCryptoData(JSON.parse(storedCryptoData));
        setPriceHistory(JSON.parse(storedPriceHistory));
        setLoading(false);
      } else {
        try {
          // Simuler des données de crypto-monnaie
          const fakeCryptoData = {
            name: "Bitcoin",
            symbol: "BTC",
            description: {
              en: "Bitcoin is a decentralized digital currency without a central bank or single administrator."
            },
            market_data: {
              total_volume: { usd: 35000000000 },
              market_cap: { usd: 850000000000 },
              price_change_percentage_24h: Math.random() * 10 - 5, // Variation de prix aléatoire entre -5% et +5%
            },
          };

          // Générer des données fictives pour l'historique des prix
          const generatedPriceHistory = generateFakePriceData();

          // Stockage des données dans le localStorage
          localStorage.setItem(`cryptoData-${cryptoId}`, JSON.stringify(fakeCryptoData));
          localStorage.setItem(`priceHistory-${cryptoId}`, JSON.stringify(generatedPriceHistory));

          // Mise à jour des états
          setCryptoData(fakeCryptoData);
          setPriceHistory(generatedPriceHistory);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cryptoId]);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (!cryptoData || priceHistory.length === 0) {
    return <div>Impossible de charger les données.</div>;
  }

  return (
    <div className="crypto-details-page">
      <h1>
        {cryptoData.name} ({cryptoData.symbol.toUpperCase()})
      </h1>
      <p>
        {cryptoData.description?.en?.slice(0, 200) ||
          "Aucune description disponible."}
      </p>

      <div className="price-chart">
        <h2>Évolution des prix (7 derniers jours)</h2>
        <LineChart width={600} height={300} data={priceHistory}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>

      <div className="crypto-stats">
        <h2>Statistiques</h2>
        <ul>
          <li>
            Volume : ${cryptoData.market_data?.total_volume?.usd?.toLocaleString()}
          </li>
          <li>
            Capitalisation : ${cryptoData.market_data?.market_cap?.usd?.toLocaleString()}
          </li>
          <li>
            Variation (24h) :
            {cryptoData.market_data?.price_change_percentage_24h?.toFixed(2) || 0}%
          </li>
        </ul>
      </div>

      <div className="crypto-blog">
        <h2>Discussion</h2>
        <PostForm crypto={cryptoId} />
        <PostList posts={[]} />
      </div>
    </div>
  );
};

export default CryptoDetailsPage;
