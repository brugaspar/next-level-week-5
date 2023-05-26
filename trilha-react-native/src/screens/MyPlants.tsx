import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Header } from '../components/Header';

import waterDrop from '../assets/waterdrop.png';

import { loadPlants, PlantProps } from '../libs/storage';

import global from '../styles/global';
import { StoredPlantsListCard } from '../components/StoredPlantsListCard';

export function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState('');

  useEffect(() => {
    (async () => {
      const storedPlants = await loadPlants();

      let nextTime = '';

      if (plants.length) {
        nextTime = formatDistance(
          new Date(storedPlants[0]?.timeNotification).getTime(),
          new Date().getTime(),
          { locale: ptBR }
        );
      }

      setNextWatered(`Não esqueça de regar ${storedPlants[0]?.name} em ${nextTime}`);

      setPlants(storedPlants);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      {plants.length > 0 && (
        <View style={styles.spotligth}>
          <Image
            source={waterDrop}
            style={styles.image}
          />

          <Text style={styles.text}>{nextWatered}</Text>
        </View>
      )}

      <View style={styles.plants}>
        <Text style={styles.title}>Próximas regadas</Text>

        <FlatList
          data={plants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <StoredPlantsListCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
  spotligth: {
    backgroundColor: global.colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: 60,
    height: 60
  },
  text: {
    flex: 1,
    color: global.colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify'
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontFamily: global.fonts.heading,
    color: global.colors.heading,
    marginVertical: 20
  }
});