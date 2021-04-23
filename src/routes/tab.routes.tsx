import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { PlantSelection } from '../screens/PlantSelection';
import { MyPlants } from '../screens/MyPlants';

import global from '../styles/global';

const TabRoutes = createBottomTabNavigator();

const TabBottomRoutes: React.FC = () => (
  <TabRoutes.Navigator
    tabBarOptions={{
      activeTintColor: global.colors.green,
      inactiveTintColor: global.colors.heading,
      labelPosition: 'beside-icon',
      style: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 60
      }
    }}
  >
    <TabRoutes.Screen
      name="PlantSelection"
      component={PlantSelection}
      options={{
        title: 'Nova Planta',
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
        ))
      }}
    />
    <TabRoutes.Screen
      name="MyPlants"
      component={MyPlants}
      options={{
        title: 'Minhas Plantas',
        tabBarIcon: (({ size, color }) => (
          <MaterialIcons name="format-list-bulleted" size={size} color={color} />
        ))
      }}
    />
  </TabRoutes.Navigator>
);

export default TabBottomRoutes;