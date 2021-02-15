import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { Button } from 'react-native-elements'
import { Text, View } from '../components/Themed';

export default function TabOneScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [listaSeries, setData] = useState([]);

  useEffect(() => {
    fetch('https://video.rmaafs.com/series.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        renderLista()
      )}

    </View>
  );

  function getMoviesFromApi() {
    return fetch('https://video.rmaafs.com/series.json')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function renderLista() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginBottom: 2,
          backgroundColor: 'rgb(13, 17, 23)',
          width: 200,
          maxHeight: 300,
          margin: 10,
          padding: 20,
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 40
        }}
        onPress={() => navigation.navigate("ViewCapitulos", {
          item
        })}
      >

        <Image
          source={{
            uri: item.img
          }}
          style={{
            height: 100,
            width: 100
          }}
        />

        <Text style={{
          color: 'white',
          fontWeight: 'bold'
        }}>{item.name}</Text>

        <Text style={{
          color: 'gray'
        }}>{item.description}</Text>

        <Text style={{
          color: 'gray',
          fontSize: 10
        }}>{item.caps} capítulos</Text>

      </TouchableOpacity >
    )

    return (
      <FlatList
        data={listaSeries}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 2,
          paddingBottom: 30
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
