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

// NODE_ENV=development npx expo start --tunnel
import { renderInputToolbar } from "../components/InputToolbar";
import {
  renderBubble,
  renderTime,
  renderMessageText,
} from "../components/MessageContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../components/Header";
import ArrowRightIcon from "../../assets/arrowRight.svg";
import { selectUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";

import {
  selectMessages,
  addMessage,
  updateMessage,
  selectEditableMapRes,
} from "../../slices/messageSlice";
import axios from "axios";

const TestChatScreen = ({ route, navigation }) => {
  const messages = useSelector(selectMessages);
  // const [messages, setMessages] = useState([
  //   {
  //     _id: 1,
  //     text: "Hello",
  //     createdAt: new Date(),
  //     map: true,
  //     user: {
  //       _id: 1,
  //     },
  //   },
  // ]);
  // console.log(messages);
  const [msgRefs, setMsgRefs] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const user = useSelector(selectUser);
  /*
      const conversationId = route.params.conversationId;
      const receiverId = route.params.receiverId;
    */
  useEffect(() => {
    // addMessage({
    //   _id: 1,
    //   text: "Hello",
    //   createdAt: new Date(),
    //   map: true,
    //   user: {
    //     _id: 1,
    //     name: "React Nativ",
    //   },
    // });
    // Order хийх хэрэгтэй байж болох юм.
    // if (!msgRefs.length) {
    //   axios.get("http://10.0.2.2:3000/api/v1/chat/msgRefs").then((response) => {
    //     if (response.data.success) {
    //       setMsgRefs(response.data.messages);
    //     } else {
    //       console.log("msgRefs error");
    //     }
    //   });
    // }
  }, []);

  // useEffect(() => {
  //   console.log("fetched messages");
  //   if (!messages.length) {
  //     axios
  //       .get("http://10.0.2.2:3000/api/v1/chat/", {
  //         params: {
  //           conversationId: conversationId,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.data.success) {
  //           console.log("gettting conversation");
  //           console.log(response.data.messages);
  //           response.data.messages.forEach((message) => {
  //             message.text = message.Msgref.text;
  //             // this is must. otherwise , it throws an error undefined key.
  //             message._id = message.id;
  //             message.user = {
  //               _id: message.sender_id,
  //             };
  //           });

  //           setMessages(response.data.messages);
  //           setIsDone(true);
  //           // conversation.updatedAt өдрөө тодорхойлно.
  //         } else {
  //           console.log("error on getting conversation");
  //           console.log(response.data);
  //         }
  //       });
  //   }
  // }, [msgRefs]);

  const onSend = useCallback((message = []) => {
    message.user = {};
    console.log("first message");
    message._id = messages.id;
    message.user.id = user.id;

    // console.log(message)
    // addMessage(message);
    updateMessage((previousMessages) => {
      console.log(previousMessages);

      return GiftedChat.append(previousMessages, message);
    });
    // console.log("sending an message");
    // message.user = {};
    // message._id = new Date().valueOf();
    // message.user._id = user.id;
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, message)
    // );
    // axios.post("http://10.0.2.2:3000/api/v1/chat/", {
    //   conversationId: conversationId,
    //   senderId: user.id,
    //   receiverId: receiverId,
    //   messageId: message.id,
    // });
  }, []);

  return (
    isDone && (
      <View style={{ backgroundColor: "#FAFAFA", height: "100%" }}>
        <Header
        // fromWhere={route.params.fromWhere}
        // title={route.params.phoneNumber}
        />
        <View style={{ width: "100%", height: "52%", padding: 10 }}>
          <GiftedChat
            renderInputToolbar={renderInputToolbar}
            renderMessageText={renderMessageText}
            messages={messages.messages}
            renderTime={renderTime}
            renderBubble={renderBubble}
            inverted={false}
            infiniteScroll={false}
            user={{
              _id: user.id,
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
          data={msgRefs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.ChatMessageSytemMessageContainer}
              onPress={() => onSend(item)}
            >
              <Text
                style={{ fontSize: 16, color: "#11AABE", fontWeight: "500" }}
              >
                {item.text}
              </Text>
              <View style={{ height: hp("10%"), width: wp("10%") }}>
                <ArrowRightIcon height="100%" width="100%" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  );
};

export default TestChatScreen;

const styles = StyleSheet.create({
  ChatMessageSytemMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp("7%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 20,
    marginVertical: "0.3%",
  },
});
