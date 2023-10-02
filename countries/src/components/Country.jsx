import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Weather from './Weather'

const Country = ({ country, matches }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(false)

  useEffect(() => {
    if ((matches.length === 1 || showDetail)) {
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`)
        .then(({ data }) => {
          return data[0]
        })
        .then(capital => {
          return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${capital.lat}&lon=${capital.lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`)
        })
        .then(({ data }) => {
          setWeather(data)
        })
        .catch(err => {
          setWeatherError(true)
        })
    }
  }, [matches, showDetail])

  return (
    <div>
      {matches.length !== 1
        ? <div className="country-row">
          <span>{country.name.common}</span>
          <button onClick={() => setShowDetail(!showDetail)}>{showDetail ? 'Hide' : 'Show'}</button>
        </div>
        : null
      }
      {
        matches.length == 1 || showDetail
          ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h1>{country.name.common}</h1>
              <img src={country.flags.svg} alt={country.flags.alt} style={{ width: 200 }} />
              <div className="countryDetails">
                <div className="detailRow">
                  <strong>Official Name:</strong>
                  <span>{country.name.official}</span>
                </div>
                <div className="detailRow">
                  <strong>{country.capital.length > 1 ? 'Capitals:' : 'Capital:'}</strong>
                  <span>{country.capital.length > 1 ? country.capital.join(', ') : country.capital[0]}</span>
                </div>
                <div className="detailRow">
                  <strong>Languages: </strong>
                  <ul style={{ margin: 0 }}>
                    {Object.entries(country.languages).map(lang => (
                      <li key={lang[0]}>{lang[1]}</li>
                    ))}
                  </ul>
                </div>
                <Weather country={country} weather={weather} error={weatherError}></Weather>
              </div>
            </div>
          )
          : null
      }
    </div>
  )
}

export default Country