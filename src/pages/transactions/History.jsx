const History = ({ transactions }) => {
  return (
    <div className="section-history">
        <div className="transactions-history">
            <h2>Historique des transactions</h2>
            <ul>
                {transactions.map((transaction, index) => (
                <li key={index}>
                    {transaction.type} : {transaction.amount}{" "}
                    {transaction.currency || ''} 
                    {transaction.address && (
                    <>
                        vers cette adresse <strong>{transaction.address}</strong>
                    </>
                    )}
                    - {new Date(transaction.date).toLocaleString()}
                </li>
                ))}
            </ul>
        </div>
    </div>
    
  );
};

export default History;
