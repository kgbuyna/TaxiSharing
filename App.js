// NODE_ENV=development npx expo start --tunnel
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import MainScreen from "./src/screens/MainScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import PostScreen from "./src/screens/PostScreen";
import StartScreen from "./src/screens/StartScreen";
import { Provider } from "react-redux";
import store from "./store";
import MessengerScreen from "./src/screens/MessengerScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ChatListScreen from "./src/screens/ChatListScreen";
import TestChatScreen from "./src/screens/TestChatScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* 99243596 123456789 */}
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={PostScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Messenger"
            component={MessengerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatList"
            component={ChatListScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TestChatScreen"
            component={TestChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
