import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
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
import CancelIcon from "../../assets/decline.svg";
import AcceptIcon from "../../assets/accept.svg";
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
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          ...styles.mapContainer,
          borderBottomLeftRadius: props.currentMessage.user._id === 2 ? 15 : 15,
          borderBottomRightRadius:
            props.currentMessage.user._id === 2 ? 15 : 15,
        }}
        onPress={() => {}}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              height: wp("6%"),
              fontSize: 16,

              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              color: "#f5f5f5",
            }}
          >
            Цуг таксидах уу?
          </Text>
        </View>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map}></MapView>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.button,
              {
                backgroundColor: "#ffffff",
                borderBottomLeftRadius: 15,
                alignItems: "center",
              },
            ]}
          >
            {/* <View style={{ width: "50%" }}> */}
              <CancelIcon width={"80%"} height={"80%"} />
            {/* </View> */}

            {/* <Text style={{ color: "white", textAlign: "center" }}>Тийм</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.button,
              {
                alignItems: "center",
              },
            ]}
          >
            {/* <View style={{ width: "50%" }}> */}
              <AcceptIcon width={"80%"} height={"80%"} />
            {/* </View> */}
            {/* <Text style={{ color: "white", textAlign: "center" }}>Үгүй</Text> */}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <Bubble
      {...props}
      textStyle={{
        left: { color: "#ffffff" },
        right: { color: "#ffffff" },
      }}
      wrapperStyle={{
        left: { backgroundColor: "#FAFAFA", borderRadius: 15 },
        right: { backgroundColor: "#FAFAFA", borderRadius: 15 },
      }}
    />
  );
};

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
  mapContainer: {
    // flex: 1,
    width: wp("84%"),
    backgroundColor: "#11AABE",

    height: hp("33%"),
    // maxWidth: 300,
    // marginVertical: 2,
    borderRadius: 15,
  },
});
