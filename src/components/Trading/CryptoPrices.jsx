import React, { useEffect, useState } from 'react';

const CryptoPrices = ({onUpdatePrices}) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
        const data = await response.json();
        const newPrices = {
          Bitcoin: data.bitcoin.usd,
          Ethereum: data.ethereum.usd,
          Cardano: data.cardano.usd,
        };
        setPrices(newPrices);
        onUpdatePrices(newPrices); // Envoyer les prix à TradingPage
      } catch (error) {
        console.error('Erreur lors de la récupération des prix:', error);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, [onUpdatePrices]);

  return (
    <div className="crypto-prices">
      <h2>Prix des Cryptos</h2>
      <ul>
      {Object.entries(prices).map(([crypto, price]) => (
          <li key={crypto.name}>
            {crypto}: ${price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPrices;
