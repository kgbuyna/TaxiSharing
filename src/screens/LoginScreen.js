import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Button from "../components/Button";
import axios from "axios";
import Alert from "../components/Alert";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFocus = (event, state) => {
    console.log(event.nativeEvent.target);
    setFocus(state);
  };

  const handleBlur = () => {
    console.log("blur");
    setFocus(0);
  };
  const handlePhoneNumberSubmit = () => {
    passwordRef.current.focus();
  };

  const closeMessageModal = () => {
    setMessageVisible(false);
  };
  const showMessageModal = (message) => {
    setMessage(message);
    setMessageVisible(true);
  };
  const handleLogin = () => {
    // За ийм жижиг зүйл дээр санах зовохоо болих хэрэгтэй. Том зурагаараа юмаа харья тэгэх үү?
    const isValidPassword = password.length > 0;
    const isValidPhoneNumber = /^[0-9]+$/.test(phoneNumber);
    const isValidPhoneNumberLength = phoneNumber.length >= 8;
    const isTherePhoneNumber = phoneNumber.length > 0;
    // const isValidPhoneNumberLength = phoneNumber.length >= 8;
    if (!isTherePhoneNumber) {
      showMessageModal("Утасны дугаараа оруулна уу");
    } else if (!isValidPhoneNumberLength) {
      // setPhoneNumber("");
      showMessageModal("Утасны дугаар 8 оронтой байна.");
    } else if (!isValidPhoneNumber) {
      showMessageModal("Утасны дугаар зөвхөн тоо агуулна.");
    } else if (!isValidPassword) {
      setPassword("");
      showMessageModal("Нууц үгээ оруулна уу.");
    } else {
      axios
        .post("http://localhost:3000/api/v1/", {
          phone: phoneNumber,
          password: password,
        })
        .then((response) => {
          if (response.status === "success") {
            console.log("Login Successful. Please Login to proceed");
            navigation.navigate("Splash");
          } else {
            console.log("Login Failed");
            setIsSuccessful(false);
            setMessageVisible(true);
            setMessage("Нэвтрэх нэр эсвэл нууц үг буруу байна");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //{}
  };
  // const borderColor = isFocused ? "#FFC700" : "#ffffff";

  const handleSignUpLinkPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFocus(0);
        Keyboard.dismiss();
      }}
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Alert
          isVisible={messageVisible}
          message={message}
          onClose={closeMessageModal}
          isSuccessful={isSuccessful}
        />
        <View
          style={[
            {
              height: hp("25%"),
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.title}>Тавтай морилно уу</Text>
        </View>
        <View
          style={{
            height: hp("30%"),
            justifyContent: "space-around",
          }}
        >
          {/* <Text>{borderColor}fasdffasdfas fasdf a</Text> */}
          <TextInput
            ref={phoneNumberRef}
            style={[styles.input, focus == "phoneNumber" && { borderColor: "#FFC700" }]}
            placeholder="Утас"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onFocus={(event) => {
              handleFocus(event, "phoneNumber");
            }}
            onBlur={handleBlur}
            onSubmitEditing={handlePhoneNumberSubmit}
            // key={1}
          />
          <TextInput
            ref={passwordRef}
            style={[styles.input, focus == "password" && { borderColor: "#FFC700" }]}
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            onFocus={(event) => {
              handleFocus(event, "password");
            }}
            onBlur={handleBlur}
            onSubmitEditing={handleLogin}
            // secureTextEntry
          />
        </View>
        <View
          style={{
            width: wp("84%"),
            justifyContent: "flex-end",
            margin: hp("2.5%"),
          }}
        >
          <Text style={{ fontSize: 13, color: "#0D0140", textAlign: "right" }}>
            Нууц үг мартсан
          </Text>
        </View>
        <View style={{ height: hp("2%") }}></View>
        <Button title={"Нэвтрэх"} active={true} onPress={handleLogin} />
        <View style={{ height: hp("2%") }}></View>
        <Text style={styles.signUpLinkText} onPress={handleSignUpLinkPress}>
          Шинээр бүртгүүлэх
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    top: "50%",
    fontSize: hp("5%"),
    fontWeight: "bold",
    color: "#0D0140",
  },
  input: {
    paddingLeft: wp("6%"),
    width: wp("84%"),
    height: hp("10%"),
    // fontSize: hp("3%"),

    fontSize: hp("2.5%"),
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
  signUpLinkText: {
    color: "#FFC700",
  },
});

export default LoginScreen;
