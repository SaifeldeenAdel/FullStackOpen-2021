import React from "react";

const Countries = ({ countriesToShow, handleShow }) => {
	return (
		<div>
			{
                countriesToShow.length > 10 ? (
				<div>Too many matches, specify another filter</div>
			) : (
				countriesToShow.map((country) => (
					<div key={country.name}>
						{country.name} <button onClick={() => handleShow(country.name)}>show</button>
					</div>
				))
			)}
		</div>
	);
};

export default Countries;
