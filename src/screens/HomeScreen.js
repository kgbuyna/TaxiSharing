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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
import { selectDestinationLocation } from "../../slices/destinationLocationSlice";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";

import FindPartnerButton from "../components/FindPartnerButton";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const mapViewWidth = screenWidth;
const mapViewHeight = screenHeight;
export default function HomeScreen({ route, navigation }) {
  const destinationLocation = useSelector(selectDestinationLocation);
  const currentLocation = useSelector(selectCurrentLocation);

  const [polylineCoordinates, setPolylineCoordinates] = useState();
  const [walkingPolylineCoordinates, setWalkingPolylineCoordinates] = useState(
    []
  );
  const mapRef = useRef(null);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // mapRef.current.fitToSuppliedMarkers(markerNames, {
    //   edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    // });
  }, []);

  useEffect(() => {
    setCount(count + 1);
  }, [route.params]);
  //
  const onMapReady = () => {
    console.log("onMapReady");
    // if (route.params.base) {
    //   const walkRouteCoordinates = {
    //     origin: {
    //       latitude: currentLocation.latitude,
    //       longitude: currentLocation.longitude,
    //     },
    //     destination: {
    //       latitude: destinationLocation.latitude,
    //       longitude: destinationLocation.longitude,
    //     },
    //   };
    //   const routeCoordinates = {
    //     origin: {
    //       latitude: currentLocation.latitude,
    //       longitude: currentLocation.longitude,
    //     },
    //     destination: {
    //       latitude: destinationLocation.latitude,
    //       longitude: destinationLocation.longitude,
    //     },
    //   };
    //   try {
    //     computeRoutes(walkRouteCoordinates).then((encodedPolyline) => {
    //       const polylineCoordinates = polyline
    //         .decode(encodedPolyline)
    //         .map((point) => {
    //           return {
    //             latitude: point[0],
    //             longitude: point[1],
    //           };
    //         });
    //       setWalkingPolylineCoordinates(polylineCoordinates);
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   try {
    //     computeRoutes(routeCoordinates).then((encodedPolyline) => {
    //       const polylineCoordinates = polyline
    //         .decode(encodedPolyline)
    //         .map((point) => {
    //           return {
    //             latitude: point[0],
    //             longitude: point[1],
    //           };
    //         });
    //       setPolylineCoordinates(polylineCoordinates);
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    if (destinationLocation) {
      const markerNames = [
        currentLocation.identifier,
        destinationLocation.identifier,
      ];
      console.log(markerNames);
      mapRef.current.fitToSuppliedMarkers(markerNames, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
      const routeCoordinates = {
        origin: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        destination: {
          latitude: destinationLocation.latitude,
          longitude: destinationLocation.longitude,
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
          // setDestination(route.params.destination);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation}
        onMapReady={onMapReady}
        key={count}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            key={currentLocation.longitude}
            identifier={currentLocation.identifier}
          />
        )}
        {destinationLocation && (
          <Marker
            coordinate={destinationLocation}
            key={destinationLocation.longitude}
            identifier={destinationLocation.identifier}
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
        {/* {walkingPolylineCoordinates ? (
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
        )} */}
      </MapView>

      <FindPartnerButton
        style={{ position: "absolute", zIndex: 100, top: hp("48%"), left: wp("23%")}}
      />
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
          bottom: hp("22%"),
          left: 0,
        }}
      >
        {/* <View
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            width: 10,
            height: 100,
            backgroundColor: "#E5E5E5",
          }}
        ></View> */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <TopDot height={15} width={15} style={{ maiginRight: 10 }} /> */}
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
          {/* <BotDot height={15} width={15} style={{ marginRight: 10 }} /> */}
          <SearchBar
            placeholder={destinationLocation.name}
            placeholderStyle={{ color: "#FFC700" }}
            style={{
              width: screenWidth * 0.82,
              height: screenHeight * 0.08,
            }}
            screen={"Home"}
          />
        </View>
      </View>
      <PostList style={{position:'absolute', zIndex:1010, bottom:0, left: 0}}></PostList>
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
    height: mapViewHeight*0.6,
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
