import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import style from '../style';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import Routes from '@core/generated/routes'
import Helpers from '@core/helpers';

export class AuthSignin extends Page {
  constructor(_props) {
    super(_props);

    this.state.elements = [
      {
        validation: Form.Validation.email,
        elementType: Form.BaseElementTypes.Input,
        label: 'E-mail',
        status: 'control',
        placeholder: 'mail@mail.ru',
        name: 'email',
      },
      {
        elementType: Form.BaseElementTypes.Password,
        validation: Form.Validation.password,
        textStyle: tailwind('pr-12'),
        status: 'control',
        name: 'password',
        style: tailwind('mt-4'),
      },
      {
        elementType: Form.BaseElementTypes.Button,
        title: 'Забыли пароль?',
        style: tailwind('px-0 ml-auto mb-4'),
        appearance: "ghost",
        status: "control",
        onPress: () => this.go(Routes.launch.screen)
      },
      {
        elementType: Form.BaseElementTypes.Submit,
        title: 'Войти',
        style: tailwind('mt-auto'),
        status: "control",
        size: "giant",
        onPress: this.onSubmit
      },
      {
        elementType: Form.BaseElementTypes.Button,
        title: 'У меня еще нет аккаунта',
        style: tailwind('mx-4 my-3'),
        status: "control",
        appearance: "ghost",
        onPress: () => this.go(Routes.auth.signup)
      },
    ];
  }

  onSubmit = async ({ body }) => {
    let url = 'https://imagesapi.osora.ru/';
    let storePassword = await Helpers.Store.get(body.email)
    if (body.password === storePassword) {
      this.props.setPreloader(true)
      Helpers.fetch(url)
        .then(response => {
          console.log(response);
          setTimeout(() => {
            this.props.setPreloader(false)
            this.go(Routes.main.home)
          }, 2000)

        })
    }
    //  else {
    //   this.props.setAlert({
    //     title: 'Неверный пароль!',
    //     buttons: [
    //       {
    //         text: 'Ок',
    //         style: tailwind('text-red'),
    //       },
    //     ],
    //   });
    // }
    this.setState({isAuthorized: true})
    Helpers.Store.set('isAuthorized', 'true')
    if (body) {
      this.props.setPreloader(true)
      setTimeout(() => {
        this.props.setPreloader(false)
        this.go(Routes.main.home)
      }, 2000);
    }
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')}>
          <View
            style={{
              ...tailwind('justify-center items-center'),
              ...style.signupView,
            }}
          >
            <Text style={tailwind('mt-4')} category="s1" status="control">
              Авторизация
            </Text>
          </View>
          <Form
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />
        </ImageOverlay>
      </KeyboardAvoidingView>,
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(AuthSignin);