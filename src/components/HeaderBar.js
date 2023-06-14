import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {loadFonts} from '../../expo-font'


const HeaderBar = ({children}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await loadFonts();
      setFontsLoaded(true);
    }

    load();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {children}
        {/* <View style={{marginLeft:5}}>
          <Text style={{color:'#ffffff',fontFamily:'Futura-Heavy'}}>Тавтай морил</Text>
          <Text style={{color:'#ffffff',fontFamily:'Futura-Heavy'}}>Kgbuyna</Text>
        </View> */}
      </View>
      {/* <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      > */}
        {/* <>Messenger байрлах. Гэхдээ нөгөө захад нь.</> */}
      {/* </View> */}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: '4%',
    color: "#d3a7ff",
    backgroundColor:'#fffbf4',
    borderBottomColor:'#fde8ae',
    borderBottomWidth: '1px',
  },
});