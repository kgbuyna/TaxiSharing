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
// Одоо юу хийх вэ гэвэл хэрэглэгчээр нэвтэрч ороод пост бичдэг болох. Өөрийнх нь id этр нь хаана хадгалагддаг байх юм этр гээд бас асуудал бий бий. Хаанаас нь яаж эхлэх вэ? 
export default function HomeScreen({ route, navigation }) {
  const [polylineCoordinates, setPolylineCoordinates] = useState();
  const [walkingPolylineCoordinates, setWalkingPolylineCoordinates] = useState(
    []
  );

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
    // {
    //   id: "1",
    //   time: "10:30",
    //   address: "3, 4-р хорооллын эцэс",
    //   groupSize: 5,
    // },
    // {
    //   id: "2",
    //   time: "11:30",
    //   address: "Өргөө кино театр",
    //   groupSize: 9,
    // },
    // {
    //   id: "3",
    //   time: "10:35",
    //   address: "Улаанбаатар их дэлгүүр",
    //   groupSize: 12,
    // },
    // {
    //   id: "4",
    //   time: "12:30",
    //   address: "Улсын их дэлгүүр",
    //   groupSize: 16,
    // },
    // {
    //   id: "5",
    //   time: "16:30",
    //   address: "Чингисийн талбай",
    //   groupSize: 22,
    // },
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
  const [destination, setDestination] = useState(null);
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  // Энэ хэрэгтэй шүү.
  useEffect(()=>{
    setCount(count + 1); 
  }, [route.params])
  //
  const onMapReady = () => {
    console.log('onMapReady')
    // base рүү гээ алхаж очих ёстой. Тэгээд base-сээ destination рүү гээ машинаар явахаар тооцоолох. 
    if (route.params.base) {
      console.log(route.params.base)
      const data_base = {
        origin: {
          location: {
            latLng: {
              latitude: route.params.current.latitude,
              longitude: route.params.current.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: route.params.base.latitude,
              longitude: route.params.base.longitude,
            },
          },
        },
        // Ядаж пост бичих гээд орход тэр marker нь үсэрдэг байвал ямар вэ?        
        travelMode: "WALK",
        languageCode: "en-US",
        units: "IMPERIAL"
        // RoutingPreference:"TRAFFIC_AWARE",
      };
      // Одоо нөгөө постоо харагдуулах тал дээр анхаарах ёстой гэж бодож байна. Save гээд дарахад хадгалагддаг байх хэрэгтэй шүү дээ. Тэгээд өөр хэрэглэгч ороод нэгдэх гээд дардаг байх хэрэгтэй гэж бодож байна. Цаг сонгодог цэвэрхэн апп хайх хэрэгтэй бололтой. 
      const data_destination = {
        origin: {
          location: {
            latLng: {
              latitude: route.params.base.latitude,
              longitude: route.params.base.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: route.params.destination.latitude,
              longitude: route.params.destination.longitude,
            },
          },
        },
        travelMode: "DRIVE",
        languageCode: "en-US",
        units: "IMPERIAL"
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
          data_destination,
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
      axios
        .post(
          "https://routes.googleapis.com/directions/v2:computeRoutes",
          data_base,
          config
        )
        .then((response) => {
          console.log('sda')
          setWalkingPolylineCoordinates(
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
          
          console.log('sdaaa')
          console.log(error);
        });
    } else if (route.params.destination) {
      
      const markerNames = [
        route.params.current.identifier, 
        route.params.destination.identifier,
      ];
      mapRef.current.fitToSuppliedMarkers(markerNames, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
      const data = {
        origin: {
          location: {
            latLng: {
              latitude: route.params.current.latitude,
              longitude: route.params.current.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: route.params.destination.latitude,
              longitude: route.params.destination.longitude,
            },
          },
        },
        travelMode: "DRIVE",
        languageCode: "en-US",
        units: "IMPERIAL"
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
        setDestination(route.params.destination);
    }
  };
  useEffect(() => {
    setRegion({
      ...route.params.current,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [route.params]); 
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* <HeaderBar> 
        <Image source={require("../../assets/user-1.jpg")} style={styles.image} />
        <Ionicons name="chatbubble-outline" size={24} color="#ffffff"/>
      </HeaderBar> */}
      <SearchBar
        navigation={navigation}
        props = {route.params}
        searchText={route.params.destinationName}
      />
      
      
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onMapReady={onMapReady}
        key={
          count
        }
      >
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
        {route.params.base && (
          <Marker
            coordinate={route.params.base}
            key={route.params.base.longitude}
            identifier={route.params.base.identifier}
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
        {walkingPolylineCoordinates ? (
          <Polyline
            coordinates={walkingPolylineCoordinates}
            strokeWidth={5}
            strokeColor="pink"
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
          {month}-р сарын {day} {weekday} гараг
        </Text>
        <TouchableOpacity
          onPress={() => {
            route.params['polylineCoordinates'] = polylineCoordinates
            navigation.navigate("Post", route.params);
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
          <Text>Нэмэх</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
