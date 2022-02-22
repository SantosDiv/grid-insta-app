import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from './styles';

export default function Header({ handleChoosePhoto }) {

  const generateBoxNumbers = () => {
    const dataInfoNumbers = [
      { id: '55asd', number: '123', label: 'Publicações' },
      { id: '5wrsd', number: '15M', label: 'Seguidores' },
      { id: '5dfdsg', number: '25', label: 'Seguindo' },
    ];
    return dataInfoNumbers.map(({ id, number, label }) => (
      <View style={styles.boxNumbersContainer} key={id}>
        <Text style={styles.numberInsta}>{number}</Text>
        <Text>{label}</Text>
      </View>
    ))
  };
  
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.avatar} />
        <View style={styles.numberInfoContainer}>
          {generateBoxNumbers()}
        </View>
      </View>
      <View>
        <Text style={styles.nameUser}>GridInsta</Text>
        <Text>O Melhor app para você organizar suas imagens, antes de publica-las.</Text>
        <Text>
          Seguido por <Text style={{ fontWeight: 'bold' }}>diogenis.felipe </Text> e outras <Text style={{ fontWeight: 'bold' }}>120 pessoas</Text>
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.btnAdd}>
          <Text>Adicionar item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}