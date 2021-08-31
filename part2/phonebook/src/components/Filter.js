const Filter = ({ filterString, handleInput }) => {
    return (
        <div>
            filter: <input value={filterString} onChange={handleInput} />
        </div>
    )
}

export default Filter
