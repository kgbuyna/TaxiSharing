import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Find from "../../assets/find.svg";
//  setting svg color here color is

const FindPartnerButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          // flexDirection: "column",
          flex: 1, 
          width: wp("53%"),
          height: hp("6.5%"),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderWidth: 1,
          borderRadius: "20%",
          borderColor: "#FFC700",
        },
        style,
      ]}
    >
      {/* <View> */}
        <Find height={hp("10%")} width={wp("10%")}/>
      {/* </View> */}
      {/* giving  */}
    </TouchableOpacity>
  );
};

export default FindPartnerButton;

const styles = StyleSheet.create({});
