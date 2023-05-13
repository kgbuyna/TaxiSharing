import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import HeaderBar from "../components/HeaderBar";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const mapViewWidth = screenWidth;
const mapViewHeight = screenHeight * 0.55;

export default function PostScreen({ navigation, route }) {
  const mapRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState([]);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [initialRegion, setInitialRegion] = useState({});

  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const setMapMidPoint = (location) => {
    // if (location.length === 1)
    setRegion(location[0]);
    setInitialRegion(location[0]);
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }));
  };

  useEffect(() => {
    setLocation(route.params.locations);
    setMapMidPoint(route.params.locations);
    setPolylineCoordinates(route.params.polylineCoordinates);
  }, [route.params.locations]);

  return (
    <View style={styles.container}>
      <HeaderBar>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", { locations: location })}
        >
          <AntDesign name="arrowleft" size={26} color="white" />
        </TouchableOpacity>
      </HeaderBar>
      <TouchableOpacity
        style={{ width: 100, height: 100, backgroundColor: "#800080" }}
        onPress={() => setShowTimePicker(!showTimePicker)}
      ></TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedTime) => {
            setTime(selectedTime || time);
          }}
        />
      )}
      <MapView
        // ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        // onMapReady={onMapReady}
        key={JSON.stringify(location)}
        onRegionChange={(region) => {
          console.log(region);
          setInitialRegion(region);
        }}
        onRegionChangeComplete={(region) => {
          // Энд болохоор polylineCoordinates эндээс эхээ авах ёстой болно. Тэгээд энэ цэгээ буцаагаад homeScreen рүү гээ явуулах ёстой юм болов уу? За юу ч гэсэн постоо оруулахад бэлэн болгох.
          // Асуулт байгаа нь болохоор энэ сонгосон байрлалаа ямар хувьсагчид хийх вэ? Ингэхээр баахан хувьсагч болж байгаа болохоор бараг миний бодлоор бүгдийг нь тус тусад нь нэг хувьсагч болгоод хийх хэрэгтэй юм шиг мэдрэмж төрөөд байгаа юм. Тэгж байж илүү ойлгомжтой болж байгаа юм. 
          console.log("complete");
        }}
      >
        <Marker
          coordinate={initialRegion}
          key={initialRegion.longitude}
          identifier={"region"}
          pinColor={"#FFFF00"}
        />
        {location.map((loc, index) => {
          // if (index !== 0)
          return (
            <Marker
              coordinate={loc}
              key={loc.longitude}
              identifier={loc.identifier}
            />
          );
        })}
        {polylineCoordinates ? (
          <Polyline
            coordinates={polylineCoordinates}
            strokeWidth={5}
            strokeDashPattern={[10, 5]}
            icons={[
              {
                icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                offset: "0",
                repeat: "20px",
              },
            ]}
          />
        ) : (
          <></>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  map: {
    width: mapViewWidth,
    height: mapViewHeight,
  },
});
