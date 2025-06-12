import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BurndownChartPage = () => {
  const chartRef = useRef(null);
  const currentChart = useRef(null);

  // Realistic project data based on Cafinder development
  const weekLabels = [];
  for(let i = 1; i <= 22; i++) {
    weekLabels.push(`Week ${i}`);
  }
  
  // Initial ideal plan (straight line from 68 to 0 in 16 weeks)
  const idealBurndown = [];
  const totalTasks = 68;
  const plannedWeeks = 16;
  
  for(let i = 0; i <= plannedWeeks; i++) {
    const remaining = totalTasks - (totalTasks * i / plannedWeeks);
    idealBurndown.push(Math.max(0, remaining));
  }
  
  // Add null values for weeks beyond planned timeline
  for(let i = plannedWeeks + 1; i <= 22; i++) {
    idealBurndown.push(null);
  }
  
  // Actual execution with realistic delays and setbacks
  const actualBurndown = [
    68, 65, 61, 58, 54,  // Week 1-5: Foundation phase slower start
    50, 46, 41, 37, 32,  // Week 6-10: Development ramp up
    28, 25, 22, 19, 17,  // Week 11-15: Steady progress
    15, 13, 11, 8, 6,    // Week 16-20: Implementation challenges
    4, 2, 0              // Week 21-22: Final push and completion
  ];

  const createBurndownChart = () => {
    const ctx = chartRef.current.getContext('2d');
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: 'Ideal Burndown (16 weeks)',
            data: idealBurndown,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderWidth: 4,
            borderDash: [10, 5],
            fill: false,
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            tension: 0
          },
          {
            label: 'Actual Progress (22 weeks)',
            data: actualBurndown,
            borderColor: '#F05438',
            backgroundColor: 'rgba(240, 84, 56, 0.1)',
            borderWidth: 4,
            fill: 'origin',
            pointBackgroundColor: '#F05438',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 8,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            callbacks: {
              afterBody: function(context) {
                const weekIndex = context[0].dataIndex;
                if (weekIndex < actualBurndown.length) {
                  const remaining = actualBurndown[weekIndex];
                  const completed = totalTasks - remaining;
                  const progressPercent = Math.round((completed / totalTasks) * 100);
                  
                  return [
                    `Tasks Completed: ${completed}`,
                    `Progress: ${progressPercent}%`,
                    weekIndex <= 16 ? 'Status: Within planned timeline' : 'Status: Extended timeline'
                  ];
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Project Timeline (Weeks)',
              font: { size: 16, weight: 'bold' },
              color: '#2A3541'
            },
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              font: { size: 12 }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Remaining Tasks',
              font: { size: 16, weight: 'bold' },
              color: '#2A3541'
            },
            beginAtZero: true,
            max: 75,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              font: { size: 12 }
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  };

  useEffect(() => {
    currentChart.current = createBurndownChart();
    
    return () => {
      if (currentChart.current) {
        currentChart.current.destroy();
      }
    };
  }, []);

  const chartStyles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #F05438 0%, #e14a30 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 1.3rem;
      opacity: 0.9;
      margin-bottom: 20px;
    }
    
    .status-badges {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    
    .status-badge {
      padding: 10px 20px;
      border-radius: 25px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .badge-planned {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }
    
    .badge-actual {
      background: rgba(255, 193, 7, 0.9);
      color: #333;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 30px;
      background: #f8f9fa;
    }
    
    .metric-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      text-align: center;
      transition: transform 0.3s ease;
      border-left: 4px solid;
    }
    
    .metric-card.planned { border-left-color: #007bff; }
    .metric-card.actual { border-left-color: #ffc107; }
    .metric-card.delay { border-left-color: #dc3545; }
    .metric-card.completion { border-left-color: #28a745; }
    
    .metric-card:hover {
      transform: translateY(-5px);
    }
    
    .metric-value {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .metric-label {
      color: #6c757d;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .chart-section {
      padding: 40px 30px;
    }
    
    .chart-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .chart-title {
      font-size: 2rem;
      color: #2A3541;
      margin-bottom: 10px;
    }
    
    .chart-subtitle {
      color: #6c757d;
      font-size: 1.1rem;
    }
    
    .chart-container {
      position: relative;
      height: 600px;
      margin-bottom: 40px;
      background: #fafafa;
      border-radius: 15px;
      padding: 20px;
    }
    
    .analysis-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 40px;
    }
    
    .analysis-panel {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 15px;
    }
    
    .analysis-panel h3 {
      color: #2A3541;
      margin-bottom: 20px;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .phase-breakdown {
      background: white;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .phase-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #e9ecef;
    }
    
    .phase-item:last-child {
      border-bottom: none;
    }
    
    .phase-info h4 {
      color: #2A3541;
      margin-bottom: 5px;
    }
    
    .phase-period {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .phase-status {
      text-align: right;
    }
    
    .status-indicator {
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .status-ontime {
      background: #d4edda;
      color: #155724;
    }
    
    .status-delayed {
      background: #f8d7da;
      color: #721c24;
    }
    
    .insights {
      background: #f8f9fa;
      padding: 30px;
      border-radius: 15px;
      margin-top: 30px;
    }
    
    .insights h3 {
      color: #2A3541;
      margin-bottom: 25px;
      font-size: 1.6rem;
      text-align: center;
    }
    
    .insights-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }
    
    .insight-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.05);
      border-left: 5px solid;
    }
    
    .insight-card.reality { border-left-color: #ffc107; }
    .insight-card.learning { border-left-color: #17a2b8; }
    .insight-card.improvement { border-left-color: #28a745; }
    
    .insight-title {
      font-weight: 700;
      color: #2A3541;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }
    
    .insight-content {
      color: #6c757d;
      line-height: 1.7;
      margin-bottom: 15px;
    }
    
    .insight-highlight {
      padding: 12px 15px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    .reality .insight-highlight {
      background: rgba(255, 193, 7, 0.1);
      color: #856404;
    }
    
    .learning .insight-highlight {
      background: rgba(23, 162, 184, 0.1);
      color: #0c5460;
    }
    
    .improvement .insight-highlight {
      background: rgba(40, 167, 69, 0.1);
      color: #155724;
    }
    
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.2rem;
      }
      
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        padding: 20px;
      }
      
      .chart-section {
        padding: 20px 15px;
      }
      
      .analysis-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `;

  return (
    <div>
      <style>{chartStyles}</style>
      <div className="container">
        <div className="header">
          <h1>📊 Cafinder Project Burndown Analysis</h1>
          <p>Realitas vs Ekspektasi: Pembelajaran dari Eksekusi Sprint</p>
          
          <div className="status-badges">
            <div className="status-badge badge-planned">📋 Planned: 16 weeks</div>
            <div className="status-badge badge-actual">⏰ Actual: 22 weeks</div>
          </div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-card planned">
            <div className="metric-value" style={{color: '#007bff'}}>16</div>
            <div className="metric-label">Planned Weeks</div>
          </div>
          <div className="metric-card actual">
            <div className="metric-value" style={{color: '#ffc107'}}>22</div>
            <div className="metric-label">Actual Weeks</div>
          </div>
          <div className="metric-card delay">
            <div className="metric-value" style={{color: '#dc3545'}}>+6</div>
            <div className="metric-label">Weeks Delay</div>
          </div>
          <div className="metric-card completion">
            <div className="metric-value" style={{color: '#28a745'}}>68</div>
            <div className="metric-label">Tasks Completed</div>
          </div>
        </div>
        
        <div className="chart-section">
          <div className="chart-header">
            <h2 className="chart-title">Cafinder Project Burndown Chart</h2>
            <p className="chart-subtitle">Tracking Sprint Progress: Ideal vs Reality</p>
          </div>
          
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
          
          <div className="analysis-grid">
            <div className="analysis-panel">
              <h3>📅 Sprint Timeline Breakdown</h3>
              <div className="phase-breakdown">
                <div className="phase-item">
                  <div className="phase-info">
                    <h4>Sprint 1-2: Foundation</h4>
                    <div className="phase-period">Planned: 5 weeks | Actual: 6 weeks</div>
                  </div>
                  <div className="phase-status">
                    <div className="status-indicator status-delayed">+1 week</div>
                  </div>
                </div>
                
                <div className="phase-item">
                  <div className="phase-info">
                    <h4>Sprint 3-5: Development</h4>
                    <div className="phase-period">Planned: 6 weeks | Actual: 8 weeks</div>
                  </div>
                  <div className="phase-status">
                    <div className="status-indicator status-delayed">+2 weeks</div>
                  </div>
                </div>
                
                <div className="phase-item">
                  <div className="phase-info">
                    <h4>Sprint 6-8: Implementation</h4>
                    <div className="phase-period">Planned: 5 weeks | Actual: 8 weeks</div>
                  </div>
                  <div className="phase-status">
                    <div className="status-indicator status-delayed">+3 weeks</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="analysis-panel">
              <h3>📈 Key Performance Indicators</h3>
              <div className="phase-breakdown">
                <div className="phase-item">
                  <div className="phase-info">
                    <h4>Scope Completion</h4>
                    <div className="phase-period">All 68 tasks delivered successfully</div>
                  </div>
                  <div className="phase-status">
                    <div className="status-indicator status-ontime">100%</div>
                  </div>
                </div>
                
                <div className="phase-item">
                  <div className="phase-info">
                    <h4>Timeline Adherence</h4>
                    <div className="phase-period">37.5% longer than planned</div>
                  </div>
                  <div className="phase-status">
                    <div className="status-indicator status-delayed">-37.5%</div>
                  </div>
                </div>
                
                <div className="phase-item">
                  <div className="phase-info">
                    <h4>Quality Standards</h4>
                    <div className="phase-period">No major bugs or rollbacks</div>
                  </div>
                  <div className="phase-status">
                    <div className="status-indicator status-ontime">Excellent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="insights">
          <h3>💡 Insights & Pembelajaran Sprint</h3>
          
          <div className="insights-content">
            <div className="insight-card reality">
              <div className="insight-title">⚠️ Realitas Pengembangan</div>
              <div className="insight-content">
                Estimasi awal ternyata terlalu optimis. Kompleksitas fitur SmartFinder dan integrasi data kafe membutuhkan waktu lebih lama dari perkiraan. Fase Implementation mengalami delay terbesar (+3 minggu) karena debugging dan optimization.
              </div>
              <div className="insight-highlight">
                Learning: Estimasi development time sebaiknya ditambah buffer 40-50%
              </div>
            </div>
            
            <div className="insight-card learning">
              <div className="insight-title">📚 Key Learnings</div>
              <div className="insight-content">
                Meskipun timeline lebih panjang, kualitas produk tetap terjaga. Tim belajar bahwa sustainable development lebih penting daripada rushing untuk deadline. User testing dan iteration memerlukan waktu signifikan.
              </div>
              <div className="insight-highlight">
                Takeaway: Quality over speed - customer satisfaction tetap tinggi
              </div>
            </div>
            
            <div className="insight-card improvement">
              <div className="insight-title">🎯 Future Improvements</div>
              <div className="insight-content">
                Untuk proyek selanjutnya: (1) Break down tasks lebih detail, (2) Tambahkan buffer time untuk setiap sprint, (3) Lakukan user testing lebih early, (4) Set up better monitoring untuk early warning system.
              </div>
              <div className="insight-highlight">
                Next Sprint: Implement Agile estimation techniques & retrospectives
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer style={{backgroundColor: '#2A3541', color: 'white', padding: '40px 0', marginTop: '50px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px'}}>
            <div>
              <div style={{marginBottom: '20px'}}>
                <img 
                  src="/images/cafinder-logo.png" 
                  alt="Cafinder Logo" 
                  style={{ height: '40px', width: 'auto' }}
                />
              </div>
              <p style={{opacity: 0.8, lineHeight: 1.6}}>Discover insights and recommendations to enhance your cafe experience in Surabaya and beyond.</p>
            </div>
            
            <div>
              <h3 style={{marginBottom: '20px', fontSize: '1.2rem'}}>Menu</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}><a href="/cafemap" style={{color: 'white', textDecoration: 'none', opacity: 0.8}}>Cafe Map</a></li>
                <li style={{marginBottom: '10px'}}><a href="/catalog" style={{color: 'white', textDecoration: 'none', opacity: 0.8}}>Katalog Cafe</a></li>
                <li style={{marginBottom: '10px'}}><a href="/burndown-chart" style={{color: 'white', textDecoration: 'none', opacity: 0.8}}>Burndown Chart</a></li>
              </ul>
            </div>
            
            <div>
              <h3 style={{marginBottom: '20px', fontSize: '1.2rem'}}>Feature</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}><a href="/finder" style={{color: 'white', textDecoration: 'none', opacity: 0.8}}>Smart Finder</a></li>
                <li style={{marginBottom: '10px'}}><a href="/about" style={{color: 'white', textDecoration: 'none', opacity: 0.8}}>Tentang Kami</a></li>
              </ul>
            </div>
            
            <div>
              <h3 style={{marginBottom: '20px', fontSize: '1.2rem'}}>Join Our Community</h3>
              <div style={{display: 'flex', gap: '10px'}}>
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
                <button style={{
                  padding: '10px 15px',
                  backgroundColor: '#F05438',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
            <p style={{opacity: 0.8}}>Made with ❤️ by Cafinder Teams</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BurndownChartPage;