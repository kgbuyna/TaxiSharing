import React, { useRef, useState } from "react";
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

const SignUpScreen = ({ navigation }) => {
  const [focus, setFocus] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // state for email and firstName and lastName
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  //
  const [error, setError] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [padding, setPadding] = useState("0%");

  const handleFocus = (event, focus) => {
    console.log(event.nativeEvent.target);
    setFocus(focus);
    if (event.nativeEvent.target >= 19) setPadding("20%");
    else {
      setPadding("0%");
    }
  };

  const handleBlur = () => {
    setFocus(0);
    setPadding("0%");
  };
  const isValidEmail = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showMessageModal = (message) => {
    setMessage(message);
    setMessageVisible(true);
  };
  const closeMessageModal = () => {
    setMessageVisible(false);
  };
  const handleSubmitButton = () => {
    setFocus(0);
    setPadding("0%");
    const isValidPassword = password.length >= 8;
    const isValidPhoneNumber = /^[0-9]+$/.test(phoneNumber);
    const isValidPhoneNumberLength = phoneNumber.length >= 8;
    const isValidEmailFormat = isValidEmail(email);
    const isFirstNameValid = firstName.length >= 1;
    const isLastNameValid = lastName.length >= 1;

    if (!isLastNameValid) {
      showMessageModal("Та овгоо оруулна уу.");
      setError("lastName");
    } else if (!isFirstNameValid) {
      showMessageModal("Та нэрээ оруулна уу.");

      setError("firstName");
    } else if (!isValidPhoneNumber) {
      showMessageModal("Утасны дугаар зөвхөн тоо агуулна.");
      setPhoneNumber("");
      // setError(")
      setError("phoneNumber");
    } else if (!isValidPhoneNumberLength) {
      showMessageModal("Утасны дугаар 8 оронтой байна.");
      setPhoneNumber("");
      setError("phoneNumber");
    } else if (!isValidEmailFormat) {
      setError("email");
      showMessageModal("Цахим хаяг алдаатай байна.");
    } else if (!isValidPassword) {
      setError("password");
      showMessageModal("Нууц үг 8 оронтой байна.");
    } else {
      axios
        .post("http://localhost:3000/api/v1/", {
          phone: phoneNumber,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
        })
        .then((response) => {
          if (response.status === "success") {
            setIsSuccessful(true);
            timeout = setTimeout(() => {
              showMessageModal("Бүртгэгдлээ");
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
    navigation.navigate("Login");
  };

  const handleFirstNameSubmit = () => {
    phoneNumberRef.current.focus();
  };

  const handleLastNameSubmit = () => {
    firstNameRef.current.focus();
  };

  const handleEmailSubmit = () => {
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
        setPadding(0);
        Keyboard.dismiss();
      }}
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   style={{ flex: 1 }}
    >
      <View style={[styles.container, { paddingBottom: hp(padding) }]}>
        <Alert
          isVisible={messageVisible}
          message={message}
          onClose={closeMessageModal}
          isSuccessful={isSuccessful}
        />

        <Text style={styles.title}>Шинээр бүртгүүлэх </Text>
        <View style={{ height: hp("5%") }}></View>
        <View
          style={{
            height: hp("56%"),
            justifyContent: "space-around",
          }}
        >
          {/* <ScrollView> */}
          <TextInput
            style={[
              styles.input,
              focus == "lastName" && { borderColor: "#FFC700" },

              error == "lastName" && { borderColor: "red" },
            ]}
            placeholder="Овог"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (error == "lastName") {
                setError("");
              }
            }}
            onFocus={(event) => handleFocus(event, "lastName")}
            onBlur={handleBlur}
            ref={lastNameRef}
            onSubmitEditing={handleLastNameSubmit}
          />
          <TextInput
            style={[
              styles.input,
              focus == "firstName" && { borderColor: "#FFC700" },

              error == "firstName" && { borderColor: "red" },
            ]}
            placeholder="Нэр"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (error == "firstName") {
                setError("");
              }
            }}
            onFocus={(event) => handleFocus(event, "firstName")}
            onBlur={handleBlur}
            ref={firstNameRef}
            onSubmitEditing={handleFirstNameSubmit}
          />
          <TextInput
            style={[
              styles.input,
              focus == "phoneNumber" && { borderColor: "#FFC700" },
              error == "phoneNumber" && { borderColor: "red" },
            ]}
            placeholder="Утасны дугаар"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (error == "phoneNumber") {
                setError("");
              }
            }}
            onFocus={(event) => handleFocus(event, "phoneNumber")}
            onBlur={handleBlur}
            ref={phoneNumberRef}
            onSubmitEditing={handlePhoneNumberSubmit}
          />

          <TextInput
            style={[
              styles.input,
              focus == "email" && { borderColor: "#FFC700" },
              error == "email" && { borderColor: "red" },
            ]}
            placeholder="Цахим хаяг"
            value={email}
            onChangeText={setEmail}
            onFocus={(event) => handleFocus(event, "email")}
            onBlur={handleBlur}
            onSubmitEditing={handleEmailSubmit}
            ref={emailRef}
          />
          <TextInput
            style={[
              styles.input,
              focus == "password" && { borderColor: "#FFC700" },
            ]}
            placeholder="Нууц үг"
            value={password}
            onChangeText={setPassword}
            onFocus={(event) => handleFocus(event, "password")}
            ref={passwordRef}
            onSubmitEditing={handleSubmitButton}
            secureTextEntry
          />
          {/* </ScrollView> */}
        </View>
        <View style={{ height: hp("7%") }}></View>
        <Button
          style={styles.button}
          title="Бүртгүүлэх"
          onPress={handleSubmitButton}
        />
        <View style={{ height: hp("2%") }}></View>
        <Text style={styles.loginLink} onPress={handleLoginLinkPress}>
          Нэвтрэх
        </Text>
        {/* <Button
        title="Бүртгэлтэй хэрэглэгч бол Нэвтрэх."
        onPress={handleLoginLinkPress}
      /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F9F9F9",
  },

  title: {
    // top: "50%",
    fontSize: hp("5%"),
    fontWeight: "bold",
    color: "#0D0140",
  },
  input: {
    fontSize: hp("2.5%"),
    paddingLeft: wp("6%"),
    width: wp("84%"),
    height: hp("10%"),
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    width: "80%",
  },

  loginLink: {
    color: "#FFC700",
  },
});

export default SignUpScreen;
