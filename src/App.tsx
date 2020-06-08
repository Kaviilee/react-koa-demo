import './App.css';
import logo from './logo.svg'
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from '@routes'

type RoutesItem = {
    key: string | number,
    path: string,
    exact: boolean,
    requireAuth: boolean,
    authPath: string,
    component: any
}

function App() {
    // console.log(routes)
    const authed: string| boolean = sessionStorage.getItem('token') || false // 可以利用redux
    const authPath: string = '/login' // 默认未登录时返回的页面
    const renderRoutes = (routes: RoutesItem[], authed: boolean | string, authPath = '/login', extraProps = {}, switchProps = {}) => routes ? (
        <Switch { ...switchProps }>
          {routes.map((route, i) => (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                if (!route.requireAuth || authed || route.authPath === authPath) {
                  return <route.component {...props} {...extraProps} route={route}></route.component>
                }
                return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
              }}
            ></Route>
          ))}
        </Switch>
    ): null

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
                    {renderRoutes(routes, authed, authPath)}
                </Switch>
                </Router>
            </main>
        </div>
    )
}

export default App
