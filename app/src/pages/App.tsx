import '../styles/App.css';
// import '../styles/message.less'
import logo from '~/static/logo.svg'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import routes from '~/routes'
import Login from '@components/Login'
import TodoList from '@components/TodoList'
import message from '@components/Message'

const App = () => {
    const handleTest = () => {
        console.log('test')
        message.info('test')
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                React Koa Demo
                <button className="bg-blue-500 ml-1" onClick={handleTest}>test</button>
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
