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
import Routes from '@components/routes/router';
import Button from '@core/components/base/form/elements/button';
import Helpers from '@core/helpers';

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
            // Helpers.Store.clear()
            // BackHandler.exitApp() 
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

          <TouchableOpacity
            style={tailwind('justify-center items-center h-24 w-28 ')}
            onPress={this.onExitMenu}
          >
            <Text>Выйти</Text>
          </TouchableOpacity>

          <View style={tailwind('w-full')}>
            <View style={tailwind('flex-row justify-around items-center w-full bg-red')}>
              <View style={tailwind('bg-transparent p-4')}>
                <Link to="/main/home" underlayColor="#f0f4f7">
                  <Text>Home</Text>
                </Link>
              </View>
              <View>
                <Link to="/main/more" underlayColor="#f0f4f7">
                  <Text >More</Text>
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