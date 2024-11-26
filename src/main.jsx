import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageLoadByDirective from './ImageLoadByDirective.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageLoadByDirective />
  </StrictMode>,
)
