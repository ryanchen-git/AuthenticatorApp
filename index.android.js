/**
 * AuthenticatorApp App
 * https://github.com/facebook/react-native
 */

import LoginScreen from './components/LoginScreen.js';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

/*
  Component: AuthenticatorApp
  Purpose: Default main component
*/
export default class AuthenticatorApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: false
    };
    this.nextScreen = this.nextScreen.bind(this);
  }

  /*
    Function: nextScreen
    Purpose: Set the state to display the login screen
  */
  nextScreen() {
    this.setState({
      loginScreen: true
    });
  }

  render() {
    if (!this.state.loginScreen) {
      return (
        <TouchableOpacity onPress={this.nextScreen} style={styles.container}>
          <StatusBar hidden={true} />
          <Image source={require('./img/blueBackground.png')} style={styles.container}>
            <View style={styles.imgSet}>
              <Image source={require('./img/graphic.png')}>
                <View style={styles.imgSet}>
                  <Image source={require('./img/mobileIDLogo.png')}>
                  </Image>
                </View>
              </Image>
            </View>
            <View style={styles.verizonLogo}>
              <Image source={require('./img/verizonLogo.png')}>
              </Image>
            </View>
          </Image>
        </TouchableOpacity>
      );
    } else {
      return <LoginScreen />
    }
  }
}

/*
  Styles goes here
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  imgSet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verizonLogo: {
    alignSelf: 'center',
    marginBottom: 20
  }
});

AppRegistry.registerComponent('AuthenticatorApp', () => AuthenticatorApp);
