import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Devtools from 'mobx-react-devtools'
import Login from '@components/Login'
import TodoList from '@components/Todo'

const App = () => {
  return (
    <div className="App">
      <main className="App-main">
        {/* 路由配置 */}
        <Router>
          <Switch>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/" exact component={TodoList}></Route>
          </Switch>
        </Router>
      </main>
    </div>
  )
}

export default App
