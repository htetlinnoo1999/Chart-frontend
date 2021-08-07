import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { getBarData } from "../chartApi";

function BarChart() {
  const { isLoading, error, data } = useQuery("bar", getBarData);

  if (error) return <h1> Something Went Wrong. Error: {error.message}</h1>;
  if (isLoading) return <h1> Please wait a moment...</h1>;

  return (
    <div>
      <Bar
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              label: "Bar Chart based on Age Groups",
              data: Object.values(data),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        height={200}
        width={400}
      />
    </div>
  );
}

export default BarChart;
