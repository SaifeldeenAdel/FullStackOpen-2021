const PersonForm = ({ newName, handleNameInput, newNumber, handleNumberInput, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameInput} required/>
            </div>

            <div>
                number: <input value={newNumber} onChange={handleNumberInput} required />
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
