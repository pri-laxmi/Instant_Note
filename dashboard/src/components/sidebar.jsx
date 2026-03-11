import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <div style={{
            width: 190,
            background: '#fcffb2',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            height: '100vh',
            borderRight: 'none',
        }}>
            <div style={{ marginTop: 32, marginBottom: 16 }}>
                <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: '#fff',
                    margin: '0 auto',
                    border: 'none',
                }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, fontFamily: 'monospace', letterSpacing: 1 }}>USER</div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                <Link to='/' style={{
                    width: 140,
                    background: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 0',
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#222',
                    boxShadow: '0 1px 2px #eee',
                    marginBottom: 0,
                    cursor: 'pointer',
                    display: 'block',
                }}>dashboard</Link>
                <Link to='/favourites' style={{
                    width: 140,
                    background: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 0',
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#222',
                    boxShadow: '0 1px 2px #eee',
                    cursor: 'pointer',
                    display: 'block',
                }}>favourites</Link>
            </div>
        </div>
    );
}
export default Sidebar;