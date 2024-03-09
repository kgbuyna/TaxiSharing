import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, StatusBar, Dimensions } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import SearchBar from "../components/SearchBar";
import polyline from "@mapbox/polyline";
import { selectDestinationLocation } from "../../slices/destinationLocationSlice";
import { selectCurrentLocation } from "../../slices/currentLocationSlice";
import BotDot from "../../assets/botDot.svg";
import TopDot from "../../assets/topDot.svg";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/PostList";

import { updateLocation as updateLocationCurrentLocation } from "../../slices/destinationLocationSlice";
import { updateLocation as updateLocationDestLocation } from "../../slices/destinationLocationSlice";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function MainScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const destinationLocation = useSelector(selectDestinationLocation);
  const currentLocation = useSelector(selectCurrentLocation);
  const [polylineCoordinates, setPolylineCoordinates] = useState();

  const mapRef = useRef(null);
  const [count, setCount] = useState(0);

  const [posts, setPosts] = useState([
    {
      phoneNumber: "1",
      // 47.92077717247777, 106.90546510051048
      // Заавал эхлэл болон төгсгөл цэг нь ижилхэн байх албагүй билээ.
      originLocation: {
        latitude: 47.92104393,
        longitude: 106.9047724,
      },
      // Compass Outdoor Store 47.890862773767275, 106.92660426362012
      mateLocation: {
        latitude: 47.91868,
        longitude: 106.88628,
      },

      mateDestination: {
        latitude: 47.91379,
        longitude: 106.88632,
      },
      destinationLocation: {
        latitude: 47.90926,
        longitude: 106.90902,
      },
      // Их дэлгүүр
      // Говь саун
      //
      polylineCoordinates: "oqncHyynkSvMprBp]Gh[{lC",
    },
    {
      phoneNumber: "2",
      originLocation: {
        latitude: 47.92104393,
        longitude: 106.9047724,
      },
      // Compass Outdoor Store 47.890862773767275, 106.92660426362012
      mateLocation: {
        latitude: 47.91188,
        longitude: 106.89758,
      },

      mateDestination: {
        latitude: 47.90546,
        longitude: 106.9091,
      },
      destinationLocation: {
        latitude: 47.90763,
        longitude: 106.86025,
      },
      polylineCoordinates: "oqncHyynkSfx@|k@bg@_gAqLhpH",
    },
    {
      phoneNumber: "3",
      originLocation: {
        latitude: 47.92104393,
        longitude: 106.9047724,
      },
      // Compass Outdoor Store 47.890862773767275, 106.92660426362012
      mateLocation: {
        latitude: 47.93434,
        longitude: 106.8468,
      },

      mateDestination: {
        latitude: 47.90811,
        longitude: 106.8698,
      },
      destinationLocation: {
        latitude: 47.90639,
        longitude: 106.8377,
      },
      // Их дэлгүүр
      // Говь саун
      //
      polylineCoordinates: "oqncHyynkScrAhiJ|bDwnCvIrgE",
    },
    {
      phoneNumber: "4",
      originLocation: {
        latitude: 47.92104393,
        longitude: 106.9047724,
      },
      // Compass Outdoor Store 47.890862773767275, 106.92660426362012
      mateLocation: {
        latitude: 47.91868,
        longitude: 106.88628,
      },

      mateDestination: {
        latitude: 47.91379,
        longitude: 106.88632,
      },
      destinationLocation: {
        latitude: 47.90926,
        longitude: 106.90902,
      },
      polylineCoordinates: "oqncHyynkSvMprBp]Gh[{lCoqncHyynkSvMprBp]G",
    },
    {
      phoneNumber: "5",
      originLocation: {
        latitude: 47.92104393,
        longitude: 106.9047724,
      },
      // Compass Outdoor Store 47.890862773767275, 106.92660426362012
      mateLocation: {
        latitude: 47.91188,
        longitude: 106.89758,
      },

      mateDestination: {
        latitude: 47.90546,
        longitude: 106.9091,
      },
      destinationLocation: {
        latitude: 47.90763,
        longitude: 106.86025,
      },
      polylineCoordinates: "oqncHyynkSfx@|k@bg@_gAqLhpH",
    },
  ]);
  const [mateDestination, setMateDestination] = useState({
    latitude: null,
    longitude: null,
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
    setPostsIndex(index);
  };
  useEffect(() => {
    if (postsIndex !== null) {
      dispatch(
        updateLocationCurrentLocation({
          latitude: posts[postsIndex].originLocation.latitude,
          longitude: posts[postsIndex].originLocation.longitude,
        })
      );
      dispatch(
        updateLocationDestLocation({
          latitude: posts[postsIndex].destinationLocation.latitude,
          longitude: posts[postsIndex].destinationLocation.longitude,
        })
      );
      setMateLocation((prevState) => ({
        ...prevState,
        ...posts[postsIndex].mateLocation,
      }));

      setMateDestination((prevState) => ({
        ...prevState,
        ...posts[postsIndex].mateDestination,
      }));
    }

    const polylineCoordinates = polyline
      .decode(posts[postsIndex].polylineCoordinates)
      .map((point) => {
        console.log(point);
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
    setPolylineCoordinates(polylineCoordinates);
  }, [postsIndex]);
  useEffect(() => {
    const markerNames = ["mateLoc", "mateDestLoc", "current", "dest"];
    mapRef.current.fitToSuppliedMarkers(markerNames, {
      edgePadding: { top: hp("4%"), right: wp("4%"), bottom: hp("12%"), left: wp("4%")},
    });
  }, [polylineCoordinates]);

  useEffect(() => {
    setCount(count + 1);
  }, [route.params]);
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
        {mateLocation.latitude && (
          <Marker
            coordinate={mateLocation}
            key={mateLocation.longitude}
            identifier={mateLocation.identifier}
            opacity={0.5}
            pinColor={"#00ffff"}
          />
        )}
        {mateDestination.latitude && (
          <Marker
            coordinate={mateDestination}
            key={mateDestination.longitude}
            identifier={mateLocation.identifier}
            opacity={0.5}
            pinColor={"#00ffff"}
          />
        )}
        {polylineCoordinates ? (
          <Polyline
            coordinates={polylineCoordinates}
            strokeWidth={4} 
            strokeColors={[
              "#E5845C",
            ]}
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

      {/* <ChatIcon unreadMsg={2} svg={} /> */}
      <View
        style={{
          position: "absolute",
          zIndex: 100,
          bottom: "18%",
          left: 0,
          width: "100%",
          height: "22%",
          borderTopRightRadius: "45%",
          borderTopLeftRadius: "45%",
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
    borderTopRightRadius: "45%",
    borderTopLeftRadius: "45%",
    backgroundColor: "#FFFFFF",
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
});
// 427
