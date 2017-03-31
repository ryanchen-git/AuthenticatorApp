import NumberKey from './NumberKey.js';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  Navigator 
} from 'react-native';

/*
  Component: MdnScreen
  Purpose: Display the MDN screen
*/
export default class MdnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberSet: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['', 0, '<']
      ],
      allowDelete: false,
      showPlaceHolder: true,
      phoneNumber: '',
      formattedPhoneNumber: '',
      validPhoneNumber: false
    };
    this.setPhoneField = this.setPhoneField.bind(this);
    this.pressDelete = this.pressDelete.bind(this);
    this.pressContinue = this.pressContinue.bind(this);
  }

  /*
    Function: showPhoneInput
    Purpose: Response to the press event on the number key
    Return value: Display the default placeholder or phone number
  */
  showPhoneInput() {
    if (this.state.showPlaceHolder) {
      return (
        <Text style={styles.placerHolderText}>Phone Number</Text>
      )
    } else {
      return (
        <Text style={styles.phoneNumberText}>{this.state.formattedPhoneNumber}</Text>
      );
    }
  }

  /*
    Function: setPhoneField
    Purpose: Show the phone number based on user's input
    Parameters: Number pressed by the user
  */
  setPhoneField(key) {
    var formattedPhoneNumber = '';
    var phoneLength = '';
    var phoneNumber = this.state.phoneNumber;

    if (key === "") {
      return;
    }

    if (typeof key === "number") {
      phoneNumber = phoneNumber + key;
    }
    phoneLength = phoneNumber.length;

    if (typeof key === "number") { // If number key is pressed
      formattedPhoneNumber = this.getFormattedPhoneNumber(phoneNumber, phoneLength);

      if (phoneLength <= 10) {
        this.setState({
          allowDelete: true,
          showPlaceHolder: false,
          formattedPhoneNumber: formattedPhoneNumber,
          phoneNumber: phoneNumber
        });

        if (phoneLength == 10) {
          this.setState({
            validPhoneNumber: true
          });
        }
      }
    } else { // If "<" is pressed
      if (this.state.allowDelete) {
        phoneNumber = phoneNumber.slice(0, -1);
        phoneLength = phoneNumber.length;

        if (phoneLength == 0) {
          this.setState({
            allowDelete: false,
            showPlaceHolder: true,
            formattedPhoneNumber: '',
            phoneNumber: ''
          });
          return;
        } else {
          formattedPhoneNumber = this.getFormattedPhoneNumber(phoneNumber, phoneLength);          
        }

        this.setState({
          formattedPhoneNumber: formattedPhoneNumber,
          phoneNumber: phoneNumber,
          validPhoneNumber: false
        });
      }
    }
  }

  /*
    Function: pressDelete
    Purpose: Reset the state to the original values
  */
  pressDelete() {
    this.setState({
      allowDelete: false,
      showPlaceHolder: true,
      formattedPhoneNumber: '',
      phoneNumber: '',
      validPhoneNumber: false
    });
  }

  /*
    Function: showPhoneText
    Purpose: Show/Hide the option text
    Return value: Display the option text or set it to empty
  */
  showPhoneText() {
    if (this.state.allowDelete) {
      return (
        <Text style={styles.showPhoneText}>Phone Number</Text>
      );
    } else {
      return (
        <Text style={styles.showPhoneText}></Text>
      );
    }
  }

  /*
    Function: showDeleteBtn
    Purpose: Show/Hide the option delete image
    Return value: Display the option image or null
  */
  showDeleteBtn() {
    if (this.state.allowDelete) {
      return (
        <Image source={require('../img/deleteText.png')}></Image>
      );
    } else {
      return null;
    }
  }

  /*
    Function: showContinueBtn
    Purpose: Show/Hide the Continue button based on the condition
    Return value: Display the Continue button or null
  */
  showContinueBtn() {
    if (this.state.validPhoneNumber) {
      return (
        <TouchableOpacity onPress={this.pressContinue} >
          <View style={styles.buttonView} >
            <Text style={styles.buttonText}>CONTINUE</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  /*
    Function: pressContinue
    Purpose: Handle the press event for the Continue button
  */
  pressContinue() {
    alert(this.state.phoneNumber);
  }

  /*
    Function: getFormattedPhoneNumber
    Purpose: Format the phone number properly to the user
    Parameters: Phone number the user pressed; Length of the current phone number
    Return value: Formatted phone number    
  */
  getFormattedPhoneNumber(phoneNumber, phoneLength) {
    var formattedPhoneNumber = "";

    if (phoneLength == 3) {
      formattedPhoneNumber = "(" + phoneNumber + ")";
    } else if (phoneLength > 3) {
      var sliceNumber = phoneNumber.slice(3);

      if (phoneLength >= 7) {
        formattedPhoneNumber = "(" + phoneNumber.substr(0, 3) + ") " + sliceNumber.substr(0, 3) + " " + sliceNumber.slice(3);
      } else {
        formattedPhoneNumber = "(" + phoneNumber.substr(0, 3) + ") " + sliceNumber;
      }
    } else {
      formattedPhoneNumber = phoneNumber;
    }

    return formattedPhoneNumber;
  }

  render() {
    return (
      <Image source={require('../img/genericBackground.png')} style={styles.container}>
        <ScrollView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.header}>
            Enter Phone Number
          </Text>
          <View style={styles.mainTextView}>
            <Text style={styles.mainText}>
              Enter the number where you want your verification code sent
            </Text>
          </View>
          <View style={styles.optionsText}>
            <View style={styles.showPhoneView}>
              {this.showPhoneText()}
            </View>
            <View style={styles.deletePhone}>
              <TouchableOpacity onPress={this.pressDelete}>
                {this.showDeleteBtn()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInput}>
              {this.showPhoneInput()}
            </Text>
          </View>
          {this.state.numberSet.map(function(set, index) {
            return <View key={index} style={styles.numberPad}>
              {set.map(function(number, index) {
                return <NumberKey key={index} number={number} parentMethod={this.setPhoneField} />
              }, this)}
          </View>
          }, this)}
          {this.showContinueBtn()}
        </ScrollView>
      </Image>
    );
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
  header: {
    width: '100%',
    height: 64,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    color: '#fff',
    backgroundColor: '#4a90e2'
  },
  mainTextView: {
    alignItems: 'center'
  },
  mainText: {
    color: '#595959',
    width: '80%',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 28,
    marginBottom: 30,
    lineHeight: 20,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  optionsText: {
    flexDirection: 'row',
    marginTop: 15
  },
  showPhoneView: {
    borderWidth: 0,
    width: '50%',
    paddingLeft: 40
  },
  showPhoneText: {
    color: '#AFAFAF',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 12
  },
  deletePhone: {
    borderWidth: 0,
    width: '50%',
    height: 18,
    alignItems: 'flex-end',
    paddingRight: 40
  },
  textInputView: {
    alignSelf: 'center',
    borderWidth: 0,
    width: '80%',
    borderColor: '#4a90e2',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    marginBottom: 23
  },
  textInput: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 7,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  placerHolderText: {
    color: '#AFAFAF'
  },
  phoneNumberText: {
    color: '#595959'
  },
  numberPad: {
    flexDirection: 'row'
  },
  buttonView: {
    borderWidth: 0,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 35
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#4a90e2',
    padding: 18,
    width: '80%'
  }
});
