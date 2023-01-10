import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import ErrorBoundary from './Components/ErrorBoundary'
import GlobalStyle from './GlobalStyle'
// import * as serviceWorker from './serviceWorker'

ReactDOM.createRoot(document.querySelector('main')).render(
  <ErrorBoundary>
    <GlobalStyle />
    <App />
  </ErrorBoundary>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
