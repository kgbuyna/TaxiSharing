import { isPlain } from "@reduxjs/toolkit";

const isProduction = process.env.NODE_ENV === 'production';
export default {
  extra: {
    URL: isProduction ? 'production_url' : '10.10.0.114:3000',
    API_KEY: isProduction ? 'production_api_key' : 'AIzaSyDMoUTcQYZFBK9rGZZeSSPPQf_PYaeyeiE',
    isPlain: isProduction ? 'production_url' : '10.10.0.114:3000',
    ENVIRONMENT: isProduction ? 'production' : 'development',
  },
};  