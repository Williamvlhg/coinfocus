import React, { useState } from 'react';

const TradeForm = ({ onTrade }) => {
  const [crypto, setCrypto] = useState('Bitcoin');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('buy');
  const [targetPrice, setTargetPrice] = useState("")

  const handleTrade = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert('Veuillez entrer un montant valide.');
      return;
    }

    if (targetPrice) {
        onTrade({
          crypto,
          amount: parseFloat(amount),
          type,
          targetPrice: parseFloat(targetPrice),
        });
        setAmount("");
        setTargetPrice("");
        alert(`Ordre limité placé : ${type.toUpperCase()} ${crypto} à $${targetPrice}`);
      } else {
    onTrade({ crypto, amount: parseFloat(amount), type });
    setAmount('');
      }
  };

  return (
    <div className="trade-form">
      <h2>Passer un Ordre</h2>
      <form onSubmit={handleTrade}>
    <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
      <option>Bitcoin</option>
      <option>Ethereum</option>
      <option>Cardano</option>
    </select>
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Montant en USD"
    />
    <select value={type} onChange={(e) => setType(e.target.value)}>
      <option value="buy">Acheter</option>
      <option value="sell">Vendre</option>
    </select>
    <input
      type="number"
      value={targetPrice}
      onChange={(e) => setTargetPrice(e.target.value)}
      placeholder="Prix cible (optionnel)"
    />
    <button type="submit">Valider</button>
  </form>
    </div>
  );
};

export default TradeForm;
