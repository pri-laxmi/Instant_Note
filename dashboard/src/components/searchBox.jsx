import React from "react";


function SearchBox({ searchTerm, setSearchTerm }) {
	return (
		<input
			type="text"
			placeholder="Search by title or tags..."
			value={searchTerm}
			onChange={e => setSearchTerm(e.target.value)}
			style={{
				background: '#fcffb2',
				padding: '12px 20px',
				borderRadius: '10px',
				border: 'none',
				marginLeft: 0,
				fontSize: '16px',
				outline: 'none',
				color: '#222',
				width: '100%',
				maxWidth: 520,
				fontWeight: 500,
				boxShadow: '0 1px 4px #f7f7f7',
				fontFamily: 'monospace',
				letterSpacing: 1,
			}}
		/>
	);
}

export default SearchBox;
