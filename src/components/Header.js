import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftIcon from "../../assets/arrowLeft.svg";
const Header = ({ route, screenName, title, fromWhere }) => {
  const navigation = useNavigation();
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // if (!fontsLoaded) {
  //   return null;
  // }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => {
          navigation.navigate(fromWhere);
        }}
      >
        <ArrowLeftIcon height="100%" width="100%" />
      </TouchableOpacity>

      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "700", textAlign: "center" }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  arrow: {
    position: "absolute",
    left: 0,
    width: "10%",
    height: "100%",
  },
  container: {
    flexDirection: "row",
    height: "11%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "#d3a7ff",
    // paddingHorizontal: "5%",
  },
});
