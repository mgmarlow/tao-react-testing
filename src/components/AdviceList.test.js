import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { screen, render } from '@testing-library/react'
import AdviceList from './AdviceList'
import adviceReducer from '../redux/advice.slice'

describe('AdviceList', () => {
  describe('isFetching is true', () => {
    const isFetching = true
    const ids = []

    it('should render loading text', () => {
      render(<AdviceList isFetching={isFetching} ids={ids} />)
      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
  })

  describe('ids are empty after fetching', () => {
    const isFetching = false
    const ids = []

    it('should render not found text', () => {
      render(<AdviceList isFetching={isFetching} ids={ids} />)
      expect(screen.getByText(/no advice found/i)).toBeInTheDocument()
    })
  })

  // The next example needs to configure redux because we
  // actually have IDs passed into the component.
  describe('ids are in redux store', () => {
    const ids = [1, 2, 3]
    const mockAdvice = [
      { id: 1, date: '2020-10-08', advice: 'advice 1' },
      { id: 2, date: '2020-10-09', advice: 'advice 2' },
      { id: 3, date: '2020-10-10', advice: 'advice 3' },
    ]

    const initialState = {
      advice: {
        status: 'fulfilled',
        entities: {
          1: mockAdvice[0],
          2: mockAdvice[1],
          3: mockAdvice[2],
        },
        ids,
      },
    }

    function renderWithRedux(
      ui,
      {
        initialState = {},
        store = configureStore({
          reducer: { advice: adviceReducer },
          preloadedState: initialState,
        }),
        ...renderOptions
      } = {},
    ) {
      const wrapper = ({ children }) => (
        <Provider store={store}>{children}</Provider>
      )

      return render(ui, { wrapper })
    }

    it('should render advice list', () => {
      const isFetching = false

      renderWithRedux(<AdviceList isFetching={isFetching} ids={ids} />, {
        initialState,
      })

      // Enforce semantic HTML by fetching by aria role (li -> listitem)
      const adviceItems = screen.getAllByRole('listitem')
      expect(adviceItems.map((li) => li.textContent)).toMatchInlineSnapshot(`
        Array [
          "2020-10-08advice 1",
          "2020-10-09advice 2",
          "2020-10-10advice 3",
        ]
      `)
    })
  })
})
