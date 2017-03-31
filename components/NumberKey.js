import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

/*
  Component: NumberKey
  Purpose: Display the number key on MDN screen
*/
export default class NumberKey extends Component {
  constructor(props) {
    super(props);
    this.pressNumber = this.pressNumber.bind(this);
  }

  /*
    Function: pressNumber
    Purpose: Response to the press event on the number key
  */
  pressNumber() {
    this.props.parentMethod(this.props.number); // Call the parent 'setPhoneField' method
  }

  render() {
    return (
      <View style={styles.numberView}>
        <TouchableOpacity onPress={this.pressNumber}>
          <Text style={styles.numberText}>{this.props.number}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/*
  Styles goes here
*/
const styles = StyleSheet.create({
  numberView: {
    borderWidth: 0,
    flex: 1,
    alignItems: 'center'
  },
  numberText: {
    borderWidth: 0,
    borderRadius: 36,
    paddingTop: 16,
    width: 72,
    height: 72,
    color: '#4a90e2',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
