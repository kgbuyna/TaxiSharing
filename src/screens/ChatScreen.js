import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
  MessageText,
  Message,
  Bubble,
  Avatar,
  Actions,
  Composer,
} from "react-native-gifted-chat";

import {
  renderInputToolbar,
  renderComposer,
  renderSend,
  renderActions,
} from "../components/InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderTime,
  renderCustomView,
  renderMessageText,
  renderMessage,
  renderSystemMessage,
  renderFooter,
} from "../components/MessageContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../components/Header";
import ArrowRightIcon from "../../assets/arrowRight.svg";
import { useRoute } from "@react-navigation/native";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        map: true, 
        user: {
          _id: 1,
          name: "React Nativ",
        },
      },
      {
        _id: 2,
        text: "Hi REACT",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Nativ",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return (
    <View style={{ backgroundColor: "#FAFAFA", height: "100%" }}>
      <Header
        fromWhere={route.params.fromWhere}
        title={route.params.phoneNumber}
      />
      <View style={{ width: "100%", height: "52%" }}>
        <GiftedChat
          renderInputToolbar={renderInputToolbar}
          renderMessageText={renderMessageText}
          messages={messages}
          renderTime={renderTime}
          renderBubble={renderBubble}
          infiniteScroll={false}
          user={{
            _id: 1,
          }}
        />
      </View>
      <Text
        style={{
          color: "#11AABE",
          fontWeight: "800",
          fontSize: 18,
          marginBottom: hp("1%"),
          marginHorizontal: "2.5%",
        }}
      >
        Мессеж сонгох
      </Text>
      <FlatList
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ChatMessageSytemMessageContainer}
            onPress={() => onSend(item)}
          >
            <Text style={{ fontSize: 16, color: "#11AABE", fontWeight: "500" }}>
              {item.text}
            </Text>
            <View style={{ height: hp("10%"), width: wp("10%") }}>
              <ArrowRightIcon height="100%" width="100%" />
            </View>
          </TouchableOpacity>
        )}
        data={[
          {
            text: "Item 1",
            createdAt: new Date(),
            user: {
              _id: 1,
              name: "React Nativ",
              // avatar: "https://placeimg.com/140/140/any",
            },
          },
          { text: "Item 2" },
          { text: "Item 3" },
          { text: "Item 4" },
          { text: "Item 5" },
          { text: "Item 5" },
          { text: "Item 5" },
          { text: "Item 5" },
        ]}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  ChatMessageSytemMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
    height: hp("7%"),
    paddingHorizontal: wp("5%"),
    // backgroundColor: "#f4f4f4",
    borderRadius: 20,
    // margin: 10,
    marginVertical: "0.3%",
  },
});
