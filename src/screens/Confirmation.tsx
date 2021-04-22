import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';

import global from '../styles/global';

export function Confirmation() {
  const navigation = useNavigation();

  function handleNavigateToPlantSelection() {
    navigation.navigate('PlantSelection');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>

        <Text style={styles.title}>Prontinho!</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar cuidar das suas
          plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button title="Confirmar" onPress={handleNavigateToPlantSelection} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: global.colors.background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },
  emoji: {
    fontSize: 78
  },
  title: {
    fontSize: 22,
    fontFamily: global.fonts.heading,
    textAlign: 'center',
    color: global.colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontFamily: global.fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: global.colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
});