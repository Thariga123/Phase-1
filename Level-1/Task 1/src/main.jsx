import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Helloworld from './Helloworld.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Helloworld />
  </StrictMode>
)
