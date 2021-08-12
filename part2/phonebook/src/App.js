import React, { useState, useEffect } from "react";
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from "./services/personService";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
	const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)
    
    // Initializing persons state
    useEffect(() => {
        personService.getAll()
        .then(allPersons =>{
            setPersons(allPersons)
        })

    }, [])

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the error and notifications to null
            setError(null)
            setNotification(null)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, [error, notification])


    // Function for setting newName state
	const handleNameInput = (event) => {
		setNewName(event.target.value);
	};

    // Function for setting number state
    const handleNumberInput = (event) => {
        // Only allows numbers and hyphens to be inputted
        const re = /^[0-9-\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setNewNumber(event.target.value)
        }
    }

    // Function for setting filter state
    const handleFilterInput = (event) => {
        setFilter(event.target.value)
    }

    // Function for handling form submit
	const handleSubmit = (event) => {
		event.preventDefault();

        // Check for if the person with the same name already exists
        const found = persons.find(person => {
            if (person.name.toLowerCase() === newName.toLowerCase()) {
                return true
            } 
        })

        // If the person's found, update their number if the user confirms.
        if (found) {
            if (window.confirm(`${newName} is already in the phonebook, do you want to replace their old number with the new one?`)) {
                const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
                const updatedPerson = {...person, number: newNumber}
                personService.updatePerson(updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                    setNewName("")
                    setNewNumber("")
                    setNotification(`Updated ${returnedPerson.name}'s number`)

                })
                .catch(err => {
                    setError(`${updatedPerson.name} has been removed from the server`)
                })
            }
        } else {
            const newPerson = { 
                name: newName, 
                number: newNumber 
            }

            personService.addPerson(newPerson)
            .then(returnedPerson => {
                // Add the person and reset some state
                setPersons(persons.concat(returnedPerson));
                setNewName("")
                setNewNumber("")
                setNotification(`Added ${newName} to phonebook`)
            })
        }
	};

    const deletePerson = (person) => {
        const confirm = window.confirm(`Delete ${person.name}?`)
        if (confirm) {
            personService.deletePerson(person.id)
            .then(response => {
                personService.getAll()
                .then(allPersons =>{
                    setPersons(allPersons)
                })
                
            })
        }
    }


    // Holds array of filtered persons to show, if no filter is inputted, then the whole array is shown
    const personsToShow = filter === '' ? persons : persons.filter(person => {
        if (person.name.toLowerCase().startsWith(filter.toLowerCase())) {
            return person
        }
    })


	return (
		<div>
			<h2>Phonebook</h2>

            <Notification message={notification} />
            <Error message={error} />
            

            <Filter filterString={filter} handleInput={handleFilterInput} />

            <h2>Add a new person</h2>

			<PersonForm newName={newName} handleNameInput={handleNameInput} newNumber={newNumber} handleNumberInput={handleNumberInput} handleSubmit={handleSubmit} />

			<h2>Numbers</h2>

            <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
			

		</div>
	);
};

export default App;
