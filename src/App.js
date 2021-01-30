import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdvicePage from './pages/AdvicePage'

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/">
            <AdvicePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
