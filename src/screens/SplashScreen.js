import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { updateLocation } from "../../slices/currentLocationSlice";
import Constants from "expo-constants";
import axios from "axios";
export default function SplashScreen() {

  const dispatch = useDispatch();

  const apiKey = Constants.expoConfig.extra.API_KEY;
  // const [location, setLocation] = useState({latitude: ,longitude: });
  const [errorMsg, setErrorMsg] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    async function getLocationAsync() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // let location = await Location.getCurrentPositionAsync().then((res) => {
      //   const { latitude, longitude } = res.coords;
      //   console.log(res.coords)
      //   const current = {
      //     latitude: latitude,
      //     longitude: longitude,
      //     identifier: "origin",
      //   };
      // });
      const current = {
        latitude: 47.920764148238305,
        longitude: 106.90519639660427,
        identifier: "origin",
      };


      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${current.latitude},${current.longitude}&key=${apiKey}`
        )
        .then((response) => {
          console.log(response.data.results);
          dispatch(updateLocation(current));
          navigation.navigate("Start");
        })
        .catch((error) =>
          console.error("Error fetching geocoding data:", error)
        );
    }

    getLocationAsync()
      .then(() => { })
      .catch((err) => { });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
}
