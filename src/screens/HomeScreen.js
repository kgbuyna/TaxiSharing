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
import Profile from "../components/Profile";
import { Asset } from "expo-asset";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import polyline from "@mapbox/polyline";
import axios from "axios";
import BotDot from "../../assets/botDot.svg";
import TopDot from "../../assets/topDot.svg";
import { computeRoutes } from "../api/requests";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const mapViewWidth = screenWidth;
const mapViewHeight = screenHeight;
export default function HomeScreen({ route, navigation }) {
  const [polylineCoordinates, setPolylineCoordinates] = useState();
  const [walkingPolylineCoordinates, setWalkingPolylineCoordinates] = useState(
    []
  );

  const mapRef = useRef(null);
  const [destination, setDestination] = useState(null);
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      console.log("timeout");
      // mapRef.current.fitToSuppliedMarkers(markerNames, {
      //   edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      // });
    }, "3000");
    axios
      .get("http://192.168.1.13:3000/api/v1/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("failed to retrieve posts");
      });
  }, []);

  useEffect(() => {
    setCount(count + 1);
  }, [route.params]);
  //
  const onMapReady = () => {
    console.log("onMapReady");
    if (route.params.base) {
      const walkRouteCoordinates = {
        origin: {
          latitude: route.params.current.latitude,
          longitude: route.params.current.longitude,
        },
        destination: {
          latitude: route.params.base.latitude,
          longitude: route.params.base.longitude,
        },
      };
      const routeCoordinates = {
        origin: {
          latitude: route.params.base.latitude,
          longitude: route.params.base.longitude,
        },
        destination: {
          latitude: route.params.destination.latitude,
          longitude: route.params.destination.longitude,
        },
      };
      try {
        computeRoutes(walkRouteCoordinates).then((encodedPolyline) => {
          const polylineCoordinates = polyline
            .decode(encodedPolyline)
            .map((point) => {
              return {
                latitude: point[0],
                longitude: point[1],
              };
            });
          setWalkingPolylineCoordinates(polylineCoordinates);
        });
      } catch (error) {
        console.log(error);
      }

      try {
        computeRoutes(routeCoordinates).then((encodedPolyline) => {
          const polylineCoordinates = polyline
            .decode(encodedPolyline)
            .map((point) => {
              return {
                latitude: point[0],
                longitude: point[1],
              };
            });
          setPolylineCoordinates(polylineCoordinates);
        });
      } catch (error) {
        console.log(error);
      }
    } else if (route.params.destination) {
      const markerNames = [
        route.params.current.identifier,
        route.params.destination.identifier,
      ];
      mapRef.current.fitToSuppliedMarkers(markerNames, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
      const routeCoordinates = {
        origin: {
          latitude: route.params.current.latitude,
          longitude: route.params.current.longitude,
        },
        destination: {
          latitude: route.params.destination.latitude,
          longitude: route.params.destination.longitude,
        },
      };
      try {
        computeRoutes(routeCoordinates).then((encodedPolyline) => {
          const polylineCoordinates = polyline
            .decode(encodedPolyline)
            .map((point) => {
              return {
                latitude: point[0],
                longitude: point[1],
              };
            });
          setPolylineCoordinates(polylineCoordinates);
          setDestination(route.params.destination);
        });
      } catch (error) {
        console.log(error);
      }
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
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onMapReady={onMapReady}
        key={count}
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
                repeat: 20,
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
                repeat: 20,
              },
            ]}
          />
        ) : (
          <></>
        )}
      </MapView>

      {/* <View style={styles.searchContainer}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Search", route.params)}}>
          <SearchBar
            navigation={navigation}
            props={route.params}
            icon={"search"}
            
            placeholder={"Хүрэх газар"}
            placeholderStyle={{color: "#FFC700"}}
            searchText={route.params.destinationName}
            style={styles.searchBar} 
          />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 10,
          justifyContent: "center",
          justifyContent: "space-around",
          height: 0.22 * screenHeight,
          borderTopRightRadius: "45%",
          borderTopLeftRadius: "45%",
          backgroundColor: "#FFFFFF",
          position: "absolute",
          zIndex: 100,
          bottom: 0,
          left: 0,
        }}
      >
        <View style={{position:'absolute', top: '25%', left:0, width:10, height: 100, backgroundColor:"#E5E5E5"}}></View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TopDot height={15} width={15} style={{ marginRight: 10 }} />
          <SearchBar
            placeholder={"Гэр"}
            placeholderStyle={{ color: "#11AABE" }}
            style={{
              width: screenWidth * 0.82,
              height: screenHeight * 0.08,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BotDot height={15} width={15} style={{ marginRight: 10 }} />
          <SearchBar
            placeholder={"Хүрэх газар"}
            placeholderStyle={{ color: "#FFC700" }}
            style={{
              width: screenWidth * 0.82,
              height: screenHeight * 0.08,
            }}
          />
        </View>
      </View>
      {/* <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            route.params["polylineCoordinates"] = polylineCoordinates;
            navigation.navigate("Post", route.params);
          }}
          style={{
            width: 60,
            height: 40,
            // borderWidth: 2,
            borderColor: "#3f3f3f",
            alignContent: "center",
            justifyContent: "center",
            borderRadius: "20%",
          }}
        >
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    position: "absolute",
    height: screenHeight * 0.14,
    width: screenWidth,
    zIndex: 100,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    // borderTop: 25,
    // borderRadius: ,
    borderTopRightRadius: "45%",
    borderTopLeftRadius: "45%",
    backgroundColor: "#FFFFFF",
  },

  searchBar: {
    width: screenWidth * 0.82,
    height: screenHeight * 0.08,
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
    // borderWidth: 1,
  },
});
// 427
