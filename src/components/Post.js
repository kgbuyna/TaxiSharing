import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React from "react";
import CallIcon from "../../assets/callIcon.svg";
import colors, { primaryColor, secondaryColor } from "../../theme.js";
import SendIcon from "../../assets/send.svg";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Post = ({ current, style }) => {
  // scrollX ээр нь олоод мэдчиж болох юм байна л даа. scrollX ээр буцаах тоо чинь хэдэн px алга болсон байна вэ гэдгийг хэлж өгнө шүү дээ.
  return (
    <View style={styles.container}>
      <Text style={[{ fontSize: hp("2%") }, style]}>
        99****16
      </Text>
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
          <Text style={[styles.text, { color: secondaryColor }]}>~0.5км</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", top: "6%", marginHorizontal: wp("9%") }}
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
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    // paddingTop: hp("3%"),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginHorizontal: wp("2%"),
    borderRadius: 25,
    width: wp("29.6%"),
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
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
