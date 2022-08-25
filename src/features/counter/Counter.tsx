import React, { useState } from 'react';
import styles from './Counter.module.css';
import { useAppDispatch, useAppSelector } from '../../app';
import {
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  decrement,
  selectCount
} from '../../features/counter/counterSlice';
function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('0');
  const incrementValue = Number(incrementAmount) || 0;
  return (
    <div>
      <div className={styles.row}>
        <button
          onClick={() => dispatch(decrement())}
          arial-label="Decrement value"
          className={styles.button}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className={styles.button}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          className={styles.textbox}
          type="text"
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          className={styles.button}>
          Add Amount
        </button>

        <button
          onClick={() => dispatch(incrementAsync(incrementValue))}
          className={styles.asyncButton}>
          Add Async
        </button>
        <button
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
          className={styles.button}>
          Add If Odd
        </button>
      </div>
    </div>
  );
}
export default Counter;
