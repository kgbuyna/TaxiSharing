import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const Profile = ({ images }) => {
  useEffect(()=>{
    // console.log(
    // console.log(images);
  })
  return (
    <View style={{width:'100%', height:'100%', flexDirection:'row'}}>
      { 
        images.map((image, index) =>(
          <View style={[styles.imageContainer, {position:'absolute'}]}>
            <Image source={{ uri: image.localUri || image.uri }} style={[styles.image, {zIndex:index, left:index*5}]} />
          </View>
        ))
      }
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer:{
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  image:{
    width: '100%',
    height: '100%',
    // borderRadius: '50%',
  }
});
