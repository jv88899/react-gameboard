import React, { Component } from 'react';
import { render } from 'react-dom';
import TransactionMenu from './components/TransactionMenu'
import './style.css';

class App extends Component {
  state = {
    transactionMenuVisible: false,
    activeCustomerID: null,
    activeCustomerTotal: null,
    customers: [
      {id: '001', total: 40}
    ],
    bank: 5,
    incomeStatement: [
      {id: '001', name: 'Premium Revenue', inputID: 'premiumRevenue', type: 'revenue', total: 0},
      {id: '002', name: 'Pharmacy Expense', inputID: 'pharmacyExpense', type: 'expense', total: 0},
      {id: '003', name: 'Medical Expense', inputID: 'medicalExpense', type: 'expense', total: 0},
      {id: '004', name: 'Administrative Expense', inputID: 'administrativeExpense', type: 'expense', total: 0},
      {id: '005', name: 'Broker Expense', inputID: 'brokerExpense', type: 'expense', total: 0},
      {id: '006', name: 'Premium Tax Expense', inputID: 'premiumTaxExpense', type: 'expense', total: 0},
      {id: '007', name: 'Depreciation Expense', inputID: 'depreciationExpense', type: 'expense', total: 0},
      {id: '008', name: 'Investment Income', inputID: 'investmentIncome', type: 'revenue', total: 0},
      {id: '009', name: 'Federal Income Tax Expense', inputID: 'federalIncomeTaxExpense', type: 'expense', total: 0}
    ],
    balanceSheetAssets: [
      {id: '001', name: 'Cash', total: 0},
      {id: '002', name: 'Investments', total: 0},
      {id: '003', name: 'Premium Receivables', total: 0},
      {id: '004', name: 'Property & Equipment', total: 0}
    ],
    balanceSheetLiabilities: [
      {id: '001', name: 'Claims Payable', total: 0},
      {id: '002', name: 'IBNR', total: 0},
      {id: '003', name: 'Salary Payable', total: 0},
      {id: '004', name: 'Broker Payable', total: 0},
      {id: '005', name: 'Accounts Payable', total: 0},
      {id: '006', name: 'Income Taxes Payable', total: 0},
      {id: '007', name: 'Loan Payable', total: 0},
      {id: '008', name: 'Unearned Premiums', total: 0}
    ],
    netAssetsAssetsTotal: 0,
    netAssetsLiabilitiesTotal: 0,
    operating: [
      {id: '001', name: 'Pharmacies', total: 0},
      {id: '002', name: 'Medical Providers', total: 0},
      {id: '003', name: 'Employees', total: 0},
      {id: '004', name: 'Brokers', total: 0},
      {id: '005', name: 'Vendors', total: 0},
      {id: '006', name: 'Taxing Authority', total: 0}
    ],
    investing: [
      {id: '001', name: 'Carlson Properties', total: 0}
    ],
    financing: [
      {id: '001', name: 'Wells Fargo Bank', total: 0}
    ],
    incomeStatementExpenseTotal: 0,
    incomeStatementRevenueTotal: 0
  }

  componentDidMount = () => {
    this.updateBalanceSheetAssetsTotal()
    this.updateBalanceSheetLiabilitiesTotal()
    this.updateIncomeStatementTotals()
  }

  updateIncomeStatementTotals = () => {
    let incomeStatementRevenueTotal = 0
    let incomeStatementExpenseTotal = 0

    this.state.incomeStatement.map( item => {
      if (item.type === 'revenue') {
        incomeStatementRevenueTotal = incomeStatementRevenueTotal + item.total
      } else if (item.type === 'expense') {
        incomeStatementExpenseTotal = incomeStatementExpenseTotal + item.total
      }
    })

    this.setState({
      incomeStatementRevenueTotal,
      incomeStatementExpenseTotal
    })
  }

  updateBalanceSheetAssetsTotal = () => {
    let balanceSheetAssetsTotal = 0

    this.state.balanceSheetAssets.forEach(item => {
      balanceSheetAssetsTotal = balanceSheetAssetsTotal + item.total
    })

    this.setState({ netAssetsAssetsTotal: balanceSheetAssetsTotal })
  }

  updateBalanceSheetLiabilitiesTotal = () => {
    let balanceSheetLiabilitiesTotal = 0

    this.state.balanceSheetLiabilities.forEach(item => {
      balanceSheetLiabilitiesTotal = balanceSheetLiabilitiesTotal + item.total
    })
    
    this.setState({ netAssetsLiabilitiesTotal: balanceSheetLiabilitiesTotal})
  }

