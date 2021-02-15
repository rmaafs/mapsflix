import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage'
import * as ScreenOrientation from 'expo-screen-orientation';

const ViewCapitulos = ({ route, navigation }) => {

    var width = Dimensions.get('window').width - 30;
    let { item } = route.params;
    let vistos: String[] = [];
    AsyncStorage.getItem("vistos", (err, result) => {
        vistos = JSON.parse(result || "[]");
    })

    const [isLoading, setLoading] = useState(true);
    const [capitulos, setData] = useState([]);

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
        
        fetch(item.url_capitulos)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

            readData;
    }, []);

    const readData = async () => {
        try {
            const result = await AsyncStorage.getItem("vistos")
            vistos = JSON.parse(result || "[]");
        } catch (e) {
            console.log('Failed to fetch the data from storage')
        }
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {isLoading ? <ActivityIndicator /> : (
                renderCapitulos()
            )}
        </View>
    );

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', paddingTop: 40 }}>
                <TouchableOpacity
                    style={{
                        width: width,
                        paddingLeft: 2,
                        justifyContent: 'flex-start'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require("../assets/icons/back.png")}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function getTime(unix_timestamp) {
        var timeDiff = unix_timestamp;
        timeDiff /= 1000;
        var seconds = ("0" + Math.round(timeDiff % 60)).substr(-2);
        timeDiff = Math.floor(timeDiff / 60);
        var minutes = ("0" + Math.round(timeDiff % 60)).substr(-2);
        timeDiff = Math.floor(timeDiff / 60);
        var hours = ("0" + Math.round(timeDiff % 24)).substr(-2);
        timeDiff = Math.floor(timeDiff / 24);

        var formattedTime = hours + ':' + minutes + ':' + seconds;
        return formattedTime;
    }

    function renderCapitulos() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: 2,
                    backgroundColor: 'rgb(13, 17, 23)',
                    width: width,
                    margin: 10,
                    padding: 20,

                    borderRadius: 10
                }}
                onPress={() => navigation.navigate("ViewVideo", {
                    item
                })}
            >

                <Text style={{
                    color: keyExists(item.nombre, vistos) ? 'green' : 'white',
                    fontWeight: 'bold'
                }}>{item.nombre + (keyExists(item.nombre, vistos) ? " (Visto)" : "")}</Text>

                <Text style={{
                    color: 'gray'
                }}>Capitulo {item.id}</Text>

                <View style={{
                    width: width,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        color: 'gray',
                        textAlign: 'left',
                        fontSize: 10,
                        width: width / 2,
                    }}>{getTime(item.time)}</Text>

                    <Text style={{
                        color: 'gray',
                        textAlign: 'right',
                        fontSize: 10,
                        width: width / 2.5,
                    }}>{item.size} - {item.screenSize}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={capitulos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 2,
                    paddingBottom: 30
                }}
            />
        );
    }

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
});


export default ViewCapitulos;