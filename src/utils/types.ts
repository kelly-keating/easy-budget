export interface Transaction {
  Amount: number
  Date: string
  OtherParty: string
  Description?: string
  AnalysisCode?: string
  Particulars?: string
  Reference?: string
}

export type TransactionList = Record<string, Transaction[]>
