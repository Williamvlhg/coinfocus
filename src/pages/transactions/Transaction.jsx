import { useState, useEffect } from "react";
import Form from "../../Components/Form";
import History from "./History";

const Transaction = () => {
  const [wallet, setWallet] = useState(() => {
    const savedWallet = localStorage.getItem("wallet");
    return savedWallet
      ? JSON.parse(savedWallet)
      : { cryptoBalance: 0, dollarBalance: 0 };
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(null);

  useEffect(() => {
    console.log("Wallet updated in localStorage:", wallet);
    localStorage.setItem("wallet", JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleDeposit = (data) => {
    const { amount, currency } = data;
    const amountNum = parseFloat(amount);

    setWallet((prevWallet) => {
      const updatedWallet = {
        ...prevWallet,
        cryptoBalance:
          currency === "crypto"
            ? prevWallet.cryptoBalance + amountNum
            : prevWallet.cryptoBalance,
        dollarBalance:
          currency === "dollar"
            ? prevWallet.dollarBalance + amountNum
            : prevWallet.dollarBalance,
      };
      console.log("Updated Wallet (Deposit):", updatedWallet);
      return updatedWallet;
    });

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { type: "Deposit", amount: amountNum, currency, date: new Date() },
    ]);
    closeModal()
  };

  const handleWithdrawal = (data) => {
    const { amount, address } = data;
    const amountNum = parseFloat(amount);

    if (amountNum <= wallet.cryptoBalance) {
      setWallet((prevWallet) => {
        const updatedWallet = {
          ...prevWallet,
          cryptoBalance: prevWallet.cryptoBalance - amountNum,
        };
        console.log("Updated Wallet (Withdrawal):", updatedWallet);
        return updatedWallet;
      });

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { type: "Withdraw", amount: amountNum, address, date: new Date() },
      ]);
      closeModal()
    } else {
      alert("Insufficient balance");
    }
  };

  const openModal = (operation) => {
    setCurrentOperation(operation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOperation(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div className="App-transactions">
      <div className="header-transactions">
        <h1 className="white">Crypto Wallet</h1>
        <div className="balance-title white">
          <h2></h2>
          <h2>Cryptos balance : {wallet.cryptoBalance}</h2>
          <h2>Dollars balance: ${wallet.dollarBalance}</h2>
          <h2></h2>
        </div>
      </div>

      <div className="main-transactions">
        <div className="card" onClick={() => openModal("Deposit")}>
          <div className="card-title">Deposit</div>
          <div className="card-description">Add funds to your wallet</div>
        </div>

        <div className="card" onClick={() => openModal("Withdraw")}>
          <div className="card-title">Withdraw</div>
          <div className="card-description">Withdraw funds from your crypto wallet to your external wallet</div>
        </div>
      </div>

      <div className="history-transactions white">
        <History transactions={transactions} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal open" onClick={handleOutsideClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close" onClick={closeModal}>
              &times;
            </div>
            <div className="modal-header">
              {currentOperation === "Deposit" && "Deposit Funds"}
              {currentOperation === "Withdraw" && "Withdraw Funds"}
              {currentOperation === "Transfer" && "Transfer Funds"}
            </div>
            <div className="modal-body">
              <Form
                title={currentOperation}
                fields={
                  currentOperation === "Deposit"
                    ? [
                        { name: "amount", label: "Amount", type: "number", required: true },
                        {
                          name: "currency",
                          label: "Currency",
                          type: "select",
                          options: [
                            { value: "crypto", label: "Crypto" },
                            { value: "dollar", label: "Euro" },
                          ],
                          required: true,
                        },
                      ]
                    : currentOperation === "Withdraw"
                    ? [
                        { name: "amount", label: "Amount", type: "number", required: true },
                        { name: "address", label: "Wallet Address", type: "text", required: true },
                      ]
                    : [
                        { name: "amount", label: "Amount", type: "number", required: true },
                        { name: "iban", label: "IBAN", type: "text", required: true },
                      ]
                }
                onSubmit={currentOperation === "Deposit" ? handleDeposit : handleWithdrawal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
