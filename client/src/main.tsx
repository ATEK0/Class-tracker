import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import { CookiesProvider } from "react-cookie";

import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <Router />
    </CookiesProvider>
  </React.StrictMode>
)
