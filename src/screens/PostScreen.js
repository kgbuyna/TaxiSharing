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

  useEffect(() => {
    setRegion({
      ...route.params.current,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setInitialRegion(route.params.current);
    setPolylineCoordinates(route.params.polylineCoordinates);
  }, [route.params.current]);

  return (
    <View style={styles.container}>
      <HeaderBar>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", route.params)}
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
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        key={JSON.stringify(route.params.destination)}
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
        {route.params.current && (
          <Marker
            coordinate={route.params.current}
            key={route.params.current.longitude}
            identifier={route.params.current.identifier}
          />
        )}
        {route.params.destination && (
          <Marker
            coordinate={route.params.destination}
            key={route.params.destination.longitude}
            identifier={route.params.destination.identifier}
          />
        )}
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
