import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, SafeAreaView, Animated } from 'react-native';
import ImageScreen from './src/components/ImageScreen';

export default function App() {
  const data = [
    {
      id: 'asdsds',
      color: 'black',
    },
    {
      id: 'sdfstwr',
      color: 'green',
    },
    {
      id: 'dgskfjs',
      color: 'blue',
    },
    {
      id: 'hgfgdf',
      color: 'pink',
    },
    {
      id: 'ararssf',
      color: undefined,
    },
    {
      id: 'asdaeawdsd',
      color: '#e5e5e5',
    }
  ];

  const [dataState, setDataState] = useState(data);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const numLines = Math.ceil((dataState.length / 3));
    let cont = 0;
    let numColumns = 3;
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
  }, [])
  
  const changePosition = (item, itemForChange) => {
    const indexPositionPrevItem = dataState.indexOf(item);
    const indexPositionNextItem = dataState.indexOf(itemForChange);

    dataState.splice(indexPositionNextItem, 1, setNewCoordinates(item, itemForChange));

    dataState.splice(indexPositionPrevItem, 1, setNewCoordinates(itemForChange, item));

    setDataState(dataState);
    forceUpdate();
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

  const renderItem = ({ item }) => (
    <ImageScreen color={item.color} item={item} changePosition={changePosition} data={dataState}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={dataState}
        renderItem={renderItem}
        keyExtractor={ item => item.id }
        numColumns={3}
        style={{ flexWrap: 'wrap'}}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
});
