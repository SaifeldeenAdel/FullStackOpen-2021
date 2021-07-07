import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    return (
        <table>
            <tbody>
                <Statistic title='good' value={good} />
                <Statistic title='neutral' value={neutral} />
                <Statistic title='bad' value={bad} />
                <Statistic title='all' value={good + neutral + bad} />
                <Statistic title='average' value={(good * 1 + bad * - 1) / (good + neutral + bad)} />
                <Statistic title='all' value={`${good / (good + neutral + bad) * 100} %`} />
                
            </tbody>
        </table>
    )
}


const Statistic = ({title, value}) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({label, handleClick}) => {
    return (
        <button onClick={handleClick}>{label}</button>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    // Function for adding to the good stat
    const addGood = () => {
        setGood(good + 1)
    }

    // Function for adding to the neutral stat
    const addNeutral = () => {
        setNeutral(neutral + 1)
    }

    // Function for adding to the bad stat
    const addBad = () => {
        setBad(bad + 1)
        
    }
    return (
        <div>
            <h1>Give Feedback</h1>
            <Button label="good" handleClick={addGood}/>
            <Button label="neutral" handleClick={addNeutral}/>
            <Button label="bad" handleClick={addBad}/>

            <h1>Statistics</h1>
            {
                good === 0 && neutral === 0 && bad === 0 ?
                "No feedback given" :
                <>
                    <Statistics good={good} neutral={neutral} bad={bad} />
                </>
            }
            
        </div>
    )
}

export default App