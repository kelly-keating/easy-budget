import { useState } from 'react'
import {
  setLocalTransactions,
  getFilters,
  addNewFilter,
  getLocalTransactions,
} from '../../utils/localStorage'
import { Transaction } from '../../utils/types'
import './Input.css'

import CollapsibleTransactionList from '../utilStructures/CollapsibleTransactionList'
import SingleTransaction from '../utilStructures/SingleTransaction'
import FileLoader from './FileLoader'

function Input() {
  const [holdingPen, setHoldingPen] = useState<Transaction[]>([])
  const [newFilter, setNewFilter] = useState('')
  const [account, setAccount] = useState('')

  const filters = getFilters()

  const addFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // addNewFilter(newFilter)
    setNewFilter('')
  }

  const handleSaveTransactions = (ts: Transaction[]) => {
    // TODO: now, or on display?
    // TODO: filter out transactions that are already in local storage
    // TODO: make sure we keep the transactions in local storage already
    const savedTransactions = getLocalTransactions()

    const transactionObj = ts.reduce((obj, next) => {
      next.Account = account
      next.Direction = next.Amount > 0 ? 'in' : 'out'

      if (obj[next.Date]) {
        obj[next.Date].push(next)
      } else {
        obj[next.Date] = [next]
      }
      return obj
    }, savedTransactions)

    setLocalTransactions(transactionObj)
    setHoldingPen([])
    setAccount('')
  }

  const { pending, filteredOut } = holdingPen.reduce(
    (result, next) => {
      // const stringified = JSON.stringify(next)
      let ok = true

      // filters.forEach(filter => {
      //   if(stringified.includes(filter)) {
      //     ok = false
      //     if(result.filteredOut[filter]) {
      //       result.filteredOut[filter].push(next)
      //     } else {
      //       result.filteredOut[filter] = [next]
      //     }
      //   }
      // })

      if (ok) {
        result.pending.push(next)
      }

      return result
    },
    {
      pending: [] as Transaction[],
      filteredOut: {} as Record<string, Transaction[]>,
    },
  )

  const newMatches = newFilter
    ? pending.filter((transaction) =>
        JSON.stringify(transaction).includes(newFilter),
      )
    : []

  return (
    <section>
      <FileLoader setTransactions={(t: Transaction[]) => setHoldingPen(t)} />
      <div className="new-transactions">
        <section>
          <h2>Transactions ({pending.length})</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="account">Account:</label>
            <select
              id="account"
              onChange={(e) => setAccount(e.target.value)}
              value="General"
            >
              <option selected disabled hidden value="">
                Select account
              </option>
              <option value="General">General</option>
              <option value="Savings">Savings</option>
              <option value="Super Savings">Super Savings</option>
              <option value="Health and Fitness">Health and Fitness</option>
              <option value="Tech Allowance">Tech Allowance</option>
              <option value="Treat Yo Self">Treat Yo Self</option>
              <option value="No Touch">No Touch</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </form>
          <button onClick={() => handleSaveTransactions(pending)}>
            Save these transactions
          </button>
          <div>
            {pending.map((transaction, idx) => {
              const { Date, Amount, OtherParty } = transaction
              return (
                <SingleTransaction
                  key={idx + Date + OtherParty + Amount}
                  t={transaction}
                />
              )
            })}
          </div>
        </section>
        {/* <section>
          <h2>Filters</h2>
          <div>
            <h3>Add new filter</h3>
            <form onSubmit={addFilter}>
              <label htmlFor="filter">Filter:</label>
              <input
                id="filter"
                type="text"
                value={newFilter}
                onChange={(e) => setNewFilter(e.target.value)}
              />
              <button>Add</button>
            </form>
            <CollapsibleTransactionList
              ts={newMatches}
              text="Current Matches"
            />
          </div>
          <div>
            <h3>Existing filters</h3>
            {filters.map((filter) => (
              <CollapsibleTransactionList
                key={filter}
                ts={filteredOut[filter] || []}
                text={filter}
              />
            ))}
          </div>
        </section> */}
      </div>
    </section>
  )
}

export default Input
