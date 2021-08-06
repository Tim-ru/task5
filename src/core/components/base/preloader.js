import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import Helpers from '@core/helpers';

export class Spinner extends React.Component {
  timeout;

  state = {
    rotate: 0
  }

  componentDidMount() {
    this.updateRotate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  updateRotate = () => {
    clearTimeout(this.timeout);
    this.setState({ rotate: this.state.rotate + 10 })
    this.timeout = setTimeout(this.updateRotate, 10)
  }

  render() {
    const { size } = this.props;
    return (
      <FontAwesomeIcon
        style={tailwind('text-white')}
        icon={faSpinner}
        transform={{ rotate: this.state.rotate }}
        size={size}
      />
    )
  }
}

export class Preloader extends React.Component {
  render() {
    return (
      <View
        style={Helpers.setClasses([
          tailwind('justify-center items-center w-full h-full absolute z-50'),
          { backgroundColor: getColor('black opacity-50') },
        ])}
      >
        <Spinner size={40} />
      </View>
    );
  }
}

export default Preloader