import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import ChatIcon from "../../assets/chatIcon.svg";
import ProfileIcon from "../../assets/profile.svg";
import { useSelector } from "react-redux";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";

const StartScreen = ({ navigation }) => {
  
  const currentLocation = useSelector(selectCurrentLocation);
  console.log('currentLocation');
  console.log(currentLocation);
  const [openProfile, setOpenProfile] = useState(false);

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setOpenProfile(!openProfile);
          }}
        >
          <ProfileIcon height="100%" width="100%" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              padding: wp("1%"),
            },
          ]}
          onPress={() =>
            navigation.navigate("ChatList", { fromWhere: "Start" })
          }
        >
          <ChatIcon height="100%" width="100%" />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        region={currentLocation}
      >
        <Marker
          coordinate={currentLocation}
          key={currentLocation.longitude}
          identifier={currentLocation.identifier}
        />
      </MapView>
      <View style={[styles.subContainer]}>
        {openProfile ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ fontSize: hp("3.5%"), fontWeight: "bold" }}>
              Гарах
            </Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </View>
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
    // height: hp("20%"),
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    // bottom: -hp("6%"),
    left: 0,
  },
  map: {
    width: wp("100%"),
    height: hp("100%"),
  },
});

export default StartScreen;
