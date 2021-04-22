import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import global from '../styles/global';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({ title, active = false, ...rest }: EnvironmentButtonProps) {
  return (
    <RectButton style={[styles.container, active && styles.activeContainer]} {...rest}>
      <Text style={[styles.text, active && styles.activeText]}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.colors.shape,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
    paddingHorizontal: 10
  },
  text: {
    color: global.colors.heading,
    fontFamily: global.fonts.text
  },
  activeContainer: {
    backgroundColor: global.colors.green_light
  },
  activeText: {
    fontFamily: global.fonts.heading,
    color: global.colors.green_dark
  }
});