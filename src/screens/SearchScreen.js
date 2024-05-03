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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Location from "../../assets/shape.svg";

import SearchIcon from "../../assets/search.svg";
import Constants from "expo-constants";

import { updateLocation } from "../../slices/destinationLocationSlice";

import { useDispatch } from "react-redux";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const apiKey = Constants.expoConfig.extra.API_KEY;

const SearchScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([
    { name: "Тэнгис кино театр" },
    { name: "Тэди төв" },
    { name: "Монгол Улсын Их Сургууль 3-р байр", title: "Ажил" },
    { name: "Монгол Улсын Их Сургууль 2-р байр" },
    { name: "Өргөө кино театр" },
    { name: "ШУТИС" },
    { name: "Тэнгис кино театр" },
    { name: "Чингисийн талбай" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [focus, setFocus] = useState(false);
  // useEffect(() => {
  //   console.log(route);
  //   console.log(apiKey);
  //   // handleInputChange(searchText);
  // }, [searchText]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${item.name}&key=${apiKey}`
          )
          .then((response) => {
            const data = response.data;
            if (data.status === "OK") {
              // const { lat, lng } = data.results[0].geometry.location;
              dispatch(
                updateLocation({
                  latitude: data.results[0].geometry.location.lat,
                  longitude: data.results[0].geometry.location.lng,
                  identifier: "dest",
                  name: item.name,
                })
              );
              console.log(data.results[0].geometry.location);
              navigation.navigate("Main");
            } else {
              console.error(`Geocoding failed: ${data.status}`);
            }
          })
          //
          .catch((error) => console.error(`Geocoding error: ${error}`));
      }}
      style={{
        paddingLeft: 20,
        height: hp("10%"),
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Location width={wp("8%")} height={wp("8%")} /> */}
      <View style={{ width: wp("8%"), height: hp("10%") }}>
        <Location height="100%" width="100%"></Location>
      </View>
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
                style={{
                  color: "#212121",
                  fontWeight: "600",
                  fontSize: hp("2.5%"),
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "#616161",
                  fontWeight: "500",
                  fontSize: hp("2%"),
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
                fontSize: hp("2.5%"),
              }}
            >
              {item.name}
            </Text>
          )}
        </View>
      </View>
      {/* < style={{flexDirection:'row', justifyContent:'flex-end'}}> */}

      {/* </View> */}
    </TouchableOpacity>
  );
  function handleInputChange(value) {
    if (value.length >= 4) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=МУИС&components=country:mn&types=establishment&location=37.76999%2C-122.44696&key=${apiKey}`
        )
        .then((response) => {
          const newSuggestions = response.data.predictions.map((el) => ({
            name: el.structured_formatting.main_text,
          }));
          setSuggestions(newSuggestions);
        })
        .catch((error) => {
          console.log(error.message);
          console.error(error);
        });
    }
    setSearchText(value);
  }
  // const [newLocations, setNewLocations] = useState(route.params.locations);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header
        title={"Хүрэх газар"}
        route={route}
        fromWhere={route.params.previousScreen}
      />
      <View
        style={[
          styles.searchContainer,
          focus && {
            borderColor: "#11AABE",
          },
        ]}
      >
        <View style={{ width: "10%", height: "100%" }}>
          <SearchIcon height="100%" width="100%" />
        </View>
        {/* <AntDesign name="search1" size={28} color="#FFC700" /> */}
        <TextInput
          style={styles.input}
          fontSize={18}
          placeholder="Search..."
          value={searchText}
          onFocus={() => {
            // setFocus false
            setFocus(true);
            console.log("focused");
          }}
          onEndEditing={() => {
            setFocus(false);
          }}
          onChangeText={handleInputChange}
        />
        {/* <TouchableOpacity
          style={{
            width: wp("15%"),
            height: hp("5%"),
          }}
          // Үүн дээ дарахад flatlist алга болж mapView гарч ирэх.
          onPress={() => {}}
        >
          <SetLocation height="100%" width="100%" />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(name, index) => index}
        style={{
          marginHorizontal: wp("5%"),
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
    flex: 1,
    // height: "100%",
    // padding:"5%",
  },
  input: {
    flex: 1,
    marginLeft: 10, // Adjust as needed for spacing between icon and input
  },
  searchContainer: {
    width: wp("93%"),
    height: hp("10%"),
    // marginHorizontal: wp("14%"),
    marginTop: hp("4%"),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    paddingLeft: wp("2%"),
  },
});
