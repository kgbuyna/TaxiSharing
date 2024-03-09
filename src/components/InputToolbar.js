/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Image, View } from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from "react-native-gifted-chat";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SendIcon from "../../assets/sendIcon.svg";

export const renderInputToolbar = (props) => (
  // <InputToolbar
  // render={null}
  // {...props}
  // containerStyle={{
  //   backgroundColor: "#fafafa",
  //   borderTopWidth: 0,
  //   marginBottom: hp("1%"),
  // }}
  // />
  <></>
);

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <Image
        style={{ width: 32, height: 32 }}
        source={{
          uri: "https://placeimg.com/32/32/any",
        }}
      />
    )}
    options={{
      "Choose From Library": () => {
        console.log("Choose From Library");
      },
      Cancel: () => {
        console.log("Cancel");
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => {
  return (
    <Composer
      {...props}
      textInputStyle={{
        backgroundColor: "#ffffff",
        paddingLeft: wp("8%"),
        paddingBottom: hp("2.5%"),
        borderRadius: 15,
        marginLeft: wp("5%"),
        marginRight: wp("2%"),
      }}
    />
  );
};

export const renderSend = (props) => (
  <Send {...props}>
    <View
      style={{
        height: hp("8%"),
        width: hp("8%"),
        backgroundColor: "#FFC700",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15",
      }}
    >
      <View
        style={{
          height: hp("3.9%"),
          width: hp("3.9%"),
        }}
      >
        <SendIcon height="100%" width="100%" />
      </View>
    </View>
  </Send>
);
