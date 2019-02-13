import React from 'react';
import {
  View, Image, ImageBackground, Text,
} from 'react-native';
import styles from './styles';

const Logo = () => (
  <View>
    <ImageBackground
      resizeMode="contain"
      style={styles.containerImage}
      source={require('./images/background.png')}
    >
      <Image srouce={require('./images/logo.png')} />
    </ImageBackground>
    <Text>Currency Converter</Text>
  </View>
);

export default Logo;
