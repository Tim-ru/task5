import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import Icon from '@core/components/base/icon';
import Helpers from '@core/helpers';
import { Button } from '@ui-kitten/components';
import Routes from '@core/generated/routes'
import TabMenu from '@components/base/form/elements/menu';

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

          <View style={tailwind('justify-center items-center mb-5 w-full px-2')}>
            <Button
              onPress={this.onExitMenu}
              style={tailwind('justify-center items-center w-full ')}
            >
              <View>
                <Icon
                  name="sign-out"
                  size={20}
                  style={tailwind('text-white')}
                />
              </View>

              <View style={tailwind('justify-center items-center ')}>
                <Text style={tailwind('text-white ml-2')}>Выйти</Text>
              </View>

            </Button>
          </View>

          <TabMenu
            {...this}
          />

        </ImageOverlay>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(More);