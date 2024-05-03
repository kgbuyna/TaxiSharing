import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
// NODE_ENV=development npx expo start --tunnel
const ChatListScreen = ({ navigation }) => {
  const route = useRoute();
  // const firstName = useSelector(selectFirstName);
  const user = useSelector(selectUser);

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    // console.log(`user.id`)
    // console.log(user.id);
    axios
      .get(`http://10.0.2.2:3000/api/v1/chat/list/`, {
        params: {
          userId: user.id,
        },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(`user id ${user.id}`);
          response.data.conversations.forEach((conversation) => {
            console.log(conversation);
            if (conversation.user1.id == user.id) {
              conversation.phoneNumber = conversation.user2.phone_number;
            } else {
              conversation.phoneNumber = conversation.user1.phone_number;
            }
          });
          // if (response.data.conversations.user_1_id === user.id) {
          //   response.data.conversations.phoneNumber =
          //     response.data.conversations.user_2_phone_number;
          // }
          // conversation.updatedAt өдрөө тодорхойлно.

          setConversations(response.data.conversations);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  }, []);
  return (
    <View style={{ backgroundColor: "#FAFAFA", height: "100%" }}>
      <Header
        fromWhere={route.params.fromWhere}
        title="Мессеж"
      />
      {/* <Text>ChatListScreen</Text> */}
      <FlatList
        style={{ width: "100%", height: "100%" }}
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: wp("84%"),
              marginTop: hp("3%"),
              backgroundColor: "#FFFFFF",
              // backgroundColor: "#FF0000",
              alignSelf: "center",
              padding: "4%",
              paddingHorizontal: "6%",
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("Chat", {
                fromWhere: route.params.fromWhere,
                phoneNumber: item.phoneNumber,
                conversationId: item.id,
                receiverId:
                  item.user_1_id === user.id ? item.user_2_id : item.user_1_id,
              });
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                {item.phoneNumber}
              </Text>
              <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
                {item.weekday}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: "2%" }}>
              <Text style={{ fontSize: 14, color: "#B0B0B0" }}>
                {item.text}
              </Text>
              {/* <Text>{item.number}</Text> */}
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({});
