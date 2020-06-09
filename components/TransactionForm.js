import React, { Component } from 'react'

class TransactionForm extends Component {
  state = {
    value: 0
  }

  handleSubmit = e => {
    e.preventDefault()
    let {
      id,
      inputID,
      handleSubmitTransaction,
      activeCustomerID,
      activeCustomerTotal,
      updateIncomeStatementTotals
    } = this.props

    let newAmount = e.target[inputID].value
    handleSubmitTransaction(e, id, newAmount, activeCustomerID)
    updateIncomeStatementTotals()
    this.setState({ value: 0 })
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    const {
      inputID,
      total,
      name,
      total,
      activeCustomerID,
      activeCustomerTotal
    } = this.props

    return (
      <form
        className="transaction-form"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor={inputID}
        >
          {name}
        </label>
        <input
          type="number"
          id={inputID}
          name={inputID}
          min={0}
          max={activeCustomerTotal}
          value={this.state.value}
          onChange={(e) => this.handleChange(e)}
        />
        <button
          type="submit"
          className="transaction-form-button"
        >
          Submit
        </button>
      </form>
    )
  }
}

export default TransactionForm