import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import Clock from "../components/Clock";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { computeRoutes } from "../api/requests";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const mapViewWidth = screenWidth;
const mapViewHeight = screenHeight * 0.55;

export default function PostScreen({ navigation, route }) {
  const mapRef = useRef(null);
  // route params base этр гэхгүйгээр тэр redux-г ашиглавал ямар вэ л гэж бодож байна даа. Тэгэхгүй бол хаана юу болоод байгаа нь аягүй ойлгомжгүй байна уу даа.
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [initialRegion, setInitialRegion] = useState({});
  const [polylineCoordinates, setPolylineCoordinates] = useState(
    route.params.polylineCoordinates
  );
  const [base, setBase] = useState();
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    setRegion({
      ...route.params.current,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
    setInitialRegion(route.params.current);
    setBase(route.params.current);
    // setPolylineCoordinates(route.params.polylineCoordinates);
  }, []);

  return (
    <View style={styles.container}>
      {/* <HeaderBar>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", route.params)}
        >
          <AntDesign name="arrowleft" size={26} color="white" />
        </TouchableOpacity>
      </HeaderBar> */}

      <Clock hour={hour} min={min} setHour={setHour} setMin={setMin} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        key={JSON.stringify(route.params.destination)}
        onRegionChange={
          ((region) => {
            setInitialRegion(region);
          },
          false)
        }
        onRegionChangeComplete={(region) => {
          region["identifier"] = "base";
          setBase(region);
          const routeCoordinates = {
            origin: {
              latitude: region.latitude,
              longitude: region.longitude,
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
              route.params["polylineCoordinates"] = polylineCoordinates;
              setBase(region);
            });
          } catch (error) {
            console.log(error);
          }
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
            key={route.params.current.latitude}
            identifier={route.params.current.identifier}
            pinColor={"#FF00"}
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
                repeat: 20,
              },
            ]}
          />
        ) : (
          <></>
        )}

        <View style={styles.marker} />
      </MapView>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", route.params)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            axios
              .post("http://192.168.1.13:3000/api/v1/posts/", {
                location: {
                  latitude: base.latitude,
                  longitude: base.longitude,
                },
                time: {
                  hour: hour,
                  minute: min,
                },
              })
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
            navigation.navigate("Home", { ...route.params, ...{ base: base } });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
  marker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -25,
    marginTop: -25,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});
