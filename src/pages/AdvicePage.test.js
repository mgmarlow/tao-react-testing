import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import adviceReducer from '../redux/advice.slice'
import AdvicePage from './AdvicePage'

function renderWithWrappers(
  ui,
  {
    initialState = {},
    store = configureStore({
      reducer: { advice: adviceReducer },
      preloadedState: initialState,
    }),
    history = createMemoryHistory(),
    ...renderOptions
  } = {},
) {
  const wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )

  return {
    history,
    ...render(ui, { wrapper, ...renderOptions }),
  }
}

describe('AdvicePage', () => {
  beforeEach(() => fetch.resetMocks())
  const initialState = {
    advice: {
      status: 'idle',
      entities: {},
      ids: [],
    },
  }

  describe('idle', () => {
    it('should show idle text', () => {
      renderWithWrappers(<AdvicePage />, { initialState })
      expect(
        screen.getByText(/use the search above to find advice/i),
      ).toBeInTheDocument()
    })
  })

  describe('user types in a query', () => {
    const mockAdvice = [
      { id: 1, advice: 'advice 1', date: '2020-10-08' },
      { id: 2, advice: 'advice 2', date: '2020-10-09' },
      { id: 3, advice: 'advice 3', date: '2020-10-10' },
    ]

    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify({
          slips: mockAdvice,
        }),
      )
    })

    it('should update input', () => {
      renderWithWrappers(<AdvicePage />, { initialState })

      const input = screen.getByRole('textbox')
      const text = 'foo bar'
      userEvent.type(input, text)

      expect(input.value).toEqual(text)
    })

    it('should render advice slips', async () => {
      renderWithWrappers(<AdvicePage />, { initialState })

      const input = screen.getByRole('textbox')
      const text = 'life'
      userEvent.type(input, text)

      await screen.findAllByRole('listitem')
      const items = screen.getAllByRole('listitem')
      expect(items.map((li) => li.textContent)).toMatchInlineSnapshot(`
        Array [
          "2020-10-08advice 1",
          "2020-10-09advice 2",
          "2020-10-10advice 3",
        ]
      `)
    })
  })
})
