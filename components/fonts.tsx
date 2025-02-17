import { useFonts } from 'expo-font';

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Beiruti': require('../assets/Beiruti.ttf'),
    'Beiruti-fino': require('../assets/Beiruti-ExtraLight.ttf'),
    'Baskervile': require('../assets/BaskervvilleSC-Regular.ttf'),
    'Barlow': require('../assets/Barlow-Light.ttf')
  });

  return fontsLoaded;
};