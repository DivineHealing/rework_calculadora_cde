import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { useEffect, useState } from 'react';
import { useManaVigorStore } from '~/components/zustand';

import { useLoadFonts } from '~/components/fonts';

const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};

export default function Cura() {
  const fontsLoaded = useLoadFonts();

  const [manaMaxima, setManaMaxima] = useState('');
  const [manaGasta, setManaGasta] = useState('');
  const [recuperarMana, setRecuperarMana] = useState('');
  const [regeneracao, setRegeneracao] = useState('');
  const setManaMax = useManaVigorStore((state) => state.setManaMax)
  const mana = useManaVigorStore((state) => state.manaMax)
  const setRegen = useManaVigorStore((state) => state.setRegenMana)
  const regen = useManaVigorStore((state) => state.regenMana)
  

  const [valorRegen, setValorRegen] = useState(null);

  //Calculos
  const { setGastoMana, setRecMana, setGastoVigor } = useManaVigorStore();

  const definirManaMax = () => {
    const manaMax = parseInt(manaMaxima);
    if(!isNaN(manaMax)){
      setManaMax(manaMax);
    }
  };

  const gastarMana = () => {
    const gastar = parseInt(manaGasta);
    if(!isNaN(gastar)){
      setGastoMana(gastar)
    }
  };

  const gastarManaVigor = () => {    
    const gastar = parseInt(manaGasta);
    if(!isNaN(gastar)){
      setGastoMana(gastar)
      setGastoVigor(gastar)
    }
  };

  const pocao = () => {
    const recuperar = parseInt(recuperarMana);
    if(!isNaN(recuperar)){
      setRecMana(recuperar)
    }
  };

  const aplicarRegeneracao = () => {
    const regen = parseInt(regeneracao)
    setRegen(regeneracao)
    if(!isNaN(regen)){
      let regenerado = (regen/100) * mana
      setRecMana(regenerado)
      setValorRegen(regenerado)
    }
  };
  
  useEffect(() => {
    if (regen > 0){
      setRegeneracao(String(regen));
    }
    if (mana >0){
      setManaMaxima(String(mana))
    }
  }, [regen, mana]);

  return (
    <>
      <Stack.Screen options={{ title: 'Ajustar Mana', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#9898f2',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}/>
            <View style={styles.principal}>        
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>

                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#9898f2'}]}
                  >Valor da Mana Maxima</Text>
                    <TextInput
                      style={[              
                        {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                        {borderColor: '#9898f2'},
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
                      placeholder="Valor da Mana Maxima"
                      placeholderTextColor="#f8d3cf"
                      maxLength={3}
                      onChangeText={(text) => setManaMaxima(text)}
                      value={manaMaxima}
                    />

                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#9898f2'}]}
                  >Gastar Mana</Text>
                  <TextInput
                    style={[              
                      {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                      {borderColor: '#9898f2'},
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
                    placeholder="Gastar Mana"
                    placeholderTextColor="#f8d3cf"
                    maxLength={3}
                    onChangeText={(text) => setManaGasta(text)}
                    value={manaGasta}
                    />

                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#9898f2'}]}
                  >Recuperar Mana</Text>
                  <TextInput
                    style={[              
                      {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                      {borderColor: '#9898f2'},
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
                    placeholder="Recuperar Mana"
                    placeholderTextColor="#f8d3cf"
                    maxLength={3}
                    onChangeText={(text) => setRecuperarMana(text)}
                    value={recuperarMana}
                  />
                  <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#9898f2'}]}
                  >Regeneração de Mana (%)</Text>
                  <TextInput
                    style={[              
                      {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                      {borderColor: '#9898f2'},
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
                    {borderColor: "#9898f2"}
                    ,]} onPress={() => definirManaMax()}>
                    <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Definir Mana Max</Text>
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
                    {borderColor: "#9898f2"}
                    ,]} onPress={() => gastarMana()}>
                    <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Gastar Mana</Text>
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
                    {borderColor: "#9898f2"}
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
                    {borderColor: "#9898f2"}
                    ,]} onPress={() => pocao()}>
                  <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Recuperar Mana</Text>
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
                    {borderColor: "#9898f2"}
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
          color: '#9898f2',
          shadowOpacity: 1,
          textShadowRadius: 5,
          shadowColor: '#F8D3CF',
          fontFamily: 'Barlow',
        },
      });