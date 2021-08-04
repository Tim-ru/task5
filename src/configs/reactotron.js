import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import Reducers from '@core/generated/reducers';
import InitialState from '@configs/reduxInitialState';

export default class Reactotron_ {
  constructor() {
    if (__DEV__) {
      this.init();
    }

    let args = [Reducers, InitialState];

    if (__DEV__) {
      args.push(this.main.createEnhancer());
    }

    return args;
  }

  init() {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    let host = scriptURL.split('://')[1].split(':')[0];

    this.main = Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure({ host })
      .use(reactotronRedux())
      .useReactNative()
      .connect();
  }
}
