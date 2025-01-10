import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import PostList from "../components/MiniBlog/PostList";
import PostForm from "../components/MiniBlog/PostForm";

const CryptoDetailsPage = () => {
  const { cryptoId } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptoResponse, historyResponse] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`),
          fetch(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7`
          ),
        ]);

        if (!cryptoResponse.ok || !historyResponse.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }

        const cryptoData = await cryptoResponse.json();
        const priceHistoryData = await historyResponse.json();

        const formattedData = priceHistoryData.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price,
        }));

        setCryptoData(cryptoData);
        setPriceHistory(formattedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
      <p>{cryptoData.description?.en?.slice(0, 200) || "Aucune description disponible."}</p>

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
          <li>Volume : ${cryptoData.market_data?.total_volume?.usd?.toLocaleString()}</li>
          <li>
            Capitalisation : $
            {cryptoData.market_data?.market_cap?.usd?.toLocaleString()}
          </li>
          <li>
            Variation (24h) :{" "}
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
