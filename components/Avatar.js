import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function Avatar() {
  const [avatar, setAvatar] = useState(require('../assets/avatar.png'));
  const _avatarClicked = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log('Erreur : ', response.error);
      } else {
        console.log('Photo : ', response.uri);
        setAvatar({uri: response.uri});
      }
    });
  };

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={_avatarClicked}>
      <Image style={styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});
