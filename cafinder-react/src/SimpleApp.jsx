import React from 'react';
import './App.css';

function SimpleApp() {
  return (
    <div className="App">
      <header style={{ background: '#F05438', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>Cafinder</h1>
        <p>Find Your Perfect Cafe</p>
      </header>
      
      <main style={{ padding: '20px' }}>
        <section style={{ textAlign: 'center', margin: '40px 0' }}>
          <h2>Welcome to Cafinder React</h2>
          <p>The React transformation of the Cafinder project is in progress.</p>
          <p>This is a simple placeholder to confirm the React app is working.</p>
        </section>
        
        <section style={{ maxWidth: '800px', margin: '0 auto', background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h3>Features Coming Soon:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>✅ Browse cafes on an interactive map</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>✅ Search and filter cafes</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>✅ View detailed cafe information</li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>✅ Save favorite cafes</li>
            <li style={{ padding: '10px 0' }}>✅ Mobile-friendly responsive design</li>
          </ul>
        </section>
      </main>
      
      <footer style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
        <p>Cafinder - React Version</p>
      </footer>
    </div>
  );
}

export default SimpleApp;