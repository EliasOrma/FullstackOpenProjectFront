import axios from 'axios'
const baseUrl = 'https://thawing-cove-41399.herokuapp.com'


const getAll = () => {
    return axios
        .get(baseUrl + '/api/persons')
        .then(response => response.data)
}

const create = (newPerson) => {
    return axios
        .post(baseUrl + '/api/persons', newPerson)
        .then(response => {
            console.log('success!')
            return true
        })
        .catch(error => {
            console.log(error)
            console.log('fail')
            return false
        })
}

const deletePerson = (personId) => {
    return axios
        .delete(baseUrl + `/api/persons/${personId}`)
        .then(response => {
            console.log('success!')
        })
        .catch(error => {
            console.log(error)
            console.log('fail')
        })
}

export default {
    getAll, create, deletePerson
}