  toggleTransactionMenu = (e, itemID, itemTotal) => {
    this.setState({
      transactionMenuVisible: !this.state.transactionMenuVisible,
      activeCustomerID: itemID,
      activeCustomerTotal: itemTotal
    })
  }

  handleSubmitTransaction = (e, inputID, total, activeCustomerID) => {
    e.preventDefault()
    let newIncomeStatement = []
    let newCustomerList = []

    let total = parseInt(total, 10)
    
    this.state.incomeStatement.forEach( item => {
      if (item.id === inputID) {
        item.total = item.total + total
        newIncomeStatement.push(item)
      } else {
        newIncomeStatement.push(item)
      }
    })

    this.state.customers.forEach( item => {
      if (item.id === activeCustomerID) {
        item.total = item.total - total
        newCustomerList.push(item)
      } else {
        newCustomerList.push(item)
      }
    })

    // why was customers subtracting even before I set state?
    this.setState({
      incomeStatement: newIncomeStatement,
      customers: newCustomerList
    })
  }

  render() {
    return (
      <div className="gameboard-wrapper">
        <div className="customer-wrapper">
          <h5>Customers</h5>
          <div className="customer-wrapper-customer">
            <h5>Members Employers Governement</h5>
            <ul className="customer-wrapper-customers">
              {
                this.state.customers.map( item => (
                  <li
                    key={item.id}
                    onClick={e => this.toggleTransactionMenu(e, item.id, item.total, false)}
                  >
                    <span className="item-total">{item.total}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <h5>Bank</h5>
          <div className="bank">
            <span className="item-total">{this.state.bank}</span>
          </div>
        </div>
        <div className="income-balance-wrapper">
          <div className="medica-brand-wrapper">
            <h1>Medica</h1>
            <div className="income-balance-inner-wrapper">
              <div className="income-statement">
                <h3>Income Statement</h3>
                <ul>
                  {
                    this.state.incomeStatement.map( item => (
                      <li
                        key={item.id}
                        onClick={e => this.toggleTransactionMenu(e, item.id, item.total, true)}
                      >
                        <span className="item-name">{item.name}</span>
                        <span className="item-total">{item.total}</span>
                      </li>
                    ))
                  }
                </ul>
                <div className="totals-wrapper">
                  <span className="item-total expense">{this.state.incomeStatementExpenseTotal}</span>
                  <span className="item-total revenue">{this.state.incomeStatementRevenueTotal}</span>
                </div>
              </div>
              <div className="balance-sheet">
                <h3>Balance Sheet</h3>
                <div className="balance-sheet-inner-wrapper">
                  <div>
                    <h5>Assets</h5>
                    <ul className="balance-sheet-assets">
                      {
                        this.state.balanceSheetAssets.map( item => (
                          <li key={item.id}>
                            <span className="item-name">{item.name}</span>
                            <span className="item-total">{item.total}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div>
                    <h5>Liabilities</h5>
                    <ul className="balance-sheet-liabilities">
                      {
                        this.state.balanceSheetLiabilities.map( item => (
                          <li key={item.id}>
                            <span className="item-name">{item.name}</span>
                            <span className="item-total">{item.total}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="net-assets">
                  <h5>Net Assets</h5>
                  <div className="net-assets-inner-wrapper">
                    <span className="item-total">{this.state.netAssetsAssetsTotal}</span>
                    <span className="item-total">{this.state.netAssetsLiabilitiesTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="operating-wrapper">
          <div className="operating-wrapper-inner">
            <h5>Operating</h5>
            <ul className="operating-inner-list">
              {
                this.state.operating.map( item => (
                  <li key={item.id}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-total">{item.total}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="investing-inner">
            <h5>Investing</h5>
            <ul className="investing-inner-list">
              {
                this.state.investing.map( item => (
                  <li key={item.id}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-total">{item.total}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="financing-inner">
            <h5>Financing</h5>
            <ul className="financing-inner-list">
              {
                this.state.financing.map( item => (
                  <li key={item.id}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-total">{item.total}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <TransactionMenu
          transactionMenuVisible={this.state.transactionMenuVisible}
          toggleTransactionMenu={this.toggleTransactionMenu}
          handleSubmitTransaction={this.handleSubmitTransaction}
          incomeStatement={this.state.incomeStatement}
          activeCustomerID={this.state.activeCustomerID}
          activeCustomerTotal={this.state.activeCustomerTotal}
          updateIncomeStatementTotals={this.updateIncomeStatementTotals}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
