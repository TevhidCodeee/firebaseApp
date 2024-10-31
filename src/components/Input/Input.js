import React from "react";
import {Text, View, TextInput, Button} from 'react-native';
import styles from './InputStyle';


export default function Input({placeholder, onType}) {
  return(
    <View style={styles.container}>
      <TextInput autoCapitalize="none" onChangeText={onType} placeholder={placeholder}/>
    </View>
  )
}

//autoCapitalize="none" büyük harfle başlamayı kapatıyor