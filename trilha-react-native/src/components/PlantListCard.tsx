import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import global from '../styles/global';

interface PlantListProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlanListCard({ data, ...rest }: PlantListProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri
        uri={data.photo}
        width={70}
        height={70}
      />

      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: global.colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: global.colors.green_dark,
    fontFamily: global.fonts.heading,
    marginVertical: 16
  }
});