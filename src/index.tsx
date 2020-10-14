import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import { isPro } from './util'


if (isPro() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(registrationError => {
      console.warn('SW registration failed: ', registrationError)
    })
  })
}
console.log(React)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)