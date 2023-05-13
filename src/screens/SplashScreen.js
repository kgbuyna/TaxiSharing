import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export default function SplashScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    async function getLocationAsync() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync().then((res) => {
        const { latitude, longitude } = res.coords;
        // const locations = [{latitude: latitude, longitude: longitude , identifier:'origin'}];
        // navigation.navigate('Home', { locations });
        const current = {
          latitude: latitude,
          longitude: longitude,
          identifier: "origin",
        };
        navigation.navigate("Home", { current });
      });
      setLocation(location);
    }

    getLocationAsync()
      .then(() => {})
      .catch((err) => {});
  }, [location]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
}
