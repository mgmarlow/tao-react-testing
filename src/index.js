import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import './index.sass'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
