import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

/*

• COLOCAR AUMENTO DE MANA 
• COLOCAR GASTO DE MANA
• RECUPERAÇÃO DE MANA
• RECUPERAÇÃO DE MANA E VIGOR

*/

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Aplicar Cura', headerStyle:{
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
