import { Transaction } from '../../utils/types'
import SingleTransaction from './SingleTransaction'

interface Props {
  ts: Transaction[]
}

function SimpleTransactionList({ ts }: Props) {
  return (
    <div>
      {ts.map((transaction, idx) => {
        const { Date, Amount, OtherParty } = transaction
        return (
          <SingleTransaction
            key={idx + Date + OtherParty + Amount}
            t={transaction}
          />
        )
      })}
      {ts.length === 0 && <p>No transactions</p>}
    </div>
  )
}

export default SimpleTransactionList
