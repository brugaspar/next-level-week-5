import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Button } from '../components/Button';

import { PlantProps, storePlant } from '../libs/storage';

import waterDrop from '../assets/waterdrop.png';
import global from '../styles/global';

interface RouteParams {
  plant: PlantProps
}

export function SelectedPlant() {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as RouteParams;

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(prev => !prev);
    }

    if (dateTime && isBefore(dateTime, new Date)) {
      setSelectedTime(new Date());
      return Alert.alert('Opaaa', 'Escolha um horário para o futuro! ⏰');
    }

    if (dateTime) setSelectedTime(dateTime);
  }

  function handleOpenDateTimerPickerForAndroid() {
    setShowDatePicker(prev => !prev);
  }

  async function handleStorePlant() {
    try {
      await storePlant({ ...plant, timeNotification: selectedTime });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: `Fique tranquilo que sempre vamos lembrar
        você de cuidar da sua plantinha com bastante cuidado.`,
        buttonTitle: 'Muito obrigado :)',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch (error) {
      Alert.alert('Opaaa', 'Não foi possível salvar sua planta!');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="dark" />

      <View style={styles.info}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.name}>{plant.name}</Text>

        <Text style={styles.about}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tip}>
          <Image
            source={waterDrop}
            style={styles.tipImage}
          />

          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alert}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimerPickerForAndroid}
            activeOpacity={0.8}
          >
            <Text style={styles.dateTimePickerText}>
              Lembrar às {format(selectedTime, 'HH:mm')}
            </Text>
          </TouchableOpacity>
        )}

        <Button title="Confirmar Planta" onPress={handleStorePlant} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.shape,
    justifyContent: 'space-between'
  },
  info: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: global.colors.shape
  },
  controller: {
    backgroundColor: global.colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  name: {
    textAlign: 'center',
    fontFamily: global.fonts.heading,
    color: global.colors.heading,
    fontSize: 24,
    marginTop: 15
  },
  about: {
    textAlign: 'center',
    fontFamily: global.fonts.text,
    color: global.colors.heading,
    fontSize: 17,
    marginTop: 15
  },
  tip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: global.colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: global.fonts.text,
    color: global.colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alert: {
    textAlign: 'center',
    fontFamily: global.fonts.complement,
    color: global.colors.heading,
    fontSize: 15
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  dateTimePickerText: {
    fontFamily: global.fonts.text,
    color: global.colors.heading,
    fontSize: 20
  }
});