import { getLocalTransactions } from '../utils/localStorage'
import { Transaction } from '../utils/types'
import './Breakdown.css'

import CollapsibleTransactionList from './CollapsibleTransactionList'

function Breakdown() {
  const transactions = getLocalTransactions()

  const dates = Object.keys(transactions).reverse()
  const individualTransactions = Object.values(transactions).flat()
  const byDirection = individualTransactions.reduce(
    (obj, next) => {
      next.Amount > 0 ? obj.in.ts.push(next) : obj.out.ts.push(next)
      next.Amount > 0
        ? (obj.in.total += next.Amount)
        : (obj.out.total += next.Amount)
      return obj
    },
    {
      in: { ts: [] as Transaction[], total: 0 },
      out: { ts: [] as Transaction[], total: 0 },
    },
  )

  return (
    <section>
      <h2>Breakdown</h2>
      <div className="breakdown__container">
        <section className="breakdown__all">
          <h3>All transactions</h3>
          {dates.map((date) => (
            <CollapsibleTransactionList ts={transactions[date]} text={date} />
          ))}
        </section>
        <section className="breakdown__details">
          <article className="breakdown__details_mvmt">
            <h3>Movement</h3>
            <p>In: {byDirection.in.total.toFixed(2)}</p>
            <p>Out: {(-1 * byDirection.out.total).toFixed(2)}</p>
            <p>
              Total: {(byDirection.in.total + byDirection.out.total).toFixed(2)}
            </p>
          </article>
          <article className="breakdown__details_categories">
            <h3>By Category</h3>
          </article>
        </section>
      </div>
    </section>
  )
}

export default Breakdown
