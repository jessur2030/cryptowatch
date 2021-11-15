import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

// let gradient;
// gradient.createLinearGradient(0, 0, 0, 400);

// gradient.addColorStop(0, "rgba(247,147,26,.5)");
// gradient.addColorStop(0.425, "rgba(255,193,119,0)");

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  // for (let i = 0; i > coinHistory?.data?.history?.length; i += 1) {
  //   coinPrice.push(coinHistory.data.history[i].price);
  //   coinTimestamp.push(
  //     new Date(coinHistory.data.history[i].coinTimestamp).toLocaleDateString()
  //   );
  // }

  //

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: " Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",

        borderJoinStyle: "round",
        borderCapStyle: "round",
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: 0.2,
      },
    ],
  };

  const options = {
    scales: {
      // responsive: true,
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
