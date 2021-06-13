import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import uploadAnonymousFilesAsync from "anonymous-files";
// import ball from './assets/ball.png'

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null)

  const openImagePickerAsync = async () => {
    //Pedimos los permisos para abrir la galeria de imagenes
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync()

    //En caso de no obtener los permisos, mandamos una alerta
    if (result == false) {
      alert('Los permisos para la galeria son requeridos')
      return
    }

    //En caso de si obtener los permisos, abrir la galeria de imagenes
    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    //Si cancelo el proceso de escoger imagen, returna
    if (pickerResult.cancelled === true) {
      return
    }

    if (Platform.OS === "web") {
      let remoteUri = await uploadAnonymousFilesAsync(pickerResult.uri)
      setSelectedImage({ localUri: pickerResult.uri, remoteUri })
      console.log(remoteUri)
    } else {
      setSelectedImage({ localUri: pickerResult.uri })
    }
  }

  const openShareDialog = async () => {
    //Si no tiene disponible el cuadro de compartir imagen manda una alerta
    if (!(await Sharing.isAvailableAsync())) {
      alert('Compartir no esta disponible')
      return
    }

    await Sharing.shareAsync(selectedImage.localUri)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una imagen!</Text >

      <TouchableOpacity
        onPress={openImagePickerAsync}
      >
        <Image
          // source={ball}
          //Si la imagen seleccionada no es null, imprime la imageno... si es null, pon la imagen por defecto
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : 'https://picsum.photos/200/200'
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* <Button
        color='red'
        title='Press me'
        onPress={() => Alert.alert('Hello!')}
      /> */}

      {
        selectedImage ?
          <TouchableOpacity
            onPress={openShareDialog}
            style={styles.btnPrimary}
          >
            <Text style={styles.btnText}>Compartir imagen</Text>
          </TouchableOpacity>

          :
          <View>
          </View>
      }

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
    borderRadius: 100,
    // resizeMode: 'contain'
  },

  btnPrimary: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    marginTop: 10
  },

  btnText: {
    color: '#fff',
    fontSize: 20
  }
})

export default App;