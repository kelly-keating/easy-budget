import { FormEvent, useState } from 'react'
import {
  setLocalTransactions,
  getFilters,
  addNewFilter,
  getLocalTransactions,
} from '../utils/localStorage'
import { Transaction } from '../utils/types'
import './Input.css'

import CollapsibleTransactionList from './CollapsibleTransactionList'
import SingleTransaction from './SingleTransaction'

function Input() {
  const [holdingPen, setHoldingPen] = useState<Transaction[]>([])
  const [newFilter, setNewFilter] = useState('')

  const filters = getFilters()

  const addFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNewFilter(newFilter)
    setNewFilter('')
  }

  const handleSaveTransactions = (ts: Transaction[]) => {
    // TODO: now, or on display?
    // TODO: filter out transactions that are already in local storage
    // TODO: make sure we keep the transactions in local storage already
    const savedTransactions = getLocalTransactions()

    const transactionObj = ts.reduce((obj, next) => {
      if (obj[next.Date]) {
        obj[next.Date].push(next)
      } else {
        obj[next.Date] = [next]
      }
      return obj
    }, savedTransactions)
    setLocalTransactions(transactionObj)
    setHoldingPen([])
  }

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const file = (e.currentTarget.elements.namedItem('csv') as HTMLInputElement)
      .files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target?.result
        if (csv) {
          let lines = csv
            .toString()
            .replaceAll('\r', '')
            .replaceAll('"', '')
            .split('\n')
          if (lines[lines.length - 1] === '') lines.pop()
          const headers = lines[0].split(',')
          const data: Transaction[] = lines.slice(1).map((line) => {
            const values = line.split(',')
            const transactionObj = headers.reduce(
              (obj: Partial<Transaction>, nextKey, index) => {
                switch (nextKey) {
                  case 'Amount':
                    obj[nextKey] = Number(values[index])
                    break
                  case 'Analysis Code':
                    obj['AnalysisCode'] = values[index]
                    break
                  case 'Transaction Date':
                    obj['Date'] = values[index]
                    break
                  case 'Other Party':
                    obj['OtherParty'] = values[index]
                    break
                  case 'Date':
                  case 'Description':
                  case 'Particulars':
                  case 'Reference':
                    obj[nextKey] = values[index]
                    break
                  case 'City':
                  case 'Country Code':
                  case 'Credit Plan Name':
                  case 'Foreign Details':
                  case 'Process Date':
                    break
                  default:
                    console.log('Unknown key', nextKey, values[index])
                    break
                }
                return obj
              },
              {},
            )
            return transactionObj as Transaction
          })
          setHoldingPen(data)
        }
      }
      reader.readAsText(file) // loads and reads the file
    }
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
      <div>
        <h2>Input</h2>
        <form onSubmit={handleAdd}>
          <label htmlFor="csv">CSV file:</label>
          <input id="csv" type="file" />
          <button>Parse file</button>
        </form>
      </div>
      <div className="new-transactions">
        <section>
          <h2>Transactions ({pending.length})</h2>
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
        <section>
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
        </section>
      </div>
    </section>
  )
}

export default Input
