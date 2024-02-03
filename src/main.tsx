import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import Countries from './Countries.tsx'
import CountriesWithRequestInsideUseEffect from './CountriesWithRequestInsideUseEffect.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <CountriesWithRequestInsideUseEffect /> */}
    <Countries />
  </React.StrictMode>,
)
