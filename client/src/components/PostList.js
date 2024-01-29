import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
// import colors from "../theme.js";
// import BigPost from "./BigPost.js";
// import colors from "../../theme.js";

import CallIcon from "../../assets/callIcon.svg";
import colors, { primaryColor, secondaryColor } from "../../theme.js";
import SendIcon from "../../assets/send.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Post from "./Post";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// const unitX = (screenWidth) / 375;
// const unitY = (screenHeight) / 667;
const unitX = (x) => {
  return (x * screenWidth) / 375;
};
const unitY = (y) => {
  return (y * screenHeight) / 667;
};
const ITEM_WIDTH = unitX(119);

const ITEM_HEIGHT = unitX(109);

const PostList = ({ style }) => {
  const scrollX = useRef(new Animated.Value(unitX(0))).current;
  return (
    <View
      style={[
        {
          width: wp("100%"),
          position: "absolute",
          height: hp("19%"),
          zIndex: 100,
        },
        style,
      ]}
    >
      <Animated.FlatList
        keyExtractor={(item) => item.toString()}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        onMomentumScrollEnd={(ev) => {
          console.log(
            "Momentum Scroll End: ",
            ev.nativeEvent.contentOffset.x / ITEM_WIDTH
          );
        }}
        contentContainerStyle={{ paddingHorizontal: ITEM_WIDTH }}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        style={[styles.flatListContainer, { flexGrow: 0 }]}
        horizontal={true}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
          });

          return (
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [{ scale }],
                },
              ]}
            >
              <Text style={[{ fontSize: hp("2%") }]}>99****16</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp("1%"),
                  justifyContent: "space-evenly",
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.text}>~0.5км</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.text, { color: secondaryColor }]}>
                    ~0.5км
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  top: "6%",
                  marginHorizontal: wp("9%"),
                }}
              >
                <TouchableOpacity
                  style={{
                    width: wp("11%"),
                    height: hp("3%"),
                  }}
                  onPress={() => {}}
                >
                  <CallIcon height="100%" width="100%" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: wp("11%"),
                    height: hp("3%"),
                  }}
                  onPress={() => {}}
                >
                  <SendIcon height="100%" width="100%" />
                </TouchableOpacity>
              </View>
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
    // margin: 50,
    marginLeft: unitX(18),
    alignContent: "center",
    // backgroundColor: "#FF0000"
  },
  container: {
    // paddingTop: hp("3%"),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    // marginHorizontal: wp("3%"),
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 25,
    // width: wp("29.6%"),
    // height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  containerLittle: {
    // paddingTop: hp("3%"),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    // marginHorizontal: wp("3%"),
    width: unitX(104),
    height: unitY(98),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: unitX(15),
  },
  // text style
  textContainer: {
    borderWidth: 1,
    borderRadius: 30,
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
