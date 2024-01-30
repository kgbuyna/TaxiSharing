// Button.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const Button = ({ onPress, title, active }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFC700',
    height: hp("8%"),
    width: wp("71%"),
    justifyContent: 'center',
    // padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
