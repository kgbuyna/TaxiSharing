import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import CancelIcon from "../../assets/decline.svg";
import AcceptIcon from "../../assets/accept.svg";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const MapButton = () => {
    const [accept, useAccept] = useState(null);
    const translateXCancel = useRef(new Animated.Value(0)).current;

    const translateXAccept = useRef(new Animated.Value(0)).current;
    const translateXIcon = useRef(new Animated.Value(0)).current;
    const handleCancel = () => {
        if (accept) {
            Animated.timing(
                translateXCancel,
                {
                    toValue: 0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();

            Animated.timing(
                translateXAccept,
                {
                    toValue: 0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();

            Animated.timing(
                translateXIcon,
                {
                    toValue: 0.125 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
            useAccept(false);
        }
        else if (accept == null) {
            Animated.timing(
                translateXCancel,
                {
                    toValue: 0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
            Animated.timing(
                translateXAccept,
                {
                    toValue: 0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();

            Animated.timing(
                translateXIcon,
                {
                    toValue: 0.125 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
            useAccept(false);
        }

    };

    const handleAccept = () => {
        if (accept == null) {
            Animated.timing(
                translateXAccept,
                {
                    toValue: -0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();

            Animated.timing(
                translateXCancel,
                {
                    toValue: -0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
            useAccept(true);
            Animated.timing(
                translateXIcon,
                {
                    toValue: -0.125 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
        } else if (accept == false) {
            Animated.timing(
                translateXAccept,
                {
                    toValue: -0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
            Animated.timing(
                translateXCancel,
                {
                    toValue: -0.25 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();

            Animated.timing(
                translateXIcon,
                {
                    toValue: -0.125 * wp("84%"),
                    duration: 500, // 0.25 seconds
                    useNativeDriver: true,
                }
            ).start();
            // false оо ч гэсэн өөрчлөх ёстой шүү дээ. 
            useAccept(true);
        }
    };
    // const { currentMessage } = props;
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                ...styles.mapContainer,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius:
                    15,
            }}
            onPress={() => { }}
        >
            <Text
                style={{
                    height: wp("6%"),
                    fontSize: 16,

                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 10,
                    marginRight: 10,
                    color: "#f5f5f5",
                }}
            >
                Цуг таксидах уу?
            </Text>
            {/* <View style={{ flexDirection: "column" }}>
        </View> */}
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} />
            <View style={{ flexDirection: "row" }}>
                <Animated.View style={[{
                    position: 'absolute',
                    left: 0.25 * wp("84%") - 0.5 * wp("5%"),
                    top: 0.5 * wp("5%"),
                    zIndex: 1,
                    width: wp("5%"),
                    height: wp("5%"),
                    transform: [{ translateX: translateXIcon }]
                }]}>
                    <AcceptIcon width={"100%"} height={"100%"} />
                </Animated.View>

                {/* <Animated.View style={{ width: "100%" }}>
                    <CancelIcon width={"100%"} height={"100%"} />
                    </Animated.View> */}

                <TouchableOpacity
                    activeOpacity={1}
                    style={[
                        {
                            position: 'absolute',
                            left: -0.25 * wp("84%"),
                            // left : 0, 
                            height: hp("5.3%"),
                            width: 0.75 * wp("84%"),
                            justifyContent: "center",
                            borderBottomLeftRadius: 15,
                            alignItems: "center",
                            transform: [{ translateX: translateXCancel }],
                            backgroundColor: "#FFFFFF",
                        },
                    ]}
                    onPress={handleCancel}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[
                        // styles.button,
                        {
                            position: 'absolute',
                            // zIndex:209,
                            // left: 0, 
                            left: 0.5 * wp("84%"),
                            width: 0.75 * wp("84%"),
                            height: hp("5.3%"),
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [{ translateX: translateXAccept }],
                            backgroundColor: "#11AABE",
                        },
                    ]}
                    onPress={handleAccept}
                >
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

export default MapButton

const styles = StyleSheet.create({
    map: {
        // flex: 1,
        width: "100%",
        height: hp("23%"),
    },
    button: {
        height: hp("5.3%"),
        width: "50%",
        justifyContent: "center",
        // borderRadius:15,
    },
    mapContainer: {
        // flex: 1,
        width: wp("84%"),
        backgroundColor: "#11AABE",
        height: hp("33%"),
        borderRadius: 15,
    },
});