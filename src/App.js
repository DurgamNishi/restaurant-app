import {useState, useEffect} from 'react'

import Home from './components/Home/Home'
import './App.css'

const App = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const apiData = await response.json()
    setData(apiData[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data ? <Home data={data} /> : null
}

export default App
