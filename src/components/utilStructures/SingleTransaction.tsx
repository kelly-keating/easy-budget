import { Transaction } from '../../utils/types'
import './SingleTransaction.css'

interface Props {
  t: Transaction
}

function SingleTransaction({ t }: Props) {
  const descriptors = []
  if (t.Description) descriptors.push(t.Description)
  if (t.AnalysisCode) descriptors.push(t.AnalysisCode)
  if (t.Particulars) descriptors.push(t.Particulars)
  if (t.Reference) descriptors.push(t.Reference)
  const desc = descriptors.filter((d) => d !== '************').join(', ')

  return (
    <section className="single__container">
      <div className="single__date">
        <p>{t.Date}</p>
      </div>
      <div className="single__text">
        <p>{t.OtherParty}</p>
        <p>{desc}</p>
      </div>
      <div className="single__amt_in">
        <p>{t.Amount > 0 ? t.Amount.toFixed(2) : '-'}</p>
      </div>
      <div className="single__amt_out">
        <p>{t.Amount < 0 ? t.Amount.toFixed(2) : '-'}</p>
      </div>
    </section>
  )
}

export default SingleTransaction
