import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import colors from "../theme.js";
// import BigPost from "./BigPost.js";
// import colors from "../../theme.js";

// NODE_ENV=development npx expo start --tunnel

import CallIcon from "../../assets/callIcon.svg";
import colors, { primaryColor, secondaryColor } from "../../theme.js";
import SendIcon from "../../assets/send.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ITEM_WIDTH = screenWidth / 3;

const ITEM_HEIGHT = 0.18 * screenHeight;
// const

const PostList = ({
  style,
  currentLocation,
  destinationLocation,
  selectPosts,
  posts,
}) => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  function calculateDistance(point1, point2) {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(point2.latitude - point1.latitude);
    const dLon = degreesToRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(point1.latitude)) *
        Math.cos(degreesToRadians(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return distance;
  }

  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const [postsIndex, setPostsIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={[
        {
          width: wp("100%"),
          position: "absolute",
          height: hp("19%"),

          backgroundColor: "#FAFAFA",
          zIndex: 100,
        },
        style,
      ]}
    >
      <Animated.FlatList
        ref={flatListRef}
        keyExtractor={(item) => item.phoneNumber}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onMomentumScrollEnd={(event) => {
          selectPosts(
            Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH)
          );
          setPostsIndex(
            Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH)
          );
        }}
        contentContainerStyle={{ paddingHorizontal: ITEM_WIDTH }}
        showsHorizontalScrollIndicator={false}
        data={posts}
        style={[styles.flatListContainer, { flexGrow: 0 }]}
        horizontal={true}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH - 1,
            index * ITEM_WIDTH,
            index * ITEM_WIDTH + 1,
            (index + 1) * ITEM_WIDTH,
          ];
          const scaleY = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.99, 1, 0.99, 0.6],
          });
          const borderColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              "#E8E8E8",
              "#E8E8E8",
              "#11AABE",
              "#E8E8E8",
              "#E8E8E8",
            ],
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0.9, 1, 0.9, 0.7],
          });

          // const originDistance = calculateDistance(
          //   item.originLocation,
          //   currentLocation
          // );
          // const destinationDistance = calculateDistance(
          //   item.destinationLocation,
          //   destinationLocation
          // );

          return (
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [{ scaleX: scaleY }, { scaleY: scaleY }],
                  borderColor,
                  opacity,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  console.log(`index: ${index}`);
                  console.log(`postsIndex: ${postsIndex}`);
                  // !!!scrollToIndex({index : 0}) гэж ажиллахгүй байгаа тул ScrollToOffset гэж функц ашиглав.
                  if (index == 0) {
                    flatListRef.current.scrollToOffset({ offset: 0 });
                    setPostsIndex(0);
                    selectPosts(0);
                  } else if (postsIndex != index) {
                    flatListRef.current.scrollToIndex({ index: index });
                    selectPosts(index);
                    setPostsIndex(index);
                  }
                }}
              >
                <Animated.Text style={[{ fontSize: hp("2%") }]}>
                  {item.phoneNumber}
                </Animated.Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: hp("1%"),
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={styles.textContainer}>
                    {/* <Text style={styles.text}>~{originDistance}</Text> */}
                    <Text style={styles.text}>~5.6</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.text, { color: secondaryColor }]}>
                      ~0.56
                    </Text>
                  </View>
                </View>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    top: "6%",
                    opacity,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: wp("10%"),
                      height: hp("3%"),
                      left: "25%",
                    }}
                    onPress={() => {}}
                  >
                    <CallIcon height="100%" width="100%" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: wp("10%"),
                      height: hp("3%"),
                      justifyContent: "center",
                      left: "25%",
                    }}
                    disabled={postsIndex !== index}
                    onPress={() => {
                      navigation.navigate("Chat", {
                        fromWhere: "Main",
                        phoneNumber: item.phoneNumber,
                        originLocation: item.originLocation,
                        destinationLocation: item.destinationLocation,
                        mateLocation: item.mateLocation,
                        mateDestination: item.mateDestination,
                      });
                    }}
                  >
                    <SendIcon height="100%" width="100%" />
                  </TouchableOpacity>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  flatListContainer: {
    alignContent: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderColor: "#C4C4C4",
    borderRadius: 25,
  },
  // text style
  textContainer: {
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    width: wp("10%"),
    height: hp("3%"),
    justifyContent: "center",
    marginHorizontal: wp("1%"),
    borderColor: "#E8E8E8",
  },
  text: {
    fontSize: hp("1.5%"),
    color: primaryColor,
  },
});
