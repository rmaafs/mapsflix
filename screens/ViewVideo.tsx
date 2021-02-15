import React from "react";
import {
    View,
    StyleSheet,
    Dimensions
} from "react-native";

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'

const ViewVideo = ({ route, navigation }) => {

    var width = Dimensions.get('window').width - 30;
    let { item } = route.params;

    return (
        <View style={styles.container}>
            <VideoPlayer
                videoProps={{
                    shouldPlay: true,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                        uri: item.url,
                    },
                }}
                inFullscreen={true}
            />
        </View>
    );
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