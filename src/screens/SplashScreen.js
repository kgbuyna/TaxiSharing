import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { updateLocation } from "../../slices/currentLocationSlice";
export default function SplashScreen() {
  const dispatch = useDispatch();
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

      const current = {
        latitude: 47.920764148238305,
        longitude: 106.90519639660427,
        identifier: "origin",
      };
      dispatch(updateLocation(current));
      navigation.navigate("Origin");
      // let location = await Location.getCurrentPositionAsync().then((res) => {
      //   const { latitude, longitude } = res.coords;
      //   console.log(res.coords)
      //   const current = {
      //     latitude: latitude,
      //     longitude: longitude,
      //     identifier: "origin",
      //   };
      //   navigation.navigate("Home", { current });
      // });
    }

    getLocationAsync()
      .then(() => {})
      .catch((err) => {});
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
}
