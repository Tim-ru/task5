import React from 'react';
import { View, Text, Image } from 'react-native';
import Page from '@core/components/abstract/page'
import { tailwind } from '@tailwind';
import Routes from '@core/generated/routes';
import { connect } from 'react-redux';
import Helpers from '@core/helpers';
import { Spinner } from '@core/components/base/preloader'

export class LaunchScreen extends Page {
  componentDidMount() {
    this.authProccess()
  }

  authProccess = async () => {
    let isAuthorized = await Helpers.Store.get('isAuthorized')
    if (isAuthorized === 'true') {
      setTimeout(() => this.go(Routes.main.home), 1000);
    } else if (await Helpers.Store.get('user')) {
      setTimeout(() => Helpers.historyReplace(Routes.auth.signin, this.props.history), 1000);
    } else {
      setTimeout(() => Helpers.historyReplace(Routes.auth.signup, this.props.history), 1000);
    }
  };

  // style={
  //   this.props.isDarkTheme === false ?
  //     tailwind('justify-center items-center flex-1 bg-launchScreenBackground') :
  //     tailwind('justify-center items-center flex-1 bg-pink-800')
  // }

  render() {
    return (
      <View style={tailwind('justify-center items-center flex-1 bg-launchScreenBackground')}>
        <Image style={tailwind('z-50 w-10 h-10 mb-4')}
          source={{ uri: 'https://crm.q-digital.org/assets/gentelella/public/images/logo.png' }}
        />
        <Text style={tailwind('mb-4 text-white')}>Q-Digital-Core</Text>
        <View style={tailwind('absolute bottom-5')}>
          <Spinner size={20} />
        </View>
      </View>
    )
  }
}
export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(LaunchScreen);