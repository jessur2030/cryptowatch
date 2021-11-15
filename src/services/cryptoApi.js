import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//sets headers
const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "8b637727cbmsh51f31db985f16e5p114300jsn7a4ecad95907",
};
// const cryptoApiHeaders = {
//   "x-rapidapi-host": "api.coinranking.com/v2",
//"x-rapidapi-key": "8b637727cbmsh51f31db985f16e5p114300jsn7a4ecad95907",
// };
// //coinranking84209f3aab16ad62c49a3abee8e958d89c65b88680f4fcb5
// //apiUrl
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
