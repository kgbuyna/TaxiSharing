import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

// NODE_ENV=development npx expo start --tunnel
import { useNavigation } from "@react-navigation/native";
// import { terialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import LocationIcon from "../../assets/location.svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import { MaterialIcons } from "@expo/vector-icons";
function SearchBar({
  style,
  placeholderStyle,
  placeholder,
  screen,
  active = 1,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.searchContainer, style]}>
      {placeholder === "Хүрэх газар" && (
        <LocationIcon height="50%" width="10%" />
      )}
      {active ? (
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            navigation.navigate("Search", { previousScreen: screen });
          }}
        >
          <Text
            style={[styles.placeholder, placeholderStyle]}
            numberOfLines={1}
          >
            {placeholder} asd
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.input}>
          <Text
            style={[styles.placeholder, placeholderStyle]}
            numberOfLines={1}
          >
            {placeholder} asd
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FfFfFf",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    paddingLeft: "2%",
  },
  placeholder: {
    color: "#FFC700",
    fontSize: 16,
  },
  input: {
    justifyContent: "center",
    width: "90%",
    height: 48,
    fontSize: 16,
    paddingLeft: "2%",
  },
});

export default SearchBar;
