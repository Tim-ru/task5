import React from 'react';
import { Button } from '@ui-kitten/components';
import { Text } from 'react-native';
import Icon from '@core/components/base/icon';
import { tailwind } from '@tailwind';
import Helpers from '@core/helpers';
import FormElement from '@core/components/abstract/formElement';

export class Select extends FormElement {
  render() {
    const { title, style, onPress } = this.props;
    return (
      <Button
        onPress={onPress}
        style={Helpers.setClasses([
          tailwind('bg-buttonCard flex-row mr-auto px-3 py-2 rounded-full'),
          style,
        ])}
      >
        <Text style={tailwind('text-blue')}>{title}</Text>
        <Icon style={tailwind('text-blue ml-2')} name="angle-down" size={20} />
      </Button>
    );
  }
}

export default Select;
