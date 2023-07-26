import { Filter, TransactionList } from './types'

export function setLocalTransactions(t: TransactionList) {
  localStorage.setItem('easyBudgetTransactions', JSON.stringify(t))
}

export function getLocalTransactions(): TransactionList {
  const t = localStorage.getItem('easyBudgetTransactions')
  return t ? JSON.parse(t) : {}
}

export function addNewFilter(newFilter: Filter) {
  const f = localStorage.getItem('easyBudgetFilters')
  const filters = f ? JSON.parse(f) : []
  filters.push(newFilter)

  localStorage.setItem('easyBudgetFilters', JSON.stringify(filters))
}

export function getFilters(): Filter[] {
  const f = localStorage.getItem('easyBudgetFilters')
  return f ? JSON.parse(f) : []
}
