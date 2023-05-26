import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  },
  timeNotification: Date;
  time: string;
}

interface StorePlantProps {
  [id: string]: {
    data: PlantProps
  }
}

export async function storePlant(plant: PlantProps) {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StorePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({
      ...newPlant,
      ...oldPlants
    }));
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StorePlantProps) : {};

    const sortedPlants = Object.keys(plants).map(plant => {
      return {
        ...plants[plant].data,
        time: format(new Date(plants[plant].data.timeNotification), 'HH:mm')
      }
    }).sort((a, b) => (
      Math.floor(
        (new Date(a.timeNotification).getTime() / 1000) - (Math.floor(new Date(b.timeNotification).getTime() / 1000))
      )
    ));

    return sortedPlants;
  } catch (error) {
    throw new Error(error);
  }
}