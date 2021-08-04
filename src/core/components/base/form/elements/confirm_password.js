import React, { useState } from 'react';
import Input from '@core/components/base/form/elements/input'
import Password from '@core/components/base/form/elements/password'
import Helpers from '@core/helpers';

export function Confirm_password({ element, getElements, ...rest }) {
  const [password, setPassword] = useState(element?.password?.defaultValue || '')


  const _element = {
    label: 'Подтвердите пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    textContentType: 'none',
    ...element.confirm,
  }

  function validate(state) {
    return Helpers.validate(
      {
        [_element.name]: _element.validation,
      },
      { [_element.name]: state.value, password },
      state.changed,
      false,
      { status: 'control' },
    )
  }

  return (
    <>
      <Password element={element.password} getElements={getElements} {...rest} onChangeValue={setPassword} />
      <Input element={_element} {...rest} validate={validate} />
    </>
  )
}

export default Confirm_password;