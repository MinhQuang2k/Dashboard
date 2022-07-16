import React from "react";
import { Row, Col } from "antd";
import {
  ShoppingFilled,
  LikeFilled,
  SmileFilled,
  DashboardFilled,
} from "@ant-design/icons";
import { Chart, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  Filler,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  Filler
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Row gutter={24}>
        <Col className="item-box" span={6}>
          <div className="box-item">
            <div className="icon-item bg-pink">
              <ShoppingFilled />
            </div>
            <div className="item-body">
              <p>Total Profit</p>
              <p>1500k</p>
            </div>
          </div>
        </Col>
        <Col className="item-box" span={6}>
          <div className="box-item">
            <div className="icon-item bg-blue">
              <LikeFilled />
            </div>
            <div className="item-body">
              <p>Likes</p>
              <p>4231</p>
            </div>
          </div>
        </Col>
        <Col className="item-box" span={6}>
          <div className="box-item">
            <div className="icon-item bg-violet">
              <DashboardFilled />
            </div>
            <div className="item-body">
              <p>Sales</p>
              <p>460</p>
            </div>
          </div>
        </Col>
        <Col className="item-box" span={6}>
          <div className="box-item">
            <div className="icon-item bg-orange">
              <SmileFilled />
            </div>
            <div className="item-body">
              <p>New Members</p>
              <p>248</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={24} className="mt-2">
        <Col span={12}>
          <div className="char-box">
            <Chart type="bar" data={dataCharBar} className="item-char" />
          </div>
        </Col>
        <Col span={12}>
          <div className="char-box">
            <Line options={options} data={dataLine} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const dataLine = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const dataCharBar = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
  ],
};

export default Dashboard;
