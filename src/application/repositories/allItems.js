import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemsFactory from '../factories/ItemsFactory';

export default class AllItems {
  async getAll() {
    const localStorage = await AsyncStorage.getItem('items');
    if (!localStorage) {
      return new ItemsFactory().buildFromData([]);
    }
    return new ItemsFactory().buildFromData(JSON.parse(localStorage));
  }

  async save(items) {
    await AsyncStorage.setItem('items', JSON.stringify(items.parse()));
    return items;
  }

  async deleteAll() {
    await AsyncStorage.setItem('items', JSON.stringify([]));
  }
}