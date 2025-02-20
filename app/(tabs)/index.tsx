import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// ZUZSTAND
import { useEscudoStore, useVidaStore, useDanoStore, useManaVigorStore } 
from '~/components/zustand';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// CARREGAR AS FONTES DE TEXTO
import { useLoadFonts } from '~/components/fonts';

export default function Home() {
  const fontsLoaded = useLoadFonts();

  // ESCUDO - APENAS MOSTRAR O VALOR DO ESCUDO
  const escudoMaxima = useEscudoStore((state) => state.escudoMaximo);   // Recebe o Valor do Escudo Maximo
  const escudoAtual = useEscudoStore((state) => state.escudoAtual);   // Recebe o Valor do Escudo Atual

  // VIDA
  // Atributos
  const vidaMaxima = useVidaStore((state) => state.vidaMaxima);   // Recebe o Valor da Vida Maximo
  const vidaAtual = useVidaStore((state) => state.vidaAtual);   // Recebe o Valor da Vida Atual
  // Dano aplicado a Vida
  const vidaDano = useDanoStore((state) => state.defesa);  // Recebe o Valor do Dano na Vida
  // Chamada do Calculo de Vida Atual 
  const { setDanoVida } = useVidaStore();
  // Passando os valores de Dano para o Calculo
  const danificarVida = () => {
      const valor = parseInt(vidaDano, 10);
      if(!isNaN(vidaDano) && vidaDano > 0) {
        setDanoVida(vidaDano);
      } 
      else if (vidaDano === 0) {
        return vidaAtual;
      }
  };

  const manaMaxima = useManaVigorStore((state) => state.manaMax)
  const manaAtual = useManaVigorStore((state) => state.manaAtual)
  const vigorMaxima = useManaVigorStore((state) => state.vigorMax)
  const vigorAtual = useManaVigorStore((state) => state.vigorAtual)

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
  
  return (
    <>
      <Stack.Screen options={{ title: 'Atributos do Personagem', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#F8D3CF',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'baskerville'
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

        <Icon name="yin-yang" size={30} color= "#4747ff">
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
        {borderColor: "#4747ff"}
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