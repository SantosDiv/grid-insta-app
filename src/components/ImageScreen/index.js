import React, { useRef, useState } from 'react';
import { StyleSheet, PanResponder, Animated, Button } from 'react-native';

export default function ImageScreen({ item, setItemSelect, removeItem }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [editing, setEditing] = useState(true);
  const [selected, setSelected] = useState(false);

  const panResponder = editing ? useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: async () => {
        setSelected(true)
        await setItemSelect(item)

        return true;
      },
    })
  ).current :  { panHandlers: {} } ;

  const handlerRemoveItem = async () => {
    await removeItem(item);
  }

  return (

    <Animated.View>
      <Animated.Image
        { ...panResponder.panHandlers }
        style={[
          { transform: [{translateX: pan.x}, {translateY: pan.y}]},
          styles.item,
          { opacity: selected ? 0.5 : 1 }
        ]}
        source={{ uri: item.uri }}
      >
      </Animated.Image>
      { editing && <Button onPress={handlerRemoveItem} title="Delete" /> }
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  item: {
    width: 130,
    height: 130,
    marginLeft: 3,
    marginBottom: 3
  }
});
