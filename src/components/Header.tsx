import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import global from '../styles/global';

import profileImage from '../assets/bruno-profile.png';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Bruno</Text>
      </View>

      <Image
        source={profileImage}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight()
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  greeting: {
    fontSize: 32,
    color: global.colors.heading,
    fontFamily: global.fonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: global.fonts.heading,
    color: global.colors.heading,
    lineHeight: 40
  }
});