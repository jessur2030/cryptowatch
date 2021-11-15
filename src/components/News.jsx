import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
//import Title from "antd/lib/skeleton/Title";
import Loader from "./Loader";

//destructuring from antd
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  //create useState for selected news category
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  //create state for cryptocurrency
  const { data } = useGetCryptosQuery(100);
  // console.log(data);
  //fetch data from api
  //rename data to :cryptoNews
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    //Object receiving two parameter from cryptoNewsApi: createRequest()
    newsCategory,
    count: simplified ? 6 : 20,
  });

  const demoImageUrl = `https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`;
  console.log(cryptoNews);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
            }
          >
            {/* //render options to select */}
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title
                  className="news-title"
                  level={5}
                  style={{ marginRight: "4px" }}
                >
                  {news.name}
                </Title>
                <img
                  style={{ height: "100%" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                  alt=""
                />
              </div>
              {/* /render description/ */}
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImageUrl
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
