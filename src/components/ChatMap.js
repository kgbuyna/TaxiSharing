import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CancelIcon from "../../assets/decline.svg";
import AcceptIcon from "../../assets/accept.svg";

import polyline from "@mapbox/polyline";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";
import { selectDestinationLocation } from "../../slices/destinationLocationSlice";

import {
  addMessage,
  editMessage,
  selectEditableMapRes,
} from "../../slices/messageSlice";
const ChatMap = ({ currentMessage }) => {
  const polylineCoordinates = useRef(
    "_wncH}rnkSt@~MPfC?f@RXc@r@k@h@qD|BiBxAoAxAgA|AsBtDy@|AoAtBlChNnDdQ`AbE^jCFzAt@dq@wAHAa@@fAAdCJpIGPMHc@DFhI_HVJrGPnSVdOFlEFbAJ^b@l@x@d@fDxAbAh@"
  );

  const dispatch = useDispatch();

  const editableMapRes = useSelector(selectEditableMapRes);
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 47.92268381096039,
    longitude: 106.90468287847565,
    identifier: "current",
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 47.922872013102065,
    longitude: 106.86612361680845,
    identifier: "dest",
  });
  const [mateLocation, setMateLocation] = useState({
    latitude: 47.92107853360261,
    longitude: 106.90457076138696,
    identifier: "mateLoc",
  });
  const [mateDestination, setMateDestination] = useState({
    latitude: 47.923306196218256,
    longitude: 106.88041519891232,
    encodedPolyline: null,
    identifier: "mateDestLoc",
  });
  const [soloTaxiCoordinates, setSoloTaxiCoordinates] = useState([]);
  const [taxiCoordinates, setTaxiCoordinates] = useState([]);
  const [groupTaxiCoordinates, setGroupTaxiCoordinates] = useState([]);
  const [dMinIndex, setDMinIndex] = useState(0);
  const [soloTaxi, setSoloTaxi] = useState([]);
  const [groupTaxi, setGroupTaxi] = useState([]);
  const [accept, useAccept] = useState(null);
  const translateXCancel = useRef(new Animated.Value(0)).current;
  const translateXCancelIcon = useRef(new Animated.Value(0)).current;

  const translateXAccept = useRef(new Animated.Value(0)).current;
  const translateXAcceptIcon = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const  = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;getDistance
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  const handleCancel = () => {
    if (editableMapRes && (accept || accept === null)) {
      const animationDuration = 500;
      const translateXValue = 0.25 * wp("84%");
      const translateXIconValue = 0.125 * wp("84%");

      Animated.parallel([
        Animated.timing(translateXCancel, {
          toValue: translateXValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateXCancelIcon, {
          toValue: translateXIconValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAccept, {
          toValue: translateXValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAcceptIcon, {
          toValue: translateXIconValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
      dispatch(
        editMessage({
          _id: "map",
          text: "Уучлаарай боломжгүй болчихлоо.",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Nativ",
          },
        })
      );
      useAccept(false);
    }
  };
  const handleAccept = () => {
    if (editableMapRes && (accept == null || accept == false)) {
      const animationDuration = 500;
      const translateXValue = -0.25 * wp("84%");
      const translateXIconValue = -0.125 * wp("84%");

      Animated.parallel([
        Animated.timing(translateXAccept, {
          toValue: translateXValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAcceptIcon, {
          toValue: translateXIconValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateXCancelIcon, {
          toValue: translateXIconValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateXCancel, {
          toValue: translateXValue,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
      dispatch(
        editMessage({
          _id: "map",
          text: "Зөвшөөрч байна.",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Nativ",
          },
        })
      );

      useAccept(true);
    }
  };

  useEffect(() => {
    if (groupTaxiCoordinates.length == 0) {
      let d;
      let dMin = 1000;
      let dMinIndex = 0;
      const taxiCoordinates = polyline
        .decode(polylineCoordinates.current)
        .map((point, index) => {
          d = getDistance(
            point[0],
            point[1],
            mateDestination.latitude,
            mateDestination.longitude
          );
          console.log(d);
          if (d < 0.1 && Math.min(d, dMin)) {
            dMin = d;
            dMinIndex = index;
          }
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
      setTaxiCoordinates(taxiCoordinates);
      setGroupTaxiCoordinates(taxiCoordinates.slice(0, dMinIndex));
      setSoloTaxiCoordinates(taxiCoordinates.slice(dMinIndex - 1));
    }
  }, []);

  useEffect(() => {
    const markerNames = ["mateLoc", "mateDestLoc", "current", "dest"];
    mapRef.current.fitToSuppliedMarkers(markerNames, {
      edgePadding: {
        top: hp("1%"),
        right: wp("1%"),
        bottom: hp("1%"),
        left: wp("1%"),
      },
    });
  }, [soloTaxiCoordinates]);
  return (
    <View
      activeOpacity={1}
      style={{
        ...styles.container,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 10,
          marginRight: 10,
          color: "#f5f5f5",
        }}
      >
        Цуг таксидах уу?
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={currentLocation}
        >
          {currentLocation.latitude && (
            <Marker
              coordinate={currentLocation}
              key={currentLocation.longitude}
              identifier={currentLocation.identifier}
            />
          )}
          {destinationLocation.latitude && (
            <Marker
              coordinate={destinationLocation}
              key={destinationLocation.longitude}
              identifier={destinationLocation.identifier}
            />
          )}
          {groupTaxiCoordinates.length > 0 && (
            <Marker
              coordinate={groupTaxiCoordinates[0]}
              key={groupTaxiCoordinates[0]}
              identifier={"Meeting"}
            >
              <Image
                source={require("../../assets/meeting.png")}
                style={{ width: 25, height: 25 }}
              />
            </Marker>
          )}
          {mateLocation.latitude && (
            <Marker
              coordinate={mateLocation}
              key={mateLocation.longitude}
              identifier={mateLocation.identifier}
              opacity={0.9}
              pinColor={"#00ffff"}
            />
          )}
          {mateDestination.latitude && (
            <Marker
              title="mateDestination"
              coordinate={mateDestination}
              key={mateDestination.longitude}
              identifier={mateLocation.identifier}
              opacity={0.9}
              pinColor={"#00ffff"}
              style={{ zIndex: 1000 }}
            />
          )}
          {soloTaxiCoordinates.length > 1 && (
            <Marker
              tracksViewChanges={false}
              coordinate={
                soloTaxiCoordinates[Math.ceil(soloTaxiCoordinates.length / 2)]
              }
            >
              <View style={styles.textContainer}>
                <Text style={styles.text}>19.3km</Text>
              </View>
            </Marker>
          )}
          {soloTaxiCoordinates.length > 0 && (
            <Polyline
              coordinates={soloTaxiCoordinates}
              strokeWidth={6}
              strokeColor={"#ffa000"}
              icons={[
                {
                  icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                  offset: "0",
                  repeat: 20,
                },
              ]}
            />
          )}
          {groupTaxiCoordinates.length > 0 && (
            <Polyline
              coordinates={groupTaxiCoordinates}
              strokeWidth={6}
              strokeColor={"#11AABE"}
              icons={[
                {
                  icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
                  offset: "0",
                  repeat: 20,
                },
              ]}
            />
          )}
          {groupTaxiCoordinates.length > 1 && (
            <Marker
              tracksViewChanges={false}
              coordinate={
                groupTaxiCoordinates[Math.ceil(groupTaxiCoordinates.length / 2)]
              }
            >
              <View style={styles.textContainer}>
                <Text style={[styles.text, { color: "#11AABE" }]}>5.3km</Text>
              </View>
            </Marker>
          )}
          {/*
           */}
        </MapView>
      </TouchableOpacity>
      <Animated.View
        style={{
          position: "absolute",
          left: "12.5%",
          bottom: 0.25 * hp("5.3%"),
          zIndex: 1,
          width: 0.25 * wp("84%"),
          height: 0.5 * hp("5.3%"),
          transform: [{ translateX: translateXCancelIcon }],
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={handleCancel}>
          <CancelIcon width={"100%"} height={"100%"} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          left: "62.5%",
          bottom: 0.25 * hp("5.3%"),
          zIndex: 1,
          width: 0.25 * wp("84%"),
          height: 0.5 * hp("5.3%"),
          transform: [{ translateX: translateXAcceptIcon }],
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={handleAccept}>
          <AcceptIcon width={"100%"} height={"100%"} />
        </TouchableOpacity>
      </Animated.View>

      <View style={{ flexDirection: "row", height: hp("5.3%") }}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              position: "absolute",
              left: -0.25 * wp("84%"),
              width: 0.75 * wp("84%"),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderBottomLeftRadius: 15,
              transform: [{ translateX: translateXCancel }],
            },
          ]}
          onPress={handleCancel}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              position: "absolute",
              left: 0.5 * wp("84%"),
              width: 0.75 * wp("84%"),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#11AABE",
              transform: [{ translateX: translateXAccept }],
            },
          ]}
          onPress={handleAccept}
        />
      </View>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <MapView style={{ width: "90%", height: "50%" }}></MapView>
        </View>
      </Modal> */}
    </View>
  );
};

export default ChatMap;

const styles = StyleSheet.create({
  container: {
    width: wp("84%"),
    backgroundColor: "#11AABE",
    overflow: "hidden",
    borderRadius: 15,
  },
  map: {
    width: "100%",
    height: hp("24%"),
  },
  button: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
  },

  textContainer: {
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#F6F6F6",
    width: wp("7%"),
    height: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    borderColor: "#E8E8E8",
  },

  text: {
    fontSize: 8,
    color: "#FFC700",
  },
});
