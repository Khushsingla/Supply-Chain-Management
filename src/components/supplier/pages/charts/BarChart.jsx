import React from "react";
import { Chart } from "react-google-charts";
// import data2 from "./data2.json";

export const data = [
  ["Name", "Quantity", "Price", "Rating"],
  ["Earbuds", 20, 59.99, 4.3],
  ["Water Bottle", 35, 25.49, 4.7],
  ["Coffee Beans", 50, 18.99, 4.5],
  ["Headphones", 15, 129.99, 4.8],
  ["LED Lamp", 40, 32.99, 4.6],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  colors: ["rgb(53, 138, 148)", "rgb(37, 11, 165)", "#188310"],
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="350px"
      data={data}
      options={options}
    />
  );
}