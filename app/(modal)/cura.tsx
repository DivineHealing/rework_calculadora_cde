import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import { useVidaStore } from '~/components/zustand';

// CARREGAR AS FONTES DE TEXTO
import { useLoadFonts } from '~/components/fonts';

const trunc = (num, dec = 0) => {
  const factor = 10 ** dec;
  return Math.trunc(num * factor) / factor;
};

export default function Home() {
  const fontsLoaded = useLoadFonts();
  
  const vidaMaxima = useVidaStore((state) => state.vidaMaxima);   // Recebe o Valor da Vida Maximo
  const vidaAtual = useVidaStore((state) => state.vidaAtual);   // Recebe o Valor da Vida Atual
  const vida = useVidaStore((state) => state.vidaAtual); // Pegue o valor atual do escudo
  const [curaFixa, setCuraFixa] = useState('') // Recebe o valor da Cura Fixo
  const [curaPer, setCuraPer] = useState('') // Recebe o valor da Cura %
  const [regeneracao, setRegeneracao] = useState(0) // Recebe o valor da Cura
  const [valorCura, setValorCura] = useState(null) // Recebe o valor da Cura
  const [valorRegeneracao, setValorRegeneracao] = useState(null) // Recebe o valor da Cura
  const regen = useVidaStore((state) => state.regeneracao)
  const setRegen = useVidaStore((state) => state.setRegeneracao)
  const { setCuraVida } = useVidaStore();
  // Passando os valores de Dano para o Calculo
  const aplicarCura = () => {
    const valorP = parseInt(curaPer, 10) || 0;
    const valorF = parseInt(curaFixa, 10) || 0;
    if (!isNaN(valorP) || !isNaN(valorF)) {
      if (valorP > 0) {
        let curaT = trunc((vida*(valorP/100))+valorF);
        setValorCura(curaT);
        setCuraVida(curaT);
        setCuraFixa('');
        setCuraPer('');
      } else {
        setValorCura(valorF);
        setCuraVida(valorF);
        setCuraFixa('');
        setCuraPer('');
      }
    } 
    else {
      alert('Informe os valores de entrada.');
    }
};

const aplicarRegeneracao = () => {
  const valorP = parseInt(regeneracao, 10) || 0;
  if (!isNaN(valorP)) {
    let regeneracao = trunc((vida*(valorP/100)));
    setValorRegeneracao(regeneracao)
    setCuraVida(regeneracao);
    setRegen(valorP);
  } else {
    alert('Informe os valores de entrada.');
  }
};

useEffect(() => {
  if (regen > 0){
    setRegeneracao(String(regen));
  }
}, [regen]);

  return (
    <>
      <Stack.Screen options={{ title: 'Aplicar Cura', headerStyle:{
        backgroundColor: 'rgb(39, 39, 39)',
      },      
      headerTintColor: '#00db0f',
      headerTitleStyle: {
        fontWeight: 'bold',
      }}}/>
      <View style={styles.principal}>        
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#00db0f'}]}
            >Valor de Cura</Text>
              <TextInput
                style={[              
                  {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                  {borderColor: '#00db0f'},
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
                placeholder="Valor de Cura"
                placeholderTextColor="#f8d3cf"
                maxLength={12}
                onChangeText={(text) => setCuraFixa(text)}
                value={curaFixa}
              />
            <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#00db0f'}]}
            >Cura em % da Vida</Text>
              <TextInput
                style={[              
                  {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                  {borderColor: '#00db0f'},
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
                placeholder="Cura em % da Vida"
                placeholderTextColor="#f8d3cf"
                maxLength={3}
                onChangeText={(text) => setCuraPer(text)}
                value={curaPer}
              />
              <Text style={[styles.btnText, {alignSelf:"left"}, {color: 'white'}, {paddingHorizontal: 20}, {fontSize: 15}, {color: '#00db0f'}]}
              >Regeneração de Vida</Text>
                <TextInput
                  style={[              
                    {backgroundColor: '#181c1c'}, // Fundo branco para contraste
                    {borderColor: '#00db0f'},
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
              {valorCura !== null && (
                <Text style={styles.result}>Valor da Cura: {valorCura.toLocaleString('pt-BR')}</Text>
              )}
              {valorRegeneracao !== null && (
                <Text style={styles.result}>Valor Regenerado: {valorRegeneracao.toLocaleString('pt-BR')}</Text>
              )}
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
                {borderColor: "#00db0f"}
                ,]} onPress={() => aplicarCura()}>
                <Text style={[styles.btnText, {alignSelf:"center"}, {color: 'white'}]}>Aplicar Cura</Text>
              </TouchableOpacity>  
              
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
                {borderColor: "#00db0f"}
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
    color: "#ffefd5",
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
