import Navbar from './components/shared/Navbar'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <Navbar></Navbar>

      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  )
}

export default App
