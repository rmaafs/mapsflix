import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Dimensions
} from "react-native";

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import AsyncStorage from '@react-native-community/async-storage'
import * as ScreenOrientation from 'expo-screen-orientation';

const ViewVideo = ({ route, navigation }) => {

    var width = Dimensions.get('window').width - 30;
    let { item } = route.params;
    let vistos: String[] = [];

    useEffect(() => {
        readData()
    }, [])

    const readData = async () => {
        try {
            const result = await AsyncStorage.getItem("vistos")
            vistos = JSON.parse(result || "[]");

            if (!keyExists(item.nombre, vistos)) {
                vistos.push(item.nombre);
            }

            await AsyncStorage.setItem("vistos", JSON.stringify(vistos))
        } catch (e) {
            console.log('Failed to fetch the data from storage')
        }
    }

    return (
        <View style={styles.container}>
            <VideoPlayer
                videoProps={{
                    shouldPlay: true,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    useNativeControls: true,
                    source: {
                        uri: item.url,
                    },
                }}
                inFullscreen={true}
                switchToLandscape={() => 
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
                }
                switchToPortrait={() => 
                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
                }
            />
        </View>
    );

    function keyExists(key, search) {
        if (!search || (search.constructor !== Array && search.constructor !== Object)) {
            return false;
        }
        for (var i = 0; i < search.length; i++) {
            if (search[i] === key) {
                return true;
            }
        }
        return key in search;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});


export default ViewVideo;