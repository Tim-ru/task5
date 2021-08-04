import { Platform } from 'react-native';
import React from 'react';

const IconComponent =
  Platform.OS === 'ios'
    ? require('react-native-vector-icons/dist/FontAwesome').default
    : require('react-native-vector-icons/FontAwesome').default;

export function Icon(props) {
  return <IconComponent {...props} />;
}

export default Icon;
