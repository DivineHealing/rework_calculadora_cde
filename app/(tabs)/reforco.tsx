import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { useLoadFonts } from '~/components/fonts';
import { useDanoStore } from '~/components/zustand';

const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};

export default function Home() {
  const fontsLoaded = useLoadFonts();
  
  const setReforco = useDanoStore((state) => state.setReforco);
  const setHab = useDanoStore((state) => state.setHabilidade);
  
  const maxLength = 12;
  
  // CAMPOS DE REFORÇO
  const [valorDanoRef, setValorDanoRef] = useState('');
  const [valorReforco, setValorReforco] = useState('');
  const [valorAumDmgFixRef, setValorAumDmgFixRef] = useState('');
  const [valorAmpRef, setValorAmpRef] = useState('');
  const [resultadoReforco, setResultadoReforco] = useState(null);

  // CAMPOS DE HABILIDADE
  const [baseHabilidade, setBaseHabilidade] = useState('');
  const [statusHabilidade, setStatusHabilidade] = useState('');
  const [resultadoHabilidade, setResultadoHabilidade] = useState(null);

  const calcularReforco = () => {
    const numberRef1 = parseFloat(valorDanoRef) || 0;
    const numberRef2 = parseFloat(valorReforco) || 0;
    const numberRef3 = parseFloat(valorAumDmgFixRef)/100+1 || 1;
    const numberRef4 = parseFloat(valorAmpRef)/100+1 || 1;
 if (
      !isNaN(numberRef1) &&
      !isNaN(numberRef2) &&
      !isNaN(numberRef3) &&
      !isNaN(numberRef4)
  )  {
    const calculatedResult = trunc((((numberRef1+numberRef2)*numberRef3)*numberRef4));

    if (calculatedResult == 0){
      alert('Preencha os campos com seus respectivos valores, para que seja realizado o Calculo.')
      setResultadoReforco(null);
    }
      else{
        setReforco(calculatedResult);
        setResultadoReforco(calculatedResult);
      }
  }
  
 };

  const calcularHabilidade = () => {
  const numberHab1 = parseFloat(statusHabilidade) || 0;
  const numberHab2 = parseFloat(baseHabilidade)/100 || 1;
  if (numberHab1 == 0){
    alert('Informe o valor de Status.')
    setResultadoHabilidade(null)
  } else {
  const habilidade = trunc(numberHab1*numberHab2);
  setResultadoHabilidade(habilidade);
  setHab(habilidade);
  }
};
  return (


    <>
      <Stack.Screen options={{ title: 'Calculo de Reforço e Habilidade', headerStyle:{
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
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor do Dano Fixo</Text>                    
          <TextInput
            style={[              
          {backgroundColor: '#181c1c'}, // Fundo branco para contraste
          {borderColor: '#F8D3CF'},
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
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor do Reforço</Text>        
          <TextInput
            style={[              
          {backgroundColor: '#181c1c'}, // Fundo branco para contraste
          {borderColor: '#F8D3CF'},
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
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Aumento de Dano Fixo (%)</Text>        
          <TextInput
            style={[              
          {backgroundColor: '#181c1c'}, // Fundo branco para contraste
          {borderColor: '#F8D3CF'},
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
          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor de Amplificação (%)</Text>        
          <TextInput
            style={[              
          {backgroundColor: '#181c1c'}, // Fundo branco para contraste
          {borderColor: '#F8D3CF'},
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
          ,]} onPress={calcularReforco}>
            <Text style={[styles.btnText, {alignSelf:"center"}, {color: '#F8D3CF'}]}>Calcular Reforço</Text>
          </TouchableOpacity>

          <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Base da Habilidade (%)</Text>        
            <TextInput
              style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#F8D3CF'},
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
              placeholder="Base da Habilidade (%)"
              placeholderTextColor="#f8d3cf"
              maxLength={4}
              onChangeText={text => setBaseHabilidade(text)}
              value={baseHabilidade}
            />
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor de Status</Text>        
            <TextInput
              style={[              
            {backgroundColor: '#181c1c'}, // Fundo branco para contraste
            {borderColor: '#F8D3CF'},
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
              placeholder="Valor de Status da Habilidade"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setStatusHabilidade(text)}
              value={statusHabilidade}
          />
          {resultadoHabilidade !== null && (
            <Text style={styles.result}>Valor do Reforço: {resultadoHabilidade.toLocaleString('pt-BR')}</Text>
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
            ,]} onPress={calcularHabilidade}>
              <Text style={[styles.btnText, {alignSelf:"center"}, {color: '#F8D3CF'}]}>Calcular Habilidade</Text>
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
    color: '#F8D3CF',
    shadowOpacity: 1,
    textShadowRadius: 5,
    shadowColor: '#ffec5e',
    fontFamily: 'Barlow',
  },
});
