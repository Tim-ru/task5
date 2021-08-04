import React from 'react';
import { BackHandler } from 'react-native';

export class App extends React.Component {
  history;

  constructor(props){
    super(props);
    global.setPreloader = this.props.setPreloader;
  }

  onHistorySet = (history) => this.history = history;

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  onHardwareBackPress = () => {
    const { history } = this;
    if (history?.index > 0) {
      history.goBack();
      return true;
    }
    return false;
  };
}

export default App;