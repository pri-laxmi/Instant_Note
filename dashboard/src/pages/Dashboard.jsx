import {useEffect,useState} from "react";
import{useNavigate} from "react-router-dom";
import Sidebar from "../components/sidebar";
import SearchBox from "../components/searchBox";
function Dashboard(){
    const [notes,setNotes]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate=useNavigate();
        useEffect(()=>{
                fetch('http://localhost:8000/api/notes')
                .then(res=>res.json())
                .then(data=>setNotes(data));
        },[]);

        return (
            <div style={{ background: '#222', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', padding: 0, margin: 0, position: 'fixed', top: 0, left: 0 }}>
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    background: '#fff',
                    borderRadius: 0,
                    display: 'flex',
                    overflow: 'hidden',
                    margin: 0,
                    boxSizing: 'border-box',
                }}>
                    {/* Sidebar */}
                    <Sidebar />
                    {/* Main Content */}
                    <div style={{ flex: 1, background: '#fff', padding: 0, minHeight: '100vh', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '40px 0 32px 0', paddingLeft: 32, paddingRight: 32 }}>
                            <h1 style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 32, letterSpacing: 2, margin: 0 }}>HELLO , PRIYA!</h1>
                            <div style={{ flex: 1 }} />
                            <div style={{ width: 520, marginLeft: 0, marginRight: 40 }}>
                                <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            </div>
                        </div>
                        <div style={{ flex: 1, padding: '0 32px 32px 32px', overflowY: 'auto' }}>
                            {notes
                                .filter(note => {
                                    const term = searchTerm.toLowerCase();
                                    return (
                                        note.title.toLowerCase().includes(term) ||
                                        (note.tags && note.tags.some(tag => tag.toLowerCase().includes(term)))
                                    );
                                })
                                .map(note => (
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
                                            boxShadow: '0 1px 4px #f7f7f7',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            cursor: 'pointer',
                                            transition: 'box-shadow 0.2s',
                                        }}
                                        onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px #eaeaea'}
                                        onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #f7f7f7'}
                                    >
                                        <span style={{ fontWeight: 600 }}>{note.title}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
        
}
export default Dashboard;