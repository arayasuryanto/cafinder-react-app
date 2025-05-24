import React from 'react';

function BasicHomePage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 0',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: '#F05438',
            marginRight: '10px'
          }}></div>
          <h1 style={{ color: '#F05438', margin: 0 }}>Cafinder</h1>
        </div>
        
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Home</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Cafe Map</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Catalog</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>About</a></li>
          </ul>
        </nav>
        
        <div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            border: '1px solid #F05438',
            color: '#F05438',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer'
          }}>
            Login
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#F05438',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Sign Up
          </button>
        </div>
      </header>

      <main>
        <section style={{
          height: '500px',
          backgroundColor: '#333',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '40px',
          borderRadius: '8px'
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
            Temukan <span style={{ color: '#F05438' }}>spot</span> nongkrong cepat
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', marginBottom: '30px' }}>
            Cafinder membantu kamu menemukan tempat ngopi dan nongkrong terbaik sesuai preferensimu.
          </p>
          <button style={{
            padding: '15px 30px',
            backgroundColor: '#F05438',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Cari Sekarang
          </button>
        </section>

        <section style={{ marginTop: '60px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Kategori Café Populer</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
            {['Belajar Spot', 'Meeting Bisnis', 'Nongkrong Bareng', 'Hidden Gem'].map(category => (
              <div key={category} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}>
                <div style={{
                  height: '150px',
                  backgroundColor: '#f3f3f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F05438',
                  fontSize: '36px'
                }}>
                  ☕
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(240, 84, 56, 0.1)',
                    color: '#F05438',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}>
                    {category}
                  </span>
                  <h3 style={{ margin: '0 0 10px 0' }}>Cafe for {category}</h3>
                  <p style={{ margin: 0, color: '#666' }}>
                    Temukan cafe untuk {category.toLowerCase()} yang nyaman dan sesuai kebutuhanmu.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ 
          display: 'flex', 
          gap: '40px', 
          marginTop: '60px',
          backgroundColor: '#f9f9f9',
          padding: '40px',
          borderRadius: '8px'
        }}>
          <div style={{ flex: 1 }}>
            <h2>Temukan Pengalaman Café yang Sempurna</h2>
            <p>
              Cafinder membantu kamu menemukan tempat nongkrong favorit berdasarkan preferensi personal. 
              Dari cafe untuk kerja, meeting, hingga nongkrong santai bersama teman.
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px',
                fontSize: '16px'
              }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'rgba(240, 84, 56, 0.1)',
                  borderRadius: '50%',
                  marginRight: '15px',
                  color: '#F05438',
                  fontSize: '12px'
                }}>
                  ✓
                </span>
                Filter pencarian customizable dan fleksibel
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px',
                fontSize: '16px'
              }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'rgba(240, 84, 56, 0.1)',
                  borderRadius: '50%',
                  marginRight: '15px',
                  color: '#F05438',
                  fontSize: '12px'
                }}>
                  ✓
                </span>
                Review asli dari komunitas dan pengguna lain
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px',
                fontSize: '16px'
              }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'rgba(240, 84, 56, 0.1)',
                  borderRadius: '50%',
                  marginRight: '15px',
                  color: '#F05438',
                  fontSize: '12px'
                }}>
                  ✓
                </span>
                Rekomendasi yang sesuai preferensi di profilmu
              </li>
            </ul>
            
            <button style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#F05438',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginTop: '20px',
              cursor: 'pointer'
            }}>
              Jelajahi Cafe
            </button>
          </div>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#F05438',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '36px'
            }}>
              Cafinder
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        backgroundColor: '#2A3541',
        color: 'white',
        padding: '60px 0 30px',
        marginTop: '60px',
        borderRadius: '8px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '30px',
          padding: '0 20px',
          marginBottom: '50px'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#F05438',
                marginRight: '10px'
              }}></div>
              <h2 style={{ color: 'white', margin: 0 }}>Cafinder</h2>
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '20px'
            }}>
              Discover insights and recommendations to enhance your cafe experience in Surabaya and beyond.
            </p>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              fontWeight: '600'
            }}>About</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none'
                }}>About Us</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none'
                }}>Find Cafes</a>
              </li>
            </ul>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              fontWeight: '600'
            }}>Support</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none'
                }}>Customer Support</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  textDecoration: 'none'
                }}>Privacy & Policy</a>
              </li>
            </ul>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              fontWeight: '600'
            }}>Join Our Community</h3>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <input type="email" placeholder="Enter your email..." style={{
                flex: 1,
                padding: '10px 15px',
                border: 'none',
                borderRadius: '4px 0 0 4px',
                fontSize: '14px'
              }} />
              <button style={{
                padding: '10px 15px',
                backgroundColor: '#F05438',
                color: 'white',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer'
              }}>
                →
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '30px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.5)',
          margin: '0 20px'
        }}>
          <p>Made with ❤️ by Cafinder Teams</p>
        </div>
      </footer>
    </div>
  );
}

export default BasicHomePage;