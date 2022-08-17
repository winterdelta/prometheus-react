import { useState, useEffect } from 'react'
import './App.css'
const { DateTime } = require('luxon')

function App () {
  const [data, setData] = useState('')
  const [pData, setPData] = useState('Prometheus Data not Loaded')

  const [time, setTime] = useState(
    DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
  )

  useEffect(() => {
    fetch('http://localhost:9000/time')
      .then(res => res.text())
      .then(data => setData(data))

    fetch('http://localhost:9000/metrics')
      .then(res => res.text())
      .then(data => setPData(data))
  }, [])

  const PrometheusData = () => {
    fetch('http://localhost:9000/metrics')
      .then(res => res.text())
      .then(data => setPData(data))
  }

  // console.log(pData)

  // useEffect(() => {
  //   setTime(DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS))
  // }, [])

  // const dt = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
  // console.log(time)

  // var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(
      () =>
        setTime(DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)),
      1000
    )
    return function cleanup () {
      clearInterval(timer)
    }
  })

  // console.log(time)

  return (
    <div className='App'>
      <div className='left-pane'>
        <div>
          <div>{data}</div>
          <div>This is the current time: {time}</div>
        </div>
      </div>
      <div className='right-pane'>
        <div className='right-pane-fixed-header'>
          <div>Prometheus</div>
          <button onClick={PrometheusData}>FETCH</button>
        </div>
        <div>
          <div className='right-pane-body'>
            <pre>
              <code>{pData}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
