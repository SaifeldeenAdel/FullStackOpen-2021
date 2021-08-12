import axios from "axios";
import { useEffect, useState } from "react";

const SingleCountry = ({ country }) => {
    const [weather, setWeather] = useState()
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
        .then(response => {
            setWeather(response.data)
            
        })
    }, [])

	return (
		<div>
			<h1>{country.name}</h1>

			<div>Capital: {country.capital}</div>
			<div>Population: {country.population}</div>

			<h3>Languages</h3>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
            
			<img src={country.flag} width={100} />

            {weather && 
                <>
                    <h3>Weather in {weather.location.name}</h3>
                    <div>Temperature: {weather.current.temperature} Celcius</div>
                    <img src={weather.current.weather_icons} width={100} />
                    <div>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>

                </>
            }





		</div>
	);
};

export default SingleCountry;
