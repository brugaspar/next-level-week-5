import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';

import global from '../styles/global';

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState('');

  function handleNavigateToConfirmation() {
    navigation.navigate('Confirmation');
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😃'}
                </Text>

                <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: global.colors.green }
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                value={name}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button
                  title="Confirmar"
                  onPress={handleNavigateToConfirmation}
                  disabled={!isFilled}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: global.colors.background
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44,
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: global.colors.gray,
    color: global.colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
    fontFamily: global.fonts.text
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: global.colors.heading,
    fontFamily: global.fonts.heading,
    lineHeight: 32
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20
  }
});