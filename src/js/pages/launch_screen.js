import React from 'react';
import { View, Text } from 'react-native';
import Page from '@core/components/abstract/page'
import { tailwind, getColor } from '@tailwind';
import Routes from '@core/generated/routes';
import { connect } from 'react-redux';
import Helpers from '@core/helpers';
import { Spinner } from '@core/components/base/preloader';

export class LaunchScreen extends Page {
  componentDidMount() {
    this.authProccess()
    console.log('asdasda');
  }

  authProccess = () => {
    Helpers.historyReplace(Routes.auth.signin, this.props.history);
  };

  render() {
    return (
      <View
        style={Helpers.setClasses([
          tailwind('justify-center items-center w-full h-full absolute z-50'),
          { backgroundColor: getColor('black opacity-50') },
        ])}
      >
        <Text style={tailwind('mt-4')} category="s1" status="control">
          Q-digital-core
        </Text>
        <Spinner size={100} />
      </View>
    )
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(LaunchScreen);