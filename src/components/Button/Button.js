import React from "react";
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './ButtonStyle';


export default function Button ({onPress, text, theme="primary"}) {
  return(
    <View style={styles[theme].container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles[theme].button}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}


