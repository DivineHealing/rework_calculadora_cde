import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: 'headerBackground:rgb(36, 36, 36)'
      },
      headerTintColor: ' #282929',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: 'Voltar'
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false,  headerStyle: {
        backgroundColor: " #282929"
      }}} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
