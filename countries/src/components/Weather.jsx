const Weather = ({weather, error, country}) => {
  if (error) return <span>There was an error trying to retrieve weather for {country.capital[0]}</span>
  if (!weather) return <span>Retrieving wather for {country.capital[0]}...</span>
  return (
    <>
      <h2>Weather in {country.capital[0]}</h2>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} title={weather.weather[0].main} style={{ width: '150px' }} />
      <span>The temperature is: {Math.round(weather.main.temp)}°C</span>
      <div className="detailRow">
        <strong>Feels like: </strong>
        <span>{Math.round(weather.main['feels_like'])}°C</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>
              Max
            </th>
            <th>
              Min
            </th>
          </tr>
          <tr>
            <td>
              {Math.round(weather.main['temp_max'])}°C
            </td>
            <td>
              {Math.round(weather.main['temp_min'])}°C
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Weather