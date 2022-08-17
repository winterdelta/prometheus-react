import { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(data => setData(data))
  })

  console.log(data)

  return (
    <div className='App'>
      <div className='left-pane'>{data}</div>
      <div className='right-pane'>Prometheus</div>
    </div>
  )
}

export default App
