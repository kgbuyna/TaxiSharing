import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SearchBar from "../components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const SearchScreen = ({ navigation, route }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState([]);
  useEffect(() => {
    handleInputChange(searchText);
  }, [searchText]);

  function handleInputChange(value) {
    if (value.length >= 4) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&components=country:mn&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyCfoOZmSBlNKkgaXAu_kuH2R3O7r17PCyc`
        )
        .then((response) => {
          const newSuggestions = response.data.predictions.map(
            (el) => el.terms[0].value
          );
          setSuggestions(newSuggestions);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setSearchText(value);
  }
  function navigate(dest, route) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          dest
        )}&key=AIzaSyCfoOZmSBlNKkgaXAu_kuH2R3O7r17PCyc`
      )
      .then((response) => {
        const data = response.data;
        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          navigation.navigate("Home", {
            ...route,
            ...{
              destination: {
                latitude: lat,
                longitude: lng,
                identifier: lng.toString(),
              },
              destinationName: dest,
            },
          });
        } else {
          console.error(`Geocoding failed: ${data.status}`);
        }
      })
      .catch((error) => console.error(`Geocoding error: ${error}`));
  }
  // const [newLocations, setNewLocations] = useState(route.params.locations);
  return (
    <View>
      <StatusBar hidden />
      <HeaderBar>
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate("Home", { locations: newLocations })
            // Ирснийг нь яг ирснээр нь буцаав.
            navigation.navigate("Home", route.params)
          }
        >
          <AntDesign name="arrowleft" size={26} color="white" />
        </TouchableOpacity>
      </HeaderBar>
      {/* searchBar дээр бичсэн юмыг яаж авах билээ гэдэг асуулт байна.  */}
      {/* Хүүхэд дээр нь бичиж байгаа text-г нь эцэг нь мэдэж байхын тулд үүнийг хийж байгаа. Харин searchText-г дамжуулах хэрэгтэй эсэхийг гайхаад л байна л даа.  */}
      <SearchBar
        screen={"Search"}
        searchText={searchText}
        handleInputChange={handleInputChange}
      />
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigate(item, route.params);
            }}
            style={styles.item}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
