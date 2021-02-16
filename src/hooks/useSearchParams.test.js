import { Router, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { renderHook, act } from '@testing-library/react-hooks'
import { useSearchParams } from './useSearchParams'

describe('#useSearchParams', () => {
  describe('location does NOT have search', () => {
    const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>

    it('should return an empty URLSearchParams instance', () => {
      const { result } = renderHook(() => useSearchParams(), {
        wrapper,
      })

      expect(result.current.toString()).toEqual('')
    })
  })

  describe('location has search', () => {
    const query = 'author=Kerouac&title=Dharma+Bums'

    const createWrapper = () => {
      // Use #createMemoryHistory so we can call history#push later
      // in the example.
      const history = createMemoryHistory({
        initialEntries: [`/books?${query}`],
      })

      const wrapper = ({ children }) => (
        // Router has to be used instead of MemoryRouter because we're
        // passing in our own history instance.
        <Router history={history}>{children}</Router>
      )

      return { history, wrapper }
    }

    it('should return URLSearchParams with search params', () => {
      const { wrapper } = createWrapper()

      const { result } = renderHook(() => useSearchParams(), {
        wrapper,
      })

      expect(result.current.toString()).toEqual(query)
    })

    it('should be memoized', () => {
      const { history, wrapper } = createWrapper()
      const { result } = renderHook(() => useSearchParams(), {
        wrapper,
      })

      act(() => {
        history.push(`/books?${query}`)
      })

      const [prev, current] = result.all
      // Avoiding #toEqual for shallow equality
      expect(prev === current).toBeTruthy()
    })

    it('should update when history#push is called', () => {
      const { history, wrapper } = createWrapper()
      const { result } = renderHook(() => useSearchParams(), {
        wrapper,
      })

      const nextQuery = 'foo=bar'
      act(() => {
        history.push(`/books?${nextQuery}`)
      })

      const [prev, current] = result.all
      // Avoiding #toEqual for shallow equality
      expect(prev === current).toBeFalsy()
      expect(current.toString()).toEqual(nextQuery)
    })
  })
})
