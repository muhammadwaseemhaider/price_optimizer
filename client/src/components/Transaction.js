import React, {useContext} from 'react';
import { TransactionContext } from '../TransactionState';
import {numberWithCommas} from '../utils/format';

export const Transaction = ({transaction}) => {

  const { delTransaction } = useContext(TransactionContext);

  const sign= transaction.transactionAmount > 0 ? '+' : '-';
  const transactionType= transaction.transactionAmount > 0 ? 'plus' : 'minus';

  return (
    <li className={transactionType}>
    {transaction.description}
  <span>{sign}${numberWithCommas(Math.abs(transaction.transactionAmount))}</span>
    <button className="delete-btn"
            onClick={()=> delTransaction(transaction._id)}
    >X
    </button>
    </li>
  );
}
