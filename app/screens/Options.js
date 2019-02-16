import React, { Component } from 'react';
import {
  ScrollView, StatusBar, Platform, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import { Ionicons } from '@expo/vector-icons';

import { ListItem, Separator } from '../components/List';

const ICON_COLOR = '#868686';
const ICON_SIZE = 23;
const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handleThemesPress = () => {
    this.props.navigation.navigate('Themes');
  };

  handleSitePress = () => {
    Linking.openURL('htp://fixer.io').catch((err) => {
      alert('An error occurred');
    });
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handleThemesPress}
          customIcon={
            <Ionicons name={`${ICON_PREFIX}-arrow-forward`} size={ICON_SIZE} color={ICON_COLOR} />
          }
        />
        <Separator />
        <ListItem
          text="Fixer.io"
          onPress={this.handleSitePress}
          customIcon={<Ionicons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />}
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default Options;
