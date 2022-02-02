import React, { useRef, useEffect } from 'react';
import { StyleSheet, PanResponder, Animated } from 'react-native';

export default function ImageScreen({ color = "skyblue", item, changePosition, data }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        console.log(gesture) // O usuáro não pode arrastar a imagem a partir do canto inferior direito da área.
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


        // console.log(`X Page: ${e.nativeEvent.pageX}`);
        // console.log(`Y Page: ${e.nativeEvent.pageY}`);

        if (itemForChange && itemForChange !== item) {
          changePosition(item, itemForChange);
        }
        // console.log(`X maxima: ${item?.positionMaxX}`);
        // console.log(`Y maxima: ${item?.positionMaxY}`);
        // console.log(`X minima: ${item?.positionMinX}`);
        // console.log(`Y minima: ${item?.positionMinY}`);
        Animated.spring(
          pan,
          {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: false,
        }).start();
      }
    })
  ).current;

  const isDropAreaByCoordinate = (endPosition, positionMax, positionMin) => {
    return endPosition >= positionMin && endPosition <= positionMax
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[{ transform: [{translateX: pan.x}, {translateY: pan.y}]}, styles.square, { backgroundColor: color }]}
    >
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  square: {
    width: 130,
    height: 130,
    marginLeft: 3
  }
});
