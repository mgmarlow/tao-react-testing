import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import adviceReducer from '../redux/advice.slice'
import AdvicePage from './AdvicePage'

function renderWithWrappers(
  ui,
  {
    initialState = {},
    store = configureStore({
      reducer: adviceReducer,
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
    ...render(ui, { wrapper }),
  }
}

const server = setupServer(
  rest.get('https://api.adviceslip.com/advice/search/life', (req, res, ctx) => {
    return res(
      ctx.json({
        slips: [{ id: 1, advice: 'life advice', date: '2020-10-08' }],
      }),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('AdvicePage', () => {
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
    it('should update input', () => {
      renderWithWrappers(<AdvicePage />, { initialState })
      const input = screen.getByRole('textbox')
      const text = 'foo bar'
      userEvent.type(input, text)
      expect(input.value).toEqual(text)
    })

    // TODO:
    // it('should show results', async () => {
    //   const { history } = renderWithWrappers(<AdvicePage />, { initialState })

    //   act(() => {
    //     history.push('?q=life')
    //   })

    //   await screen.findByRole('listitem')
    //   const items = screen.getAllByRole('listitem')
    //   expect(items.map((li) => li.textContent)).toEqual('fff')
    // })
  })
})
