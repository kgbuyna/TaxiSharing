import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  Time,
} from "react-native-gifted-chat";

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatMap from "./ChatMap";
export const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{
      left: { borderWidth: 3, borderColor: "red" },
      right: { borderWidth: 3, borderColor: "red" },
    }}
    imageStyle={{
      left: { borderWidth: 3, borderColor: "blue" },
      right: { borderWidth: 3, borderColor: "red" },
    }}
  />
);

export const renderTime = (props) => {
  return (
    <View style={{ backgroundColor: "#FAFAFA" }}>
      <Time
        {...props}
        // position="right"

        // containerStyle={{
        //   left: { borderWidth: 3, borderColor: "red" },
        //   right: { borderWidth: 3, borderColor: "red" },
        // }}
        timeTextStyle={{
          left: {
            color: "#AAA6B9",
            fontSize: 10,
          },
          right: {
            color: "#AAA6B9",
            fontSize: 10,
            textAlign: "right",
          },
        }}
      />
    </View>
  );
};
export const renderBubble = (props) => {
  const { currentMessage } = props;
  if (currentMessage.map) {
    return <ChatMap />;
  }
  return (
    <Bubble
      {...props}
      textStyle={{
        left: { color: "#ffffff" },
        right: { color: "#ffffff" },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: "#FAFAFA",
          borderRadius: 15,
          marginTop: hp("1%"),
          marginBottom: hp("1%"),
        },
        right: {
          backgroundColor: "#FAFAFA",
          borderRadius: 15,
          marginTop: hp("1%"),
          marginBottom: hp("1%"),
        },
      }}
    />
  );
};

// export default RenderBubble;

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: {
        backgroundColor: "#11AABE",
        borderRadius: 15,
        borderBottomStartRadius: 0,
      },
      right: {
        borderRadius: 15,
        backgroundColor: "#11AABE",
        borderBottomEndRadius: 0,
      },
    }}
  />
);

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    width: "100%",
    height: hp("23%"),
  },
  button: {
    height: hp("5.3%"),
    width: "50%",
    justifyContent: "center",
    // borderRadius:15,
  },
});
