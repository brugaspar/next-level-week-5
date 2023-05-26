import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Jost_400Regular, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if (!fontsLoaded) return <AppLoading />

  return (
    <React.Fragment>
      <StatusBar translucent={false} style="dark" backgroundColor="#fff" />
      <Routes />
    </React.Fragment>
  );
}