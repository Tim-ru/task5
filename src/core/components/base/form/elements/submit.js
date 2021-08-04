import React from 'react';
import Button from '@core/components/base/form/elements/button';
import FormElement from '@core/components/abstract/formElement';

export class Submit extends FormElement {
  render() {
    const { element, onSubmit } = this.props;
    const _element = {
      ...element,
      onPress: (e) => onSubmit(e, element.onPress, element)
    }
    return <Button element={_element} />
  }
}

export default Submit;