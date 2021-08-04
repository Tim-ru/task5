import React from 'react';
import { View } from 'react-native';
import { Text as TextLib } from '@ui-kitten/components';
import FormElement from '@core/components/abstract/formElement';

export class Text extends FormElement {
  render() {
    const { element } = this.props;
    const { title, render, category, style } = element;
    const content = render ? typeof render === 'function' ? render() : render :
      title ? typeof title === 'function' ? title() : title : ''
    return (
      <View style={style}>
        <TextLib category={category}>
          {content}
        </TextLib>
      </View>
    )
  }
}

export default Text;