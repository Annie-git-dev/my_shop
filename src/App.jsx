import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Products from './components/Products'
import { useEffect, useState } from 'react';
import NoPage from './components/NoPage';

function App() {
  const [data, setData] = useState();
  
  useEffect(() => {
    getProducts()
  }, [])
  
  async function getProducts() {
    const data = await fetch('https://fakestoreapi.com/products')
    let dataJson = await data.json()
    setData(dataJson)
  }
  
  return (
    <BrowserRouter>
    <Routes>
          <Route path = "/" element={<Products data={data} />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
      {/* <div>
        <Header data={data} />
        <Products data={data} />
      </div> */}
    </BrowserRouter>
  )
}

export default App
