import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getBarData = () => api.get("/bar").then((res) => res.data);

export const getPieData = () => api.get("/pie").then((res) => res.data);

export const saveRecord = (data) => api.post("/chart", data).then((res) => res.data);
