import React, { Component } from 'react'
import TransactionForm from './TransactionForm'

const TransactionMenu = ({
  transactionMenuVisible,
  toggleTransactionMenu,
  handleSubmitTransaction,
  incomeStatement,
  activeCustomerID,
  activeCustomerTotal,
  updateIncomeStatementTotals
}) => {
  let transactionMenuClass = `transaction-menu-full-screen`
  transactionMenuVisible ?
    transactionMenuClass = `transaction-menu-full-screen visible` :
    transactionMenuClass = `transaction-menu-full-screen`

  return (
    <div
      className={transactionMenuClass}
    >
      <div className="transaction-menu-inner">
        <h5>Transaction List</h5>
        <p>Enter the amount of your transaction and click the Submit button.</p>
        {
          incomeStatement.map( item => (
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
          ))
        }
        <button
          className="transaction-menu-button-done"
          onClick={e => toggleTransactionMenu(e)}
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default TransactionMenu