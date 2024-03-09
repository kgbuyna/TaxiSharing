import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import chatIcon
import Icon from "../../assets/chatIcon.svg";
import Icon1 from "../../assets/chatIcon(1).svg";
const ChatButton = ({ unreadMsg }) => {
  return (
    <>
      {unreadMsg ? (
        <Icon1 height="100%" width="100%" />
      ) : (
        // <></>
        <Icon height="100%" width="100%" />
      )}
    </>
  );
};

export default ChatButton;

const styles = StyleSheet.create({});
