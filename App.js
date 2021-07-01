import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';

export default function App() {

  const moedas = [
    require('./images/coroa.png'),
    require('./images/cara.png'),
  ]

  let iMoeda = 0;
  const maxGiros = 20;

  const [moedaAtual, setMoedaAtual] = useState(moedas[iMoeda])
  const [texto, setTexto] = useState('')

  async function espera(tmp) {
    function tempo(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    await tempo(tmp);
  }

  async function girarMoeda() {
    setTexto('')
    iMoeda = 0
    for (let i = 0; i < maxGiros * 2; i++) {
      iMoeda++

      if (iMoeda > 1) {
        iMoeda = 0
      }
      setMoedaAtual(moedas[iMoeda])
      await espera(10)
    }
    let res = Math.floor(Math.random() * 10) + 1

    if (res <= 5)
      res = 0
    else
      res = 1
    setMoedaAtual(moedas[res]);
    if (moedas[res] == 1) {
      setTexto("Vencedor: Coroa")
    } else {
      setTexto("Vencedor: Cara")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cara ou Coroa</Text>
      <Image
        style={styles.image}
        source={moedaAtual}
      />
      <Text style={styles.winner}>{texto}</Text>
      <Button
        title="Girar"
        onPress={() => { girarMoeda() }}
      >

      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 35,
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200
  },
  winner: {
    fontSize: 32
  }
});

