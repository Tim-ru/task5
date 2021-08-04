import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import { BASEURL, PORT } from '@core/generated/config';
import BG from '@img/imageBackground.jpg';
import Logo from '@img/bg-logo.png';
import style from '../style';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import Routes from '@core/generated/routes'

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
        elementType: Form.BaseElementTypes.password,
        validation: Form.Validation.password,
        elementType: Form.BaseElementTypes.Password,
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
        onPress: () => this.go(Routes.auth.restore)
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

  onSubmit = ({ data }) => {
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')} source={BG}>
          <View
            style={{
              ...tailwind('justify-center items-center'),
              ...style.signupView,
            }}
          >
            <View style={tailwind('relative')}>
              <View
                style={tailwind(
                  'bg-white rounded-full mb-4 opacity-70 absolute h-14 w-14 -left-2 -top-2 z-10',
                )}
              />
              <Image
                source={Logo}
                style={tailwind('w-10 h-10 relative z-20')}
              />
            </View>
            <Text style={tailwind('mt-4')} category="s1" status="control">
              Авторизация
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/signin`}
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />
        </ImageOverlay>
      </KeyboardAvoidingView>,
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(AuthSignin);