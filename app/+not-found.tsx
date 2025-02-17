import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Cronicas de Errat' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Bem vindo a calculadora de Batalha!</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.title}>Informações de uso:</Text>
        <Text></Text>
        <Text style={styles.text}>• Assim que sair dessa tela, será redirecionado as informações de atributos, onde poderá colocar a quantia de Vida, Mana e Vigor do seu personagem.</Text>
        <Text></Text>
        <Text style={styles.text}>• Após isso, na barra superior terá um botão de configuração, ao apertar ele, você poderá alterar os valores que são padronizados, de acordo com o nivel inicial.</Text>
        <Text></Text>
        <Text style={styles.text}>• Na barra inferior, teremos a navegação onde poderá acessar as Calculadoras de Reforço, Habilidade, Dano, e Defesa.</Text>
        <Text></Text>
        <Text style={styles.text}>• Um detalhe a ser observado, alguns valores inseridos na configuração das informações do personagem será aproveitada, como valor de Escudo Magico e se possui um Escudo Equipável.</Text>
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
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
