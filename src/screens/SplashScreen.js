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
  const URL = Constants.expoConfig.extra.URL;
  // const apiKey = Constants.expoConfig.extra.API_KEY;
  console.log('apiKey');
  console.log(apiKey);
  console.log('URL');
  console.log(URL);
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
      let location = await Location.getCurrentPositionAsync().then((res) => {
        const { latitude, longitude } = res.coords;
        console.log('object');
        console.log(res.coords)
        dispatch(
          updateLocation({
            latitude: latitude,
            longitude: longitude,
          })
        );
        console.log('i do not know');
        console.log('HEHEH');
        axios.get(`http://${URL}/api/v1/place/name`, {
          params: {
            coordinate: `${latitude}, ${longitude}`,
          }
        }).then((response) => {
          console.log(response.data);
          dispatch(updateLocation({ name: response.data.places[0].name, places: response.data.places, place_id: response.data.places[0].id}));
          navigation.navigate("Start");
        }
        ).catch((error) => {
          console.error("Error fetching geocoding data:", error);
        }
        );
      });


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
