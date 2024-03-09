import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// flatlist

const MessengerScreen = ({ route, navigation }) => {
  //
  const [suggestions, setSuggestions] = useState([
    {
      phone: "99243596",
      unreadMsg: 0,
      Timestamp: "12:00",
      seen: true,
      Content: "За одоо гарлаа",
      Status: "Delivered",
    },
    {
      phone: "99243596",
      unreadMsg: 0,
      Timestamp: "12:00",
      seen: true,
      Content: "За одоо гарлаа",
      Status: "Seen",
    },
    {
      phone: "99243596",
      unreadMsgCnt: 123,
      Timestamp: "12:00",
      seen: true,
      Content: "Удахгүй ээ",
      Status: "Unread",
    },
  ]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        axios
          .get()
          .then((response) => {
            navigation.navigate("Chat");
          })
          .catch((error) => console.error(`Geocoding error: ${error}`));
      }}
      style={{
        paddingLeft: 20,
        height: hp("10%"),
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{item.phone}</Text>
      <Text>{item.Content}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <Header
        title={"Мессенжер"}
        route={route}
        screenName={"Home"}
        fromWhere={route.params.previousScreen}
      />
      {/* flatlist */}
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(name, index) => index}
        style={{
          marginHorizontal: wp("5%"),
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    top: "50%",
    fontSize: hp("5%"),
    fontWeight: "bold",
    color: "#0D0140",
  },
  input: {
    paddingLeft: wp("6%"),
    width: wp("84%"),
    height: hp("10%"),
    // fontSize: hp("3%"),

    fontSize: hp("2.5%"),
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
  signUpLinkText: {
    color: "#FFC700",
  },
});
export default MessengerScreen;
