import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Garamond-Regular': require('./assets/fonts/static/EBGaramond-Regular.ttf'),
    'Garamond-Bold': require('./assets/fonts/static/EBGaramond-Bold.ttf'),
    'Garamond-ExtraBold': require('./assets/fonts/static/EBGaramond-ExtraBold.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Futura-Bold': require('./assets/fonts/Futura-Bold.ttf'),
    'Futura-Book': require('./assets/fonts/Futura-Book.ttf'),
    'Futura-Heavy': require('./assets/fonts/Futura-Heavy.ttf') 
    // Add any other variants of the font you're using
  });
};
