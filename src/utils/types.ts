export interface Transaction {
  Amount: number
  Date: string
  OtherParty: string
  Description?: string
  AnalysisCode?: string
  Particulars?: string
  Reference?: string
  Account?: string
  Direction?: string
  Label?: string
}

export type TransactionList = Record<string, Transaction[]>

export interface Filter {
  text: string
  label: string
}
