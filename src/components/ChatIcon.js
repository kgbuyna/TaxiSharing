import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import chatIcon
import Icon from "../../assets/chatIcon.svg";
import Icon1 from "../../assets/chatIcon(1).svg";
const ChatIcon = ({ unreadMsg }) => {
  return (
    <>
      {unreadMsg ? (
        <Icon1 height={hp("20%")} width={wp("25%")} style={{}} />
      ) : (
        // <></>
        <Icon height={hp("20%")} width={wp("25%")} style={{}} />
      )}
    </>
    // <View style={{ backgroundColor: "#11AABE", width: wp("13%"), height: hp("6%") }}>
    //   <Text>MessengerIcon</Text>
    // </View>
  );
};

export default ChatIcon;

const styles = StyleSheet.create({});
