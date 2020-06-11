import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TransactionForm = ({
  id,
  inputID,
  handleSubmitTransaction,
  activeCustomerID,
  updateIncomeStatementTotals,
  name,
  activeCustomerTotal,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      [inputID]: 0,
    },
  });

  const onSubmit = (values) => {
    const value = Number(values[inputID]);
    handleSubmitTransaction(id, value, activeCustomerID);
    updateIncomeStatementTotals();
    reset();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={inputID}>{name}</label>
      <input
        type="number"
        id={inputID}
        name={inputID}
        ref={register({ min: 0, max: activeCustomerTotal })}
      />
      <button type="submit" className="transaction-form-button">
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
