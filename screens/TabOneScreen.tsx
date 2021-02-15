import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { Button } from 'react-native-elements'
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {

  const listaSeries = [
    {
      id: 1,
      name: "Bob Esponja",
      description: "Temporada 1",
      img: "https://video.rmaafs.com/miniaturas/bobEsponja1.png",
      caps: 10
    },
    {
      id: 2,
      name: "Prueba 2",
      description: "Soy una descripción 2",
      img: "https://video.rmaafs.com/miniaturas/bobEsponja1.png",
      caps: 30
    }
  ];


  return (
    <View style={styles.container}>
      {renderLista()}
    </View>
  );

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
          borderRadius: 10
        }}
        onPress={() => console.log(item)
        }
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

      </TouchableOpacity>
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
