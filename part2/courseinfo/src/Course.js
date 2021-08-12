const Course = ({ course }) => {
	return (
		<div>
			<Header title={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};


const Header = ({ title }) => {
	return <h2>{title}</h2>;
};


const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part part={part} key={part.id} />
			))}
			<Total parts={parts} />
		</>
	);
};


const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};


const Total = ({ parts }) => {
	const total = parts.reduce((s, p) => s + p.exercises, 0);

	return <strong>Total of {total} exercises</strong>;
};


export default Course