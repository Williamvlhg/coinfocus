const Portfolio = ({ balance, holdings, prices }) => {
  if (!prices) {
    return <p>Chargement des prix...</p>;
  }

  const totalHoldingsValue = Object.entries(holdings).reduce(
    (total, [crypto, quantity]) => total + (prices[crypto] || 0) * quantity,
    0
  );
  const totalPortfolioValue = balance + totalHoldingsValue;

  return (
    <div className="portfolio">
      <h2>Portefeuille</h2>
      <p>Solde en USD : ${balance.toFixed(2)}</p>
      <p>Valeur des cryptos : ${totalHoldingsValue.toFixed(2)}</p>
      <p>Valeur totale : ${totalPortfolioValue.toFixed(2)}</p>
      <ul>
        {Object.entries(holdings).map(([crypto, quantity]) => (
          <li key={crypto}>
            {crypto}: {quantity.toFixed(4)} unités (${((prices[crypto] || 0) * quantity).toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
