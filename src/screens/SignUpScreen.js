import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import Button from "../components/Button";
// import regex from "regex";
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

var validator = require("validator");

const SignUpScreen = ({ navigation }) => {
  const [focus, setFocus] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorText, setErrorText] = useState({});
  const handleFocus = (event, focus) => {
    console.log(event.nativeEvent.target);
    setFocus(focus);
  };

  const handleBlur = () => {
    setFocus(0);
  };

  const requirementSatisfied = (propertyName) => {
    setErrorText((prevState) => {
      const newState = { ...prevState };
      if (propertyName in newState) delete newState[propertyName];
      return newState;
    });
  };
  // akah@gmaeil.com
  const handleSubmitButton = () => {
    setFocus(0);

    Keyboard.dismiss();
    const isValidPassword = password.length >= 8;
    const isValidPhoneNumber = /^[0-9]+$/.test(phoneNumber);
    const isValidPhoneNumberLength = phoneNumber.length == 8;
    const isFirstNameValid = firstName.length >= 1;
    if (firstName.length == 0) {
      setErrorText((prevState) => ({
        ...prevState,
        firstName: "Та нэрээ оруулна уу",
      }));
      // setError("firstName");
    } else if (firstName.length < 4) {
      setErrorText((prevState) => ({
        ...prevState,
        firstName: "Нэр хамгийн багадаа 4 тэмдэгтээс бүрдэх ёстой.",
      }));
      // setError("firstName");
    } else {
      requirementSatisfied("firstName");
    }

    if (phoneNumber.length == 0) {
      setErrorText((prevState) => ({
        ...prevState,
        phoneNumber: "Та утасны дугаараа оруулна уу",
      }));
      // setError("phoneNumber");
    } else if (!isValidPhoneNumber) {
      setErrorText((prevState) => ({
        ...prevState,
        phoneNumber: "Утасны дугаар зөвхөн тоо агуулна",
      }));
      // setError("phoneNumber");
    } else if (!isValidPhoneNumberLength) {
      setErrorText((prevState) => ({
        ...prevState,
        phoneNumber: "Таны оруулсан утасны дугаар алдаатай байна.",
      }));
      // setError("phoneNumber");
    } else {
      requirementSatisfied("phoneNumber");
    }

    if (email.length == 0) {
      setErrorText((prevState) => ({
        ...prevState,
        email: "Та цахим хаягаа оруулна уу",
      }));
    } else if (!validator.isEmail(email)) {
      setErrorText((prevState) => ({
        ...prevState,
        email: "Цахим хаяг алдаатай байна.",
      }));
    } else {
      requirementSatisfied("email");
    }
    if (password.length == 0) {
      setErrorText((prevState) => ({
        ...prevState,
        password: "Та нууц үгээ оруулна уу",
      }));
    } else if (!isValidPassword) {
      setErrorText((prevState) => ({
        ...prevState,
        password: "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүтэх ёстой",
      }));
    } else {
      requirementSatisfied("password");
    }
    // 992
    if (Object.keys(errorText).length === 0) {
      console.log("ready to sent");
      axios
        .post("https://10.0.2.2:3000/api/v1/signup", {
          phone: phoneNumber,
          password: password,
          email: email,
          name: firstName,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setUserId(response.data.user.id);
            setUserPhoneNumber(response.data.user.phone_number);
            setFirstName(response.data.user.name);
            timeout = setTimeout(() => {
              navigationService.navigate("Splash");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLoginLinkPress = () => {
    setEmail("");
    setFirstName("");
    setPhoneNumber("");
    setPassword("");
    setErrorText({});
    navigation.navigate("Login");
  };

  const handleFirstNameSubmit = () => {
    phoneNumberRef.current.focus();
  };

  const handleEmailSubmit = () => {
    validator.isEmail(email);
    console.log(`email   is ${email} ${validator.isEmail(email)}`);
    passwordRef.current.focus();
  };
  const handlePhoneNumberSubmit = () => {
    emailRef.current.focus();
  };
  // modal for error message when login fails blurry background
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFocus(0);
        Keyboard.dismiss();
      }}
    >
      <View style={[styles.container]}>
        <Text style={styles.title}>Шинээр бүртгүүлэх</Text>
        <View
          style={{
            marginTop: hp("2.5%"),
          }}
        >
          <TextInput
            style={[
              styles.input,
              focus == "firstName" && { borderColor: "#11AABE" },
              errorText.hasOwnProperty("firstName") && { borderColor: "red" },
            ]}
            placeholder="Нэр"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              requirementSatisfied("firstName");
            }}
            onFocus={(event) => {
              handleFocus(event, "firstName");
              if (errorText.hasOwnProperty("firstName")) {
                setTimeout(() => {
                  setFirstName("");
                }, 100);
              }
            }}
            onBlur={handleBlur}
            ref={firstNameRef}
            onSubmitEditing={handleFirstNameSubmit}
          />
          <Text style={styles.errorMsg}>
            {errorText.hasOwnProperty("firstName") && errorText.firstName}
          </Text>
          <TextInput
            style={[
              styles.input,
              focus == "phoneNumber" && { borderColor: "#11AABE" },
              errorText.hasOwnProperty("phoneNumber") && { borderColor: "red" },
            ]}
            placeholder="Утасны дугаар"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
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
            ref={phoneNumberRef}
            onSubmitEditing={handlePhoneNumberSubmit}
          />

          <Text style={styles.errorMsg}>
            {errorText.hasOwnProperty("phoneNumber") && errorText.phoneNumber}
          </Text>
          <TextInput
            style={[
              styles.input,
              focus == "email" && { borderColor: "#11AABE" },
              errorText.hasOwnProperty("email") && { borderColor: "red" },
            ]}
            placeholder="Цахим хаяг"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              requirementSatisfied("email");
            }}
            onFocus={(event) => {
              handleFocus(event, "email");
              if (errorText.hasOwnProperty("email")) {
                setTimeout(() => {
                  setEmail("");
                }, 100);
              }
            }}
            onBlur={handleBlur}
            onSubmitEditing={handleEmailSubmit}
            ref={emailRef}
          />

          <Text style={styles.errorMsg}>
            {errorText.hasOwnProperty("email") && errorText.email}
          </Text>
          <TextInput
            style={[
              styles.input,
              focus == "password" && { borderColor: "#11AABE" },
              errorText.hasOwnProperty("password") && { borderColor: "red" },
            ]}
            placeholder="Нууц үг"
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              requirementSatisfied("password");
            }}
            onFocus={(event) => {
              handleFocus(event, "password");
              if (errorText.hasOwnProperty("password")) {
                setTimeout(() => {
                  setPassword("");
                }, 100);
              }
            }}
            ref={passwordRef}
            onSubmitEditing={handleSubmitButton}
            secureTextEntry
          />
          <Text style={styles.errorMsg}>
            {errorText.hasOwnProperty("password") && errorText.password}
          </Text>
        </View>
        <Button
          style={styles.button}
          title="Бүртгүүлэх"
          onPress={handleSubmitButton}
        />
        <View style={{ height: hp("2%") }}></View>
        <Text style={styles.loginLink} onPress={handleLoginLinkPress}>
          Нэвтрэх
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: hp("6%"),
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    color: "#0D0140",
  },
  errorMsg: {
    width: wp("84%"),
    height: hp("4%"),
    paddingLeft: wp("6%"),
    color: "red",
    fontSize: hp("1.6%"),
  },
  input: {
    fontSize: hp("2%"),
    paddingLeft: wp("6%"),
    width: wp("84%"),
    height: hp("7.5%"),
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
  button: {
    marginTop: hp("3%"),
    width: "80%",
  },
  loginLink: {
    color: "#11AABE",
  },
});

export default SignUpScreen;
