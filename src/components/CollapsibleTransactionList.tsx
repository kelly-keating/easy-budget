import { useState } from 'react'
import { Transaction } from '../utils/types'
import './CollapsibleTransactionList.css'

import SingleTransaction from './SingleTransaction'

interface Props {
  ts: Transaction[]
  text: string
}

function CollapsibleTransactionList({ ts, text }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <section>
      <div className="hidden_tray__header">
        <h4>{text}</h4>
        <div className="hidden_tray__header_details">
          <p>{ts.length}</p>
          <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>
        </div>
      </div>
      <div className={isOpen ? 'hidden_tray__open' : 'hidden_tray'}>
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
    </section>
  )
}

export default CollapsibleTransactionList
