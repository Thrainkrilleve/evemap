import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import css from './index.css?inline'
import App from './App.tsx'

// Implement shadow-dom
const host = document.getElementById('evemap-root')!
const shadowRoot = host.shadowRoot || host.attachShadow({ mode: 'open' })

// Inject the CSS
const style = document.createElement('style')
style.textContent = css
shadowRoot.appendChild(style)

const reactRoot = document.createElement('div')
shadowRoot.appendChild(reactRoot)

createRoot(reactRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
