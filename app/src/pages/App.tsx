import '../styles/App.css';
import logo from '~/static/logo.svg'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import routes from '~/routes'
import Login from '../components/Login'
import TodoList from '../components/TodoList'

const App = () => {s
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                React Koa Demo
                </p>
            </header>
            <main className="App-main">
                <Router>
                <Switch>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/todo" exact component={TodoList}></Route>
                </Switch>
                </Router>
            </main>
        </div>
    )
}

export default App
