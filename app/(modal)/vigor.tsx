import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import { useManaVigorStore } from '~/components/zustand';
import { useLoadFonts } from '~/components/fonts';

export default function Vigor() {
  const fontsLoaded = useLoadFonts();
  
  const [vigorMaximo, setVigorMaximo] = useState('');
  const [vigorGasto, setVigorGasto] = useState('');
  const [recuperarVigor, setRecuperarVigor] = useState('');
  const [regeneracao, setRegeneracao] = useState('');
  const setVigorMax = useManaVigorStore((state) => state.setVigorMax)
  const vigor = useManaVigorStore((state) => state.vigorMax)
  const setRegen = useManaVigorStore((state) => state.setRegenVigor)
  const regen = useManaVigorStore((state) => state.regenVigor)
  

  const [valorRegen, setValorRegen] = useState(null);

  //Calculos
  const { setGastoMana, setRecVigor, setGastoVigor } = useManaVigorStore();

  const definirVigorMax = () => {
    const vigorMax = parseInt(vigorMaximo);
    if(!isNaN(vigorMax)){
      setVigorMax(vigorMax);
    }
  };

  const gastarVigor = () => {
    const gastar = parseInt(vigorGasto);
    if(!isNaN(gastar)){
      setGastoVigor(gastar)
    }
  };

  const gastarManaVigor = () => {    
    const gastar = parseInt(vigorGasto);
    if(!isNaN(gastar)){
      setGastoMana(gastar)
      setGastoVigor(gastar)
    }
  };

  const pocao = () => {
    const recuperar = parseInt(recuperarVigor);
    if(!isNaN(recuperar)){
      setRecVigor(recuperar)
    }
  };

  const aplicarRegeneracao = () => {
    const regen = parseInt(regeneracao)
    setRegen(regeneracao)
    if(!isNaN(regen)){
      let regenerado = (regen/100) * vigor
      setRecVigor(regenerado)
      setValorRegen(regenerado)
    }
  };
  
  useEffect(() => {
    if (regen > 0){
      setRegeneracao(String(regen));
    }
    if (vigor >0){
      setVigorMaximo(String(vigor))
    }
  }, [regen, vigor]);

  return (
    <>
      <Stack.Screen options={{ title: 'Ajustar Mana', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#ff8e42',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}/>
            <View style={styles.principal}>        
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>

                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#ff8e42'}]}
                  >Valor da Vigor Maxima</Text>
                    <TextInput
                      style={[              
                        {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                        {borderColor: '#ff8e42'},
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
                      placeholder="Valor da Vigor Maxima"
                      placeholderTextColor="#f8d3cf"
                      maxLength={3}
                      onChangeText={(text) => setVigorMaximo(text)}
                      value={vigorMaximo}
                    />

                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#ff8e42'}]}
                  >Gastar Vigor</Text>
                  <TextInput
                    style={[              
                      {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                      {borderColor: '#ff8e42'},
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
                    placeholder="Gastar Vigor"
                    placeholderTextColor="#f8d3cf"
                    maxLength={3}
                    onChangeText={(text) => setVigorGasto(text)}
                    value={vigorGasto}
                    />

                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#ff8e42'}]}
                  >Recuperar Vigor</Text>
                  <TextInput
                    style={[              
                      {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                      {borderColor: '#ff8e42'},
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
                    placeholder="Recuperar Vigor"
                    placeholderTextColor="#f8d3cf"
                    maxLength={3}
                    onChangeText={(text) => setRecuperarVigor(text)}
                    value={recuperarVigor}
                  />
                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#ff8e42'}]}
                  >Regeneração de Vigor (%)</Text>
                  <TextInput
                    style={[              
                      {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                      {borderColor: '#ff8e42'},
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
                    placeholder="Valor da Regeneração (%)"
                    placeholderTextColor="#f8d3cf"
                    maxLength={3}
                    onChangeText={(text) => setRegeneracao(text)}
                    value={regeneracao}
                  />
                  {valorRegen !== null && (
                    <Text style={styles.result}>Valor Regenerado: {valorRegen.toLocaleString('pt-BR')}</Text>
                  )}
                  <TouchableOpacity style={[
                    {borderWidth: 3}, // Largura da borda
                    {backgroundColor: 'transparent'}, // Fundo transparente
                    {paddingVertical: 10},
                    {paddingHorizontal: 20},
                    {borderRadius: 10}, // Bordas arredondadas (opcional)
                    {marginBottom: 5},
                    {marginTop: 10},
                    {width: '65%'},
                    {maxWidth: 250},
                    {alignSelf: 'center'},        
                    {alignItems: 'center'},
                    {borderColor: "#ff8e42"}
                    ,]} onPress={() => definirVigorMax()}>
                    <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Definir Vigor Max</Text>
                  </TouchableOpacity>  
                  
                  <TouchableOpacity style={[
                    {borderWidth: 3}, // Largura da borda
                    {backgroundColor: 'transparent'}, // Fundo transparente
                    {paddingVertical: 10},
                    {paddingHorizontal: 20},
                    {borderRadius: 10}, // Bordas arredondadas (opcional)
                    {marginBottom: 5},
                    {marginTop: 10},
                    {width: '65%'},
                    {maxWidth: 250},
                    {alignSelf: 'center'},        
                    {alignItems: 'center'},
                    {borderColor: "#ff8e42"}
                    ,]} onPress={() => gastarVigor()}>
                    <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Gastar Vigor</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                    {borderWidth: 3}, // Largura da borda
                    {backgroundColor: 'transparent'}, // Fundo transparente
                    {paddingVertical: 10},
                    {paddingHorizontal: 20},
                    {borderRadius: 10}, // Bordas arredondadas (opcional)
                    {marginBottom: 5},
                    {marginTop: 10},
                    {width: '65%'},
                    {maxWidth: 250},
                    {alignSelf: 'center'},        
                    {alignItems: 'center'},
                    {borderColor: "#ff8e42"}
                    ,]} onPress={() => gastarManaVigor()}>
                    <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Gastar Mana e Vigor</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[
                    {borderWidth: 3}, // Largura da borda
                    {backgroundColor: 'transparent'}, // Fundo transparente
                    {paddingVertical: 10},
                    {paddingHorizontal: 20},
                    {borderRadius: 10}, // Bordas arredondadas (opcional)
                    {marginBottom: 5},
                    {marginTop: 10},
                    {width: '65%'},
                    {maxWidth: 250},
                    {alignSelf: 'center'},        
                    {alignItems: 'center'},
                    {borderColor: "#ff8e42"}
                    ,]} onPress={() => pocao()}>
                  <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Recuperar Vigor</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[
                    {borderWidth: 3}, // Largura da borda
                    {backgroundColor: 'transparent'}, // Fundo transparente
                    {paddingVertical: 10},
                    {paddingHorizontal: 20},
                    {borderRadius: 10}, // Bordas arredondadas (opcional)
                    {marginBottom: 5},
                    {marginTop: 10},
                    {width: '65%'},
                    {maxWidth: 250},
                    {alignSelf: 'center'},        
                    {alignItems: 'center'},
                    {borderColor: "#ff8e42"}
                    ,]} onPress={() => aplicarRegeneracao()}>
                  <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Aplicar Regeneração</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </>
        );
      };
      
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
          color: "#9898f2",
        },
        result: {
          marginTop: 10,
          fontSize: 15,
          fontWeight: 'bold',
          color: '#ff8e42',
          shadowOpacity: 1,
          textShadowRadius: 5,
          shadowColor: '#ff8e42',
          fontFamily: 'Barlow',
        },
      });
