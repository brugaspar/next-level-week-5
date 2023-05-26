import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import global from '../styles/global';

interface PlantListProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    time: string;
  }
}

export function StoredPlantsListCard({ data, ...rest }: PlantListProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri
        uri={data.photo}
        width={50}
        height={50}
      />

      <Text style={styles.title}>{data.name}</Text>

      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.time}>{data.time}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: global.colors.shape,
    marginVertical: 5
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: global.fonts.heading,
    fontSize: 17,
    color: global.colors.heading
  },
  details: {
    alignItems: 'flex-end',
    marginRight: 10
  },
  timeLabel: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: global.fonts.text,
    color: global.colors.body_light
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: global.fonts.heading,
    color: global.colors.body_dark
  }
});