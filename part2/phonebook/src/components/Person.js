import axios from "axios"
import personService from "../services/personService"

const Person = ({ person, deletePerson }) => {

    return (
        <div>
            {person.name}: {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
    )
}

export default Person