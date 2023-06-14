import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function SearchBar({
  navigation,
  style,
  screen,
  searchText,
  handleInputChange,
  props,
  params
}) {
  
  return (
    <View style={[styles.searchContainer, style]}>
      <MaterialIcons name="place" size={24} color="black" />
      {screen ? (
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={handleInputChange}
        />
      ) : (
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            navigation.navigate("Search", props);
          }}
        >
          {searchText ? <Text>{searchText}</Text> : <></>}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: "5%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    backgroundColor: "#f1f3f4",
    borderWidth: "1px solid",
    borderColor: "#dfe1e5",
    borderRadius: 10,
    paddingLeft: "2%",
  },
  input: {
    width: "90%",
    height: 48,
    fontSize: 16,
    paddingLeft: "2%",
  },
});

export default SearchBar;
