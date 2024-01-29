import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
const Message = ({ isVisible, message, onClose, isSuccessful }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            {
                isSuccessful ? 
                <Text style={styles.header}>Амжилттай</Text>
                :
                <Text style={styles.header}>Амжилтгүй</Text>
            }
          {/* <Text>Амжилтгүй</Text> */}
          <Text style={styles.errorText}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Хаах</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  header:{
    fontSize: hp("3%"),
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
  closeButton: {
    color: "blue",
    fontSize: 16,
    textAlign: "right",
  },
});

export default Message;
