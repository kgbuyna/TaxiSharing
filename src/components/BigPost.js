import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
  } from "react-native";

import React from "react";
import CallIcon from "../../assets/callIcon.svg";
import { primaryColor, secondaryColor } from "../../theme.js";
import SendIcon from "../../assets/send.svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
const BigPost = () => {
  return (
    <View style={styles.container}>
      <Text style={[{ fontSize: hp("3%") }]}>99****16</Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: hp("1%"),
          justifyContent: "space-evenly",
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>~0.5км</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { color: secondaryColor }]}>~0.5км</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", top: "6%", marginHorizontal: wp("9%") }}
      >
        <TouchableOpacity
          style={{
            width: wp("15%"),
            height: hp("5%"),
          }}
          onPress={() => {}}
        >
          <CallIcon height="100%" width="100%" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp("15%"),
            height: hp("5%"),
          }}
          onPress={() => {}}
        >
          <SendIcon height="100%" width="100%" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BigPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#FFC700",
    // marginHorizontal: wp("4%"),
    borderRadius: 25,
    width: wp("38.5%"),
    height: hp("19%"),
    justifyContent: "center",
    alignItems: "center",
  },
  // text style
  textContainer: {
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#F6F6F6",
    width: wp("13%"),
    height: hp("4%"),
    justifyContent: "center",
    marginHorizontal: wp("1%"),
    borderColor: "#E8E8E8",
  },
  text: {
    fontSize: hp("2%"),
    color: primaryColor,
  },
});
