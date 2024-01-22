import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // 
  const handleSubmitButton = () => {
    if (!password) {
      alert("Please fill Name");
      return;
    }
    if (!phoneNumber) {
      alert("Please fill Email");
      return;
    }
    if (!fullName) {
      alert("Please fill Age");
      return;
    }
    axios
      .post("http://localhost:3000/api/v1/", {
        name: fullName,
        password: password,
        phone: phoneNumber,
      })
      .then((response) => {
        if (response.status === "success") {
          console.log("Registration Successful. Please Login to proceed");
          navigation.navigate("Splash");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginLinkPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Нэр"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Утасны дугаар"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Нууц үг"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        style={styles.button}
        title="Бүртгүүлэх"
        onPress={handleSubmitButton}
      />
      <Button
        title="Бүртгэлтэй хэрэглэгч бол Нэвтрэх."
        onPress={handleLoginLinkPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: "80%",
  },
});

export default SignUpScreen;
