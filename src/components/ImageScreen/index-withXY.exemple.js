import React, { useRef, useState } from 'react';
import { StyleSheet, PanResponder, Animated } from 'react-native';

export default function ImageScreen({ color = "skyblue", item, changePosition, data }) {
  const pan = useRef(new Animated.ValueXY()).current;
  let isDragArea = true;
  const [teste, setTest] = useState(false)

  const panResponder = teste ? { panHandlers: {} } : useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => {
        console.log(item)
        if (e.nativeEvent.pageY > item?.positionMaxY) {
          isDragArea = false;
        }

        return true;
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y }
      ], {useNativeDriver: false}),
      onPanResponderRelease: (e, gesture) => {
        const itemForChange = data.find(({ positionMaxX, positionMinX, positionMinY, positionMaxY }) => (
          isDropAreaByCoordinate(e.nativeEvent.pageX, positionMaxX, positionMinX )
          && isDropAreaByCoordinate(e.nativeEvent.pageY, positionMaxY, positionMinY)
        ));

        if (itemForChange && itemForChange !== item && isDragArea) {
          changePosition(item, itemForChange);
        }
        resetIsDragArea();
        animatedSpring(pan);
      }
    })
  ).current;

  const animatedSpring = (pan) => {
    Animated.spring(
      pan,
      {
        toValue: {x: 0, y: 0},
        friction: 5,
        useNativeDriver: false,
    }).start();
  };

  const isDropAreaByCoordinate = (endPosition, positionMax, positionMin) => {
    return endPosition >= positionMin && endPosition <= positionMax
  };

  const resetIsDragArea = () => {
    isDragArea = true;
  };

  return (
    <Animated.Image
      { ...panResponder.panHandlers }
      style={[{ transform: [{translateX: pan.x}, {translateY: pan.y}]}, styles.square, { backgroundColor: color }]}
      source={{ uri: item.uri }}
    >
    </Animated.Image>
  );
}


const styles = StyleSheet.create({
  square: {
    width: 130,
    height: 130,
    marginLeft: 3,
    marginBottom: 3
  }
});
