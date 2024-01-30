import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Clock({hour , setHour , min , setMin}){
  // Энийгээ component болгох хэрэгтэй байх гэж бодож байна. Энэ цагаа болохоор 
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const ITEM_HEIGHT = screenHeight * 0.1;
  const scrollYHour = useRef(new Animated.Value(0)).current;
  const scrollYMin = useRef(new Animated.Value(0)).current;
  // const [hour, setHour] = useState(0);
  // const [min, setMin] = useState(0);
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
  ];
  const minutes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
    115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
    130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
    145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
    160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
    175, 176, 177, 178, 179, 180, 181,
  ];
  // Төгсгөлийн элемент нь өөрийнхөө эхлэлийг заана үүнийг яаж хийх вэ? Гэхдээ энэ чинь render лэж байгаа шүү дээ. Хязгааргүй render хийдэг болвол утгагүй юм биш үү?
  return (
    <View>
      <StatusBar hidden />
      <View style={styles.container}>
        <Animated.FlatList
          style={{
            width: screenWidth * 0.5,
            height: ITEM_HEIGHT * 3,
            paddingTop: ITEM_HEIGHT,
          }}
          data={hours}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYHour } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(event) => {
            setHour(
              hours[
                Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT) % 24
              ]
            );
          }}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          renderItem={({ item, index }) => {
            // Тэгээд одоо асуудал юу байгаа билээ хө?
            const inputRange = [
              (index - 1) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 1) * ITEM_HEIGHT,
            ];
            // Нөгөө хэд нь харагдахгүй байгаа нь бас их сонин. Нөгөө хэд нь харагдахгүй байгаа шалтгаан нь угаасаа доошлуулж байж л харагдана шүү дээ.

            const opacity = scrollYHour.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            {
              /* Уг нь яг бүгдээрээ харагдаж байгаа гэхдээ. Opacity гээр нь ингээд харуулчиж байгаа юм болов уу? */
            }
            return (
              <View style={{ height: ITEM_HEIGHT }}>
                { (item % 24 < 10) ? (
                  <Animated.Text style={[styles.text, { opacity }]}>
                    0{item % 24}
                  </Animated.Text>
                ) : (
                  <Animated.Text style={[styles.text, { opacity }]}>
                    {item % 24}
                  </Animated.Text>
                )}
              </View>
            );
          }}
        />
        <View style={[styles.label, styles.text]}>
          <Text>Цаг</Text>
        </View>
        <Animated.FlatList
          style={{
            width: screenWidth * 0.5,
            height: ITEM_HEIGHT * 3,
            paddingTop: ITEM_HEIGHT,
          }}
          data={minutes}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYMin } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(event) => {
            setMin(
              minutes[
                Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT) % 60
              ]
            );
          }}
          keyExtractor={(item) => item.toString()}
          // scrollY -н max авч чадах утга нь ITEM_HEIGHT*24 байх гэж бодоод байх юм.
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          renderItem={({ item, index }) => {
            // Тэгээд одоо асуудал юу байгаа билээ хө?
            const inputRange = [
              (index - 1) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 1) * ITEM_HEIGHT,
            ];
            // Нөгөө хэд нь харагдахгүй байгаа нь бас их сонин. Нөгөө хэд нь харагдахгүй байгаа шалтгаан нь угаасаа доошлуулж байж л харагдана шүү дээ.

            const opacity = scrollYMin.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            {
              /* Уг нь яг бүгдээрээ харагдаж байгаа гэхдээ. Opacity гээр нь ингээд харуулчиж байгаа юм болов уу? */
            }
            return (
              <View style={{ height: ITEM_HEIGHT }}>
                { (item%60 < 10) ? (
                  <Animated.Text style={[styles.text, { opacity }]}>
                    0{item%60}
                  </Animated.Text>
                ) : (
                  <Animated.Text style={[styles.text, { opacity }]}>
                    {item % 60}
                  </Animated.Text>
                )}
              </View>
            );
          }}
        />
        <View style={[styles.label, styles.text]}>
          <Text>Минут</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    fontWeight: "900",
  },
  label:{
    justifyContent: "center",
  },
  container: { flexDirection: "row" },
  buttonText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
});
