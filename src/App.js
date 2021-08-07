import "./App.css";
import BarChart from "./components/barChart";
import PieChart from "./components/pieChart";
import InsertForm from "./components/saveRecord";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

const queryClient = new QueryClient();
function App() {
  const [page, setPage] = useState("bar");
  return (
    <div className="container width-75">
      <div className="d-flex justify-content-between mt-5  mb-7">
        <Button variant="outline-dark" onClick={() => setPage("bar")}> Bar Chart</Button>
        <Button variant="outline-dark" onClick={() => setPage("pie")}> Pie Chart</Button>
        <Button variant="outline-dark" onClick={() => setPage("form")}> Add Data</Button>
      </div>

      <QueryClientProvider client={queryClient}>
        {page === "bar" && <BarChart />}
        {page === "pie" && <PieChart />}
        {page === "form" && <InsertForm />}
      </QueryClientProvider>
    </div>
  );
}

export default App;
