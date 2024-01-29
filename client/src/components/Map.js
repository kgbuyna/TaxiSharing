import React, { Component, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// export default function HomeScreen({ route , navigation })



export default function Map({region , markers}) {
  return (
      region ? 
      <View style={styles.container}>
        {
          console.log('renderIng map')
        }
        {/* Энэ яагаад render хийгдэхгүй байгаа нь аягүй сонин байна. */}
        
      </View> : <></>
  )
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  
});
