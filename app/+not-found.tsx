import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useLoadFonts } from '~/components/fonts';

export default function NotFoundScreen() {
  const fontsLoaded = useLoadFonts();
  return (
    <>
      <Stack.Screen options={{ title: 'Cronicas de Errat', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#F8D3CF',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'baskerville'
      }
      }} />
      <View style={styles.container}>
        <Text style={styles.title}>Bem vindo a Calculadora de Batalha!</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.title}>Informações de uso:</Text>
        <Text></Text>
        <Text style={styles.text}>Após sair desta tela, você será redirecionado à tela de atributos. Lá, você poderá definir os valores de Vida, Mana e Vigor do seu personagem.</Text>
        <Text></Text>
        <Text style={styles.text}>Posteriormente, você poderá acessar as configurações por meio do ícone de engrenagem localizado na barra superior. Isso permitirá alterar os valores padrão, que são definidos de acordo com o nível inicial.</Text>
        <Text></Text>
        <Text style={styles.text}>Use a barra de navegação na parte inferior da tela para acessar as calculadoras de Reforço, Dano e Defesa.</Text>
        <Text></Text>
        <Text style={styles.text}>Importante: Você encontrará o cálculo das habilidades na tela da Calculadora de Reforço.</Text>
        <Text></Text>
        <Text style={styles.text}>Importante: Os valores calculados são interligados. Por exemplo, o resultado do Reforço afeta o cálculo do Dano, que por sua vez afeta a Defesa.</Text>
        <Link href="/atributo" style={styles.link}>
        <Text style={styles.linkText}>Abrir aplicação</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgb(39, 39, 39)'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f6f8f9',
    fontFamily: 'Baskervile'
  },
  text: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#f6f8f9',
    fontFamily: 'Baskervile'
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
    fontWeight: 'bold',
    fontFamily: 'Baskervile'
  },
  linkText: {
    fontSize: 20,
    color: '#4539ff',
    fontFamily: 'Baskervile'
  },
});
