import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// ZUZSTAND
import { useEscudoStore, useVidaStore, useVidaDanoStore, useManaVigorStore, useEscudoDmgStore } 
from '~/components/zustand';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// CARREGAR AS FONTES DE TEXTO
import { useLoadFonts } from '~/components/fonts';

export default function Home(p0: (prevVida: any) => any) {
  // ESCUDO
  const escudoMaxima = useEscudoStore((state) => state.escudoF);   // Recebe o Valor do Escudo Maximo
  const escudoDmg = useEscudoDmgStore((state) => state.escudoDmg);  // Recebe o Valor do Dano no Escudo
  const danificarEscudo = () => {   // ATUALIZA O VALOR DO ESCUDO
    const escudoDano = parseInt(escudoDmg, 10);
      if (!isNaN(escudoDano)) {
        setEscudoAtual(prevVida => Math.min(prevVida + escudoDano, escudoMaxima)); // Garante que a vida não ultrapasse o máximo        
      }
  };

  // VIDA
  
  const vidaMaxima = useVidaStore((state) => state.vidaAtual);   // Recebe o Valor da Vida Maximo
  const vidaDmg = useVidaDanoStore((state) => state.dano);  // Recebe o Valor do Dano na Vida
  const danificarVida = () => {   // ATUALIZA O VALOR DA VIDA
  const vidaDano = parseInt(vidaDmg, 10);
  setVidaAtual(prevVida => {
    const novoValorVida = prevVida - vidaDano;

    // (Opcional, mas recomendado) Lidar explicitamente com dano zero
    if (vidaDano === 0) {
        console.log("Dano calculado é zero. Não atualizando vida."); // Para debug
        return prevVida; // Retorna a vida anterior se o dano for zero
    }
    return novoValorVida;
  });
  };

  const manaMaxima = useManaVigorStore((state) => state.mana);   // Recebe o Valor do Escudo Maximo
  const vigorMaxima = useManaVigorStore((state) => state.vigor);  // Recebe o Valor do Dano no Escudo

  // Navegação
  const router = useRouter();

  const abrirCura = () => {
    router.push('/cura'); 
  };
  const abrirMana = () => {
    router.push('/mana'); 
  };
  const abrirVigor = () => {
    router.push('/vigor'); 
  };

  // Valores da Vida
  const [vidaAtual, setVidaAtual] = useState(vidaMaxima);
  const [escudoAtual, setEscudoAtual] = useState(0);
  const [manaAtual, setManaAtual] = useState(100); 
  const [vigorAtual, setVigorAtual] = useState(100);
  
  return (
    <>
      <Stack.Screen options={{ title: 'Atributos do Personagem', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: 'rgb(255, 255, 255)',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
      }} />
      <View style={styles.container}>

        <Icon name="heart" size={30} color= "#b20303">
          <Text style={styles.numero}> {vidaAtual.toLocaleString('pt-BR')}</Text>
          <Text> |</Text>
          <Text style={styles.numero}> {vidaMaxima.toLocaleString('pt-BR')}</Text>
        </Icon>

        <Icon name="shield-outline" size={30} color= "#03c2c9">
          <Text style={styles.numero}> {escudoAtual.toLocaleString('pt-BR')}</Text>
          <Text> |</Text>
          <Text style={styles.numero}> {escudoMaxima.toLocaleString('pt-BR')}</Text>
        </Icon>

        <Icon name="yin-yang" size={30} color= "#403ffc">
          <Text style={styles.numero}> {manaAtual}</Text>
          <Text> |</Text>
          <Text style={styles.numero}> {manaMaxima}</Text>
        </Icon>

        <Icon name="yin-yang" size={30} color= "#ff8129">
          <Text style={styles.numero}> {vigorAtual}</Text>
          <Text> |</Text>
          <Text style={styles.numero}> {vigorMaxima}</Text>
        </Icon>

        <TouchableOpacity 
        style={[
          {borderWidth: 3}, // Largura da borda
          {backgroundColor: 'transparent'}, // Fundo transparente
          {paddingVertical: 10},
          {paddingHorizontal: 20},
          {borderRadius: 10}, // Bordas arredondadas (opcional)
          {marginBottom: 25},
          {marginTop: 30},
          {width: '65%'},
          {maxWidth: 250},
          {alignSelf: 'center'},        
          {alignItems: 'center'},
          {borderColor: "#d7d6d6"}
        ,]} 
        onPress={() => danificarVida()}>
            <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}> Aplicar Dano</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[
        {borderWidth: 3}, // Largura da borda
        {backgroundColor: 'transparent'}, // Fundo transparente
        {paddingVertical: 10},
        {paddingHorizontal: 20},
        {borderRadius: 10}, // Bordas arredondadas (opcional)
        {marginBottom: 25},
        {marginTop: 10},
        {width: '65%'},
        {maxWidth: 250},
        {alignSelf: 'center'},        
        {alignItems: 'center'},
        {borderColor: "#0ec600"}
        ,]} onPress={() => abrirCura() }         
        >
          <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Cura</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[
        {borderWidth: 3}, // Largura da borda
        {backgroundColor: 'transparent'}, // Fundo transparente
        {paddingVertical: 10},
        {paddingHorizontal: 20},
        {borderRadius: 10}, // Bordas arredondadas (opcional)
        {marginBottom: 25},
        {marginTop: 10},
        {width: '65%'},
        {maxWidth: 250},
        {alignSelf: 'center'},        
        {alignItems: 'center'},
        {borderColor: "#403ffc"}
        ,]} onPress={() => abrirMana() }>
          <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Mana</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[
        {borderWidth: 3}, // Largura da borda
        {backgroundColor: 'transparent'}, // Fundo transparente
        {paddingVertical: 10},
        {paddingHorizontal: 20},
        {borderRadius: 10}, // Bordas arredondadas (opcional)
        {marginBottom: 25},
        {marginTop: 10},
        {width: '65%'},
        {maxWidth: 250},
        {alignSelf: 'center'},        
        {alignItems: 'center'},
        {borderColor: "#ff8129"}
        ,]}  onPress={() => abrirVigor() }>
          <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Vigor</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgb(39, 39, 39)'
  },
  btnText: {
    marginTop: 2,
    fontSize: 13,
    marginLeft: 2,
    fontFamily: 'Barlow',
    color: "#ffefd5",
    alignSelf: 'center',
  },
  numero: {
    fontFamily: 'Beiruti',
    fontSize: 40,    
    shadowOpacity: 1,
    textShadowRadius: 5,
    shadowColor: '#ffec5e',
  },
  });