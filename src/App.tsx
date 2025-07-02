import { Outlet } from 'react-router'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
