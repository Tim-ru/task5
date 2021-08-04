import React from 'react';
import Input from '@core/components/base/form/elements/input'

export function Password({ element, ...rest }) {
  const _element = {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    textContentType: 'none',
    ...element,
  }

  return <Input element={_element} {...rest} />
}

export default Password;