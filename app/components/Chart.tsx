import React from "react";
import { TEChart } from "tw-elements-react";

const Chart = () => {
  return (
    <TEChart
      type="bar"
      data={{
        labels: ["DHTI15A8HN", "DHTI15A9HN", "DHTI15A10HN"],
        datasets: [
          {
            label: "Điểm rèn luyện trung bình",
            data: [100, 60, 80],
          },
        ],
      }}
      options={{
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: {
                dataset: { label: string };
                formattedValue: any;
              }) {
                let label = context.dataset.label || "";
                label = `${label}: ${context.formattedValue} users`;
                return label;
              },
            },
          },
        },
      }}
      darkOptions={{
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: {
                dataset: { label: string };
                formattedValue: any;
              }) {
                let label = context.dataset.label || "";
                label = `${label}: ${context.formattedValue} users`;
                return label;
              },
            },
          },
          legend: {
            labels: { color: "#fff" },
          },
        },
      }}
    />
  );
};

export default Chart;
