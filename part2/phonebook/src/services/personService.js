import axios from "axios"

const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data )
}

const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data )
}

const updatePerson = (updatedPerson) => {
    const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    return request.then(response => response.data)
}

const deletePerson = (personID) => {
    const request = axios.delete(`${baseUrl}/${personID}`)
    return request.then(response => response.data)
}

export default {getAll, addPerson, updatePerson, deletePerson}