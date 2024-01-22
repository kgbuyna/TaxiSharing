import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// import SvgUri from 'react-native-svg-uri';
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
// import { Entypo } from "@expo/vector-icons";
// import Location from "../svg/location";
import Location from "../../assets/shape.svg";
import { Entypo, Feather } from "@expo/vector-icons";
import Constants from "expo-constants";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const apiKey = Constants.expoConfig.extra.API_KEY;

const SearchScreen = ({ navigation, route }) => {
  const [suggestions, setSuggestions] = useState([
    { name: "Тэнгис кино театр" },
    { name: "Тэди төв" },
    { name: "Монгол Улсын Их Сургууль 3-р байр", title: "Ажил" },
    { name: "Монгол Улсын Их Сургууль 2-р байр" },
    { name: "Өргөө кино театр" },
    { name: "ШУТИС" },
    // { name: "Тэнгис кино театр"},
    // { name: "Чингисийн талбай" }
  ]);
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState([]);
  useEffect(() => {
    // handleInputChange(searchText);
  }, [searchText]);
  const renderItem = ({ item }) => (
    <View
      style={{
        paddingLeft: 20,
        height: screenHeight * 0.11,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Location width={35} height={35} />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 20,
        }}
      >
        <View>
          {item.title ? (
            <>
              <Text
                style={{ color: "#212121", fontWeight: "600", fontSize: 18 }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "#616161",
                  opacity: "0.74%",
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {item.name}
              </Text>
            </>
          ) : (
            <Text
              style={{
                color: "#616161",
                opacity: "0.74%",
                fontWeight: "500",
                fontSize: 18,
              }}
            >
              {item.name}
            </Text>
          )}
        </View>
      </View>
      {/* < style={{flexDirection:'row', justifyContent:'flex-end'}}> */}

      {/* </View> */}
    </View>
  );
  function handleInputChange(value) {
    if (value.length >= 4) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&components=country:mn&types=establishment&location=37.76999%2C-122.44696&key=${apiKey}`
        )
        .then((response) => {
          const newSuggestions = response.data.predictions.map((el) => ({
            name: el.structured_formatting.main_text,
            // You can include other properties if needed
            // For example: title: "Some title",
          }));
          console.log(newSuggestions);
          setSuggestions(newSuggestions);
        })
        .catch((error) => {
          console.log(error.message);
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
        )}&key=${apiKey}`
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
      //
      .catch((error) => console.error(`Geocoding error: ${error}`));
  }
  // const [newLocations, setNewLocations] = useState(route.params.locations);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header title={"Хүрэх газар"} route={route} screenName={"Origin"} />
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={28} color="#FFC700" />
        <TextInput
          style={styles.input}
          fontSize={18}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleInputChange}
        />
        {/* <Text>Сүүлд хайсан</Text> */}
      </View>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(name, index) => index}
        style={{
          marginHorizontal: "5%",
        }}
        // style={{height: 80, width: '100%'}}
      />

      {/* </View> */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // padding:"5%",
  },
  input: {
    flex: 1, // Takes up remaining space
    marginLeft: 10, // Adjust as needed for spacing between icon and input
  },
  searchContainer: {
    width: "93%",
    height: "10%",
    marginHorizontal: "5%",
    marginTop: "6%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: "1px solid",
    borderColor: "#E8E8E8",
    borderRadius: 10,
    paddingLeft: "2%",
  },
});
