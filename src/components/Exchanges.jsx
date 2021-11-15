import React from "react";
import millify from "millify";
// import { currencyFormatter } from "../app/helper";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { currencyFormatter } from "../app/helper";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  // console.log(data);
  const exchangesList = data?.data?.exchanges;
  if (isFetching) return <Loader />;
  return (
    <>
      <Row style={{ padding: "1.275rem 0 0.75rem 0" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6} className="exchanges__formater">
                      $ {millify(exchange.volume)}
                    </Col>
                    <Col span={6} className="exchanges__formater">
                      {" "}
                      {millify(exchange.numberOfMarkets)}
                    </Col>
                    <Col span={6} className="exchanges__formater">
                      {" "}
                      {millify(exchange.marketShare)}%
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
