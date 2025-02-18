import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDanoStore } from '~/components/zustand'

// CARREGAR AS FONTES DE TEXTO
import { useLoadFonts } from '~/components/fonts';


const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};

  export default function Home() {    
  const fontsLoaded = useLoadFonts();

  // ZUSTAND PARA ENVIAR O DANO A VIDA **TESTE** 
  const setPen = useDanoStore((state) => state.setPenetracao);
  const reforco = useDanoStore((state) => state.reforco);
  const hab = useDanoStore((state) => state.habilidade);

  // VARIAVEIS DE CALCULO
  const [valorStatus, setValorStatus] = useState('');
  const [valorDmgFix, setValorDmgFix] = useState('');
  const [valorAumDmgFix, setValorAumDmgFix] = useState('');
  const [valorHab, setValorHab] = useState('');
  const [valorAmp, setValorAmp] = useState('');
  const [valorDado, setValorDado] = useState('');
  const [valorAmpExt, setValorAmpExt] = useState('');
  const [valorDmgFinal, setValorDmgFinal] = useState('');
  const [resultadoDano, setResultadoDano] = useState(null);

  // ENVIO DO VALOR DE PENETRAÇÃO
  const [penetracao, setPenetracao] = useState('');

  // FUNÇÃO PARA APARECER O VALOR DO REFORÇO NO INPUT DO DANO FIXO OU REFORÇO
  useEffect(() => {
    if (reforco > 0) {
      setValorDmgFix(String(reforco));
    }
  }, [reforco]);

  // FUNÇÃO PARA APARECER O VALOR DO REFORÇO NO INPUT DO VALOR HABILIDADE
  useEffect(() => {
    if (hab > 0) {
      setValorHab(String(hab));
    }
  }, [hab]);

  const calcularDano = () => {
    // Converte os valores para números
    const penC = parseInt(penetracao) || 0;
    const number1 = parseFloat(valorStatus)  || 0;
    const number2 = parseFloat(valorDmgFix) || reforco;
    const number3 = parseFloat(valorAumDmgFix)/100+1 || 1;
    const number4 = parseFloat(valorHab) || 0;
    const number5 = parseFloat(valorAmp)/100+1 || 1;
    const number6 = parseFloat(valorDado)/10 || 1;
    const number7 = parseFloat(valorAmpExt)/100+1 || 1;
    const number8 = parseFloat(valorDmgFinal)/100+1 || 1;

    // Verifica se todos os valores são números válidos
    if (
      !isNaN(number1) &&
      !isNaN(number2) &&
      !isNaN(number3) &&
      !isNaN(number4) &&
      !isNaN(number5) &&
      !isNaN(number6) &&
      !isNaN(number7) &&
      !isNaN(number8)
    ) {
      // Atualiza number6 se for igual a 2
      const updatedNumber6 = number6 === 2 ? 2.5 : number6;

      // Calcula o resultado
      const calculatedResult = trunc(
        (((((number1 + (number2 * number3)) + number4) * number5) * updatedNumber6) * number7) * number8
      );

      // PASSA PRO ZUSTAND
      setPen(penC);
      
      // Define o resultado
      setResultadoDano(calculatedResult);
      return calculatedResult;

    } else {
      alert('Por favor, insira números válidos em todos os campos.');
    }
  };
  const maxLength = 12
  
  return (
    <>
    <Stack.Screen options={{ title: 'Calculo de Dano', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#F8D3CF',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'baskerville'
      }
      }} />
    <View style={styles.principal}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor de Status</Text>
       <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor de Status"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorStatus(text)}
          value={valorStatus}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: "#F8D3CF"}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor do Dano Fixo ou Reforço</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor do Dano Fixo"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorDmgFix(text)}
          value={valorDmgFix}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor Aum. Dano Fix (%)</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor Aum. Dano Fix (%)"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorAumDmgFix(text)}
          value={valorAumDmgFix}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor da Habilidade</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor da Habilidade"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorHab(text)}
          value={valorHab}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor de Amplificação (%)</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor de Amplificação (%)"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorAmp(text)}
          value={valorAmp}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor do Dado</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor do Dado"
          placeholderTextColor="#f8d3cf"
          maxLength={2}
          onChangeText={text => setValorDado(text)}
          value={valorDado}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor Amp. Externa (%)</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor Amp. Externa (%)"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorAmpExt(text)}
          value={valorAmpExt}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#F8D3CF'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor Dano Final (%)</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: 'white'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor Dano Final (%)"
          placeholderTextColor="#f8d3cf"
          maxLength={maxLength}
          onChangeText={text => setValorDmgFinal(text)}
          value={valorDmgFinal}
        />
        <Text style={[styles.btnText, {alignSelf:"left"}, {color: '#e60000'}, {paddingHorizontal: 20}, {fontSize: 12}]}>Valor da Penetração (%)</Text>
        <TextInput
          style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#e60000'},
            {borderWidth: 1},
            {padding: 10},
            {margin: 3},
            {color: '#fffed7'},
            {minWidth: 200},
            {width: '75%'},
            {maxWidth: 200},
            {maxHeight: 50},
            {borderRadius: 13},
            {fontFamily: 'Barlow'},
            {fontSize: 12},
          ]}
          keyboardType="number-pad"
          placeholder="Valor da Penetração (%)"
          placeholderTextColor="#e60000"
          maxLength={3}
          onChangeText={text => setPenetracao(text)}
          value={penetracao}
        />
        
        
        {resultadoDano !== null && (
        <Text style={styles.result}>Dano Causado: {resultadoDano.toLocaleString('pt-BR')}</Text>
      )}
      <TouchableOpacity 
      style={[
        {borderWidth: 3}, // Largura da borda
        {backgroundColor: 'transparent'}, // Fundo transparente
        {paddingVertical: 5},
        {paddingHorizontal: 10},
        {borderRadius: 10}, // Bordas arredondadas (opcional)
        {marginBottom: 25},
        {marginTop: 10},
        {width: '65%'},
        {maxWidth: 250},
        {alignSelf: 'center'},        
        {alignItems: 'center'},
        {borderColor: "#F8D3CF"}
      ,]} onPress={calcularDano}>
        <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Calcular</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgb(39, 39, 39)'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(39, 39, 39)'
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    marginBottom: 10,
    color: '#DAA520',    
    fontFamily: 'Baskervile',
  },
  result: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8D3CF',
    shadowOpacity: 1,
    textShadowRadius: 5,
    shadowColor: '#F8D3CF',
    fontFamily: 'Barlow',
  },
  btnText: {
    marginTop: 2,
    fontSize: 13,
    marginLeft: 2,
    fontFamily: 'Barlow',
    alignSelf: 'center',
  },
});
