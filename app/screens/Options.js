import React, { Component } from 'react';
import { ScrollView, StatusBar } from 'react-native';

import { ListItem, Separator } from '../components/List';

class Options extends Component {
  handleThemesPress = () => {
    console.log('press themes');
  };

  handleSitePress = () => {
    console.log('press site link');
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
      </ScrollView>
    );
  }
}

export default Options;
