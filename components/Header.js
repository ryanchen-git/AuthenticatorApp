import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

/*
  Component: Header
  Purpose: Display the application header
*/
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <Text style={styles.header}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

/*
  Styles goes here
*/
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 64,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    color: '#fff',
    backgroundColor: '#4a90e2'
  }
});
