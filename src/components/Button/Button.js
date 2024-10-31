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
//theme="primary" bunu diyerek login sayfasında sadece
//<Button text="Giriş Yap" theme="primary"/> bunu yazmadan
//<Button text="Giriş Yap"/> bunu yazarakta aynı sonucu elde ederiz ama 
//ne zamanki sonradan bir theme değeri girersek burdaki primary devre dışı kalır
//<Button text="Kayıt Ol" theme="secondary"/> gibi

