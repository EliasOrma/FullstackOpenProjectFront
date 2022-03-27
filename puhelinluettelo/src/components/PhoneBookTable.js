import PersonData from './PersonData'

const PhoneBookTable = (props) => {
    const { filteredPersons } = props
    const { deletePerson } = props
    return (
        <div>
            <table>
                <tbody>
                    {filteredPersons.map(person => <PersonData person={person} key={person.name} deletePerson={deletePerson} />)}
                </tbody>
            </table>
        </div>
    )
}

export default PhoneBookTable;