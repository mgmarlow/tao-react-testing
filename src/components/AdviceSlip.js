import { useSelector } from 'react-redux'
import { selectAdviceById } from '../redux/advice.slice'

export default function AdviceSlip({ id }) {
  const slip = useSelector((state) => selectAdviceById(state, id))

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
