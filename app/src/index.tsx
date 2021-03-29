import React from 'react'
import ReactDOM from 'react-dom'
import '~/assets/styles/index.css'
import '~/styles/index.less'
import App from '~/pages/App'
import { Provider } from 'mobx-react'
import stores from '~/store'

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
