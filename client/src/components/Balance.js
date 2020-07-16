import React, { useContext } from 'react';
import { TransactionContext } from '../TransactionState';
import {numberWithCommas} from '../utils/format';

export const Balance = () => {

  const { transactions } = useContext(TransactionContext);
  const transactionAmounts = transactions.map( transaction => transaction.transactionAmount);
  const balance = transactionAmounts.reduce( (acc, item) => acc+=item, 0).toFixed(2);

  return (
    <div>
        <h4>Current Balance</h4>
  <h1>${numberWithCommas(balance)}</h1>
    </div>
  );
}
