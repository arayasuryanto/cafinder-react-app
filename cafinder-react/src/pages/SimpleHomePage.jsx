import React from 'react';

const SimpleHomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#F05438' }}>Cafinder</h1>
        <p>Find Your Perfect Cafe</p>
      </header>
      
      <section style={{ 
        background: '#F05438', 
        color: 'white', 
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <h2>Temukan spot nongkrong cepat</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto' }}>
          Cafinder membantu kamu menemukan tempat ngopi dan nongkrong terbaik sesuai preferensimu.
        </p>
        <button style={{ 
          background: 'white', 
          color: '#F05438', 
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Cari Sekarang
        </button>
      </section>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Kategori Café Populer</h2>
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          overflow: 'auto',
          padding: '10px 0'
        }}>
          {['Belajar Spot', 'Meeting Bisnis', 'Nongkrong Bareng', 'Hidden Gem'].map(category => (
            <div key={category} style={{
              minWidth: '250px',
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <h3>{category}</h3>
              <p>Temukan cafe untuk {category.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </section>
      
      <footer style={{ 
        background: '#2A3541', 
        color: 'white', 
        padding: '40px 20px',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        <p>Made with ❤️ by Cafinder Teams</p>
      </footer>
    </div>
  );
};

export default SimpleHomePage;