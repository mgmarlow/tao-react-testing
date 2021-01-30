import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAdvice,
  selectAdviceIds,
  selectAdviceStatus,
} from '../redux/advice.slice'
import { useDebounce } from '../hooks/useDebounce'
import AdviceList from '../components/AdviceList'

const Search = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="field">
      <p className="control">
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={value}
        />
      </p>
    </div>
  )
}

export default function AdvicePage() {
  const dispatch = useDispatch()
  const adviceIds = useSelector(selectAdviceIds)
  const isFetching = useSelector(selectAdviceStatus) === 'pending'
  const isIdle = useSelector(selectAdviceStatus) === 'idle'

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) {
      return
    }

    dispatch(fetchAdvice({ query: debouncedQuery }))
  }, [debouncedQuery, dispatch])

  return (
    <main>
      <div className="section">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">Free Advice</h1>
            </div>

            <div className="level-item">
              <Search value={query} onChange={setQuery} />
            </div>
          </div>
        </nav>

        {isIdle ? (
          <div className="section has-background-light">
            <div className="content">
              <p>Use the search above to find advice!</p>
            </div>
          </div>
        ) : (
          <AdviceList isFetching={isFetching} ids={adviceIds} />
        )}
      </div>
    </main>
  )
}
