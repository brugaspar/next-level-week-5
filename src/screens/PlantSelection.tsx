import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';

import { Header } from '../components/Header';
import { PlanListCard } from '../components/PlantListCard';
import { Loading } from '../components/Loading';

import api from '../services/api';
import global from '../styles/global';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelection() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);

  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const [loading, setLoading] = useState(true);

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants(prev => [...prev, ...data]);
      setFilteredPlants(prev => [...prev, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleEnvironmentSelection(environment: string) {
    setSelectedEnvironment(environment);

    if (environment === 'all') return setFilteredPlants(plants);

    const filtered = plants.filter(plant => plant.environments.includes(environment));

    setFilteredPlants(filtered);
  }

  function handleFetchMorePlants(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage(prev => prev + 1);

    fetchPlants();
  }

  useEffect(() => {
    (async () => {
      const { data } = await api.get('plants_environments?_sort=title&order=asc');

      setEnvironments([{ key: 'all', title: 'Todos' }, ...data]);
    })();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Loading />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleEnvironmentSelection(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plantList}>
        <FlatList
          data={filteredPlants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PlanListCard data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMorePlants(distanceFromEnd)}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={global.colors.green} /> : null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background
  },
  content: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: global.colors.heading,
    fontFamily: global.fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    color: global.colors.heading,
    fontFamily: global.fonts.text,
    lineHeight: 20
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginVertical: 30,
    paddingHorizontal: 30
  },
  plantList: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center'
  }
});