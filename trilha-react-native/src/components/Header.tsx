import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import global from '../styles/global';

import profileImage from '../assets/bruno-profile.png';

export function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('@plantmanager:user');

      setUsername(user || '');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{username}</Text>
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
  username: {
    fontSize: 32,
    fontFamily: global.fonts.heading,
    color: global.colors.heading,
    lineHeight: 40
  }
});