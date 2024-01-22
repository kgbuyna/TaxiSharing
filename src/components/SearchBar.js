import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { terialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
function SearchBar({
  style,
  searchText,
  handleInputChange,
  icon,
  placeholderStyle,
  placeholder,
  props,
  params,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.searchContainer, style]}>
      {icon && <AntDesign name="search1" size={28} color="#FFC700" />}
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          navigation.navigate("Search", props);
        }}
      >
        <Text style={[styles.placeholder, placeholderStyle]}>
          {placeholder}
        </Text>
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: 10,
    paddingLeft: "2%",
  },
  placeholder: {
    color: "#FFC700",
    fontSize: 20,
  },
  input: {
    justifyContent: "center",
    // alignItems:"center",
    width: "90%",
    height: 48,
    fontSize: 16,
    paddingLeft: "2%",
  },
});

export default SearchBar;
