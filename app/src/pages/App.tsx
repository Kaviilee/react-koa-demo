import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Devtools from 'mobx-react-devtools'
import Login from '@components/Login'
import TodoList from '@components/Todo'

const App = () => {
    return (
        <div className="App">
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                React Koa Demo
                </p>
            </header> */}
            <main className="App-main">
                <Router>
                <Switch>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/" exact component={TodoList}></Route>
                </Switch>
                </Router>
            </main>

            {/* <Devtools /> */}
        </div>
    )
}

export default App
