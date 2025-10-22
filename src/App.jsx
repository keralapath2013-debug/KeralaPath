
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Packages from './components/Packages'

function App() {
  

  return (
    <>
    <Navbar/>
      <Hero/>
      <Destinations/>
      <Packages/>
      <About/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
