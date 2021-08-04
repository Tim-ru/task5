import AsyncStorage from '@react-native-community/async-storage';

export const Store = {
  get: async (name) => await AsyncStorage.getItem(name),
  getAll: async (keys) => {
    let obj = {};
    await AsyncStorage.multiGet(keys, (err, stores) => {
      if (err) {
        console.error(err);
      }
      stores.forEach((result) => {
        let [name, value] = result;
        obj[name] = value;
      });
      return;
    });
    return obj;
  },
  set: async (name, value) => await AsyncStorage.setItem(name, value),
  remove: async (name) => await AsyncStorage.removeItem(name),
  setAll: async (keyValues) => await AsyncStorage.multiSet(keyValues),
  clear: async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      return await AsyncStorage.clear();
    }
    return;
  },
};

export default Store;
