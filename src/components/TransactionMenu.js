import React, { Component } from "react";
import TransactionForm from "./TransactionForm";
import classNames from "classnames";

const TransactionMenu = ({
  closeMenu,
  transactionMenuVisible,
  handleSubmitTransaction,
  incomeStatement,
  activeCustomerID,
  activeCustomerTotal,
  updateIncomeStatementTotals,
}) => {
  return (
    <div
      className={classNames({
        "transaction-menu-full-screen": true,
        visible: transactionMenuVisible,
      })}
    >
      <div className="transaction-menu-inner">
        <h5>Transaction List</h5>
        <p>Enter the amount of your transaction and click the Submit button.</p>
        {incomeStatement.map((item) => (
          <TransactionForm
            key={item.id}
            handleSubmitTransaction={handleSubmitTransaction}
            id={item.id}
            inputID={item.inputID}
            name={item.name}
            total={item.total}
            activeCustomerID={activeCustomerID}
            activeCustomerTotal={activeCustomerTotal}
            updateIncomeStatementTotals={updateIncomeStatementTotals}
          />
        ))}
        <button className="transaction-menu-button-done" onClick={closeMenu}>
          Done
        </button>
      </div>
    </div>
  );
};

export default TransactionMenu;
