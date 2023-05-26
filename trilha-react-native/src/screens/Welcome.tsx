import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import wateringImage from '../assets/watering.png';

import global from '../styles/global';

export function Welcome() {
  const navigation = useNavigation();

  function handleNavigateToUserIdentification() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>

        <Image source={wateringImage} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleNavigateToUserIdentification}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: global.colors.heading,
    marginTop: 30,
    fontFamily: global.fonts.heading,
    lineHeight: 34
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: global.colors.heading,
    fontFamily: global.fonts.text
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  button: {
    backgroundColor: global.colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 30,
    height: 56,
    width: 56
  },
  buttonIcon: {
    fontSize: 30,
    color: global.colors.white
  }
});