const isProduction = process.env.NODE_ENV === 'production';
export default {
  extra: {
    API_KEY: isProduction ? 'production_api_key' : 'AIzaSyDMoUTcQYZFBK9rGZZeSSPPQf_PYaeyeiE',
    ENVIRONMENT: isProduction ? 'production' : 'development',
  },
};  