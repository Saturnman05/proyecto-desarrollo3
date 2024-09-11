import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Providers from './components/Providers.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
    <App />
  </Providers>
)
