import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=100")
      .then((response) => response.json())
      .then((data) => {
        const ageGroups: Record<string, number> = {
          "12-20": 0,
          "21-30": 0,
          "31-40": 0,
          "41-50": 0,
          "51-60": 0,
        };

        data.users.forEach((user: { birthDate: string }) => {
          const birthYear = new Date(user.birthDate).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          console.log(birthYear)
          console.log(currentYear)
          console.log(age)

          if (age >= 12 && age <= 60) {
            if (age <= 20) ageGroups["12-20"]++;
            else if (age <= 30) ageGroups["21-30"]++;
            else if (age <= 40) ageGroups["31-40"]++;
            else if (age <= 50) ageGroups["41-50"]++;
            else ageGroups["51-60"]++;
          }
        });

        setChartData({
          labels: Object.keys(ageGroups),
          datasets: [
            {
              label: " سن کاربران",
              data: Object.values(ageGroups),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4CAF50",
                "#9C27B0",
              ],
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(() => setError("❌ Failed to fetch user data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      

      {loading ? (
        <div className="text-center text-gray-500">⏳ در حال لود...</div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-end">📅سن کاربران از  12 تا 60 </h3>
          <div className="relative h-80">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: "top" },
                  tooltip: { enabled: true },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { color: "#555" } },
                  y: { beginAtZero: true, ticks: { color: "#555" } },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;