import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Welcome } from './src/screens/Welcome';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar translucent={false} style="dark" backgroundColor="#fff" />
      <Welcome />
    </React.Fragment>
  );
}