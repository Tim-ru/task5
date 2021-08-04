import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View } from 'react-native';
import { tailwind, getColor } from '@tailwind';
import Helpers from '@core/helpers';
import { connect } from 'react-redux';
import Actions from '@core/generated/actions'

export class Preloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: 0,
    };
    this.timeout = false;
  }

  updateRotate = () => {
    clearTimeout(this.timeout);
    let { rotate } = this.state;
    rotate += 10;
    if (rotate > 360) rotate = 0;
    this.setState({ rotate });
    this.timeout = setTimeout(this.updateRotate, 10);
  };

  componentDidMount() {
    this.updateRotate();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { rotate } = this.state;
    return (
      <View
        style={Helpers.setClasses([
          tailwind('justify-center items-center w-full h-full absolute z-50'),
          { backgroundColor: getColor('black opacity-50') },
        ])}
      >
        <FontAwesomeIcon
          style={tailwind('text-white')}
          icon={faSpinner}
          transform={{ rotate }}
          size={40}
        />
      </View>
    );
  }
}

export default Preloader
