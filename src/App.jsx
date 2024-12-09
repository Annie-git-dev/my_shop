import './App.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Pages from './pages/Pages'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
          <Header />
        <div className="flex-1 bg-slate-200">
          <Pages />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
