import { useEffect, useState } from 'react'
import personsService from './services/persons'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <span>Filter: </span>
      <input value={filter} onChange={(e) => setFilter(e.target.value)}></input>
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <li>
      <span>{person.name} - {person.number}</span>
      <button onClick={e => removePerson(person.id)}>Delete</button>
    </li>
  )
}

const AddPersonForm = ({ handleSubmit, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = ({ message, error }) => {
  if (message === null) return null
  return (
    <>
      <div className={`notification ${error ? 'error' : ''}`}>
        {message}
      </div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personsService.getAll()
      .then(data => setPersons(data))
  }, [])

  const showMessage = (message, error) => {
    if (error) setError(true)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 2000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let promise
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (!window.confirm(`${existingPerson.name} already exists in the phonebook. Do you wish to replace their old number with the new one?`)) return
      promise = personsService.update(existingPerson.id, { ...existingPerson, number: newNumber })
        .then(data => {
          showMessage(`${data.name} was succesfully updated`)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : data))
        })
        .catch(error => {
          showMessage(`${existingPerson.name} has already been removed from server`, true)
        })
    }
    else promise = personsService.create({ name: newName, number: newNumber })
      .then(data => {
        showMessage(`You have succesfully added ${data.name} to your phonebook`)
        setPersons(persons.concat(data))
      })
      .catch(error => {
        showMessage(`An error occured while trying to add ${newName} to the phonebook`, true)
      })
    
    promise.then(data => {
      setNewName('')
      setNewNumber('')
    })
  }

  const removePerson = (id) => {
    const person = persons.find(x => x.id === id)
    if (!person) return alert("Couldn't find the person to remove")
    if (!window.confirm(`Delete ${person.name}`)) return
    personsService.remove(person.id)
      .then(() => {
        setPersons(persons.filter(x => x.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <Notification message={message} error={error}></Notification>
      <ul>
        {persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => (
            <Person person={person} removePerson={removePerson} key={person.id}></Person>
          ))}
      </ul>
    </div>
  )
}

export default App