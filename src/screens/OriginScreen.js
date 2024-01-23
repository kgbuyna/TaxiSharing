import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import SearchBar from "../components/SearchBar";

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";

const OriginScreen = ({ navigation }) => {
  // useEffect(() => {
  //   navigation.pop()
  
  // }, [])
  
  const currentLocation = useSelector(selectCurrentLocation);
  return (
    <View style={styles.container}>
      <StatusBar hidden />

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
          placeholder={currentLocation.name}
          icon={"search"}
          
          screen={"Origin"}
          placeholderStyle={{ color: "#FFC700" }}
          style={{
            width: wp("82%"),
            height: hp("8%"),
          }}
        />
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
  subContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "center",
    justifyContent: "space-around",
    //   height: 0.22 * screenHeight,
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

export default OriginScreen;
