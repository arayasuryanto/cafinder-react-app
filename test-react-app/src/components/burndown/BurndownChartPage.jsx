import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BurndownChartPage = () => {
  const chartRef = useRef(null);
  const currentChart = useRef(null);
  const [activeTab, setActiveTab] = useState('burndown');

  // Data lengkap 8-sprint dengan semua task selesai
  const sprintLabels = ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6', 'Sprint 7', 'Sprint 8'];
  
  // Tasks per sprint
  const tasksPerSprint = [7, 5, 7, 9, 11, 10, 8, 11];
  
  // Semua tasks selesai 100%
  const idealCumulative = [7, 12, 19, 28, 39, 49, 57, 68];
  const actualCumulative = [7, 12, 19, 28, 39, 49, 57, 68];
  
  // Velocity per sprint (semua tasks completed)
  const velocity = [7, 5, 7, 9, 11, 10, 8, 11];
  
  // Remaining work (turun sampai 0)
  const idealRemaining = [61, 56, 49, 40, 29, 19, 11, 0];
  const actualRemaining = [61, 56, 49, 40, 29, 19, 11, 0];

  const createBurndownChart = () => {
    const ctx = chartRef.current.getContext('2d');
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: sprintLabels,
        datasets: [
          {
            label: 'Target Remaining Work',
            data: idealRemaining,
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
            borderWidth: 3,
            borderDash: [10, 5],
            fill: false,
            pointBackgroundColor: '#28a745',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6
          },
          {
            label: 'Actual Remaining Work (Perfect!)',
            data: actualRemaining,
            borderColor: '#F05438',
            backgroundColor: 'rgba(240, 84, 56, 0.1)',
            borderWidth: 4,
            fill: 'origin',
            pointBackgroundColor: '#F05438',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 8,
            tension: 0.2
          },
          {
            label: 'Tasks per Sprint',
            data: tasksPerSprint,
            type: 'bar',
            backgroundColor: 'rgba(40, 167, 69, 0.3)',
            borderColor: '#28a745',
            borderWidth: 2,
            yAxisID: 'y1'
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
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            callbacks: {
              afterBody: function(context) {
                const index = context[0].dataIndex;
                return [
                  `Sprint Tasks: ${tasksPerSprint[index]}`,
                  `Completed: ${velocity[index]} ✅`,
                  `Total Progress: ${actualCumulative[index]}/68`,
                  `Status: 100% Sukses!`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Timeline Sprint',
              font: { size: 14, weight: 'bold' }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Sisa Work Items',
              font: { size: 14, weight: 'bold' }
            },
            beginAtZero: true,
            max: 70
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Tasks per Sprint',
              font: { size: 12, weight: 'bold' }
            },
            max: 15,
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  };

  const createVelocityChart = () => {
    const ctx = chartRef.current.getContext('2d');
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sprintLabels,
        datasets: [
          {
            label: 'Target Tasks',
            data: tasksPerSprint,
            backgroundColor: 'rgba(0, 123, 255, 0.7)',
            borderColor: '#007bff',
            borderWidth: 2
          },
          {
            label: 'Tasks Selesai ✅',
            data: velocity,
            backgroundColor: 'rgba(40, 167, 69, 0.7)',
            borderColor: '#28a745',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            callbacks: {
              afterBody: function(context) {
                const index = context[0].dataIndex;
                const completion = Math.round((velocity[index] / tasksPerSprint[index]) * 100);
                return `Tingkat Penyelesaian: ${completion}% ✅`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Nomor Sprint',
              font: { size: 14, weight: 'bold' }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Jumlah Tasks',
              font: { size: 14, weight: 'bold' }
            },
            beginAtZero: true
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutBounce'
        }
      }
    });
  };

  const createCumulativeChart = () => {
    const ctx = chartRef.current.getContext('2d');
    
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: sprintLabels,
        datasets: [
          {
            label: 'Target Kumulatif',
            data: idealCumulative,
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
            borderWidth: 4,
            fill: 'origin',
            pointBackgroundColor: '#28a745',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            tension: 0.3
          },
          {
            label: 'Progress Aktual (Perfect Match!)',
            data: actualCumulative,
            borderColor: '#F05438',
            backgroundColor: 'rgba(240, 84, 56, 0.1)',
            borderWidth: 4,
            fill: 'origin',
            pointBackgroundColor: '#F05438',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 8,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            callbacks: {
              afterBody: function(context) {
                const index = context[0].dataIndex;
                const progressRate = Math.round((actualCumulative[index] / 68) * 100);
                return [
                  `Gap: 0 tasks (Perfect!)`,
                  `Progress Rate: ${progressRate}%`,
                  `Status: On Track ✅`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Progres Sprint',
              font: { size: 14, weight: 'bold' }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Tasks Selesai Kumulatif',
              font: { size: 14, weight: 'bold' }
            },
            beginAtZero: true,
            max: 75
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutCubic'
        }
      }
    });
  };

  const showChart = (type) => {
    setActiveTab(type);
    
    // Destroy existing chart
    if (currentChart.current) {
      currentChart.current.destroy();
    }
    
    // Create new chart
    switch(type) {
      case 'burndown':
        currentChart.current = createBurndownChart();
        break;
      case 'velocity':
        currentChart.current = createVelocityChart();
        break;
      case 'cumulative':
        currentChart.current = createCumulativeChart();
        break;
      default:
        currentChart.current = createBurndownChart();
    }
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
      background: white;
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1600px;
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
    
    .success-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 10px 25px;
      border-radius: 25px;
      font-weight: 700;
      font-size: 1.1rem;
      margin-top: 15px;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }
    
    .sprint-overview {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    
    .sprint-badge {
      padding: 8px 16px;
      background: rgba(255,255,255,0.2);
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .sprint-badge.completed {
      background: rgba(40, 167, 69, 0.9);
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
      position: relative;
      overflow: hidden;
    }
    
    .metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
    }
    
    .total-sprints::before { background: #007bff; }
    .total-tasks::before { background: #28a745; }
    .completed-tasks::before { background: #28a745; }
    .completion-rate::before { background: #28a745; }
    
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
    
    .chart-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .chart-tab {
      padding: 12px 24px;
      border: 2px solid #e9ecef;
      border-radius: 25px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }
    
    .chart-tab.active {
      background: #F05438;
      color: white;
      border-color: #F05438;
    }
    
    .chart-container {
      position: relative;
      height: 600px;
      margin-bottom: 40px;
    }
    
    .sprint-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 30px;
    }
    
    .detail-panel {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 15px;
    }
    
    .detail-panel h3 {
      color: #2A3541;
      margin-bottom: 20px;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .sprint-breakdown {
      background: white;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .sprint-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #e9ecef;
      transition: background-color 0.3s ease;
    }
    
    .sprint-item:hover {
      background-color: rgba(40, 167, 69, 0.05);
    }
    
    .sprint-item:last-child {
      border-bottom: none;
    }
    
    .sprint-info {
      display: flex;
      flex-direction: column;
    }
    
    .sprint-number {
      font-weight: 700;
      color: #2A3541;
      font-size: 1.1rem;
    }
    
    .sprint-period {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .sprint-metrics {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    
    .sprint-stat {
      text-align: center;
    }
    
    .stat-value {
      font-weight: 700;
      font-size: 1.2rem;
      color: #28a745;
    }
    
    .stat-label {
      color: #6c757d;
      font-size: 0.8rem;
    }
    
    .progress-bar {
      width: 80px;
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;
      background: #28a745;
    }
    
    .timeline-analysis {
      background: white;
      border-radius: 10px;
      padding: 20px;
    }
    
    .timeline-phase {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f1f3f4;
    }
    
    .timeline-phase:last-child {
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
    
    .phase-progress {
      text-align: right;
    }
    
    .phase-completion {
      font-weight: 700;
      font-size: 1.1rem;
      color: #28a745;
    }
    
    .phase-details {
      color: #6c757d;
      font-size: 0.9rem;
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
    
    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
    }
    
    .insight-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.05);
      border-left: 5px solid;
    }
    
    .insight-card.velocity { border-left-color: #28a745; }
    .insight-card.scope { border-left-color: #28a745; }
    .insight-card.timeline { border-left-color: #28a745; }
    .insight-card.quality { border-left-color: #28a745; }
    
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
      background: rgba(40, 167, 69, 0.1);
      padding: 12px 15px;
      border-radius: 8px;
      font-weight: 600;
      color: #28a745;
      font-size: 0.95rem;
    }
    
    .success-celebration {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      padding: 30px;
      text-align: center;
      margin: 30px;
      border-radius: 15px;
    }
    
    .success-celebration h2 {
      font-size: 2rem;
      margin-bottom: 15px;
    }
    
    .success-stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    
    .success-stat {
      text-align: center;
    }
    
    .success-number {
      font-size: 2.5rem;
      font-weight: 700;
    }
    
    .success-label {
      font-size: 0.9rem;
      opacity: 0.9;
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
      
      .sprint-details {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .sprint-metrics {
        flex-direction: column;
        gap: 10px;
      }
      
      .success-stats {
        gap: 20px;
      }
    }
  `;

  return (
    <div>
      <style>{chartStyles}</style>
      <div className="container">
        <div className="header">
          <h1>Cafinder Project and Sprint Analysis</h1>
          <p>Analisis Lengkap 8 Sprint - Semua Target Tercapai</p>
          <div className="success-badge">✅ ALL TASKS COMPLETED</div>
          
          <div className="sprint-overview">
            <div className="sprint-badge completed">Sprint 1: 7/7 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 2: 5/5 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 3: 7/7 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 4: 9/9 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 5: 11/11 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 6: 10/10 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 7: 8/8 tasks ✅</div>
            <div className="sprint-badge completed">Sprint 8: 11/11 tasks ✅</div>
          </div>
        </div>
        
        <div className="success-celebration">
          <h2>🚀 Pencapaian Luar Biasa!</h2>
          <p>Tim Cafinder berhasil menyelesaikan seluruh roadmap pengembangan dengan sempurna</p>
          
          <div className="success-stats">
            <div className="success-stat">
              <div className="success-number">68</div>
              <div className="success-label">Tasks Selesai</div>
            </div>
            <div className="success-stat">
              <div className="success-number">8</div>
              <div className="success-label">Sprint Sukses</div>
            </div>
            <div className="success-stat">
              <div className="success-number">100%</div>
              <div className="success-label">Completion Rate</div>
            </div>
            <div className="success-stat">
              <div className="success-number">0</div>
              <div className="success-label">Tasks Tertinggal</div>
            </div>
          </div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-card total-sprints">
            <div className="metric-value" style={{color: '#007bff'}}>8</div>
            <div className="metric-label">Total Sprint</div>
          </div>
          <div className="metric-card total-tasks">
            <div className="metric-value" style={{color: '#28a745'}}>68</div>
            <div className="metric-label">Total Tasks</div>
          </div>
          <div className="metric-card completed-tasks">
            <div className="metric-value" style={{color: '#28a745'}}>68</div>
            <div className="metric-label">Tasks Selesai</div>
          </div>
          <div className="metric-card completion-rate">
            <div className="metric-value" style={{color: '#28a745'}}>100%</div>
            <div className="metric-label">Tingkat Keberhasilan</div>
          </div>
        </div>
        
        <div className="chart-section">
          <div className="chart-tabs">
            <div className={`chart-tab ${activeTab === 'burndown' ? 'active' : ''}`} onClick={() => showChart('burndown')}>📊 Sprint Burndown</div>
            <div className={`chart-tab ${activeTab === 'velocity' ? 'active' : ''}`} onClick={() => showChart('velocity')}>⚡ Pelacakan Velocity</div>
            <div className={`chart-tab ${activeTab === 'cumulative' ? 'active' : ''}`} onClick={() => showChart('cumulative')}>📈 Progress Kumulatif</div>
          </div>
          
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
          
          <div className="sprint-details">
            <div className="detail-panel">
              <h3>🏃 Breakdown Performa Sprint</h3>
              <div className="sprint-breakdown">
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 1</div>
                    <div className="sprint-period">10-21 Mar (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">7/7</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 2</div>
                    <div className="sprint-period">24 Mar - 11 Apr (3 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">5/5</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 3</div>
                    <div className="sprint-period">14-25 Apr (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">7/7</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 4</div>
                    <div className="sprint-period">28 Apr - 9 Mei (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">9/9</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 5</div>
                    <div className="sprint-period">12-23 Mei (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">11/11</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 6</div>
                    <div className="sprint-period">26 Mei - 6 Jun (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">10/10</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 7</div>
                    <div className="sprint-period">9-20 Jun (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">8/8</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="sprint-item">
                  <div className="sprint-info">
                    <div className="sprint-number">Sprint 8</div>
                    <div className="sprint-period">23 Jun - 4 Jul (2 minggu)</div>
                  </div>
                  <div className="sprint-metrics">
                    <div className="sprint-stat">
                      <div className="stat-value">11/11</div>
                      <div className="stat-label">Tasks</div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="detail-panel">
              <h3>📅 Analisis Fase Timeline</h3>
              <div className="timeline-analysis">
                <div className="timeline-phase">
                  <div className="phase-info">
                    <h4>Fase 1: Foundation</h4>
                    <div className="phase-period">Sprint 1-2 (10 Mar - 11 Apr)</div>
                  </div>
                  <div className="phase-progress">
                    <div className="phase-completion">12/12 ✅</div>
                    <div className="phase-details">Ideasi produk & strategi</div>
                  </div>
                </div>
                
                <div className="timeline-phase">
                  <div className="phase-info">
                    <h4>Fase 2: Development</h4>
                    <div className="phase-period">Sprint 3-5 (14 Apr - 23 Mei)</div>
                  </div>
                  <div className="phase-progress">
                    <div className="phase-completion">27/27 ✅</div>
                    <div className="phase-details">Fitur inti & UI/UX</div>
                  </div>
                </div>
                
                <div className="timeline-phase">
                  <div className="phase-info">
                    <h4>Fase 3: Implementation</h4>
                    <div className="phase-period">Sprint 6-8 (26 Mei - 4 Jul)</div>
                  </div>
                  <div className="phase-progress">
                    <div className="phase-completion">29/29 ✅</div>
                    <div className="phase-details">Testing & persiapan launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="insights">
          <h3>🎯 Analisis Perjalanan Sprint Lengkap</h3>
          
          <div className="insights-grid">
            <div className="insight-card velocity">
              <div className="insight-title">⚡ Evolusi Velocity Tim</div>
              <div className="insight-content">
                Tim menunjukkan konsistensi luar biasa dalam velocity di seluruh 8 sprint. Dengan menyelesaikan 100% tasks di setiap sprint, tim membuktikan kemampuan estimasi dan eksekusi yang sangat baik.
              </div>
              <div className="insight-highlight">
                Konsistensi sempurna: 68/68 tasks diselesaikan tepat waktu
              </div>
            </div>
            
            <div className="insight-card scope">
              <div className="insight-title">📋 Manajemen Scope Ideal</div>
              <div className="insight-content">
                Distribusi scope yang cerdas dengan beban tertinggi di Sprint 5 & 8 (11 tasks). Tim berhasil mempertahankan kualitas sambil menangani kompleksitas yang meningkat di fase akhir.
              </div>
              <div className="insight-highlight">
                68/68 tasks selesai - MVP siap untuk launch sukses!
              </div>
            </div>
            
            <div className="insight-card timeline">
              <div className="insight-title">📅 Eksekusi Timeline Sempurna</div>
              <div className="insight-content">
                Timeline 8-sprint terbukti realistis dan achievable. Semua fase (Foundation, Development, Implementation) diselesaikan 100% sesuai rencana tanpa ada scope creep atau delay.
              </div>
              <div className="insight-highlight">
                Total durasi: 17 minggu (Mar-Jul) - sesuai target!
              </div>
            </div>
            
            <div className="insight-card quality">
              <div className="insight-title">🏆 Fokus Kualitas Terjaga</div>
              <div className="insight-content">
                Tim membuktikan bahwa kualitas dan kecepatan bisa sejalan. Dengan completion rate 100%, setiap deliverable memenuhi standard tinggi yang ditetapkan sejak awal proyek.
              </div>
              <div className="insight-highlight">
                Zero defect policy: Kualitas premium di setiap sprint
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