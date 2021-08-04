import React from 'react';
import { Input as InputLib } from '@ui-kitten/components';
import Helpers from '@core/helpers';
import { tailwind, getColor } from '@tailwind'
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from '@core/components/base/icon';

function PasswordIcon({ props, onPress, isVisible }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={tailwind(
          'w-12 h-12 absolute z-20 -top-1 -right-1 justify-center items-center',
        )}
      >
        <Icon
          size={15}
          {...props}
          style={Helpers.setClasses([props.style, tailwind('text-black w-auto h-auto')])}
          name={isVisible ? 'eye-slash' : 'eye'}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}



export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isBlured: false,
      showPassword: false,
      value: props.defaultValue || '',
      changed: true,
      update: false
    };

    if (props._ref) {
      props._ref(this)
    }
  }

  getState = () => this.state

  changeState = state => this.setState(state)

  update = () => {
    this.setState({ update: Helpers.randomkey(10) })
  }

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true }, () => onFocus && onFocus());
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.setState(
      { isBlured: true, isFocused: false },
      () => onBlur && onBlur(),
    );
  };

  onChangeText = value => {
    const { onChangeValue } = this.props
    this.setState({ value, changed: true }, () => {
      if (onChangeValue && typeof onChangeValue === 'function') {
        onChangeValue(value)
      }
    })
  }

  getProps = () => {
    const { isFocused, isBlured, showPassword, value } = this.state;
    const { status, caption, type, validate } = this.props;
    let _props = {
      ...this.props, value,

    };

    delete _props.caption;
    _props.onFocus = this.onFocus;
    _props.onBlur = this.onBlur;

    if (isBlured && !isFocused) {
      _props = {
        ..._props,
        status,
        caption,
      };

      if (validate && typeof validate === 'function') {
        _props = {
          ..._props, ...validate(this.state, { status }).input
        }
      }
    }

    if (type === 'password') {
      _props.secureTextEntry = !showPassword
      _props.accessoryRight = (props) => PasswordIcon({
        props,
        onPress: () => this.setState({ showPassword: !showPassword }),
        isVisible: showPassword,
      })
    }

    _props.onChangeText = this.onChangeText

    return _props;
  };

  render() {
    return <InputLib {...this.getProps()} />;
  }
}

export default Input;
