import React from 'react';
import Helpers from '@helpers'

export class FormElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = { changed: false }
    this._ref()
  }

  getValue = () => ''

  _ref = () => {
    if (this.props._ref) this.props._ref(this.props.element.name, this)
  }

  update = () => false

  showErrors = () => false

  reset = () => false

  clear = () => false

  isValid = () => {
    const { element } = this.props;
    if (element?.validation) {
      return Helpers.validate(
        {
          [element.name]: element.validation,
        },
        { [element.name]: state.value },
        state.changed,
        element.externalError,
        { status: 'control' },
      )
    }
    return true
  }
}

export default FormElement;