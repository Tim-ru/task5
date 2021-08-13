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
import Icon from '@core/components/base/icon';
import AppNavigator from '@components/menu';
import { NativeRouter, Link } from "react-router-native";
import Routes from '@components/routes/router';
import ImageView from '@components/base/form/elements/ImageView';

export class Main extends Page {
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
        elementType: Form.BaseElementTypes.Button,
        title: 'Тема',
        name: 'select',
        style: tailwind('mt-5'),
        onPress: () => {
          this.props.setSelect({
            list: [
              { title: 'Общая', value: 'public' },
              { title: 'Приватная', value: 'private' },
            ],
            onChange: (value) => console.log(value),
          });
        }
      },
      {
        elementType: Form.BaseElementTypes.Input,
        status: 'control',
        placeholder: 'Описание',
        name: 'description',
        style: tailwind('mt-10'),
      },
      {
        elementType: Form.CustomElementTypes.ImageView,
      },

      {
        elementType: Form.BaseElementTypes.Submit,
        title: 'Отправить',
        style: tailwind('mt-auto'),
        status: "control",
        size: "giant",
        style: tailwind('mb-10'),
        onPress: this.onSubmit
      },

    ];
  }

  onSubmit = ({ body }) => {
    console.log(body);
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')}>
          <Form
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />

          <View style={tailwind('w-full')}>
            <View style={tailwind('flex-row w-full bg-white ')}>
              <View
                style={tailwind('bg-transparent p-4 border-t-4 justify-center items-center border-blue-600 w-1/2')}
              >
                <Link to="/main/home" underlayColor="#f0f4f7">
                  <Text
                    style={this.props.isDarkTheme ? tailwind('text-white') : tailwind('text-black')}
                  >
                    Главная
                  </Text>
                </Link>
              </View>
              <View
                style={tailwind('bg-white p-4 justify-center items-center border-t-4  w-1/2')}
              >
                <Link to="/main/more" underlayColor="#f0f4f7">
                <Text
                    style={this.props.isDarkTheme ? tailwind('text-white') : tailwind('text-black')}
                  >
                    Еще
                  </Text>
                </Link>
              </View>
            </View>
          </View>

        </ImageOverlay>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(Main);
