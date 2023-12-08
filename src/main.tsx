import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import App from './App.tsx'
import './main_styles/reset.css'
import './main_styles/variables.css'
import './main_styles/main.css'
import Keycloak from 'keycloak-js'

const keycloakClient = new Keycloak({
  url: 'https://keycloak.e-bus.site',
  realm: 'ebus',
  clientId: 'centrifugo',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloakClient}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </ReactKeycloakProvider>,
)
