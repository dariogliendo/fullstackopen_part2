import axios from 'axios'
import { useEffect, useState } from 'react'
import Countries from './components/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(({ data }) => {
        setCountries(data)
      })
  }, [])

  return (
    <>
      <h1>Countries</h1>
      <div>
        Filter: <input type="text" value={filter} onChange={e => setFilter(e.target.value)}></input>
      </div>
      <Countries countries={countries} filter={filter}></Countries>
    </>
  )
}

export default App
