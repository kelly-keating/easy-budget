import { getLocalTransactions } from '../utils/localStorage'

function Summary() {
  const transactions = Object.values(getLocalTransactions()).flat()
  const total = transactions.reduce((sum, next) => sum + next.Amount, 0)
  return (
    <div>
      <h2>Summary</h2>
      <p>{total.toFixed(2)}</p>
    </div>
  )
}

export default Summary
