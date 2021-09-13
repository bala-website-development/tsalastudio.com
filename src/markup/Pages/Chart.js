import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = (props) => {
  const chartData = props.chartData;
  const countOrdered = [];
  const countCompleted = [];
  const Cancelled = [];

  chartData.forEach((data) => {
    if (data.orderstatus === "Ordered") {
      countOrdered.push(data.orderstatus);
    }
    if (data.orderstatus === "Completed") {
      countCompleted.push(data.orderstatus);
    }
    if (data.orderstatus === "Cancelled") {
      Cancelled.push(data.orderstatus);
    }
  });

  const data = {
    series: [
      {
        name: "Ordered",
        data: [countOrdered.length, countOrdered.length, countOrdered.length],
      },
      {
        name: "Completed",
        data: [countCompleted.length, countCompleted.length, countCompleted.length],
      },
      {
        name: "Cancelled",
        data: [Cancelled.length, Cancelled.length, Cancelled.length],
      },
    ],
    options: {
      colors: ["#FFDC00", "#00D100", "#FF5500"],

      chart: {
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          columnWidth: "30%",
          //barHeight: "10%",
          borderRadius: 4,
          dataLabels: {
            position: "bottom", // top, center, bottom
          },
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
      },

      // colors: ['#34c38f'],
      grid: {
        borderColor: "#f1f1f1",
      },
      xaxis: {
        categories: ["2019", "2020", "2021"],
      },
    },
  };
  return (
    <div className={props.clas}>
      <div className="white dash_title">
        <div className="d-flex">
          <div className="p-2 flex-grow-1">
            <b>{props.name}</b>
          </div>

          <div className="p-2">
            <select className="t4finput-dropdown">
              <option value="">2020</option>
              <option value="">2021</option>
              <option value="">2022</option>
            </select>
          </div>
        </div>
      </div>
      <ReactApexChart options={data.options} series={data.series} type="bar" height="200" />
    </div>
  );
};

export default Chart;
