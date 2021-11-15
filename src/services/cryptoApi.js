import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//sets headers
const cryptoApiHeaders = {
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
};

const baseUrl = `https://coinranking1.p.rapidapi.com`;
// const baseUrl = `https://api.coinranking.com/v2`;

//adds headers to our api call request
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

//
export const cryptoApi = createApi({
  //what is reducer for?: cryptoApi
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  //endpoints :
  endpoints: (builder) => ({
    getCryptos: builder.query({
      //fetch api data from coinRanking api
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    //fetch all crypto exchanges
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
    //getCryptoDetail service
    getCryptoDetails: builder.query({
      //coinId query endpoint
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      //coinId, coinHistory query endpoint
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

// use:getCryptos:Query
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
