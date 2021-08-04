import React from 'react';
import { View } from 'react-native';
import { tailwind } from '@tailwind';
import Navigator from '@core/generated/navigator';
import AppParent from '@core/components/abstract/app';
import Page from '@core/components/abstract/page';
import { connect } from 'react-redux';

export class App extends AppParent {
  render() {
    return (
      <View style={tailwind('flex-1')}>
        <Navigator onHistorySet={this.onHistorySet} />
      </View>
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(App);