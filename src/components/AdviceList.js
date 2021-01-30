import AdviceSlip from './AdviceSlip'

export default function AdviceList({ ids, isFetching }) {
  const items = ids.map((id) => (
    <li className="column is-half">
      <AdviceSlip key={id} id={id} />
    </li>
  ))

  if (isFetching) {
    return <p>Loading...</p>
  }

  if (items.length === 0) {
    return <p>No advice found.</p>
  }

  return (
    <ul>
      <div className="columns is-multiline">{items}</div>
    </ul>
  )
}
