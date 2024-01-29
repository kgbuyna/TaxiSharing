const isProduction = process.env.NODE_ENV === 'production';
export default {
  extra: {
    API_KEY: isProduction ? 'production_api_key' : 'AIzaSyCfoOZmSBlNKkgaXAu_kuH2R3O7r17PCyc',
    ENVIRONMENT: isProduction ? 'production' : 'development',
  },
};