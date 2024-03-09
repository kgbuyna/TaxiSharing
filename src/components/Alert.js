import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import CancelIcon from "../../assets/cancel.svg";
const Alert = ({ isVisible, message, onClose, isSuccessful }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
      // style={{ position: "absolute", top: 0, left: 0 }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: hp("1%"),
              height: hp("4.9%"),
              width: hp("4.9%"),
              right: wp("3%"),
            }}
          >
            <CancelIcon height="100%" width="100%" />
          </TouchableOpacity>
          {isSuccessful ? (
            <Text style={styles.header}>Амжилттай</Text>
          ) : (
            <Text style={styles.header}>Амжилтгүй</Text>
          )}
          {/* <Text>Амжилтгүй</Text> */}
          <Text style={styles.alertText}>{message}</Text>
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: "#ffffff" , textAlign:"center"}}>Хаах</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  modalContent: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 10,
    top: hp("5%"),
    left: 0,
    width: wp("86%"),
    height: hp("16%"),
    padding: wp("1.5%"),
    paddingTop: hp("3%"),
  },

  header: {
    fontSize: hp("3%"),
    fontWeight: "800",
    alignSelf: "center",
    flex: 1,
  },
  alertText: {
    flex: 1,
    alignSelf: "center",
    fontSize: hp("2.5%"),
    color: "#0D0140",
    fontWeight: "500",
  },
  closeButton: {
    flex: 1,
    justifyContent: "center",
    // alignContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    fontSize: 16,
    backgroundColor: "#FFC700",
    textAlign: "right",
    width: hp("19%"),
    height: hp("5%"),
    // textAlignVertical:
  },
});

export default Alert;
