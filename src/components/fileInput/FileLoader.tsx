import { ChangeEvent } from 'react'
import { Transaction } from '../../utils/types'

interface Props {
  setTransactions: (t: Transaction[]) => void
}

function FileLoader({ setTransactions }: Props) {
  const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    const file = (e.target as HTMLInputElement).files?.[0]
    // const file = (e.currentTarget.elements.namedItem('csv') as HTMLInputElement)
    //   .files?.[0]
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
          setTransactions(data)
        }
      }
      reader.readAsText(file) // loads and reads the file
    }
  }

  return (
    <div>
      <h2>Input</h2>
      {/* <form onSubmit={handleAdd}> */}
      <label htmlFor="csv">CSV file:</label>
      <input id="csv" type="file" onChange={handleAdd} />
      {/* </form> */}
    </div>
  )
}

export default FileLoader
