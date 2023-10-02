import axios from "axios"
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
  return axios.get(baseUrl)
    .then(({ data }) => data)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
    .then(({data}) => data)
}

const remove = (id) => {
  return axios.delete(baseUrl + id)
    .then(({data}) => data)
}

const update = (id, newObj) => {
  return axios.put(baseUrl + id, newObj)
    .then(({data}) => data)}

export default {
  getAll,
  create,
  remove,
  update
}