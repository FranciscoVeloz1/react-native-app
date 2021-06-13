import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'
// import ball from './assets/ball.png'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text >
      <Image
        source={{uri: 'https://picsum.photos/200/200'}}
        // source={ball}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
  },

  title: {
    fontSize: 30,
    color: '#fff'
  },

  image: {
    height: 200,
    width: 200,
    borderRadius: 100
  }
})

export default App;