
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';

function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [starError, setStarError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const fetchNote = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/notes`)
      .then(res => res.json())
      .then(data => {
        const foundNote = data.find(n => n._id === id);
        setNote(foundNote);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleStarToggle = async () => {
    setStarError("");
    try {
      const res = await fetch(`http://localhost:8000/api/notes/${id}/star`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to toggle star');
      const updated = await res.json();
      setNote(updated);
    } catch (err) {
      setStarError(err.message);
    }
  };

  const handleDelete = async () => {
    setDeleteError("");
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete note');
      navigate('/');
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  if (loading || !note) return <div>loading...</div>;
  return (
    <div style={{ background: '#222', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', padding: 0, margin: 0, position: 'fixed', top: 0, left: 0 }}>
      <div style={{ background: '#fcffb2', minHeight: '100vh', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100vw', height: '100vh' }}>
        {/* Top bar with buttons */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 48px 0 48px', boxSizing: 'border-box' }}>
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
          <div style={{ display: 'flex', gap: 18 }}>
            <button
              onClick={handleStarToggle}
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
              {note.isStarred ? 'unStar' : 'Star'}
              
            </button>
            <button
              onClick={handleDelete}
              style={{
                background: '#f04c4c',
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
              delete
            </button>
          </div>
        </div>
        {/* Main note area */}
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
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 36 }}>{note.title}</div>
          {note.Thought && note.Thought.map((thought, idx) => (
            <div key={thought._id || idx} style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{thought.selectedText}</div>
              <div style={{ fontSize: 20, fontWeight: 600, marginLeft: 24, marginBottom: 6 }}>{thought.note}</div>
              {thought.pageUrl ? (
                <div style={{ fontSize: 16, fontWeight: 500, marginLeft: 24, color: '#29aafc', wordBreak: 'break-all' }}>
                  <span style={{ color: '#888', fontWeight: 400 }}>Source: </span>
                  <a href={thought.pageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#29aafc', textDecoration: 'underline' }}>{thought.pageUrl}</a>
                </div>
              ) : (
                <pre style={{ marginLeft: 24, color: '#f04c4c', fontSize: 13, background: '#f9f9f9', padding: 8, borderRadius: 4 }}>
                  {/* Debug: show the full thought object if url is missing */}
                  {JSON.stringify(thought, null, 2)}
                </pre>
              )}
            </div>
          ))}
          {starError && <div style={{ color: 'red' }}>{starError}</div>}
          {deleteError && <div style={{ color: 'red' }}>{deleteError}</div>}
        </div>
      </div>
    </div>
  );
}
export default ViewNote;