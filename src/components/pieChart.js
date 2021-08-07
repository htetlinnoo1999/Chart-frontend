import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { getPieData } from "../chartApi";

function PieChart() {
  const { isLoading, error, data } = useQuery("pie", getPieData);

  if (error) return <h1> Something Went Wrong. Error: {error.message}</h1>;
  if (isLoading) return <h1> Please wait a moment...</h1>;
  return (
    <div>
      <Pie
        data={{
          labels: data.map(datum => datum.gender === 0 ? "Female" : "Male"),
          datasets: [
            {
              label: "Bar Chart based on Age Groups",
              data: data.map(datum => datum.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        height={200}
        width={400}
      />
    </div>
  );
}

export default PieChart;
