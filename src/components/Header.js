import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { loadFonts } from "../../expo-font";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
const Header = ({ route, screenName, title }) => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await loadFonts();
      setFontsLoaded(true);
    }

    load();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() =>
          // navigation.navigate("Home", { locations: newLocations })
          // Ирснийг нь яг ирснээр нь буцаав.
          navigation.navigate(screenName, route.params)
        }
      >
        <Ionicons name="chevron-back" size={36} color="#FFC700" />
      </TouchableOpacity>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: '700'}}>{ title }</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  arrow: {
    position: "absolute",
    left: 0,
  },
  container: {
    position: "relative",
    height: "11%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // padding: "5%",
    color: "#d3a7ff",
    backgroundColor: "#fffbf4",
    borderBottomColor: "#fde8ae",
    borderBottomWidth: "1px",
  },
});
