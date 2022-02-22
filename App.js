import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Animated, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageScreen from './src/components/ImageScreen';
import Header from './src/components/Header';
import CreateItemsData from './src/application/usecases/createItemsData';
import SetNewItem from './src/application/usecases/setNewItem';
import ChangePosition from './src/application/usecases/changePosition';
import RemoveItem from './src/application/usecases/removeItem';


export default function App() {
  const [items, setItems] = useState(undefined);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const initialLocalStorage = async () => {
      const ucCreateItemsData = CreateItemsData.build();
      const itemsDomain = await ucCreateItemsData.execute();
      setItems(itemsDomain);
    }
    initialLocalStorage()
  }, [])

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setNewItem(result)
    }
  };

  const setNewItem = async (result) => {
    const ucSetNewItem = SetNewItem.build();
    const item = { id: Math.random() * 100, uri: result.uri }
    const itemsDomain = await ucSetNewItem.execute(items, item);
    setItems(itemsDomain);
    forceUpdate();
  }

  const setItemSelect = async (item) => {
    const ucChangePosition = ChangePosition.build();
    const itemsDomain = await ucChangePosition.execute(items, item);

    if (itemsDomain) {
      setItems(itemsDomain);
      forceUpdate();
    }
  };

  const removeItem = async (item) => {
    Alert.alert(
      'Excluir item',
      'Tem certeza que deseja deletar este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            const ucRemoveItem = RemoveItem.build();
            await ucRemoveItem.execute(items, item);
            forceUpdate();
          }
        }
      ]
    )
    
    
    
  }

  const renderItem = ({ item }) => {
    return <ImageScreen
      item={item}
      setItemSelect={setItemSelect}
      removeItem={removeItem}
      />
  }


  return (
    <SafeAreaView style={styles.container}>
      <Header handleChoosePhoto={handleChoosePhoto}/>
      <Animated.FlatList
        data={items?.getAll()}
        renderItem={renderItem}
        keyExtractor={ item => item.id }
        numColumns={3}
        style={styles.flatList}
        nestedScrollEnabled
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 40
  },
  buttonAddImage: {
    backgroundColor: '#e5e5e5',
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 50,
    color: 'gray'
  },
  flatList: {
    flexWrap: 'wrap',
    marginLeft: 5,
    height: 480,
    paddingBottom: 40,
    paddingTop: 0,
  }
});
