import React, { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);


    const handleVote = () => {
        // Creates copy of array and increases votes accordingly
        const copy = [...votes]
        copy[selected] += 1 
        setVotes(copy)
    }

    const handleNext = () => {
        // Sets the selected to a random number between 0 and 6
        setSelected(Math.floor(Math.random() * 6))
    }

	return (
		<>
            <h1>Anecdote of the day</h1>
			<div>
                {anecdotes[selected]}
            </div>
            <div>
                has {votes[selected]} votes
            </div>
            
			<button onClick={handleVote}>
                vote
            </button>

			<button onClick={handleNext}>
				next anecdote
			</button>

            <h1>Anecdote with the most votes</h1>
            <div>
                {/* Finds the index of the highest vote, and this will the index used to find the anecdote with the highest votes */}
                {anecdotes[votes.indexOf(Math.max(...Object.values(votes)))]}
            </div>
            <div>
                has {Math.max(...Object.values(votes))} votes
            </div>

		</>
	);
};

export default App;
