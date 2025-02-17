import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity } from 'react-native';


const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};

export default function Home() {
  
  const maxLength = 12;
  
  const [valorDanoRef, setValorDanoRef] = useState('');
  const [valorReforco, setValorReforco] = useState('');
  const [valorAumDmgFixRef, setValorAumDmgFixRef] = useState('');
  const [valorAmpRef, setValorAmpRef] = useState('');
  const [resultadoReforco, setResultadoReforco] = useState(null);

  const calcularReforco = () => {
    const numberRef1 = parseFloat(valorDanoRef) || 0;
    const numberRef2 = parseFloat(valorReforco) || 0;
    const numberRef3 = parseFloat(valorAumDmgFixRef)/100+1 || 0;
    const numberRef4 = parseFloat(valorAmpRef)/100+1 || 0;
 if (
      !isNaN(numberRef1) &&
      !isNaN(numberRef2) &&
      !isNaN(numberRef3) &&
      !isNaN(numberRef4)
  )  {
    setResultadoReforco(trunc((((numberRef1+numberRef2)*numberRef3)*numberRef4)));
  }
 };

  return (


    <>
      <Stack.Screen options={{ title: 'Calculo de Reforço', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: 'rgb(255, 255, 255)',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
      }} />
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#ffd700'}]}>Valor do Dano Fixo</Text>                    
            <TextInput
              style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#ffd700'},
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
              keyboardType="numeric"
              placeholder="Valor do Dano Fixo"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setValorDanoRef(text)}
              value={valorDanoRef}
            />
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#ffd700'}]}>Valor do Reforço</Text>        
            <TextInput
              style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#ffd700'},
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
              variant="outlined"
              keyboardType="numeric"
              placeholder="Valor do Reforço"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setValorReforco(text)}
              value={valorReforco}
            />
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#ffd700'}]}>Aumento de Dano Fixo (%)</Text>        
            <TextInput
              style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#ffd700'},
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
              variant="outlined"
              keyboardType="numeric"
              placeholder="Aumento Dano Fixo"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setValorAumDmgFixRef(text)}
              value={valorAumDmgFixRef}
            />
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#ffd700'}]}>Valor de Amplificação (%)</Text>        
            <TextInput
              style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#ffd700'},
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
              variant="outlined"
              keyboardType="numeric"
              placeholder="Valor da Amplificação"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setValorAmpRef(text)}
              value={valorAmpRef}
          />

            {resultadoReforco !== null && (
              <Text style={styles.result}>Valor do Reforço: {resultadoReforco.toLocaleString('pt-BR')}</Text>
            )}
            <TouchableOpacity style={[
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
                    {borderColor: "#ffd700"}
                  ,]} onPress={calcularReforco}>
                    <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Calcular</Text>
                  </TouchableOpacity>
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
    alignSelf: 'center',
  },
  result: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffc55f',
    shadowOpacity: 1,
    textShadowRadius: 5,
    shadowColor: '#ffec5e',
    fontFamily: 'Barlow',
  },
});
