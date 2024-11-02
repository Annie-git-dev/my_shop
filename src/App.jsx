import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Pages from './pages/Pages'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Pages />
    </BrowserRouter>
  )
}

export default App
