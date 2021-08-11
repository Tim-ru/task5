import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import { BASEURL, PORT } from '@core/generated/config';
import style from '../style';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import Button from '../../core/components/base/form/elements/button';

export class AuthSignin extends Page {
  constructor(_props) {
    super(_props);

    this.state.elements = [
      {
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Тема',
        name: 'theme',
      },
      {
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Описание',
        name: 'theme',
        style: tailwind('mt-10'),
      },
      {
        elementType: Form.BaseElementTypes.Submit,
        title: 'Войти',
        style: tailwind('mt-auto'),
        status: "control",
        size: "giant",
        onPress: this.onSubmit
      },

    ];
  }

  onSubmit = ({ data }) => {
    console.log(data);
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
              main
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/signin`}
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />
          <Button element={{
            title: "select",
            onPress: () => {
              this.props.setSelect({
                list: [
                  { title: 'Общая', value: 'common' },
                  { title: 'Приватная', value: 'private' },
                ],
                onChange: (value) => false,
              });
            }
          }} />
        </ImageOverlay>
      </KeyboardAvoidingView>,
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(AuthSignin);