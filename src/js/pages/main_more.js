import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, BackHandler } from 'react-native';
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
import HomeRoutes from '@components/routes/router';
import Helpers from '@core/helpers';
import { Button } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Routes from '@core/generated/routes'

export class More extends Page {
  constructor(_props) {
    super(_props);

    this.state.elements = [

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
            onChange: (value) => false,
          });
        }
      },

    ];
  }

  onExitMenu = () => {
    this.props.setAlert({
      title: 'Выйти из аккаунта?',
      buttons: [
        {
          text: 'Да',
          onPress: () => {
            Helpers.Store.remove('isAuthorized')
            this.go(Routes.auth.signin)
          },
        },
        {
          text: 'Нет',
          style: tailwind('text-red'),
        },
      ],
    });
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1 flex-col justify-end items-center')}>

          <Button
            onPress={this.onExitMenu}
            style={tailwind('justify-center items-center mb-5 w-1/2')}
          >
            <Ionicons
              name="log-out"
              size={20}
            />
            <View style={tailwind('justify-center items-center')}>
              <Text style={tailwind('text-white')}>Выйти</Text>
            </View>
          </Button>

          <View style={tailwind('w-full')}>

            <View style={tailwind('flex-row w-full bg-white ')}>
              <View
                style={tailwind('bg-transparent p-4 border-t-4 justify-center items-center  w-1/2')}
              >
                <Link to="/main/home" underlayColor="#f0f4f7">
                  <Text
                    style={this.props.isDarkTheme ? tailwind('text-white') : tailwind('text-black')}
                  >
                    Home
                  </Text>
                </Link>
              </View>
              <View
                style={tailwind('bg-white p-4 justify-center items-center border-t-4 border-blue-600 w-1/2')}
              >
                <Link to="/main/more" underlayColor="#f0f4f7">
                  <Text
                    style={this.props.isDarkTheme ? tailwind('text-white') : tailwind('text-black')}
                  >
                    More
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

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(More);