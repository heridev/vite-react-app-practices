import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import Countries from './Countries.tsx'
// import CountriesWithRequestInsideUseEffect from './CountriesWithRequestInsideUseEffect.tsx'
// import CountriesUseCallbackWhenDeclaredOutside from './CountriesUseCallbackWhenDeclaredOutside.tsx';
import ContextWithReducer from './ContextWithReducer.tsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {<ContextWithReducer />}
    {/* <CountriesUseCallbackWhenDeclaredOutside /> */}
    {/* <CountriesWithRequestInsideUseEffect /> */}
    {/* <Countries /> */}
  </React.StrictMode>,
)
