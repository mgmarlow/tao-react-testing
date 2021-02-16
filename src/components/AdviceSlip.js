import { useSelector } from 'react-redux'
import { selectAdviceById } from '../redux/advice.slice'

function AdviceSlip({ slip }) {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>{slip.date}</p>
            <blockquote>{slip.advice}</blockquote>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function AdviceSlipContainer({ id }) {
  const slip = useSelector((state) => selectAdviceById(state, id))

  return <AdviceSlip slip={slip} />
}
