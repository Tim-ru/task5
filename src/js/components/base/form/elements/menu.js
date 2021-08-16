import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, BackHandler } from 'react-native';
import { Menu, Text } from '@ui-kitten/components';
import { tailwind } from '@tailwind';
import { connect } from 'react-redux';
import Routes from '@core/generated/routes';
import { Button } from '@ui-kitten/components';
import Page from '@core/components/abstract/page';

let tabStyle = tailwind('flex-row w-full h-1 bg-black justify-start')

export class TabMenu extends Page {
  constructor(_props) {
    super(_props)

    this.state = {
      screen: Routes.main.home,
    }
  }

  async changeScreen(tab) {
    this.setState({ screen: tab }, () => {
      this.state.screen == Routes.main.home ?
        tabStyle = tailwind('flex-row w-full h-1 bg-black justify-start') :
        tabStyle = tailwind('flex-row w-full h-1 bg-black justify-end')
      this.props.go(tab)
    })
  }


  render() {
    return (
      <View style={tailwind('w-full flex-col')} >
        {/* Полоска переключения окон */}
        <View style={tabStyle}>
          <View style={tailwind('flex-row w-1/2 bg-blue-600 h-1')} />
        </View>
        {/* Кнопки переключения окон */}
        <View style={tailwind('flex-row w-full bg-white ')}>
          <View style={tailwind('bg-transparent p-4 justify-center items-center w-1/2')}>
            <Text
              onPress={() => { this.changeScreen(Routes.main.home) }}
              style={tailwind('text-black')}
            >
              Главная
            </Text>
          </View>

          <View style={tailwind('bg-transparent p-4 justify-center items-center w-1/2')}>
            <Text
              onPress={() => { this.changeScreen(Routes.main.more) }}
              style={tailwind('text-black')}
            >
              Выход
            </Text>
          </View>
        </View>
      </View>
    )
  }
}


export default TabMenu