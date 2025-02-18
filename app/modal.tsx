import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { useEscudoStore } from '~/components/zustand';
import { useVidaStore } from '~/components/zustand';
import React, { useEffect, useState } from 'react';

const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};

export default function Vigor() {
  const setVida = useVidaStore((state) => state.setVidaMaxima);
  const vida = useVidaStore((state) => state.vidaMaxima); // Pegue o valor atual do escudo
  const [novoValorVida, setNovoValorVida] = useState(vida);
  const [novoValorBuff, setNovaVidaBuffada] = useState('');

  // FUNÇÃO PARA APARECER O VALOR DA VIDA NO SEU INPUT DE VIDA FIXA
  useEffect(() => {
    if (vida > 0) {
      setNovoValorVida(String(vida));
    }
  }, [vida]);

    const handleAlterarVida = () => { // Calculo da quantia de Vida
      const valor = parseInt(novoValorVida, 10);
      const buff = parseInt(novoValorBuff, 10) || 0;
      if (!isNaN(valor)) {
        if (!isNaN(buff)) {
          let vidat = trunc(valor * (1+(buff/100))) // Calculo com base na vida Maxima
          setVida(vidat); 
        } else {
        setVida(valor); }
      } else {
        console.log('Valor inválido no input.');
      }
  };

  const setEscudo = useEscudoStore((state) => state.setEscudoMaximo);
  const [novoValorEscudoP, setNovoValorEscudoP] = useState('');
  const [novoValorEscudoF, setNovoValorEscudoF] = useState('');

    const handleAlterarEscudo = () => { // Calculo da quantia de Escudo
      const valorP = parseInt(novoValorEscudoP, 10) || 0;
      const valorF = parseInt(novoValorEscudoF, 10) || 0;
      if (!isNaN(valorP) || !isNaN(valorF)) {
        if (valorP > 0) {
          let escudoT = trunc((vida*(valorP/100))+valorF)
          setEscudo(escudoT)
        } else {
          setEscudo(valorF); }
      } else {
        console.log('Valor inválido no input.');
      }
  };

  const maxLength = 12

  return (
    <>
      <Stack.Screen options={{ title: 'Ajuste de Atributos', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: 'rgb(255, 255, 255)',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}/>
      <View style={styles.container}>        
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <View>
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#b20303'}]}>Buff de Vida (%)</Text>
            <TextInput
              style={[              
                {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                {borderColor: '#b20303'},
                {borderWidth: 1},
                {padding: 10},
                {margin: 5},
                {color: '#fffed7'},
                {minWidth: 275},
                {width: '75%'},
                {maxWidth: 275},
                {maxHeight: 50},
                {borderRadius: 13},
                {fontFamily: 'Barlow'},
                {fontSize: 20},
              ]}
              keyboardType="number-pad"
              placeholder="Valor do Buff de Vida"
              placeholderTextColor="#f8d3cf"
              maxLength={3}
              onChangeText={(text) => setNovaVidaBuffada(text)}
              value={novoValorBuff}
            />
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#b20303'}]}
          >Vida</Text>
            <TextInput
              style={[              
                {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                {borderColor: '#b20303'},
                {borderWidth: 1},
                {padding: 10},
                {margin: 5},
                {color: '#fffed7'},
                {minWidth: 275},
                {width: '75%'},
                {maxWidth: 275},
                {maxHeight: 50},
                {borderRadius: 13},
                {fontFamily: 'Barlow'},
                {fontSize: 20},
              ]}
              keyboardType="number-pad"
              placeholder="Valor da Vida"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={(text) => setNovoValorVida(text)}
              value={novoValorVida}
            />
            <TouchableOpacity style={[
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
              {borderColor: "#b20303"}
              ,]} onPress={() => handleAlterarVida()}>
                <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Atualizar Vida</Text>
            </TouchableOpacity>         
        </View>
        <View>           
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#03c2c9'}]}
          >Escudo (%)</Text>
            <TextInput
              style={[              
                {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                {borderColor: '#03c2c9'},
                {borderWidth: 1},
                {padding: 10},
                {margin: 5},
                {color: '#fffed7'},
                {minWidth: 275},
                {width: '75%'},
                {maxWidth: 275},
                {maxHeight: 50},
                {borderRadius: 13},
                {fontFamily: 'Barlow'},
                {fontSize: 20},
              ]}
              keyboardType="number-pad"
              placeholder="Valor do escudo"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={(text) => setNovoValorEscudoP(text)}
              value={novoValorEscudoP}
            />        
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#03c2c9'}]
          }
          >Escudo Fixo</Text>
            <TextInput
              style={[              
                {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                {borderColor: '#03c2c9'},
                {borderWidth: 1},
                {padding: 10},
                {margin: 5},
                {color: '#fffed7'},
                {minWidth: 275},
                {width: '75%'},
                {maxWidth: 275},
                {maxHeight: 50},
                {borderRadius: 13},
                {fontFamily: 'Barlow'},
                {fontSize: 20},
              ]}
              keyboardType="number-pad"
              placeholder="Valor do escudo"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={(text) => setNovoValorEscudoF(text)}
              value={novoValorEscudoF}
            />
            <TouchableOpacity style={[
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
              {borderColor: "#03c2c9"}
              ,]} onPress={() => handleAlterarEscudo()}>
                <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Aplicar Escudo</Text>
            </TouchableOpacity>
          </View>
      </View>
      </TouchableWithoutFeedback>
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
  btnText: {
    marginTop: 2,
    fontSize: 13,
    marginLeft: 2,
    fontFamily: 'Barlow',
    color: "#ffefd5",
  },
});
