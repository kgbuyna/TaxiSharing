import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Image,
  Text,
} from "react-native";
import colors, { primaryColor, secondaryColor } from "../../theme.js";
import io from "socket.io-client";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import SearchBar from "../components/SearchBar";
import polyline from "@mapbox/polyline";
import BotDot from "../../assets/botDot.svg";
import TopDot from "../../assets/topDot.svg";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { selectDestinationLocation } from "../../slices/destinationLocationSlice";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";
import { selectTrip } from "../../slices/tripSlice";
import { updateTrip } from "../../slices/tripSlice";
import { updateLocation as updateLocationCurrentLocation } from "../../slices/currentLocationSlice";
import { updateLocation as updateLocationDestLocation } from "../../slices/destinationLocationSlice";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function MainScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const destinationLocation = useSelector(selectDestinationLocation);
  const currentLocation = useSelector(selectCurrentLocation);
  const trip = useSelector(selectTrip);

  const [soloTaxiCoordinates, setSoloTaxiCoordinates] = useState([]);
  const [taxiCoordinates, setTaxiCoordinates] = useState([]);
  const [groupTaxiCoordinates, setGroupTaxiCoordinates] = useState([]);
  const [dMinIndex, setDMinIndex] = useState(0);

  const [mateDestination, setMateDestination] = useState({
    latitude: null,
    longitude: null,
    encodedPolyline: null,
    identifier: "mateDestLoc",
  });
  const [mateLocation, setMateLocation] = useState({
    latitude: null,
    longitude: null,
    identifier: "mateLoc",
  });
  const [path, setPath] = useState(null);
  const [postsIndex, setPostsIndex] = useState(0);
  const selectPosts = (index) => {
    console.log(`selecting posts ${index}`);
    setPostsIndex(index);
  };

  // useEffect(    console.log("hmm");
  //   const socket = io("http://10.245.49.145:3000", {
  //     transports: ["websocket"],
  //   });
  //   // console.log(socket);
  //   await axios
  //     .get("http://localhost:3000")
  //     .then((response) => {
  //       // Handle success
  //       console.log("Response:", response);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.log(error)
  //       console.error("Error:", error);
  //     });

  //   return function didUnmount() {
  //     socket.disconnect();
  //     socket.removeAllListeners();
  //   };
  // }, []);

  useEffect(() => {
    console.log(trip);
    console.log(currentLocation);
    const socket = io("http://10.245.49.145:3000", {
      transports: ["websocket"],
    });
    // Socket io -гоо ашиглаад messenger ээ эхлээд хийх хэрэгтэй.
    // What should I do now? I have a socket connection
  }, []);
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  const mapRef = useRef(null);
  const [count, setCount] = useState(0);

  const [posts, setPosts] = useState([
    {
      userCurrentLocation: {
        latitude: 47.92268381096039,
        longitude: 106.90468287847565,
        distanceMeters: 207,
        encodedPolyline: "c|ncHo}nkSdBSX?b@dJ",
      },
      mateLocation: {
        distanceMeters: 189,
        latitude: 47.92107853360261,
        longitude: 106.90457076138696,
        encodedPolyline: "_rncHg{nkSoBTU?TfFo@J",
      },
      meetingLocation: {
        latitude: 47.92201806121242,
        longitude: 106.90363339286503,
      },
      mateDestination: {
        latitude: 47.923306196218256,
        longitude: 106.88041519891232,
      },
      destinationLocation: {
        latitude: 47.922872013102065,
        longitude: 106.86612361680845,
        distanceMeters: 3462,
        encodedPolyline:
          "_wncH}rnkSt@~MPfC?f@RXc@r@k@h@qD|BiBxAoAxAgA|AsBtDy@|AoAtBlChNnDdQ`AbE^jCFzAt@dq@wAHAa@@fAAdCJpIGPMHc@DFhI_HVJrGPnSVdOFlEFbAJ^b@l@x@d@fDxAbAh@",
      },

      phoneNumber: "1",
      polylineCoordinates:
        "_wncH}rnkSt@~MPfC?f@RXc@r@k@h@qD|BiBxAoAxAgA|AsBtDy@|AoAtBlChNnDdQ`AbE^jCFzAt@dq@wAHAa@@fAAdCJpIGPMHc@DFhI_HVJrGPnSVdOFlEFbAJ^b@l@x@d@fDxAbAh@",
    },
    {
      phoneNumber: "2",
      userCurrentLocation: {
        distanceMeters: 442,
        latitude: 47.92156930457127,
        longitude: 106.85647909793691,
        encodedPolyline: "iuncHujekS}@ES`ASEa@@UDq@c@GKIiAQi@aA}BfAGjFMHEBY?O",
      },
      mateLocation: {
        distanceMeters: 264,
        latitude: 47.92224059004286,
        longitude: 106.86109627490013,
        encodedPolyline: "wwncHkifkSr@rGj@bGIVAr@DfA",
      },
      meetingLocation: {
        latitude: 47.921569392296085,
        longitude: 106.85775857956448,
      },
      mateDestination: {
        latitude: 47.92318493458031,
        longitude: 106.87739510932467,
      },
      destinationLocation: {
        latitude: 47.92528460096507,
        longitude: 106.89417588647312,
        distanceMeters: 2894,
        encodedPolyline:
          "}tncH_tekSEcBBa@FMy@mIaA}Ic@kFMiHIeIo@}p@KyHc@YEgHEaQRAy@wr@Ci@_@kCaAcEkBaJcAcF_@R}AlAUgBe@uB",
      },
      polylineCoordinates:
        "}tncH_tekSEcBBa@FMy@mIaA}Ic@kFMiHIeIo@}p@KyHc@YEgHEaQRAy@wr@Ci@_@kCaAcEkBaJcAcF_@R}AlAUgBe@uB",
    },
  ]);

  useEffect(() => {
    console.log(postsIndex);
    console.log("PostSwitching");
    if (postsIndex !== null) {
      dispatch(
        updateLocationCurrentLocation({
          latitude: posts[postsIndex].userCurrentLocation.latitude,
          longitude: posts[postsIndex].userCurrentLocation.longitude,
        })
      );
      dispatch(
        updateLocationDestLocation({
          latitude: posts[postsIndex].destinationLocation.latitude,
          longitude: posts[postsIndex].destinationLocation.longitude,
        })
      );

      // setMateLocation((prevState) => ({
      //   // !!!identifier авч хадгалж үлдэж байгаа тул ...prevState гэж бичив.
      //   ...prevState,
      //   ...posts[postsIndex].mateLocation,
      // }));

      // setMateDestination((prevState) => ({
      //   ...prevState,
      //   ...posts[postsIndex].mateDestination,
      // }));

      dispatch(
        updateTrip({
          mateLocation: posts[postsIndex].mateLocation,
          mateDest: posts[postsIndex].mateDestination,
          meetingLocation: posts[postsIndex].meetingLocation,
          polylineCoordinates: posts[postsIndex].polylineCoordinates,
        })
      );
      let d;
      let dMin = 1000;
      let dMinIndex = 0;
      const taxiCoordinates = polyline
        .decode(posts[postsIndex].polylineCoordinates)
        .map((point, index) => {
          d = getDistance(
            point[0],
            point[1],
            trip.mateDestination.latitude,
            trip.mateDestination.longitude
          );
          if (d < 0.1 && Math.min(d, dMin)) {
            dMin = d;
            dMinIndex = index;
          }
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
      dispatch(
        updateTrip({
          soloTaxiCoordinates: taxiCoordinates.slice(dMinIndex - 1),
          // soloTaxiLength: taxiCoordinates.slice(dMinIndex - 1).length,
          groupTaxiCoordinates: taxiCoordinates.slice(0, dMinIndex),
        })
      );
    }
  }, [postsIndex]);

  useEffect(() => {
    const markerNames = ["mateLoc", "mateDestLoc", "current", "dest"];
    mapRef.current.fitToSuppliedMarkers(markerNames, {
      edgePadding: {
        top: hp("2%"),
        right: wp("2%"),
        bottom: hp("12%"),
        left: wp("2%"),
      },
    });
    // if (soloTaxiCoordinates) console.log(soloTaxiCoordinates.length);
  }, [soloTaxiCoordinates]);

  useEffect(() => {
    setCount(count + 1);
  }, [route.params]);

  // Function to calculate distance between two points using Haversine formula
  const onMapReady = () => {};
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
        {trip.groupTaxiCoordinates.length > 0 && (
          <Marker
            coordinate={trip.groupTaxiCoordinates[0]}
            key={trip.groupTaxiCoordinates[0]}
            identifier={"Meeting"}
          >
            <Image
              source={require("../../assets/meeting.png")}
              style={{ width: 25, height: 25 }}
            />
          </Marker>
        )}

        {trip.mateLocation.latitude && (
          <Marker
            coordinate={trip.mateLocation}
            key={trip.mateLocation.longitude}
            identifier={trip.mateLocation.identifier}
            opacity={0.9}
            pinColor={"#00ffff"}
          />
        )}
        {trip.mateDestination.latitude && (
          <Marker
            title="mateDestination"
            coordinate={trip.mateDestination}
            key={trip.mateDestination.longitude}
            identifier={mateLocation.identifier}
            opacity={0.9}
            pinColor={"#00ffff"}
            style={{ zIndex: 1000 }}
          />
        )}

        {trip.soloTaxiCoordinates.length > 1 && (
          <Marker
            tracksViewChanges={false}
            coordinate={
              trip.soloTaxiCoordinates[
                Math.ceil(trip.soloTaxiCoordinates.length / 2)
              ]
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>19.3km</Text>
            </View>
          </Marker>
        )}
        {trip.soloTaxiCoordinates.length > 0 && (
          <Polyline
            coordinates={trip.soloTaxiCoordinates}
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
        {trip.groupTaxiCoordinates.length > 0 && (
          <Polyline
            coordinates={trip.groupTaxiCoordinates}
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
        {trip.groupTaxiCoordinates.length > 1 && (
          <Marker
            tracksViewChanges={false}
            coordinate={
              trip.groupTaxiCoordinates[
                Math.ceil(trip.groupTaxiCoordinates.length / 2)
              ]
            }
          >
            <View style={styles.textContainer}>
              <Text style={[styles.text, { color: "#11AABE" }]}>5.3km</Text>
            </View>
          </Marker>
        )}
      </MapView>
      <View
        style={{
          position: "absolute",
          zIndex: 100,
          bottom: "18%",
          left: 0,
          width: "100%",
          height: "22%",
          backgroundColor: "#FAFAFA",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "30%",
          width: "100%",
          zIndex: 101,
          left: "10%",
        }}
      >
        <SearchBar
          placeholder={"Гэр"}
          active={0}
          placeholderStyle={{ color: "#11AABE" }}
          style={{
            width: "80%",
            height: hp("8%"),
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "20%",
          width: "100%",
          zIndex: 101,
          left: "10%",
        }}
      >
        <SearchBar
          placeholder={destinationLocation.name}
          placeholderStyle={{ color: "#FFC700" }}
          style={{
            width: "80%",
            height: hp("8%"),
          }}
          screen={"Home"}
        />
      </View>
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}></View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        </View> */}

      <View
        style={{
          position: "absolute",
          bottom: "32%",
          width: "4%",
          height: "4%",
          zIndex: 101,
          left: "4%",
        }}
      >
        <TopDot height="100%" width="100%" />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: "25.5%",
          width: "0.5%",
          height: "7%",
          zIndex: 101,
          left: "5.75%",
          backgroundColor: "#11AABE",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "22%",
          width: "4%",
          height: "4%",
          zIndex: 101,
          left: "4%",
        }}
      >
        <BotDot height="100%" width="100%" />
      </View>
      <PostList
        style={{ position: "absolute", zIndex: 1010, bottom: 0, left: 0 }}
        currentLocation={currentLocation}
        destinationLocation={destinationLocation}
        selectPosts={selectPosts}
        posts={posts}
      />
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
    // borderTopRightRadius: "45%",
    // borderTopLeftRadius: "45%",
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#F6F6F6",
    width: wp("16%"),
    height: hp("4%"),
    justifyContent: "center",
    marginHorizontal: wp("1%"),
    alignItems: "center",
    // alignContent: "center",
    borderColor: "#E8E8E8",
  },

  // searchBar: {
  //   width: screenWidth * 0.82,
  //   height: screenHeight * 0.08,
  // },
  map: {
    width: "100%",
    height: "66%",
  },
  address: {
    padding: 10,
    backgroundColor: "#fffbf0",
    width: screenWidth * 0.36,
    height: screenHeight * 0.2,
    borderColor: "#fce9b5",
    // borderWidth: 1,
  },
  text: {
    fontSize: hp("2.5%"),
    color: primaryColor,
  },
});
// 427
