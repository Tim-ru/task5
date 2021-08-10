import React from 'react';
import { View, Text, Image } from 'react-native';
import Page from '@core/components/abstract/page'
import { tailwind } from '@tailwind';
import Routes from '@core/generated/routes';
import { connect } from 'react-redux';
import Helpers from '@core/helpers';
import { Spinner } from '@ui-kitten/components';

export class LaunchScreen extends Page {
  componentDidMount() {
    this.authProccess()
  }

  authProccess = () => {
    setTimeout(() => Helpers.historyReplace(Routes.auth.signin, this.props.history), 2000);
  };

  render() {
    return (
      <View style={tailwind('justify-center items-center flex-1 bg-indigo-500')}>
        <Image style={tailwind('z-50 w-10 h-10 mb-4')}
          source={{ uri: 'https://crm.q-digital.org/assets/gentelella/public/images/logo.png' }}
        />
        <Text style={tailwind('mb-4 text-white')}>Q-Digital-Core</Text>
        <View style={tailwind('absolute bottom-10')}>
          <Spinner size={100}/>
        </View>
      </View>
    )
  }
}
export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(LaunchScreen);