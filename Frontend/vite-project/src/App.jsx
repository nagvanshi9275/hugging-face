import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

import QAComponent from './QAComponent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <QAComponent />
        
    </>
  )
}

export default App











