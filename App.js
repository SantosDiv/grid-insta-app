import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Animated, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageScreen from './src/components/ImageScreen';

export default function App() {
  const INITIAL_STATE = [
    {
      id: '3RDSD#SD24',
      buttonAddImage: true
    }
  ];

  const [dataState, setDataState] = useState(INITIAL_STATE);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  
  const changePosition = (item, itemForChange) => {
    const indexPositionPrevItem = dataState.indexOf(item);
    const indexPositionNextItem = dataState.indexOf(itemForChange);

    dataState.splice(indexPositionNextItem, 1, setNewCoordinates(item, itemForChange));

    dataState.splice(indexPositionPrevItem, 1, setNewCoordinates(itemForChange, item));

    setDataState(dataState);
    forceUpdate();
  }

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      dataState.unshift({
        id: Math.random() * 100,
        uri: result.uri
      });
      ;
      setDataState(setPositionKeys(dataState));
      forceUpdate();
    }
  };

  const setPositionKeys = (dataState) => {
    const numLines = Math.ceil((dataState.length / 3));
      let cont = 0;
      let numColumns = dataState.length < 3 ? dataState.length : 3;
      const widthSquare = 130;
      for (let i = 0; i < numLines; i++) {
        const positionMaxX = widthSquare;
        const positionMinX = 0;
        const positionMinY = widthSquare * i; // Inicia como 0 (130 * 0... 130 * n)
        const positionMaxY = widthSquare * (i + 1); // 130 * 1...130 * n + 1
        for (let j = 0; j < numColumns; j++) {
          dataState[cont].positionMinX = positionMinX; // 0 (valor inicial)
          dataState[cont].positionMinY = positionMinY; // 0 (valor inicial)
          dataState[cont].positionMaxX = positionMaxX; // 130 (valor inicial)
          dataState[cont].positionMaxY = positionMaxY; // 130 (valor inicial)
          positionMaxX += widthSquare;
          positionMinX += widthSquare;
          cont++;
        }
        numColumns = dataState.length - 3;
      }
    return dataState;
  }

  const setNewCoordinates = (element, secondElement) => {
    return {
      ...element,
      positionMaxX: secondElement.positionMaxX,
      positionMaxY: secondElement.positionMaxY,
      positionMinX: secondElement.positionMinX,
      positionMinY: secondElement.positionMinY,
    };
  };

  const renderItem = ({ item }) => {
    if (item.buttonAddImage) {
      return (
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.buttonAddImage}>
          <Text style={styles.buttonIcon}>+</Text>
        </TouchableOpacity>
      )
    }
    return <ImageScreen color={item.color} item={item} changePosition={changePosition} data={dataState}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={dataState}
        renderItem={renderItem}
        keyExtractor={ item => item.id }
        numColumns={3}
        style={{ flexWrap: 'wrap', marginLeft: 5}}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0
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
  }
});
