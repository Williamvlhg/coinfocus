import React, { useState, useEffect } from "react";
import CryptoPrices from "../Components/Trading/CryptoPrices";
import TradeForm from "../Components/Trading/TradeForm";
import Portfolio from "../Components/Trading/Portfolio";
import TransactionHistory from "../Components/Trading/TransactionHistory";
import "./TradingPage.css";

const getFromLocalStorage = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Erreur lors du chargement de ${key} :`, error);
    return defaultValue;
  }
};

const TradingPage = () => {
  const [balance, setBalance] = useState(() =>
    getFromLocalStorage("balance", 1000)
  );
  const [holdings, setHoldings] = useState(() =>
    getFromLocalStorage("holdings", { Bitcoin: 0, Ethereum: 0, Cardano: 0 })
  );
  const [transactions, setTransactions] = useState(() =>
    getFromLocalStorage("transactions", [])
  );
  const [prices, setPrices] = useState({});

  const updatePrices = (newPrices) => {
    setPrices(newPrices);
  };
  const [limitOrders, setLimitOrders] = useState(() =>
    getFromLocalStorage("limitOrders", [])
  );

  // Sauvegarde dans localStorage lors des mises à jour
  useEffect(() => {
    localStorage.setItem("limitOrders", JSON.stringify(limitOrders));
  }, [limitOrders]);

  // Vérifier les ordres limités à chaque mise à jour des prix
  useEffect(() => {
    limitOrders.forEach((order) => {
      const { crypto, targetPrice, type, amount } = order;
      const currentPrice = prices[crypto];

      if (
        (type === "buy" && currentPrice <= targetPrice) ||
        (type === "sell" && currentPrice >= targetPrice)
      ) {
        handleTrade({ crypto, amount, type });
        setLimitOrders((prevOrders) => prevOrders.filter((o) => o !== order));
        alert(
          `Ordre limité exécuté : ${type.toUpperCase()} ${crypto} à $${currentPrice}`
        );
      }
    });
  }, [prices]);

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("holdings", JSON.stringify(holdings));
  }, [holdings]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleTrade = (order) => {
    const { crypto, amount, type } = order;
    const cryptoPrice = prices[crypto];

    if (!cryptoPrice) {
      alert("Les prix ne sont pas encore disponibles. Veuillez réessayer.");
      return;
    }

    const total = amount / cryptoPrice;

    if (type === "buy") {
      if (amount > balance) {
        alert("Solde insuffisant pour cet achat !");
        return;
      }
      setBalance((prevBalance) => prevBalance - amount);
      setHoldings((prevHoldings) => ({
        ...prevHoldings,
        [crypto]: prevHoldings[crypto] + total,
      }));
    } else if (type === "sell") {
      if (holdings[crypto] < total) {
        alert("Quantité insuffisante pour cette vente !");
        return;
      }
      setBalance((prevBalance) => prevBalance + amount);
      setHoldings((prevHoldings) => ({
        ...prevHoldings,
        [crypto]: prevHoldings[crypto] - total,
      }));
    }

    const newTransaction = {
      date: new Date().toLocaleString(),
      type,
      crypto,
      amount,
      price: cryptoPrice,
    };

    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
  };

  return (
    <div className="trading-page">
      <div className="trading-header">
        <h1>Trader des Cryptos</h1>
      </div>

      <div className="trading-main">
        <div className="crypto-prices-section">
          <CryptoPrices onUpdatePrices={updatePrices} />
        </div>

        <div className="trade-form-section">
          <TradeForm onTrade={handleTrade} />
        </div>
        <div className="portfolio">
          {" "}
          <Portfolio balance={balance} holdings={holdings} prices={prices} />
        </div>
      </div>

      <div className="transaction-history-section">
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default TradingPage;
