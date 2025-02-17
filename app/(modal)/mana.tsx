import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function Cura() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ajustar Vigor', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: 'rgb(255, 255, 255)',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}/>
      <View style={styles.container}>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#282929'
  },
});
