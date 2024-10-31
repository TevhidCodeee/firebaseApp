import React from "react";
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './MessageCardStyle';
import {formatDistance,parseISO} from 'date-fns';
import {tr} from 'date-fns/locale'

export default function MessageCard({message, onBanane}) {

  //dislike durumunda onBanane methodu tetiklenicek

  const formattedDate = formatDistance(
    parseISO(message.date), // Mesajın tarihini parse ediyoruz
    new Date(), // Şu anki tarih ile karşılaştırıyoruz
    { addSuffix: true, locale: tr } // Suffix ekleyip, Türkçe locale kullanıyoruz
  );
  return(
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>{message.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.title}>{message.text}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.dislike_container} onPress={onBanane}>
          {!!message.dislike && (
            <View style={styles.dislike_count_container}>
              <Text style={styles.dislike_count_text}>{message.dislike}</Text>
            </View>
          )
        }
          <Text style={styles.dislike_title}>Bana ne?</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}