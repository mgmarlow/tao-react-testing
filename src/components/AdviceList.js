import AdviceSlip from './AdviceSlip'

export default function AdviceList({ ids, isFetching }) {
  if (isFetching) {
    return <p>Loading...</p>
  }

  if (ids.length === 0) {
    return <p>No advice found.</p>
  }

  const items = ids.map((id) => (
    <li key={id} className="column is-half">
      <AdviceSlip id={id} />
    </li>
  ))

  return (
    <ul>
      <div className="columns is-multiline">{items}</div>
    </ul>
  )
}
