import { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { useSearchParams } from '../hooks/useSearchParams'

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

export default function SearchNav() {
  const history = useHistory()
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const debouncedQuery = useDebounce(query, 300)

  const updateQuery = useCallback(
    (q) => {
      if (q === '') {
        return
      }

      const newParams = new URLSearchParams()
      newParams.set('q', q)
      history.push(`?${newParams.toString()}`)
    },
    [history],
  )

  useEffect(() => {
    updateQuery(debouncedQuery)
  }, [updateQuery, debouncedQuery])

  return (
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
  )
}
