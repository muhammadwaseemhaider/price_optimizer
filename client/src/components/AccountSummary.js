import React, { useContext } from 'react';

import { TransactionContext } from '../TransactionState'
import {numberWithCommas} from '../utils/format';

export const AccountSummary = () => {

  const { transactions } = useContext(TransactionContext);
  const transactionAmounts = transactions.map(transaction => transaction.transactionAmount);

    const income = Math.abs(transactionAmounts
    .filter(transaction => transaction > 0)
    .reduce((acc, transaction) => (acc+=transaction), 0)
    .toFixed(2));

    const expense = Math.abs(transactionAmounts
    .filter(transaction => transaction < 0)
    .reduce((acc, transaction) => (acc+=transaction), 0)
    .toFixed(2));
  
  return (
    <div className="inc-exp-container">
        <div>
            <h4>Income </h4>
            <p className="money plus">${numberWithCommas(income)}</p>
        </div>
        <div>
            <h4>Expense </h4>
            <p className="money minus">${numberWithCommas(expense)}</p>
        </div>
    </div>
  );
}
