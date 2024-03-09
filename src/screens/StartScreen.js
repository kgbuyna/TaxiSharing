import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ChatButton from "../components/ChatButton";

import Icon1 from "../../assets/chatIcon(1).svg";
import ChatIcon from "../../assets/chatIcon.svg";
import ProfileIcon from "../../assets/profile.svg";
import ChatIcon1 from "../../assets/chatIcon(1).svg";
import { useSelector } from "react-redux";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";
import ProfileButton from "../components/ProfileButton";
import PostList from "../components/PostList";

const StartScreen = ({ navigation }) => {
  const currentLocation = useSelector(selectCurrentLocation);
  console.log(currentLocation);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          position: "absolute",
          left: wp("0%"),
          bottom: hp("14.8%"),
          width: wp("100%"),
          height: hp("6%"),
          zIndex: 16,
          borderRadius: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: wp("7%"),
        }}
      >
        <TouchableOpacity style={styles.button}>
          <ProfileIcon height="100%" width="100%" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              padding: wp("1%"),
            },
          ]}
          onPress={() => navigation.navigate("Chat")}
        >
          <ChatIcon height="100%" width="100%" />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={currentLocation}
      >
        <Marker
          coordinate={currentLocation}
          key={currentLocation.longitude}
          identifier={currentLocation.identifier}
        />
      </MapView>
      <View style={styles.subContainer}>
        <SearchBar
          placeholder={"Хүрэх газар"}
          icon={"search"}
          screen={"Start"}
          placeholderStyle={{ color: "#11AABE" }}
          style={{
            width: wp("82%"),
            height: hp("8%"),
          }}
        />
      </View>
      <PostList
        style={{ position: "absolute", zIndex: 1010, bottom: 0, left: 0 }}
        // currentLocation={currentLocation}
        // destinationLocation={destinationLocation}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    width: wp("14%"),
    height: hp("6%"),
    padding: wp("2%"),
    backgroundColor: "#11AABE",
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "center",
    justifyContent: "space-around",
    height: hp("14%"),
    borderTopRightRadius: "45%",
    borderTopLeftRadius: "45%",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 0,
  },
  map: {
    width: wp("100%"),
    height: hp("100%"),
  },
});

export default StartScreen;
