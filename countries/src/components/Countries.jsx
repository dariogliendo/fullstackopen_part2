import axios from 'axios'
import { useState, useEffect } from "react"
import Country from './Country'

const Countries = ({ countries, filter }) => {
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    setFilteredCountries(getFilteredCountries())
  }, [filter])

  const getFilteredCountries = () => {
    return countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  if (!countries.length) return <p>Loading countries...</p>
  else if (!filter) return <p>Start typing in the filter to show countries</p>
  else return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {
        filteredCountries.length > 10 
          ? <p>Too many matches, try again</p>
          : filteredCountries.map(country => (
            <Country key={country.name.official} country={country} matches={filteredCountries}></Country>
          ))
      }
    </div>
  )
}

export default Countries