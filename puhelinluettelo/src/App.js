import { useState, useEffect } from 'react'
import PhoneBookTable from './components/PhoneBookTable'
import Filter from './components/Filter'
import dataService from './services/DbCommands'
import Notification from './components/Notification'


const App = () => {
  useEffect(() => {
    dataService.getAll().then(data => {
      setPersons(data)
    })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)

  const addNewPerson = (event) => {
    // Blocks refresh
    event.preventDefault()
    const personNames = persons.map(person => person.name)
    if (personNames.includes(newName)) {
      const message = `${newName} is already added to phonebook`
      window.alert(message)
    } else {
      // Create new person
      const newId = Math.floor(Math.random() * 100)
      const newPerson = { name: newName, number: newNumber, id: newId }
      dataService.create(newPerson).then((success) => {
        if (success) {
          setPersons([...persons, newPerson])
          setAddedMessage(
            `Added ${newPerson.name}`
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        } else {
          console.log('Fail')
          setAddedMessage(
            `Person must have name and number!`
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        }

      })

    }
  }

  const deletePerson = (person) => {
    const message = `Delete ${person.name} ?`
    const result = window.confirm(message);
    if (result) {
      dataService.deletePerson(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setAddedMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const searchParameter = event.target.value.toLowerCase()
    setFilter(searchParameter)
  }

  const filteredPersons = persons.filter(person => {
    if (person.name && filter) {
      return person.name.toLowerCase().includes(filter)
    }
    return {}
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneBookTable filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App