import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAdvice,
  selectAdviceIds,
  selectAdviceStatus,
} from '../redux/advice.slice'
import { useSearchParams } from '../hooks/useSearchParams'
import AdviceList from '../components/AdviceList'
import SearchNav from '../components/SearchNav'

function AdvicePage({ isIdle, isFetching, adviceIds }) {
  return (
    <main>
      <div className="section">
        <SearchNav />

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

function useFetchAdvice() {
  const dispatch = useDispatch()
  const params = useSearchParams()

  const query = params.get('q') || ''

  useEffect(() => {
    if (!query) {
      return
    }

    dispatch(fetchAdvice({ query }))
  }, [query, dispatch])
}

export default function AdvicePageContainer() {
  const adviceIds = useSelector(selectAdviceIds)
  const status = useSelector(selectAdviceStatus)

  const isFetching = status === 'pending'
  const isIdle = status === 'idle'

  useFetchAdvice()

  return (
    <AdvicePage isIdle={isIdle} isFetching={isFetching} adviceIds={adviceIds} />
  )
}
