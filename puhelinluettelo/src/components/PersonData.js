const PersonData = (props) => {
  const { person } = props
  const { deletePerson } = props
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={() => {deletePerson(person)}}>delete</button></td>
    </tr>
  )
}

export default PersonData;