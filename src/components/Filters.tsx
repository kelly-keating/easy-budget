import { FormEvent, useState } from 'react'
import { Transaction } from '../utils/types'
import {
  addNewFilter,
  getFilters,
  getLocalTransactions,
} from '../utils/localStorage'
import SimpleTransactionList from './utilStructures/SimpleTransactionList'

function Filters() {
  const [newFilter, setNewFilter] = useState({
    text: '',
    label: '',
  })
  const filters = getFilters()
  const labels = [
    'Transfers',
    'Interest',
    'Necessaries',
    'Food',
    'Entertainment',
    'Clothing',
    'Other',
  ]

  const transactionsToSort = Object.values(getLocalTransactions())
    .flat()
    .filter((t) => !t.Label)
  const { unlabeled, matches } = transactionsToSort.reduce(
    (obj, next) => {
      if (newFilter.text && JSON.stringify(next).includes(newFilter.text)) {
        obj.matches.push(next)
      } else {
        obj.unlabeled.push(next)
      }
      return obj
    },
    {
      unlabeled: [] as Transaction[],
      matches: [] as Transaction[],
    },
  )

  const addFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newFilter.text || !newFilter.label) {
      alert('Please fill out both fields')
    } else {
      alert(newFilter.text + ' ' + newFilter.label)
    }
  }

  const handleType = (e: FormEvent<HTMLInputElement>) => {
    setNewFilter({ ...newFilter, text: e.currentTarget.value })
  }

  const selectLabel = (e: FormEvent<HTMLSelectElement>) => {
    setNewFilter({ ...newFilter, label: e.currentTarget.value })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <section>
        <h2>Filters</h2>
        <form onSubmit={addFilter}>
          <label htmlFor="text">Text to match:</label>
          <input id="text" type="text" onChange={handleType} />
          <label htmlFor="label">Label:</label>
          <select id="label" onChange={selectLabel}>
            <option disabled selected value="">
              Select a label
            </option>
            {labels.map((label) => (
              <option value={label}>{label}</option>
            ))}
          </select>
          <button>Save</button>
        </form>
        <h3>Matches</h3>
        <SimpleTransactionList ts={matches} />
        <article>
          <h3>Existing filters</h3>
          {filters.map((filter) => (
            <p>{filter.text}</p>
          ))}
        </article>
      </section>
      <section>
        <h2>Unlabeled transactions</h2>
        <SimpleTransactionList ts={unlabeled} />
      </section>
    </div>
  )
}

export default Filters
