import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Products from './components/Products'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Products />
      </div>
    </BrowserRouter>
  )
}

export default App
