import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabBottomRoutes from './tab.routes';

import { Welcome } from '../screens/Welcome';
import { UserIdentification } from '../screens/UserIdentification';
import { Confirmation } from '../screens/Confirmation';
import { SelectedPlant } from '../screens/SelectedPlant';

import global from '../styles/global';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: global.colors.white
      }
    }}
  >
    <StackRoutes.Screen
      name="Welcome"
      component={Welcome}
    />
    <StackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <StackRoutes.Screen
      name="Confirmation"
      component={Confirmation}
    />
    <StackRoutes.Screen
      name="PlantSelection"
      component={TabBottomRoutes}
    />
    <StackRoutes.Screen
      name="SelectedPlant"
      component={SelectedPlant}
    />
    <StackRoutes.Screen
      name="MyPlants"
      component={TabBottomRoutes}
    />
  </StackRoutes.Navigator>
);

export default AppRoutes;