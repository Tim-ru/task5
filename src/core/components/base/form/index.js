import React from 'react';
import { View } from 'react-native';
import Helpers from '@core/helpers';
import { connect } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import Element from '@core/components/base/form/element'
import { ElementTypes as BaseElementTypes } from '@core/components/base/form/elements'
import { ElementTypes as CustomElementTypes } from '@components/base/form/elements'
import MSGS from '@configs/validationMsgs';
import { setPreloader } from '@core/generated/actions';

export class Form extends React.Component {
  static BaseElementTypes = BaseElementTypes;

  static CustomElementTypes = CustomElementTypes;

  static Validation = {
    default: yup.string().required(MSGS.required),
    email: yup.string().email(MSGS.email).required(MSGS.required),
    login: yup.string().min(6, MSGS.length).required(MSGS.required),
    password: yup.string().min(8, MSGS.length).required(MSGS.required),
    room: yup.number().typeError(MSGS.number).required(MSGS.required),
    confirm_password: yup.string().required(MSGS.required),
    confirm_password_front: yup
      .string()
      .oneOf([yup.ref('password'), null], MSGS.passDifferents)
      .required(MSGS.required),
  }

  constructor(props) {
    super(props)
    this.state = {}

    if (props.formRef) {
      props.formRef(this)
    }

    this.elements = {}
  }

  resultHandler = (status, data, cb, body) => {
    const { elements, onError } = this.props;
    if (status) {
      if (cb) cb({ body, data })
    }
    else {
      let errors = {};
      let onlyInputs = elements

      if (!data.message) {
        errors = { [`${onlyInputs[0].name}Error`]: 'Ошибка' };
      } else if (typeof data.message === 'string') {
        errors = { [`${onlyInputs[0].name}Error`]: data.message };
      } else {
        Object.keys(data.message).map((name) => {
          errors[`${name}Error`] = data.message[name];
        });
      }
      if (onError && typeof onError === 'function') onError({ status, errors })
      this.setState(errors);
    }
  }

  onSubmitNative = (e, cb, body) => {
    const { url, method } = this.props;
    return Helpers.fetch({ url, method, body }, this.props.setPreloader)
      .then(({ status, data }) => this.resultHandler(status, data, cb, body));
  }

  onSubmitAxios = async (e, cb, body) => {
    const { url } = this.props;
    let formData = new FormData();
    Object.keys(body).forEach((name) => {
      if (name === 'images') {
        body[name].forEach((img) => {
          formData.append('files', {
            name: `${Helpers.randomKey(10)}.jpg`,
            type: 'image/jpeg',
            uri: img.source.uri,
          });
        });
      }
      else {
        let element = this.props.elements.find(element => element.name === name);
        let value = body[name];
        if (element.beforeSendFormatter) {
          value = element.beforeSendFormatter(value)
        }
        formData.append(name, value);
      }
    })

    this.props.setPreloader(true)

    let result = await axios
      .post(url, formData)
      .then((res) => {
        const { status, data } = res.data;
        this.resultHandler(status, data, cb, body)
      })

    this.props.setPreloader(false)

    return result
  }

  getValue = (name) => {
    return this.elements[name].getValue()
  }

  onSubmit = async (e, cb) => {
    const request = this.props.requestType === 'axios' ? this.onSubmitAxios : this.onSubmitNative;
    let body = {};
    let isValid = true;
    Object.keys(this.elements).forEach((element: string) => {
      if (element && this.elements[element]) {
        if (this.elements[element].getValue()) {
          body[element] = this.elements[element].getValue();
        }
        let fieldIsValid = this.elements[element].isValid();
        if (!fieldIsValid) {
          this.elements[element].showErrors();
          isValid = fieldIsValid;
        }
      }
    });

    if (isValid) {
      if (this.props.url) {
        await request(e, cb, body)
      }
      else {
        cb({ body })
      }
    }
  };

  reset = (fieldNames = []) => {
    let elements = Object.keys(this.elements)
    if (fieldNames && fieldNames.length) {
      elements = elements.filter((name) => fieldNames.indexOf(name) !== -1)
    }

    elements.forEach((name => {
      this.elements[name].reset()
    }))
  }

  clear = (fieldNames = []) => {
    let elements = Object.keys(this.elements)
    if (fieldNames && fieldNames.length) {
      elements = elements.filter((name) => fieldNames.indexOf(name) !== -1)
    }

    elements.forEach((name => {
      this.elements[name].clear()
    }))
  }


  update = (fieldNames = {}) => {
    if (fieldNames) {
      Object.keys(fieldNames).forEach(name => {
        this.elements[name].update(fieldNames[name])
      })
    }
  }

  render() {
    const { wrapperProps, elements } = this.props;

    return (
      <View {...wrapperProps}>
        {elements.map((element, key) => {
          const _element = {
            ...element,
            externalError: this.state[`${element.name}Error`]
          }
          return <Element
            element={_element}
            getElements={() => this.elements}
            key={key}
            onSubmit={this.onSubmit}
            _ref={(name, elementInstance) => this.elements[name] = elementInstance}
            {..._element}
          />
        })}
      </View>
    )
  }
}

Form.defaultProps = {
  url: '',
  method: 'POST',
  wrapperProps: {},
  elements: [],
  formRef: () => false
}

export default connect(undefined, (dispatch) => ({
  setPreloader(alert) {
    dispatch(setPreloader(alert));
  },
}))(Form)