import { useState, useEffect } from "react";
import axios from 'axios'
import SingleCountry from "./components/SingleCountry";
import Countries from "./components/Countries";

function App() {
    const [query, setQuery] = useState("")
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
        
    }, [])


    const handleInput = (event) => {
        const search = event.target.value
        setQuery(search)
        if (search === "") {
            setCountriesToShow([])
        } else {
            const arr = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
            setCountriesToShow(arr)
        }
    }

    const handleShow = (name) => {
        const arr = countries.filter(country => country.name === name)
        setCountriesToShow(arr)

    }

	return (
		<div>
            <div>
                find countries: <input value={query} onChange={handleInput}/>
            </div>

            {countriesToShow.length === 1 ?
                <SingleCountry country={countriesToShow[0]}/> :
                
                <Countries countriesToShow={countriesToShow} handleShow={handleShow}/>
            
            }
		</div>
	);
}

export default App;
