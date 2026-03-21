

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Fav() {
	const [notes, setNotes] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetch('http://localhost:8000/api/notes/starred')
			.then(res => res.json())
			.then(data => setNotes(data));
	}, []);
	return (
		<div style={{ background: '#222', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', padding: 0, margin: 0, position: 'fixed', top: 0, left: 0 }}>
			<div style={{ background: '#fcffb2', minHeight: '100vh', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100vw', height: '100vh' }}>
				{/* Top bar with back button */}
				<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '28px 48px 0 48px', boxSizing: 'border-box' }}>
					<button
						onClick={() => navigate(-1)}
						style={{
							background: '#fff',
							color: '#222',
							border: 'none',
							borderRadius: 8,
							padding: '6px 24px',
							fontWeight: 600,
							fontSize: 16,
							fontFamily: 'monospace',
							cursor: 'pointer',
							boxShadow: '0 1px 2px #eee',
						}}
					>
						back
					</button>
				</div>
				{/* Main fav area */}
				<div style={{
					background: '#fff',
					borderRadius: 10,
					marginTop: 24,
					width: '95%',
					minHeight: '84vh',
					padding: '40px 48px',
					boxSizing: 'border-box',
					fontFamily: 'monospace',
					fontWeight: 600,
				}}>
					<div style={{ fontSize: 28, fontWeight: 700, marginBottom: 36 }}>favourites</div>
					{notes.length === 0 && <div>No starred notes found.</div>}
					{notes.map(note => (
						<div key={note._id}
							onClick={() => navigate(`/note/${note._id}`)}
							style={{
								background: '#fcffb2',
								padding: '32px 24px',
								margin: '0 0 32px 0',
								borderRadius: 12,
								minHeight: 110,
								fontFamily: 'monospace',
								fontSize: 20,
								fontWeight: 600,
								
								display: 'flex',
								alignItems: 'flex-start',
								cursor: 'pointer',
								transition: 'box-shadow 0.2s',
								
							}}
						>
							<span style={{ fontWeight: 600 }}>{note.title}</span>
							{note.Thought && note.Thought.map((thought, idx) => (
								<div key={thought._id || idx} style={{ marginLeft: 32, marginTop: 8 }}>
									<div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{thought.selectedText}</div>
									<div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{thought.note}</div>
									{thought.pageUrl && (
										<div style={{ fontSize: 14, fontWeight: 500, color: '#29aafc', wordBreak: 'break-all' }}>
											<span style={{ color: '#888', fontWeight: 400 }}>Source: </span>
											<a href={thought.pageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#29aafc', textDecoration: 'underline' }}>{thought.pageUrl}</a>
										</div>
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Fav;
