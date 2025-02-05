import { useState, useEffect } from "react";
import { Bar, Radar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Feature4 = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [userActivity, setUserActivity] = useState({ browsing: 0, idle: 100, active: 50 });

  useEffect(() => {
    const savedTime = JSON.parse(localStorage.getItem("timeSpent"));
    if (savedTime) {
      setTimeSpent(savedTime);
    }

    const timer = setInterval(() => {
      setTimeSpent((prev) => {
        const newTime = prev + 1;
        localStorage.setItem("timeSpent", JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);

    const handleActivity = () => {
      setUserActivity((prevState) => ({
        browsing: prevState.browsing + 1,
        idle: Math.max(prevState.idle - 1, 0),
        active: Math.min(prevState.active + 1, 100),
      }));
    };

    const handleIdle = () => {
      setUserActivity((prevState) => ({
        browsing: Math.max(prevState.browsing - 1, 0),
        idle: Math.min(prevState.idle + 1, 100),
        active: Math.max(prevState.active - 1, 0),
      }));
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("mouseout", handleIdle);
    document.addEventListener("focusout", handleIdle);

    return () => {
      clearInterval(timer);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("mouseout", handleIdle);
      document.removeEventListener("focusout", handleIdle);
    };
  }, []);

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const barData = {
    labels: ['Time Spent (Minutes & Seconds)'],
    datasets: [
      {
        label: 'Minutes',
        data: [minutes],
        backgroundColor: 'rgba(0, 255, 0, 0.6)',
        borderColor: '#00FF00',
        borderWidth: 1,
      },
      {
        label: 'Seconds',
        data: [seconds],
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
        borderColor: '#FFA500',
        borderWidth: 1,
      },
    ],
  };

  const radarData = {
    labels: ['Browsing', 'Idle', 'Active'],
    datasets: [
      {
        label: 'User Activity',
        data: [userActivity.browsing, userActivity.idle, userActivity.active],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid-container" style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px', height: '100%' }}>
      <h2 style={{ textAlign: 'center', gridColumn: 'span 2' }}>Progress Charts</h2>
      <div className="grid-item" style={{ width: '100%', height: '100%' }}>
        <Bar data={barData} options={{
          maintainAspectRatio: false,
          responsive: true,
          animation: {
            duration: 1000,
            easing: 'easeInOutBounce'
          },
          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'white'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            },
            y: {
              ticks: {
                color: 'white'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)'
              }
            }
          }
        }} />
      </div>
      <div className="grid-item" style={{ width: '100%', height: '100%' }}>
        <Radar data={radarData} options={{
          maintainAspectRatio: false,
          responsive: true,
          animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
        }} />
      </div>
    </div>
  );
};

export default Feature4;
