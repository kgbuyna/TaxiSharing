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
import {
  setPhoneNumber as setUserPhoneNumber,
  setFirstName,
  setUserId,
} from "../../slices/userSlice";
import { useDispatch } from "react-redux";

import Constants from "expo-constants";


const URL = Constants.expoConfig.extra.URL;

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(0);
  const [errorText, setErrorText] = useState({});
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

  const requirementSatisfied = (propertyName) => {
    setErrorText((prevState) => {
      const newState = { ...prevState };
      if (propertyName in newState) delete newState[propertyName];
      return newState;
    });
  };
  const handleLogin = () => {

    setFocus(0);
    Keyboard.dismiss();

    const isValidPhoneNumber = /^[0-9]+$/.test(phoneNumber);
    const isValidPhoneNumberLength = phoneNumber.length >= 8;

    if (phoneNumber.length == 0) {
      setErrorText((prevState) => ({
        ...prevState,
        phoneNumber: "Та утасны дугаараа оруулна уу",
      }));
    } else if (!isValidPhoneNumber) {
      setErrorText((prevState) => ({
        ...prevState,
        phoneNumber: "Утасны дугаар зөвхөн тоо агуулна",
      }));
    } else if (!isValidPhoneNumberLength) {
      setErrorText((prevState) => ({
        ...prevState,
        phoneNumber: "Таны оруулсан утасны дугаар алдаатай байна.",
      }));
    } else {
      requirementSatisfied("phoneNumber");
    }
    if (password.length == 0) {
      setErrorText((prevState) => ({
        ...prevState,
        password: "Нууц үгээ оруулна уу?",
      }));
    } else {
      axios
        .post(
          `http://${URL}/api/v1/login`,
          {
            phone: phoneNumber,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            console.log("Login Successful. Please Login to proceed");
            dispatch(setUserId(response.data.user.id));
            dispatch(setUserPhoneNumber(response.data.user.phone_number));
            dispatch(setFirstName(response.data.user.name));
            navigation.navigate("Splash");
          } else {
            setErrorText((prevState) => ({
              ...prevState,
              password: response.data.message,
            }));

            setPassword("");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(error.message);
        });
    }
  };

  const handleSignUpLinkPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFocus(0);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View
          style={[
            {
              height: hp("18%"),
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.title}>Тавтай морилно уу</Text>
        </View>

        <TextInput
          ref={phoneNumberRef}
          style={[
            styles.input,
            focus == "phoneNumber" && { borderColor: "#11AABE" },
            errorText.hasOwnProperty("phoneNumber") && { borderColor: "red" },
          ]}
          placeholder="Утас"
          value={phoneNumber}
          onChangeText={(phoneNumber) => {
            setPhoneNumber(phoneNumber);
            requirementSatisfied("phoneNumber");
          }}
          onFocus={(event) => {
            handleFocus(event, "phoneNumber");
            if (errorText.hasOwnProperty("phoneNumber")) {
              setTimeout(() => {
                setPhoneNumber("");
              }, 100);
            }
          }}
          onBlur={handleBlur}
          onSubmitEditing={handlePhoneNumberSubmit}
        />

        <Text style={styles.errorMsg}>
          {errorText.hasOwnProperty("phoneNumber") && errorText.phoneNumber}
        </Text>
        <TextInput
          ref={passwordRef}
          style={[
            styles.input,
            errorText.hasOwnProperty("password") && { borderColor: "red" },
            focus == "password" && { borderColor: "#11AABE" },
          ]}
          placeholder="Нууц үг"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
            requirementSatisfied("password");
          }}
          onFocus={(event) => {
            handleFocus(event, "password");
          }}
          onBlur={handleBlur}
          onSubmitEditing={handleLogin}
          secureTextEntry
        />
        <Text style={styles.errorMsg}>
          {errorText.hasOwnProperty("password") && errorText.password}
        </Text>
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
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    color: "#0D0140",
  },
  input: {
    paddingLeft: wp("6%"),
    width: wp("84%"),
    height: hp("8%"),
    // marginTop: hp("3%"),
    // fontSize: hp("3%"),

    fontSize: hp("2%"),
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },

  errorMsg: {
    width: wp("84%"),
    height: hp("4%"),
    paddingLeft: wp("6%"),
    color: "red",
    fontSize: hp("1.6%"),
  },
  signUpLinkText: {
    color: "#11AABE",
  },
});

export default LoginScreen;
