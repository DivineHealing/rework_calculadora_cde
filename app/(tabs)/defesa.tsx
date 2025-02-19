import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { useDanoStore, useEscudoStore } from '~/components/zustand';

// CARREGAR AS FONTES DE TEXTO
import { useLoadFonts } from '~/components/fonts';
import { parse } from '@babel/core';

const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};


export default function Home() {  
  const fontsLoaded = useLoadFonts();
  // Penetração  
  const penetracao = useDanoStore((state) => state.penetracao);

  // DANO 
  const danoCalc = useDanoStore((state) => state.dano);
  const setDano = useDanoStore((state) => state.setDefesa);

  // ESCUDO
  const setEscudo = useEscudoStore((state) => state.setEscudoAtual);
  const setEscudoMax = useEscudoStore((state) => state.setEscudoMaximo)
  const escudoCalc = useEscudoStore((state) => state.escudoAtual);

  // CONTROLE DE ESTADO PARA ATUALIZAR AS INTERAÇÕES DE DANO
  useEffect(() => {
    if (danoCalc > 0) {
      setValorDano(String(danoCalc));
    }
    if (escudoCalc > 0) {
      setValorEscudo(String(escudoCalc));
    }
  }, [danoCalc, escudoCalc]);

  
  // Estado para Armazenar os valores dos campos de entrada de Defesa
  const [valorDano, setValorDano] = useState('');
  const [esmagamento, setEsmagamento] = useState('');
  const [valorEscudo, setValorEscudo] = useState('');
  const [valorBloqRed, setValorBloqRed] = useState('');
  const [valorBloqRes, setValorBloqRes] = useState('');
  const [valorBloqDef, setValorBloqDef] = useState('');
  const [valorRed, setValorRed] = useState('');
  const [valorRes, setValorRes] = useState('');
  const [valorDef, setValorDef] = useState('');
  const [resultadoDefesa, setResultadoDefesa] = useState(null);


  const calcularDefesa = (defesa) => {
    console.log(danoCalc);
    const esmaga = parseFloat(esmagamento)/100 || 0;
    const pen = parseFloat(penetracao) || 0;
    const numberDef1 = parseFloat(valorDano)  || 0;
    const numberDef2 = parseFloat(valorEscudo)  || 0;
    const numberDef3 = parseFloat(valorBloqRed)/100  || 0;
    const numberDef4 = parseFloat(valorBloqRes)/100  || 0;
    const numberDef5 = parseFloat(valorBloqDef)  || 0;
    const numberDef6 = parseFloat(valorRed)/100  || 0;
    const numberDef7 = parseFloat(valorRes)/100  || 0;
    const numberDef8 = parseFloat(valorDef)  || 0;
 
  if (
    !isNaN(numberDef1) &&
    !isNaN(numberDef2) &&
    !isNaN(numberDef3) &&
    !isNaN(numberDef4) &&
    !isNaN(numberDef5) &&
    !isNaN(numberDef6) &&
    !isNaN(numberDef7) &&
    !isNaN(numberDef8)
  ) {
    if (esmaga > 0){
        defesa = numberDef2 - (numberDef1+(esmaga*numberDef1))
        if (defesa > 0){
          setEscudo(defesa);
          setValorEscudo(String(defesa));
          setResultadoDefesa('Escudo Atualizado');
        } else{     
          setEscudoMax(0);
          setValorEscudo(String(''));
          setResultadoDefesa('Escudo Destruido');
        };
    } else  { 
      let penbloq = pen - numberDef4;
      let defred = penbloq - numberDef4;
          
      defesa = numberDef1 - numberDef2;
      if (defesa <= 0){     
        setEscudoMax(0)          
        setValorEscudo(String(''))   
        setResultadoDefesa('Escudo Destruido')
      } else if (pen > numberDef4){ // tem penetração no Bloqueio
          
          defesa = defesa - (defesa * numberDef3);
          defesa = defesa - (numberDef5 - defred);
          defesa = defesa - (defesa * numberDef6);
  
          if (pen > numberDef7){ // tem penetração no Personagem
            penbloq = pen - numberDef7;
            defred = penbloq * numberDef8;
    
            defesa = trunc(defesa - (numberDef8 - defred));  
            setResultadoDefesa(defesa);
            setDano(defesa);

          } else { // NÃO tem penetração no Personagem
            defesa = defesa - (defesa * (numberDef7 - pen));
            defesa = trunc(defesa - numberDef8);
            setResultadoDefesa(defesa);
            setDano(defesa);
          }       
      } else { // NÃO tem penetração no Bloqueio
          defesa = numberDef1 - numberDef2;
          defesa = defesa - (defesa * numberDef3);
          defesa = defesa - (defesa * (numberDef4 - pen));
          defesa = defesa - numberDef5;
          defesa = defesa - (defesa * numberDef6);
        
          if (pen > numberDef7){  // tem penetração no Personagem
            let penbloq = pen - numberDef7;
            let defred = penbloq * numberDef8;
  
            defesa = trunc(defesa - (defesa - defred));
            setResultadoDefesa(defesa);
            setDano(defesa);
          } else {  // NÃO tem penetração no Personagem
            defesa = defesa - (defesa * (numberDef7 - pen));
            defesa = trunc(defesa - numberDef8);
            setResultadoDefesa(defesa);
            setDano(defesa);
            
            if (defesa <=  0){
              defesa = 0;
              setResultadoDefesa(defesa);
            setDano(defesa);
            };
          };
        }    
    return(defesa);
    };
  };
};
  const maxLength = 12

  return (
    <>
      <Stack.Screen options={{ title: 'Calculo de Defesa', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#F8D3CF',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'baskerville'
      }}}/>
      <View style={styles.principal}>      
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor do Dano Recebido</Text>
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
              placeholder="Valor do Dano Recebido"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setValorDano(text)}
              value={valorDano}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#e60000'}]}>Valor do Esmagamento</Text>
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
              placeholder="Valor do Esmagamento"
              placeholderTextColor="#e60000"
              maxLength={4}
              onChangeText={text => setEsmagamento(text)}
              value={esmagamento}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor do Escudo Possuido</Text>
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
              placeholder="Valor do Escudo Possuido"
              placeholderTextColor="#f8d3cf"
              maxLength={maxLength}
              onChangeText={text => setValorEscudo(text)}
              value={valorEscudo}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Redução Bloq. (%)</Text>
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
              placeholder="Valor da Redução Bloq. (%)"
              placeholderTextColor="#f8d3cf"
              maxLength={2}
              onChangeText={text => setValorBloqRed(text)}
              value={valorBloqRed}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Resist. Bloq. (%)</Text>
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
              placeholder="Valor da Resist. Bloq. (%)"
              placeholderTextColor="#f8d3cf"
              maxLength={3}
              onChangeText={text => setValorBloqRes(text)}
              value={valorBloqRes}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Defesa Bloq</Text>
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
                placeholder="Valor da Defesa Bloq"
                placeholderTextColor="#f8d3cf"
                maxLength={12}
                onChangeText={text => setValorBloqDef(text)}
                value={valorBloqDef}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Redução</Text>
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
                placeholder="Valor da Redução (%)"
                placeholderTextColor="#f8d3cf"
                maxLength={2}
                onChangeText={text => setValorRed(text)}
                value={valorRed}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Resistência</Text>
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
                placeholder="Valor da Resistência (%)"
                placeholderTextColor="#f8d3cf"
                maxLength={3}
                onChangeText={text => setValorRes(text)}
                value={valorRes}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 12}, {color: '#F8D3CF'}]}>Valor da Defesa</Text>
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
                placeholder="Valor da Defesa"
                placeholderTextColor="#f8d3cf"
                maxLength={maxLength}
                onChangeText={text => setValorDef(text)}
                value={valorDef}
              />
                {resultadoDefesa !== null && (
                  <Text style={styles.result}>Dano Recebido: {resultadoDefesa.toLocaleString('pt-BR')}</Text>
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
                ,]} 
                onPress={calcularDefesa}>
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
  btnText: {
    marginTop: 2,
    fontSize: 13,
    marginLeft: 2,
    fontFamily: 'Barlow',
    alignSelf: 'center',
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
});
