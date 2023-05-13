import { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import SearchBar from "../components/SearchBar";
import HeaderBar from "../components/HeaderBar";

import Profile from "../components/Profile";
import { Asset } from "expo-asset";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import polyline from "@mapbox/polyline";
import axios from "axios";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const mapViewWidth = screenWidth;
const mapViewHeight = screenHeight * 0.55;

// Одоо post авдаг хэсгээ хийх ёстой юм болов уу?
export default function HomeScreen({ route, navigation }) {
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  useEffect(() => {
    (async () => {
      let image = Asset.fromModule(require("../../assets/user_1.jpg"));
      await image.downloadAsync();
      setImage((prevImages) => [...prevImages, image]);
      image = Asset.fromModule(require("../../assets/user_2.jpg"));
      await image.downloadAsync();
      setImage((prevImages) => [...prevImages, image]);
      image = Asset.fromModule(require("../../assets/user_3.jpg"));
      await image.downloadAsync();
      setImage((prevImages) => [...prevImages, image]);
      setReady(true);
    })();
  }, []);

  const weekdays = [
    "Ням",
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
  ];
  const DATA = [
    {
      id: "1",
      time: "10:30",
      address: "3, 4-р хорооллын эцэс",
      groupSize: 5,
    },
    {
      id: "2",
      time: "11:30",
      address: "Өргөө кино театр",
      groupSize: 9,
    },
    {
      id: "3",
      time: "10:35",
      address: "Улаанбаатар их дэлгүүр",
      groupSize: 12,
    },
    {
      id: "4",
      time: "12:30",
      address: "Улсын их дэлгүүр",
      groupSize: 16,
    },
    {
      id: "5",
      time: "16:30",
      address: "Чингисийн талбай",
      groupSize: 22,
    },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.address}>
      <Text
        style={{ fontFamily: "Arial", fontWeight: "500", flexShrink: 1 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.address}
      </Text>
      <Text>{item.time}</Text>
      {/* <Profile images={image} /> */}
      <TouchableOpacity
        style={{
          width: "50%",
          height: "30%",
          backgroundColor: "#ffffff",
          borderColor: "#f7f8f9",
          borderWidth: 1,
          borderRadius: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <Text style={{ fontFamily: "Arial" }}>Нэгдэх</Text>
      </TouchableOpacity>
    </View>
  );
  const date = new Date();
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const mapRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [destination, setDestination] = useState(null);
  const [location, setLocation] = useState([]);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const onMapReady = () => {
    if (destination) {
      const data = {
        origin: {
          location: {
            latLng: {
              latitude: current.latitude,
              longitude: current.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        travelMode: "DRIVE",
        languageCode: "en-US",
        units: "IMPERIAL",
        // RoutingPreference:"TRAFFIC_AWARE",
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyCfoOZmSBlNKkgaXAu_kuH2R3O7r17PCyc",
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
      };
      axios
        .post(
          "https://routes.googleapis.com/directions/v2:computeRoutes",
          data,
          config
        )
        .then((response) => {
          setPolylineCoordinates(
            polyline
              .decode(response.data.routes[0].polyline.encodedPolyline)
              .map((point) => {
                return {
                  latitude: point[0],
                  longitude: point[1],
                };
              })
          );
        })
        .catch((error) => {
          console.log(error);
        });

      // const markerNames = route.params.locations.map(
      //   (location) => location.identifier
      // );
      const markerNames = [current.identifier, destination.identifier];

      mapRef.current.fitToSuppliedMarkers(markerNames, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  };

  const setMapMidPoint = (location) => {
    // if (location && location.length === 1) setRegion(location[0]);
    // setRegion(current);
    setRegion({
      ...current,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };
  useEffect(() => {
    setLocation(route.params.locations);
    setMapMidPoint(route.params.current);
  }, [route.params.locations]);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* <HeaderBar> 
        <Image source={require("../../assets/user-1.jpg")} style={styles.image} />
        <Ionicons name="chatbubble-outline" size={24} color="#ffffff"/>
      </HeaderBar> */}
      <SearchBar
        navigation={navigation}
        region={region}
        locations={location}
        searchText={route.params.destination}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onMapReady={onMapReady}
        key={JSON.stringify(location)}
      >
        {location.map((loc, index) => (
          <Marker
            coordinate={loc}
            key={loc.longitude}
            identifier={loc.identifier}
          />
        ))}
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
      <View style={{ flexDirection: "row" }}>
        <Text>
          {/* За одоо юу хийх вэ гэвэл мэдээж post screen ээ хийх шүү дээ. Тэгээд back аа хийх хэрэгтэй гэж бодож байна. */}
          {/* Тэгвэл хэдэн мин болохыг нь polyline дээрээ харуулах хэрэгтэй байх нь ээ. */}
          {month}-р сарын {day} {weekday} гараг
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Post", {
              locations: location,
              polylineCoordinates: polylineCoordinates,
            });
          }}
          style={{
            width: 60,
            height: 40,
            borderWidth: 2,
            borderColor: "#3f3f3f",
            alignContent: "center",
            justifyContent: "center",
            borderRadius: "20%",
          }}
        >
          {/* Заза ойлголоо одоо юу хийх вэ гэвэл пост оруулж болдог болгоё доо. Одоохондоо надад ямар ч data байхгүй байгаа болохоор үүнийг хийнэ гэдэг нь жоохон сонин л байна л даа. */}

          <Text>Нэмэх</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="add-circle" size={32} color="black" />
          </TouchableOpacity>
          <View style={styles.address}></View>
          <View style={styles.address}></View>
          <View style={styles.address}></View>
          <View style={styles.address}></View>
        </View> */}
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
  address: {
    padding: 10,
    backgroundColor: "#fffbf0",
    width: screenWidth * 0.36,
    height: screenHeight * 0.2,
    borderColor: "#fce9b5",
    borderWidth: 1,
  },
});
