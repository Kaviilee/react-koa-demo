import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes/router'
// import Login from './Login'
// import TodoList from './components/TodoList'

function App() {
  const authed = sessionStorage.getItem('demo-token') || false // 如果登陆之后可以利用redux修改该值(关于redux不在我们这篇文章的讨论范围之内）
  const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置
  const renderRoutes = (routes, authed, authPath = '/login', extraProps = {}, switchProps = {}) => routes ? (
    <Switch { ...switchProps }>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
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
        {/* <NameForm></NameForm> */}
        {/* <TodoList></TodoList> */}
      </main>
    </div>
  );
}

export default App;
